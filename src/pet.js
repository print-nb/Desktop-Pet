let currentPet = null;
let currentEmotion = 'bored';
let timeoutId = null;
let petAvailableEmotions = ['happy', 'bored', 'angry', 'sad', 'shy'];
let allPets = [];
let petSize = 200;
let petOpacity = 1;
let petAlwaysOnTop = true;
let autoMoveEnabled = false;
let autoMoveInterval = null;

const PET_NAME_MAP = {
  'boy': '黄帽男孩',
  'girl': '粉色女孩',
  'baby': '宝贝'
};
const PET_EMOJI_MAP = {
  'boy': '👦',
  'girl': '👧',
  'baby': '👶'
};
function getPetDisplayName(name) { return PET_NAME_MAP[name] || name; }
function getPetEmoji(name) { return PET_EMOJI_MAP[name] || '👤'; }

let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;
let hasMoved = false;

const encouragementList = [
  "今天有努力学习了吗？","别忘了完成今天的任务哦～","作业写完了吗？",
  "该去背单词啦！","休息一下，继续加油！","今天的学习计划完成了吗？",
  "不要拖延哦，快行动起来！","错题订正了吗？","预习明天的课程了吗？",
  "再坚持一下就完成啦！","你是最棒的！","加油！你一定可以的！",
  "太棒了！继续保持！","坚持就是胜利！","努力就会有收获！",
  "相信自己，你能行！","今天也要元气满满哦～","为了梦想，冲鸭！",
  "每一点进步都值得骄傲！","你比昨天更优秀了！","学习使我快乐！",
  "学霸就是你！","未来可期！","加油加油，再学五分钟！",
  "你认真的样子超帅！","摸摸头～","陪你一起学习呀～",
  "我会一直陪着你的！","嘿嘿，你点我啦！","今天也要开心学习哦～",
  "有我在，学习不孤单！","加油加油，我看好你！","哇，你好厉害！",
  "一起变优秀吧！","学习累了就看看我～","我是你的专属学习小助手！",
  "今天也要和我一起努力哦～","冲鸭冲鸭！","你学习，我守护！",
  "嘿嘿，被你发现啦！","又完成一个任务，太厉害了！","恭喜你获得成长值！",
  "金币+10，继续加油！","你的努力我都看在眼里！","今天的表现满分！",
  "你真是个学习小天才！","坚持打卡，你做到了！","小组因你而更优秀！",
  "太棒了，离进化又近了一步！","你是小组的骄傲！"
];

const emotionPhrases = {
  happy: ["你今天超棒的！","学习状态满分！","继续保持这个势头！","为你骄傲！","太棒了，继续加油！","你就是学霸本霸！","今天的努力一定会有回报！","太厉害了，给你点赞！","冲鸭，胜利就在前方！","你认真的样子超迷人！","又进步了，真棒！","学习使我快乐！","今天也是元气满满的一天！","你做到了！","为你鼓掌！"],
  bored: ["该去学习啦～","别发呆了，快写作业！","今天的任务完成了吗？","再坚持一下就好了","学习时间到咯","不要偷懒哦","错题订正了吗？","该背单词了","预习一下明天的内容吧","别刷手机了，学习去","拖延症要不得哦","再学五分钟好不好？","今天的目标完成了吗？","动起来，别坐着发呆","学习不能半途而废"],
  angry: ["怎么还在玩？快去学习！","作业要逾期了！","再拖延就来不及了！","你已经浪费很多时间了","别让我失望哦","快点行动起来！","再这样下去会落后的","认真一点好不好？","别分心，专注学习！","你答应过要完成任务的"],
  sad: ["没关系，慢慢来","一次没做好不代表什么","别灰心，我相信你","休息一下再继续吧","你已经很努力了","加油，你可以的","不要放弃呀","我会一直陪着你的","困难只是暂时的","明天会更好的"],
  shy: ["嘿嘿，被你发现了","人家会害羞的啦","你好厉害呀","陪我一起学习好不好？","偷偷给你加油","你学习的时候超帅的","我会默默支持你的","今天也要一起努力哦","摸摸头～","有我在，不怕不怕"]
};

function hideMenu() {
  const ctxMenu = document.getElementById('ctxMenu');
  if (ctxMenu) ctxMenu.classList.remove('show');
}

function showBubble(text) {
  const bubble = document.getElementById('bubble');
  const petImage = document.getElementById('petImage');
  if (!bubble) return;
  bubble.textContent = text;
  bubble.style.top = '';
  bubble.classList.add('show');
  if (petImage) {
    const imageTop = petImage.getBoundingClientRect().top;
    const bubbleH = bubble.offsetHeight || 50;
    bubble.style.top = Math.max(4, imageTop - bubbleH - 15) + 'px';
  }
}

function hideBubble() {
  const bubble = document.getElementById('bubble');
  if (!bubble) return;
  bubble.classList.remove('show');
}

function clearTimer() {
  if (timeoutId) { clearTimeout(timeoutId); timeoutId = null; }
}

function startRestoreTimer() {
  timeoutId = setTimeout(async () => {
    if (!currentPet) return;
    const url = await window.petWindowAPI.getPetEmotion(currentPet, 'bored');
    const petImage = document.getElementById('petImage');
    if (url && petImage) petImage.src = url;
    currentEmotion = 'bored';
    hideBubble();
    timeoutId = null;
  }, 2500);
}

async function switchEmotion(emotion) {
  if (!currentPet) return;
  clearTimer();
  currentEmotion = emotion;
  const url = await window.petWindowAPI.getPetEmotion(currentPet, emotion);
  const petImage = document.getElementById('petImage');
  if (url && petImage) petImage.src = url;
  const phrases = emotionPhrases[emotion];
  showBubble(phrases[Math.floor(Math.random() * phrases.length)]);
  startRestoreTimer();
}

async function quickInteract(emotion, message) {
  if (!currentPet) return;
  clearTimer();
  currentEmotion = emotion;
  const url = await window.petWindowAPI.getPetEmotion(currentPet, emotion);
  const petImage = document.getElementById('petImage');
  if (url && petImage) petImage.src = url;
  showBubble(message);
  startRestoreTimer();
}

function buildMenu() {
  const ctxMenu = document.getElementById('ctxMenu');
  if (!ctxMenu) return;

  let html = '';

  html += '<div class="ctx-item ctx-parent" data-menu="emotion"><span class="ctx-icon">🎭</span><span class="ctx-label">表情切换</span><span class="ctx-arrow">▶</span>';
  html += '<div class="ctx-submenu">';
  html += '<div class="ctx-item" data-action="emotion" data-emotion="happy"><span class="ctx-icon">😊</span><span class="ctx-label">开心表情</span></div>';
  html += '<div class="ctx-item" data-action="emotion" data-emotion="bored"><span class="ctx-icon">😐</span><span class="ctx-label">无聊表情</span></div>';
  html += '<div class="ctx-item" data-action="emotion" data-emotion="angry"><span class="ctx-icon">😠</span><span class="ctx-label">生气表情</span></div>';
  html += '<div class="ctx-item" data-action="emotion" data-emotion="sad"><span class="ctx-icon">😢</span><span class="ctx-label">悲伤表情</span></div>';
  html += '<div class="ctx-item" data-action="emotion" data-emotion="shy"><span class="ctx-icon">😳</span><span class="ctx-label">害羞表情</span></div>';
  html += '</div></div>';

  html += '<div class="ctx-item ctx-parent" data-menu="interact"><span class="ctx-icon">✨</span><span class="ctx-label">快速互动</span><span class="ctx-arrow">▶</span>';
  html += '<div class="ctx-submenu">';
  html += '<div class="ctx-item" data-action="interact" data-emotion="happy" data-msg="摸摸头～真乖！"><span class="ctx-icon">🤚</span><span class="ctx-label">摸摸头</span></div>';
  html += '<div class="ctx-item" data-action="interact" data-emotion="happy" data-msg="嗨～你好呀！"><span class="ctx-icon">👋</span><span class="ctx-label">打招呼</span></div>';
  html += '<div class="ctx-item" data-action="interact" data-emotion="happy" data-msg="加油！你是最棒的！"><span class="ctx-icon">💪</span><span class="ctx-label">加油鼓励</span></div>';
  html += '</div></div>';

  html += '<div class="ctx-item ctx-parent" data-menu="settings"><span class="ctx-icon">⚙️</span><span class="ctx-label">桌宠设置</span><span class="ctx-arrow">▶</span>';
  html += '<div class="ctx-submenu">';

  html += '<div class="ctx-item ctx-parent" data-menu="switch-pet"><span class="ctx-icon">🐾</span><span class="ctx-label">切换桌宠</span><span class="ctx-arrow">▶</span>';
  html += '<div class="ctx-submenu">';
  allPets.forEach(p => {
    const isCurrent = p.name === currentPet;
    html += `<div class="ctx-item" data-action="switch-pet" data-pet="${p.name}"><span class="ctx-icon">${isCurrent ? '✅' : getPetEmoji(p.name)}</span><span class="ctx-label">${getPetDisplayName(p.name)}</span></div>`;
  });
  html += '</div></div>';

  html += '<div class="ctx-item ctx-parent" data-menu="resize"><span class="ctx-icon">🔍</span><span class="ctx-label">调整大小</span><span class="ctx-arrow">▶</span>';
  html += '<div class="ctx-submenu">';
  html += `<div class="ctx-item" data-action="resize" data-size="100"><span class="ctx-icon">🔹</span><span class="ctx-label">小 (100px)</span>${petSize===100?'<span class="ctx-check">✓</span>':''}</div>`;
  html += `<div class="ctx-item" data-action="resize" data-size="200"><span class="ctx-icon">🔷</span><span class="ctx-label">中 (200px)</span>${petSize===200?'<span class="ctx-check">✓</span>':''}</div>`;
  html += `<div class="ctx-item" data-action="resize" data-size="300"><span class="ctx-icon">🔵</span><span class="ctx-label">大 (300px)</span>${petSize===300?'<span class="ctx-check">✓</span>':''}</div>`;
  html += '</div></div>';

  html += '<div class="ctx-item ctx-parent" data-menu="opacity"><span class="ctx-icon">👁️</span><span class="ctx-label">调整透明度</span><span class="ctx-arrow">▶</span>';
  html += '<div class="ctx-submenu">';
  html += `<div class="ctx-item" data-action="opacity" data-val="1"><span class="ctx-label">100% (不透明)</span>${petOpacity===1?'<span class="ctx-check">✓</span>':''}</div>`;
  html += `<div class="ctx-item" data-action="opacity" data-val="0.8"><span class="ctx-label">80%</span>${petOpacity===0.8?'<span class="ctx-check">✓</span>':''}</div>`;
  html += `<div class="ctx-item" data-action="opacity" data-val="0.6"><span class="ctx-label">60%</span>${petOpacity===0.6?'<span class="ctx-check">✓</span>':''}</div>`;
  html += `<div class="ctx-item" data-action="opacity" data-val="0.4"><span class="ctx-label">40%</span>${petOpacity===0.4?'<span class="ctx-check">✓</span>':''}</div>`;
  html += '</div></div>';

  html += `<div class="ctx-item" data-action="toggle-top"><span class="ctx-icon">📌</span><span class="ctx-label">置顶显示</span>${petAlwaysOnTop?'<span class="ctx-check">✓</span>':''}</div>`;
  html += '<div class="ctx-item" data-action="hide-temp"><span class="ctx-icon">🙈</span><span class="ctx-label">隐藏桌宠</span><span class="ctx-badge">5分钟</span></div>';

  html += '</div></div>';

  html += '<div class="ctx-item ctx-parent" data-menu="system"><span class="ctx-icon">🔧</span><span class="ctx-label">系统功能</span><span class="ctx-arrow">▶</span>';
  html += '<div class="ctx-submenu">';
  html += '<div class="ctx-item" data-action="open-main"><span class="ctx-icon">🏠</span><span class="ctx-label">打开主窗口</span></div>';
  html += '<div class="ctx-item" data-action="switch-tab" data-tab="1"><span class="ctx-icon">📋</span><span class="ctx-label">任务中心</span></div>';
  html += '<div class="ctx-item" data-action="switch-tab" data-tab="2"><span class="ctx-icon">🐑</span><span class="ctx-label">宠物养成</span></div>';
  html += '<div class="ctx-item" data-action="quit"><span class="ctx-icon">❌</span><span class="ctx-label">退出应用</span></div>';
  html += '</div></div>';

  ctxMenu.innerHTML = html;
  bindMenuActions();
}

function bindMenuActions() {
  const ctxMenu = document.getElementById('ctxMenu');
  if (!ctxMenu) return;

  ctxMenu.querySelectorAll('.ctx-item[data-action="emotion"]').forEach(item => {
    item.addEventListener('click', (e) => { e.stopPropagation(); hideMenu(); switchEmotion(item.dataset.emotion); });
  });

  ctxMenu.querySelectorAll('.ctx-item[data-action="interact"]').forEach(item => {
    item.addEventListener('click', (e) => { e.stopPropagation(); hideMenu(); quickInteract(item.dataset.emotion, item.dataset.msg); });
  });

  ctxMenu.querySelectorAll('.ctx-item[data-action="switch-pet"]').forEach(item => {
    item.addEventListener('click', async (e) => {
      e.stopPropagation();
      const petName = item.dataset.pet;
      if (petName === currentPet) { hideMenu(); return; }
      currentPet = petName;
      currentEmotion = 'bored';
      localStorage.setItem('selectedPet', petName);
      window.petWindowAPI.switchPet(petName);
      await loadPetInfo(petName);
      const url = await window.petWindowAPI.getPetEmotion(petName, 'bored');
      const petImage = document.getElementById('petImage');
      if (url && petImage) petImage.src = url;
      hideMenu();
    });
  });

  ctxMenu.querySelectorAll('.ctx-item[data-action="resize"]').forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      const size = parseInt(item.dataset.size);
      petSize = size;
      applyPetSize(size);
      localStorage.setItem('petSize', size);
      hideMenu();
      buildMenu();
    });
  });

  ctxMenu.querySelectorAll('.ctx-item[data-action="opacity"]').forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      petOpacity = parseFloat(item.dataset.val);
      window.petWindowAPI.setPetOpacity(petOpacity);
      window.petWindowAPI.syncPetOpacity(petOpacity);
      localStorage.setItem('petOpacity', petOpacity);
      hideMenu();
      buildMenu();
    });
  });

  ctxMenu.querySelectorAll('.ctx-item[data-action="toggle-top"]').forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      petAlwaysOnTop = !petAlwaysOnTop;
      window.petWindowAPI.togglePetTop(petAlwaysOnTop);
      localStorage.setItem('petAlwaysOnTop', petAlwaysOnTop);
      hideMenu();
      buildMenu();
    });
  });

  ctxMenu.querySelectorAll('.ctx-item[data-action="hide-temp"]').forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      hideMenu();
      showBubble("我先躲起来5分钟～");
      setTimeout(() => { window.petWindowAPI.hidePet(); }, 2000);
      setTimeout(() => { window.petWindowAPI.showPet(); }, 300000);
    });
  });

  ctxMenu.querySelectorAll('.ctx-item[data-action="open-main"]').forEach(item => {
    item.addEventListener('click', (e) => { e.stopPropagation(); hideMenu(); window.petWindowAPI.switchTab(0); });
  });

  ctxMenu.querySelectorAll('.ctx-item[data-action="switch-tab"]').forEach(item => {
    item.addEventListener('click', (e) => { e.stopPropagation(); hideMenu(); window.petWindowAPI.switchTab(parseInt(item.dataset.tab)); });
  });

  ctxMenu.querySelectorAll('.ctx-item[data-action="quit"]').forEach(item => {
    item.addEventListener('click', (e) => { e.stopPropagation(); hideMenu(); window.petWindowAPI.quitApp(); });
  });
}

function applyPetSize(size) {
  const petImage = document.getElementById('petImage');
  if (!petImage) return;
  const imgSize = size - 20;
  petImage.style.width = imgSize + 'px';
  petImage.style.height = imgSize + 'px';
  window.petWindowAPI.resizePet(size, size + 174);
}

async function loadPetInfo(petName) {
  try {
    allPets = await window.petWindowAPI.scanPets();
    const pet = allPets.find(p => p.name === petName);
    if (pet && pet.availableEmotions) {
      petAvailableEmotions = pet.availableEmotions;
    } else {
      petAvailableEmotions = ['happy', 'bored', 'angry', 'sad', 'shy'];
    }
  } catch (e) {
    console.error('[桌宠窗口] 获取桌宠信息失败:', e);
    petAvailableEmotions = ['happy', 'bored', 'angry', 'sad', 'shy'];
    allPets = [];
  }
}

function loadSettings() {
  try {
    const savedSize = localStorage.getItem('petSize');
    if (savedSize) {
      petSize = parseInt(savedSize);
      applyPetSize(petSize);
    }
    const savedOpacity = localStorage.getItem('petOpacity');
    if (savedOpacity) {
      petOpacity = parseFloat(savedOpacity);
      window.petWindowAPI.setPetOpacity(petOpacity);
    }
    const savedTop = localStorage.getItem('petAlwaysOnTop');
    if (savedTop !== null) {
      petAlwaysOnTop = savedTop === 'true';
      window.petWindowAPI.togglePetTop(petAlwaysOnTop);
    }
    const savedAutoMove = localStorage.getItem('autoMove');
    if (savedAutoMove !== null) {
      autoMoveEnabled = savedAutoMove === 'true';
    }
  } catch (e) {
    console.error('[桌宠窗口] 加载设置失败:', e);
  }
}

function initDrag() {
  const petImage = document.getElementById('petImage');
  if (!petImage) return;

  petImage.addEventListener('mousedown', (e) => {
    if (e.button === 2) return;
    isDragging = true;
    hasMoved = false;
    dragStartX = e.screenX;
    dragStartY = e.screenY;
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const dx = e.screenX - dragStartX;
    const dy = e.screenY - dragStartY;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) hasMoved = true;
    window.petWindowAPI.movePet(dx, dy);
    dragStartX = e.screenX;
    dragStartY = e.screenY;
  });

  document.addEventListener('mouseup', (e) => {
    if (e.button === 2) return;
    if (isDragging && !hasMoved) {
      onPetClick();
    }
    isDragging = false;
  });

  petImage.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    e.stopPropagation();
    buildMenu();
    const ctxMenu = document.getElementById('ctxMenu');
    if (!ctxMenu) return;
    const menuW = 220, menuH = ctxMenu.scrollHeight || 400;
    let x = e.clientX + 5;
    let y = e.clientY + 5;
    if (x + menuW > window.innerWidth) x = e.clientX - menuW - 5;
    if (y + menuH > window.innerHeight) y = Math.max(0, window.innerHeight - menuH - 5);
    ctxMenu.style.left = x + 'px';
    ctxMenu.style.top = y + 'px';
    ctxMenu.classList.add('show');
  });
}

async function onPetClick() {
  if (!currentPet) return;
  clearTimer();
  const availableForRandom = petAvailableEmotions.filter(e => e !== currentEmotion && e !== 'bored');
  const allAvailable = petAvailableEmotions.filter(e => e !== currentEmotion);
  const pool = availableForRandom.length > 0 ? availableForRandom : allAvailable;
  if (pool.length === 0) return;
  const randomEmotion = pool[Math.floor(Math.random() * pool.length)];
  currentEmotion = randomEmotion;
  const url = await window.petWindowAPI.getPetEmotion(currentPet, randomEmotion);
  const petImage = document.getElementById('petImage');
  if (url && petImage) petImage.src = url;
  showBubble(encouragementList[Math.floor(Math.random() * encouragementList.length)]);
  startRestoreTimer();
}

function initIPC() {
  window.petWindowAPI.onSetPet(async (petName) => {
    currentPet = petName;
    currentEmotion = 'bored';
    await loadPetInfo(petName);
    const url = await window.petWindowAPI.getPetEmotion(petName, 'bored');
    const petImage = document.getElementById('petImage');
    if (url && petImage) {
      petImage.src = url;
      petImage.onload = () => { window.petWindowAPI.resizePet(petSize, petSize + 174); };
    }
  });

  window.petWindowAPI.onUpdatePetData((data) => {
    if (data.selectedPet && data.selectedPet !== currentPet) {
      currentPet = data.selectedPet;
      loadPetInfo(data.selectedPet);
    }
    if (typeof data.petOpacity === 'number') {
      petOpacity = data.petOpacity;
      window.petWindowAPI.setPetOpacity(petOpacity);
      localStorage.setItem('petOpacity', petOpacity);
    }
    if (typeof data.autoMove === 'boolean') {
      autoMoveEnabled = data.autoMove;
      localStorage.setItem('autoMove', autoMoveEnabled);
      initAutoMove();
    }
  });
}

function initAutoMove() {
  if (autoMoveInterval) clearInterval(autoMoveInterval);
  
  if (autoMoveEnabled) {
    autoMoveInterval = setInterval(() => {
      // 随机向一个方向移动一点
      const dx = (Math.random() - 0.5) * 6;
      const dy = (Math.random() - 0.5) * 6;
      window.petWindowAPI.movePet(Math.round(dx), Math.round(dy));
    }, 2000);
  }
}

function initGlobalListeners() {
  document.addEventListener('click', (e) => {
    const ctxMenu = document.getElementById('ctxMenu');
    if (ctxMenu && !ctxMenu.contains(e.target)) hideMenu();
  });

  document.addEventListener('contextmenu', (e) => {
    const petImage = document.getElementById('petImage');
    if (petImage && e.target !== petImage) hideMenu();
  });
}

function init() {
  loadSettings();
  initDrag();
  initIPC();
  initGlobalListeners();
  initAutoMove();
}

document.addEventListener('DOMContentLoaded', init);
