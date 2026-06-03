const { app, BrowserWindow, ipcMain, dialog, Tray, Menu } = require('electron');
const path = require('path');
const fs = require('fs');
const https = require('https');
const http = require('http');

let mainWindow = null;
let petWindow = null;
let cachedPets = null;
let tray = null;

const AI_API_KEY = process.env.OPENAI_API_KEY || '';
const AI_BASE_URL = 'https://dashscope.aliyuncs.com/compatible-mode/v1';
const AI_MODEL = 'qwen-turbo';

function callAIStream(messages, callback) {
  return new Promise((resolve, reject) => {
    if (!AI_API_KEY) {
      callback('[error] 未配置API Key，请设置环境变量 OPENAI_API_KEY');
      resolve();
      return;
    }

    const body = JSON.stringify({
      model: AI_MODEL,
      messages: messages,
      stream: true
    });

    const url = new URL(AI_BASE_URL + '/chat/completions');
    const options = {
      hostname: url.hostname,
      port: 443,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + AI_API_KEY,
        'Content-Length': Buffer.byteLength(body)
      }
    };

    const req = https.request(options, (res) => {
      let buffer = '';
      res.on('data', (chunk) => {
        buffer += chunk.toString();
        const lines = buffer.split('\n');
        buffer = lines.pop();
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || !trimmed.startsWith('data:')) continue;
          const dataStr = trimmed.slice(5).trim();
          if (dataStr === '[DONE]') { resolve(); return; }
          try {
            const json = JSON.parse(dataStr);
            const content = json.choices && json.choices[0] && json.choices[0].delta && json.choices[0].delta.content;
            if (content) callback(content);
          } catch (e) {}
        }
      });
      res.on('end', () => resolve());
      res.on('error', (e) => { callback('[error] 网络请求失败'); resolve(); });
    });

    req.on('error', (e) => { callback('[error] 连接失败，请检查网络'); resolve(); });
    req.write(body);
    req.end();
  });
}

const PETS_ROOT = app.isPackaged
  ? path.join(process.resourcesPath, 'pet-images')
  : path.join(__dirname, 'pet-images');
console.log('[桌宠系统] pet-images文件夹路径:', PETS_ROOT);
console.log('[桌宠系统] 文件夹是否存在:', fs.existsSync(PETS_ROOT));

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: false,
    title: '学习激励桌宠系统',
    frame: true,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'src', 'index.html'));

  mainWindow.on('close', (e) => {
    if (!app.isQuitting) {
      e.preventDefault();
      mainWindow.hide();
    }
  });
}

function createPetWindow() {
  petWindow = new BrowserWindow({
    width: 200,
    height: 374,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    resizable: false,
    skipTaskbar: true,
    hasShadow: false,
    webPreferences: {
      preload: path.join(__dirname, 'pet-preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  petWindow.loadFile(path.join(__dirname, 'src', 'pet.html'));
  petWindow.setVisibleOnAllWorkspaces(true);

  petWindow.on('close', (e) => {
    if (!app.isQuitting) {
      e.preventDefault();
      petWindow.hide();
    }
  });

  console.log('[桌宠系统] 桌宠窗口已创建');
}

function ensurePetWindow() {
  if (!petWindow || petWindow.isDestroyed()) {
    createPetWindow();
  }
}

function scanPetsSync() {
  if (cachedPets) return cachedPets;
  console.log('[桌宠系统] 开始扫描桌宠文件夹...');
  try {
    if (!fs.existsSync(PETS_ROOT)) {
      console.error('[桌宠系统] pet-images文件夹不存在:', PETS_ROOT);
      return [];
    }

    const petFolders = fs.readdirSync(PETS_ROOT, { withFileTypes: true });
    const pets = [];
    const ALL_EMOTIONS = ['happy', 'bored', 'angry', 'sad', 'shy'];

    for (const folder of petFolders) {
      if (!folder.isDirectory()) continue;
      const petName = folder.name;
      const petPath = path.join(PETS_ROOT, petName);
      console.log(`[桌宠系统] 检查文件夹: ${petName}`);

      const emotionFiles = fs.readdirSync(petPath);
      const emotions = {};
      const availableEmotions = [];

      for (const emotion of ALL_EMOTIONS) {
        const emotionFile = emotionFiles.find(f =>
          f.toLowerCase().startsWith(emotion.toLowerCase()) &&
          (f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.gif'))
        );

        if (emotionFile) {
          const absolutePath = path.join(petPath, emotionFile);
          emotions[emotion] = `file:///${absolutePath.replace(/\\/g, '/')}`;
          availableEmotions.push(emotion);
          console.log(`[桌宠系统]   找到表情 ${emotion}: ${emotionFile}`);
        } else {
          console.warn(`[桌宠系统]   桌宠${petName}缺少${emotion}表情`);
        }
      }

      if (availableEmotions.length > 0) {
        pets.push({
          name: petName,
          preview: emotions.happy || emotions[availableEmotions[0]],
          emotions: emotions,
          availableEmotions: availableEmotions
        });
        console.log(`[桌宠系统] 成功加载桌宠: ${petName} (表情: ${availableEmotions.join(',')})`);
      }
    }

    console.log(`[桌宠系统] 共加载${pets.length}个桌宠`);
    cachedPets = pets;
    return pets;
  } catch (error) {
    console.error('[桌宠系统] 扫描桌宠失败:', error);
    return [];
  }
}

ipcMain.handle('scan-pets', async () => {
  return scanPetsSync();
});

ipcMain.handle('get-pet-emotion', async (event, petName, emotion) => {
  const pets = scanPetsSync();
  const pet = pets.find(p => p.name === petName);
  if (pet && pet.emotions[emotion]) {
    return pet.emotions[emotion];
  }
  if (pets.length > 0 && pets[0].emotions[emotion]) {
    return pets[0].emotions[emotion];
  }
  return '';
});

ipcMain.on('start-pet', (event, petName) => {
  console.log('[桌宠系统] 启动桌宠:', petName);
  ensurePetWindow();
  if (petWindow && !petWindow.isDestroyed()) {
    petWindow.show();
    const sendSetPet = () => { petWindow.webContents.send('set-pet', petName); };
    if (petWindow.webContents.isLoading()) {
      petWindow.webContents.once('did-finish-load', sendSetPet);
    } else {
      sendSetPet();
    }
    setTimeout(() => {
      if (petWindow && !petWindow.isDestroyed()) {
        petWindow.webContents.invalidate();
      }
    }, 800);
  }
});

ipcMain.on('move-pet', (event, deltaX, deltaY) => {
  if (petWindow && !petWindow.isDestroyed()) {
    const [x, y] = petWindow.getPosition();
    petWindow.setPosition(x + deltaX, y + deltaY);
  }
});

ipcMain.on('pet-data-update', (event, data) => {
  if (petWindow && !petWindow.isDestroyed()) {
    petWindow.webContents.send('update-pet-data', data);
  }
});

ipcMain.on('show-pet', () => {
  ensurePetWindow();
  if (petWindow && !petWindow.isDestroyed()) petWindow.show();
});

ipcMain.on('hide-pet', () => {
  if (petWindow && !petWindow.isDestroyed()) petWindow.hide();
});

ipcMain.on('switch-tab', (event, tabIndex) => {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send('switch-tab', tabIndex);
    mainWindow.show();
    mainWindow.focus();
  }
});

ipcMain.on('resize-pet', (event, width, height) => {
  if (petWindow && !petWindow.isDestroyed()) {
    petWindow.setSize(width, height || width);
  }
});

ipcMain.on('set-pet-opacity', (event, opacity) => {
  if (petWindow && !petWindow.isDestroyed()) {
    petWindow.setOpacity(opacity);
  }
});

ipcMain.on('toggle-pet-top', (event, isTop) => {
  if (petWindow && !petWindow.isDestroyed()) {
    petWindow.setAlwaysOnTop(isTop);
  }
});

ipcMain.on('switch-pet', (event, petName) => {
  console.log('[桌宠系统] 切换桌宠:', petName);
  if (petWindow && !petWindow.isDestroyed()) {
    petWindow.webContents.send('set-pet', petName);
  }
});

ipcMain.on('export-data', (event, data) => {
  const filePath = dialog.showSaveDialogSync(mainWindow, {
    title: '导出数据',
    defaultPath: 'pet-system-backup.json',
    filters: [{ name: 'JSON', extensions: ['json'] }]
  });
  if (filePath) {
    fs.writeFileSync(filePath, data, 'utf-8');
    event.reply('export-result', true);
  } else {
    event.reply('export-result', false);
  }
});

ipcMain.on('quit-app', () => { app.isQuitting = true; app.quit(); });

ipcMain.on('sync-pet-opacity', (event, opacity) => {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send('sync-pet-opacity', opacity);
  }
});

ipcMain.on('ai-chat', async (event, messages) => {
  try {
    await callAIStream(messages, (chunk) => {
      if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.webContents.send('ai-chat-chunk', chunk);
      }
    });
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('ai-chat-done');
    }
  } catch (e) {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('ai-chat-chunk', '[error] 抱歉，我现在有点累了，稍后再试试吧~');
      mainWindow.webContents.send('ai-chat-done');
    }
  }
});

ipcMain.handle('ai-check-key', async () => {
  return !!AI_API_KEY;
});

function createTray() {
  // 尝试从资源中加载图标，如果没有则使用文本或默认
  let iconPath = null;
  
  // 检查 pet-images/boy 中的表情图作为托盘图标
  const boyPath = path.join(PETS_ROOT, 'boy');
  if (fs.existsSync(boyPath)) {
    const files = fs.readdirSync(boyPath);
    const iconFile = files.find(f => f.startsWith('happy') && (f.endsWith('.png') || f.endsWith('.jpg')));
    if (iconFile) {
      iconPath = path.join(boyPath, iconFile);
    }
  }
  
  tray = new Tray(iconPath || path.join(__dirname, 'src', 'icon.ico') || '');
  
  const contextMenu = Menu.buildFromTemplate([
    { label: '显示主窗口', click: () => { if (mainWindow && !mainWindow.isDestroyed()) { mainWindow.show(); mainWindow.focus(); } } },
    { label: '显示桌宠', click: () => { if (petWindow && !petWindow.isDestroyed()) { petWindow.show(); } } },
    { label: '隐藏桌宠', click: () => { if (petWindow && !petWindow.isDestroyed()) { petWindow.hide(); } } },
    { type: 'separator' },
    { label: '退出应用', click: () => { app.isQuitting = true; app.quit(); } }
  ]);
  
  tray.setToolTip('学习激励桌宠');
  tray.setContextMenu(contextMenu);
  
  // 点击托盘图标显示主窗口
  tray.on('click', () => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      if (mainWindow.isVisible()) {
        mainWindow.focus();
      } else {
        mainWindow.show();
        mainWindow.focus();
      }
    }
  });
}

app.whenReady().then(() => { 
  createMainWindow(); 
  createTray(); 
});
app.on('window-all-closed', () => {});
app.on('before-quit', () => {
  app.isQuitting = true;
  if (mainWindow && !mainWindow.isDestroyed()) mainWindow.removeAllListeners('close');
  if (petWindow && !petWindow.isDestroyed()) petWindow.removeAllListeners('close');
});
app.on('activate', () => { if (mainWindow) mainWindow.show(); });
