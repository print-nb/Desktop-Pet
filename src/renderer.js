

const PET_NAME_MAP = {
  'boy': '黄帽男孩',
  'girl': '粉色女孩',
  'baby': '宝贝'
};
function getPetDisplayName(name) { return PET_NAME_MAP[name] || name; }

const GROUPS = [
  { name: '第1小组', petName: '喜羊羊', color: '#4FC3F7', bodyColor: '#FFFFFF', accent: '#4FC3F7', emoji: '🐑' },
  { name: '第2小组', petName: '美羊羊', color: '#F48FB1', bodyColor: '#FFF0F5', accent: '#F48FB1', emoji: '🌸' },
  { name: '第3小组', petName: '灰太狼', color: '#90A4AE', bodyColor: '#ECEFF1', accent: '#78909C', emoji: '🐺' },
  { name: '第4小组', petName: '懒羊羊', color: '#FFD54F', bodyColor: '#FFFDE7', accent: '#FFC107', emoji: '🐷' }
];

const SHOP_ITEMS = [
  { id: 1, name: '勤奋之星', price: 100, category: '头饰', rarity: '普通', emoji: '⭐' },
  { id: 2, name: '学霸帽', price: 150, category: '头饰', rarity: '稀有', emoji: '🎓' },
  { id: 3, name: '蝴蝶结', price: 80, category: '头饰', rarity: '普通', emoji: '🎀' },
  { id: 4, name: '皇冠', price: 300, category: '头饰', rarity: '史诗', emoji: '👑' },
  { id: 5, name: '校服', price: 120, category: '服装', rarity: '普通', emoji: '👔' },
  { id: 6, name: '运动服', price: 100, category: '服装', rarity: '普通', emoji: '🏃' },
  { id: 7, name: '披风', price: 200, category: '服装', rarity: '稀有', emoji: '🦸' },
  { id: 8, name: '公主裙', price: 250, category: '服装', rarity: '稀有', emoji: '👗' },
  { id: 9, name: '星星环绕', price: 180, category: '特效', rarity: '稀有', emoji: '✨' },
  { id: 10, name: '爱心气泡', price: 160, category: '特效', rarity: '稀有', emoji: '💕' },
  { id: 11, name: '金色光环', price: 350, category: '特效', rarity: '史诗', emoji: '💫' },
  { id: 12, name: '草地', price: 80, category: '背景', rarity: '普通', emoji: '🌿' },
  { id: 13, name: '教室', price: 120, category: '背景', rarity: '普通', emoji: '🏫' },
  { id: 14, name: '星空', price: 280, category: '背景', rarity: '稀有', emoji: '🌌' }
];

const SUITS = [
  { 
    name: '学霸套装', 
    items: [1, 2, 5, 11], 
    bonus: '✨ 学霸光环', 
    effect: { 
      growthMultiplier: 1.5,  // 成长值 1.5 倍
      coinMultiplier: 1.3      // 金币 1.3 倍
    } 
  },
  { 
    name: '可爱套装', 
    items: [3, 8, 10, 12], 
    bonus: '💖 可爱光环', 
    effect: { 
      healthBonus: 10,  // 每次恢复额外 +10
      coinMultiplier: 1.2
    } 
  }
];

const ACHIEVEMENTS = [
  { id: 'first_learn', name: '初次学习', icon: '🌟', category: '学习达人', desc: '完成第一个任务', reward: 20 },
  { id: 'streak_7', name: '连续打卡', icon: '🔥', category: '坚持之星', desc: '连续7天完成任务', reward: 50 },
  { id: 'growth_100', name: '学霸之路', icon: '📚', category: '学习达人', desc: '累计获得100成长值', reward: 100 },
  { id: 'team_50', name: '团队核心', icon: '🤝', category: '团队贡献', desc: '为小组贡献50成长值', reward: 80 },
  { id: 'bug_10', name: '捉虫能手', icon: '🐛', category: '学习达人', desc: '订正10道错题', reward: 60 },
  { id: 'coins_500', name: '金币大亨', icon: '💰', category: '团队贡献', desc: '累计获得500金币', reward: 200 },
  { id: 'dress_5', name: '装扮达人', icon: '👗', category: '团队贡献', desc: '拥有5件装扮', reward: 100 },
  { id: 'evolve_master', name: '进化大师', icon: '🦋', category: '坚持之星', desc: '宠物进化到成熟期', reward: 150 },
  { id: 'group_champ', name: '小组冠军', icon: '🏅', category: '团队贡献', desc: '所在小组获得周排名第一', reward: 120 },
  { id: 'perfect_month', name: '全勤标兵', icon: '📋', category: '坚持之星', desc: '一个月内无逾期任务', reward: 100 }
];

const MOCK_MEMBERS = [
  { name: '小明', avatar: '👦', growth: 0 },
  { name: '小红', avatar: '👧', growth: 0 },
  { name: '小刚', avatar: '🧑', growth: 0 }
];

const BULLETINS = [
  { title: '欢迎加入小组！', content: '希望大家一起努力学习，共同养成最强桌宠～', time: '今天' },
  { title: '本周任务提醒', content: '请记得在截止时间前完成任务，逾期会扣除健康值哦！', time: '昨天' },
  { title: '小组金币使用说明', content: '小组金币可以用来兑换装扮，装扮能让桌宠更可爱！', time: '2天前' }
];

const MISTAKES = [
  { id: 1, question: '计算 25 × 4 ÷ 2 = ?', wrongAnswer: '40', correctAnswer: '50', reason: '运算顺序错误', suggestion: '先算25×4=100，再算100÷2=50' },
  { id: 2, question: '春风又___江南岸', wrongAnswer: '吹绿', correctAnswer: '绿', reason: '多写了字', suggestion: '注意古诗词原文用字' },
  { id: 3, question: 'She ___ to school every day.', wrongAnswer: 'go', correctAnswer: 'goes', reason: '第三人称单数未变形', suggestion: '主语She，动词需加es' }
];

const AI_COMMENTS = [
  '完成得很棒！继续保持～', '太厉害了！你的桌宠为你骄傲！', '优秀的表现！再接再厉！',
  '做得好！离进化又近了一步！', '完美提交！小组因你而更强！', '很棒！坚持就是胜利！',
  '出色完成！继续保持这个节奏！', '真不错！你的努力大家都有目共睹！'
];

const DEFAULT_DATA = {
  classJoined: false, groupIndex: -1, studentName: '测试学生',
  growthValue: 0, healthValue: 50, groupCoins: 0, totalCoinsEarned: 0,
  ownedItems: [], wornItems: [], tasks: [], achievements: [],
  evolutionHistory: [], petDiary: [], dailyStats: {},
  settings: { darkTheme: false, petOpacity: 100, autoMove: false, deadlineNotify: true, petNotify: true },
  lastHealthWarning: 0, lastHealthRecovery: 0,
  consecutiveDays: 0, lastActiveDate: null, totalMistakesCorrected: 0, noOverdueDays: 0,
  correctedMistakes: [], lastNoOverdueDate: null, selectedPet: null
};

let appData = null;
let currentSubmitTaskId = null;
let selectedFiles = [];
let currentShopCategory = '全部';
let currentAchieveCategory = '全部';
let petSpeechTimer = null;
let availablePets = [];
let selectedPetForJoin = null;

function moodToEmotion(mood) {
  switch(mood) {
    case '开心': return 'happy';
    case '正常': return 'bored';
    case '低落': return 'sad';
    case '委屈': return 'shy';
    default: return 'bored';
  }
}

async function loadAvailablePets() {
  try {
    availablePets = await window.electronAPI.scanPets();
    console.log('[渲染进程] 加载到桌宠数量:', availablePets.length);
    availablePets.forEach(p => console.log('[渲染进程] 桌宠:', p.name, '预览:', p.preview));
  } catch(e) {
    console.error('[渲染进程] 加载桌宠列表失败:', e);
    availablePets = [];
  }
  if (!appData.classJoined) {
    initPetSelection();
  }
  if (appData.classJoined) {
    updateSidebar();
    renderPetPage();
    notifyPetUpdate();
  }
}

function getPetImageHTML(mood, size) {
  const petName = appData.selectedPet;
  if (!petName || availablePets.length === 0) return null;
  const pet = availablePets.find(p => p.name === petName);
  if (!pet) return null;
  const emotion = moodToEmotion(mood);
  const url = pet.emotions[emotion] || pet.emotions.bored || pet.preview;
  if (!url) return null;
  return `<img src="${url}" style="width:${size}px;height:${size}px;object-fit:contain" alt="${petName}">`;
}

function getTodayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
function getStage(gv) { return gv < 100 ? '幼年期' : gv < 300 ? '成长期' : '成熟期'; }
function getNextStageValue(gv) { return gv < 100 ? 100 : gv < 300 ? 300 : 999; }
function getMood(hv) { return hv >= 80 ? '开心' : hv >= 50 ? '正常' : hv >= 30 ? '低落' : '委屈'; }
function getMoodEmoji(mood) { return { '开心': '😊', '正常': '😐', '低落': '😔', '委屈': '😢' }[mood] || '😐'; }
function formatTime(ts) {
  const d = new Date(ts); const p = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
}
function getCountdown(deadline) {
  const diff = deadline - Date.now(); if (diff <= 0) return null;
  return { hours: Math.floor(diff / 3600000), mins: Math.floor((diff % 3600000) / 60000), urgent: diff < 3600000 };
}

function loadData() {
  try {
    const saved = localStorage.getItem('petSystemData');
    if (saved) {
      const parsed = JSON.parse(saved);
      appData = { ...JSON.parse(JSON.stringify(DEFAULT_DATA)), ...parsed };
      if (!Array.isArray(appData.tasks)) appData.tasks = [];
      if (!Array.isArray(appData.ownedItems)) appData.ownedItems = [];
      if (!Array.isArray(appData.wornItems)) appData.wornItems = [];
      if (!Array.isArray(appData.achievements)) appData.achievements = [];
      if (!Array.isArray(appData.evolutionHistory)) appData.evolutionHistory = [];
      if (!Array.isArray(appData.petDiary)) appData.petDiary = [];
      if (typeof appData.dailyStats !== 'object' || !appData.dailyStats) appData.dailyStats = {};
      if (typeof appData.settings !== 'object' || !appData.settings) appData.settings = { ...DEFAULT_DATA.settings };
      appData.settings = { ...DEFAULT_DATA.settings, ...appData.settings };
      if (typeof appData.totalCoinsEarned !== 'number') appData.totalCoinsEarned = 0;
      if (typeof appData.consecutiveDays !== 'number') appData.consecutiveDays = 0;
      if (typeof appData.totalMistakesCorrected !== 'number') appData.totalMistakesCorrected = 0;
      if (typeof appData.noOverdueDays !== 'number') appData.noOverdueDays = 0;
      if (Array.isArray(appData.equippedItems) && appData.ownedItems.length === 0) {
        appData.ownedItems = [...appData.equippedItems];
        appData.wornItems = [...appData.equippedItems];
        delete appData.equippedItems;
      }
    } else {
      appData = JSON.parse(JSON.stringify(DEFAULT_DATA));
    }
  } catch (e) {
    appData = JSON.parse(JSON.stringify(DEFAULT_DATA));
  }
}

function saveData() {
  localStorage.setItem('petSystemData', JSON.stringify(appData));
  notifyPetUpdate();
}

function notifyPetUpdate() {
  if (!appData.classJoined) return;
  const g = GROUPS[appData.groupIndex];
  window.electronAPI.sendPetDataUpdate({
    petName: appData.selectedPet || g.petName, groupIndex: appData.groupIndex,
    growthValue: appData.growthValue, healthValue: appData.healthValue,
    mood: getMood(appData.healthValue), stage: getStage(appData.growthValue),
    wornItems: appData.wornItems, groupCoins: appData.groupCoins,
    selectedPet: appData.selectedPet, petOpacity: appData.settings.petOpacity / 100,
    autoMove: appData.settings.autoMove
  });
}

function updateDailyStat(key, val) {
  const t = getTodayKey();
  if (!appData.dailyStats[t]) appData.dailyStats[t] = { tasksCompleted: 0, growthGained: 0, coinsGained: 0, studyMinutes: 0 };
  appData.dailyStats[t][key] += val;
}

function showToast(msg, type) {
  type = type || 'info';
  const box = document.getElementById('toast-box');
  const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  t.innerHTML = `<span>${icons[type] || ''}</span><span>${msg}</span>`;
  box.appendChild(t);
  setTimeout(() => { t.classList.add('toast-out'); setTimeout(() => t.remove(), 300); }, 3000);
}

function showCelebration(text) {
  document.getElementById('celebrate-text').textContent = text;
  const el = document.getElementById('celebrate');
  el.style.display = 'flex';
  el.style.pointerEvents = 'auto';
  setTimeout(() => { el.style.display = 'none'; el.style.pointerEvents = 'none'; }, 3000);
}

function generatePetSVG(petName, mood, stage, items, size, showLabels) {
  const s = size || 200;
  const moodEmoji = { '开心': '😊', '正常': '😐', '低落': '😔', '委屈': '😢' }[mood] || '😐';
  const stageText = stage || '幼年期';
  const equippedItems = items || [];
  let itemLabels = '';
  if (showLabels !== false && equippedItems.length > 0) {
    equippedItems.forEach((iid, i) => {
      const si = SHOP_ITEMS.find(x => x.id === iid);
      if (si) itemLabels += `<text x="80" y="${130 + i * 14}" text-anchor="middle" font-size="9" fill="#fa8c16" font-weight="bold">[${si.name}]</text>`;
    });
  }
  const labelY = 130 + equippedItems.length * 14;
  const labelSvg = showLabels !== false ? `${itemLabels}<text x="80" y="${labelY}" text-anchor="middle" font-size="10" fill="#1890ff" font-weight="bold">【${stageText}】</text>` : '';
  return `<svg viewBox="0 0 160 170" width="${s}" height="${Math.round(s*170/160)}" xmlns="http://www.w3.org/2000/svg"><circle cx="80" cy="70" r="45" fill="#E8F3FF" stroke="#165DFF" stroke-width="2"/><text x="80" y="78" text-anchor="middle" font-size="36">${moodEmoji}</text><text x="80" y="140" text-anchor="middle" font-size="11" fill="#165DFF" font-weight="bold">${getPetDisplayName(petName)}</text>${labelSvg}</svg>`;
}

function switchTab(index) {
  const navItems = document.querySelectorAll('.nav-item');
  const pages = document.querySelectorAll('.page');
  navItems.forEach((item, i) => item.classList.toggle('active', i === index));
  pages.forEach((panel, i) => {
    const tabIndex = parseInt(panel.id.replace('page-', ''));
    panel.classList.toggle('active', tabIndex === getTabIndexFromNavIndex(index));
  });
  const realIndex = getTabIndexFromNavIndex(index);
  if (realIndex === 0) renderClassPage();
  if (realIndex === 1) renderTaskList();
  if (realIndex === 2) renderPetPage();
  if (realIndex === 3) renderShopPage();
  if (realIndex === 4) renderDataPage();
  if (realIndex === 5) renderAchievePage();
  if (realIndex === 7) renderAIPage();
  if (realIndex === 6) renderSettingsPage();
  updateSidebar();
  updateStudentCard();
}

function getTabIndexFromNavIndex(navIndex) {
  const mapping = [0, 1, 2, 3, 4, 5, 7, 6];
  return mapping[navIndex] !== undefined ? mapping[navIndex] : navIndex;
}

function updateSidebar() {
  const now = new Date();
  const p = n => String(n).padStart(2, '0');
  document.getElementById('sidebar-date').textContent = `${now.getFullYear()}年${p(now.getMonth()+1)}月${p(now.getDate())}日`;
  const ts = appData.dailyStats[getTodayKey()];
  document.getElementById('sidebar-today-done').textContent = `今日已完成 ${ts ? ts.tasksCompleted : 0} 个任务`;
  if (appData.classJoined) {
    const g = GROUPS[appData.groupIndex];
    const mood = getMood(appData.healthValue);
    const petImgHTML = getPetImageHTML(mood, 44);
    if (petImgHTML) {
      document.getElementById('sidebar-pet-mini').innerHTML = petImgHTML;
    } else {
      document.getElementById('sidebar-pet-mini').innerHTML = generatePetSVG(g.petName, mood, getStage(appData.growthValue), appData.wornItems, 44, false);
    }
  } else {
    document.getElementById('sidebar-pet-mini').textContent = '🐑';
  }
}

function updateStudentCard() {
  document.getElementById('sc-name').textContent = appData.studentName;
  document.getElementById('sc-growth').textContent = appData.growthValue;
  const ts = appData.dailyStats[getTodayKey()];
  document.getElementById('sc-today-growth').textContent = ts ? ts.growthGained : 0;
  if (appData.classJoined) {
    const g = GROUPS[appData.groupIndex];
    document.getElementById('sc-class').textContent = '测试一班';
    document.getElementById('sc-group').textContent = g.name;
    document.getElementById('sc-avatar').textContent = g.emoji;
    document.getElementById('sc-rank').textContent = `第${getGroupRank()}名/4组`;
  } else {
    document.getElementById('sc-class').textContent = '测试一班';
    document.getElementById('sc-group').textContent = '未加入';
    document.getElementById('sc-avatar').textContent = '🐑';
    document.getElementById('sc-rank').textContent = '-';
  }
}

function getGroupRank() {
  const d = new Date();
  const seed = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
  let rank = 1;
  for (let i = 0; i < 4; i++) {
    if (i !== appData.groupIndex) {
      const mockGrowth = ((seed * (i + 7) * 13) % 60) + 20;
      if (mockGrowth > appData.growthValue) rank++;
    }
  }
  return rank;
}

function renderClassPage() {
  const joinSec = document.getElementById('class-join-section');
  const homeSec = document.getElementById('class-home-section');
  if (!appData.classJoined) {
    joinSec.style.display = 'block'; homeSec.style.display = 'none';
    initPetSelection();
    return;
  }
  joinSec.style.display = 'none'; homeSec.style.display = 'block';
  const g = GROUPS[appData.groupIndex], stage = getStage(appData.growthValue), mood = getMood(appData.healthValue);

  const welcomeImgHTML = getPetImageHTML('开心', 60);
  const welcomePetHTML = welcomeImgHTML || generatePetSVG(g.petName, '开心', stage, appData.wornItems, 60, false);
  document.getElementById('welcome-text').innerHTML = `<div class="wb-icon">${welcomePetHTML}</div><h2>欢迎回来，${appData.studentName}！今天也要加油学习哦～</h2>`;

  const groupImgHTML = getPetImageHTML(mood, 60);
  const groupPetHTML = groupImgHTML || generatePetSVG(g.petName, mood, stage, appData.wornItems, 60, false);
  document.getElementById('group-info-card').innerHTML = `<h3>🏠 小组信息</h3><div style="display:flex;align-items:center;gap:12px;margin-top:8px"><div>${groupPetHTML}</div><div><div style="font-size:14px;font-weight:700;color:#165DFF">${g.name}</div><div style="font-size:12px;color:#888;margin-top:2px">桌宠：${getPetDisplayName(appData.selectedPet || g.petName)} · ${stage}</div><div style="font-size:12px;color:#fa8c16;margin-top:2px">💰 金币池：${appData.groupCoins}</div><div style="font-size:12px;color:#165DFF;margin-top:2px">📈 总成长值：${appData.growthValue}</div></div></div>`;

  const rank = getGroupRank(), rp = Math.max(10, 100 - (rank - 1) * 25);
  document.getElementById('group-rank-card').innerHTML = `<h3>📊 小组排名</h3><div style="margin-top:8px"><div style="font-size:22px;font-weight:700;color:#165DFF">第${rank}名</div><div style="font-size:11px;color:#888;margin-top:4px">小组排名进度</div><div class="progress-bar" style="margin-top:4px"><div class="progress-fill pf-growth" style="width:${rp}%"></div></div>${rank > 1 ? '<div style="font-size:11px;color:#fa8c16;margin-top:4px">继续努力，向前一名冲刺！</div>' : '<div style="font-size:11px;color:#52c41a;margin-top:4px">🎉 你们是第一名！</div>'}</div>`;

  const members = MOCK_MEMBERS.map((m, i) => ({ ...m, growth: i === 0 ? appData.growthValue : [18, 28][i - 1] || 15 }));
  members[0].name = appData.studentName;
  const total = members.reduce((s, m) => s + m.growth, 0) || 1;
  const sorted = [...members].sort((a, b) => b.growth - a.growth);

  document.getElementById('member-list').innerHTML = `<div style="margin-bottom:8px;font-size:12px;color:#165DFF;font-weight:600">🏅 小组贡献榜</div>${sorted.map(m => {
    const pct = Math.round(m.growth / total * 100), isMe = m.name === appData.studentName;
    return `<div class="member-item" style="${isMe ? 'background:#f0f6ff;border-radius:8px;padding:6px 8px' : ''}"><div class="mi-avatar">${m.avatar}</div><div class="mi-info" style="flex:1"><div class="mi-name">${m.name}${isMe ? ' <span class="mi-me">（我）</span>' : ''}</div><div class="mi-growth">成长值：${m.growth}</div></div><div style="width:80px"><div class="progress-bar" style="height:8px"><div class="progress-fill pf-growth" style="width:${pct}%"></div></div><div style="font-size:10px;color:#888;text-align:right">${pct}%</div></div></div>`;
  }).join('')}`;

  document.getElementById('bulletin-list').innerHTML = BULLETINS.map(b => `<div class="bulletin-item"><div class="bi-title">${b.title}</div><div class="bi-content">${b.content}</div><div style="font-size:10px;color:#bbb;margin-top:2px">${b.time}</div></div>`).join('');
}

function initPetSelection() {
  const petSelectionEl = document.getElementById('pet-selection');
  const petListEl = document.getElementById('petList');
  if (!petSelectionEl || !petListEl) return;
  if (availablePets.length === 0) {
    petListEl.innerHTML = '<p style="color:red">未找到任何桌宠，请检查pet-images文件夹</p>';
    return;
  }
  petSelectionEl.style.display = 'block';
  petListEl.innerHTML = '';
  availablePets.forEach((pet, index) => {
    const petItem = document.createElement('div');
    petItem.className = 'pet-item';
    const fallbackSvg = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 24 24' fill='none' stroke='%23ccc' stroke-width='2'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cpath d='M8 14s1.5 2 4 2 4-2 4-2'/%3E%3Cline x1='9' y1='9' x2='9.01' y2='9'/%3E%3Cline x1='15' y1='9' x2='15.01' y2='9'/%3E%3C/svg%3E";
    petItem.innerHTML = `<img src="${pet.preview}" alt="${getPetDisplayName(pet.name)}" onerror="this.src='${fallbackSvg}'"><p>${getPetDisplayName(pet.name)}</p>`;
    if (index === 0) {
      petItem.classList.add('selected');
      selectedPetForJoin = pet.name;
    }
    petItem.addEventListener('click', () => {
      document.querySelectorAll('.pet-item').forEach(item => item.classList.remove('selected'));
      petItem.classList.add('selected');
      selectedPetForJoin = pet.name;
      console.log('[渲染进程] 选择了桌宠:', selectedPetForJoin);
    });
    petListEl.appendChild(petItem);
  });
}

function joinClass() {
  const code = document.getElementById('invite-code').value.trim();
  if (code !== '123456') { document.getElementById('join-error').textContent = '邀请码错误，请重新输入'; return; }
  if (!selectedPetForJoin && availablePets.length > 0) { document.getElementById('join-error').textContent = '请先选择一个桌宠'; return; }
  document.getElementById('join-error').textContent = '';
  const gi = Math.floor(Math.random() * 4);
  appData.classJoined = true; appData.groupIndex = gi;
  appData.growthValue = 0; appData.healthValue = 50; appData.groupCoins = 0;
  appData.ownedItems = []; appData.wornItems = [];
  appData.selectedPet = selectedPetForJoin || null;
  appData.evolutionHistory = [{ stage: '幼年期', time: Date.now() }];
  appData.petDiary = [{ text: '桌宠诞生了！欢迎来到学习之旅～', time: Date.now() }];
  saveData(); renderClassPage();
  if (appData.selectedPet) {
    window.electronAPI.startPet(appData.selectedPet);
  }
  window.electronAPI.showPet(); notifyPetUpdate();
  showToast(`加入成功！你被分配到${GROUPS[gi].name}，桌宠是${getPetDisplayName(appData.selectedPet || GROUPS[gi].petName)}`, 'success');
  setTimeout(() => switchTab(2), 600);
}

function renderTaskList() {
  updateTaskStatuses();
  const pending = appData.tasks.filter(t => t.status === '未开始' || t.status === '进行中').length;
  const done = appData.tasks.filter(t => t.status === '已提交').length;
  const overdue = appData.tasks.filter(t => t.status === '已逾期').length;
  const total = appData.tasks.length || 1;
  const rate = Math.round(done / total * 100);
  const C = 2 * Math.PI * 22, dl = C * rate / 100;

  document.getElementById('task-stat-cards').innerHTML = `<div class="sc-item sc-blue"><div class="sc-val">${pending}</div><div class="sc-lbl">待完成</div></div><div class="sc-item sc-green"><div class="sc-val">${done}</div><div class="sc-lbl">已完成</div></div><div class="sc-item sc-red"><div class="sc-val">${overdue}</div><div class="sc-lbl">已逾期</div></div><div class="sc-item" style="display:flex;align-items:center;justify-content:center"><svg width="56" height="56" viewBox="0 0 56 56"><circle cx="28" cy="28" r="22" fill="none" stroke="#f0f0f0" stroke-width="5"/><circle cx="28" cy="28" r="22" fill="none" stroke="#165DFF" stroke-width="5" stroke-dasharray="${dl} ${C-dl}" transform="rotate(-90 28 28)" stroke-linecap="round"/><text x="28" y="32" text-anchor="middle" font-size="12" font-weight="bold" fill="#165DFF">${rate}%</text></svg><div class="sc-lbl" style="margin-left:6px">完成率</div></div>`;

  const listEl = document.getElementById('task-list');
  if (appData.tasks.length === 0) {
    listEl.innerHTML = `<div style="text-align:center;padding:30px;color:#bbb"><div style="font-size:36px">📋</div><p style="margin-top:8px">暂无任务，点击上方按钮添加测试任务</p></div>`;
    return;
  }

  let html = '';
  if (pending > 0) html += `<div style="margin-bottom:8px"><button class="btn btn-sm" onclick="batchCompleteTasks()">✅ 一键完成所有待办</button></div>`;

  appData.tasks.forEach(task => {
    let sc = '', cc = 'task-card';
    if (task.status === '未开始') sc = 'st-pending';
    else if (task.status === '进行中') sc = 'st-progress';
    else if (task.status === '已提交') { sc = 'st-submitted'; cc += ' submitted'; }
    else if (task.status === '已逾期') { sc = 'st-overdue'; cc += ' overdue'; }

    const pri = task.priority || '中';
    const pc = pri === '高' ? 'priority-high' : pri === '低' ? 'priority-low' : 'priority-mid';

    let act = '';
    if (task.status === '未开始' || task.status === '进行中') act = `<div class="task-action"><button class="btn btn-sm" onclick="openSubmitModal(${task.id})">提交</button></div>`;
    else if (task.status === '已逾期') act = `<div class="task-action"><button class="btn btn-sm" onclick="openSubmitModal(${task.id})">补交</button></div>`;

    let cdHtml = '';
    if (task.status !== '已提交') { const cd = getCountdown(task.deadline); if (cd) cdHtml = `<div class="task-countdown ${cd.urgent?'urgent':''}">⏰ 剩余 ${cd.hours}小时${cd.mins}分</div>`; }

    let subHtml = '';
    if (task.status === '已提交' && task.submittedAt) {
      subHtml = `<div class="task-submitted-time">提交时间：${formatTime(task.submittedAt)}</div>`;
      
      // 显示提交的文本内容
      if (task.submission && task.submission.text) {
        subHtml += `<div style="font-size:11px;color:#52c41a;margin-top:2px;padding:6px 8px;background:#f6ffed;border-radius:4px">📝 答案：${task.submission.text}</div>`;
      }
      
      // 显示提交的文件名
      if (task.submission && task.submission.fileNames && task.submission.fileNames.length > 0) {
        subHtml += `<div style="font-size:10px;color:#165DFF;margin-top:2px">📎 ${task.submission.fileNames.join(', ')}</div>`;
      }
      
      if (task.aiComment) subHtml += `<div style="font-size:11px;color:#722ed1;margin-top:2px">🤖 ${task.aiComment}</div>`;
    }

    const del = task.status !== '已提交' ? `<span class="task-del" onclick="deleteTask(${task.id})" title="删除">🗑️</span>` : '';

    html += `<div class="${cc}"><div class="task-info"><div class="task-name">${task.name}<span class="task-priority ${pc}">${pri}</span></div><div class="task-deadline">截止：${formatTime(task.deadline)}</div>${cdHtml}${subHtml}</div><span class="status-tag ${sc}">${task.status}</span>${act}${del}</div>`;
  });
  listEl.innerHTML = html;
}

function addTestTask() {
  const names = ['数学练习', '语文阅读', '英语听力', '科学实验', '历史复习', '地理作业'];
  const pris = ['高', '中', '低'];
  appData.tasks.push({
    id: Date.now(), name: names[Math.floor(Math.random()*names.length)] + '任务',
    deadline: Date.now() + (2 + Math.floor(Math.random()*22)) * 3600000,
    status: '未开始', priority: pris[Math.floor(Math.random()*3)],
    submission: null, submittedAt: null, aiComment: null
  });
  saveData(); renderTaskList(); showToast('已添加测试任务', 'info');
}

function updateTaskStatuses() {
  let changed = false; const now = Date.now();
  appData.tasks.forEach(t => {
    if ((t.status === '未开始' || t.status === '进行中') && now > t.deadline) { t.status = '已逾期'; changed = true; }
    else if (t.status === '未开始') { t.status = '进行中'; changed = true; }
    if (t.status === '已逾期' && !t.overduePenaltyApplied && (now - t.deadline) / 3600000 >= 24) {
      appData.groupCoins = Math.max(0, appData.groupCoins - 25);
      appData.healthValue = Math.max(0, appData.healthValue - 20);
      t.overduePenaltyApplied = true; t.overdue24Applied = true; changed = true;
      showToast('有任务逾期超过24小时，金币-25，健康值-20', 'error');
    }
  });
  if (changed) saveData();
}

function deleteTask(id) {
  const i = appData.tasks.findIndex(t => t.id === id);
  if (i === -1) return;
  if (appData.tasks[i].status === '已提交') { showToast('已提交的任务无法删除', 'warning'); return; }
  appData.tasks.splice(i, 1); saveData(); renderTaskList(); showToast('任务已删除', 'info');
}

function batchCompleteTasks() {
  let count = 0; const os = getStage(appData.growthValue);
  appData.tasks.forEach(t => {
    if (t.status === '未开始' || t.status === '进行中') {
      t.status = '已提交'; t.submittedAt = Date.now();
      t.aiComment = AI_COMMENTS[Math.floor(Math.random()*AI_COMMENTS.length)];
      appData.growthValue += 3; appData.groupCoins += 10; appData.totalCoinsEarned += 10;
      updateDailyStat('tasksCompleted', 1); updateDailyStat('growthGained', 3);
      updateDailyStat('coinsGained', 10); updateDailyStat('studyMinutes', 15);
      count++;
    }
  });
  if (count > 0) {
    checkStageEvolution(os); checkAchievements(); saveData(); renderTaskList();
    showToast(`已批量完成 ${count} 个任务！`, 'success');
  }
}

function openSubmitModal(id) {
  currentSubmitTaskId = id; selectedFiles = [];
  document.getElementById('submit-text').value = '';
  document.getElementById('file-name-display').textContent = '📎 点击或拖拽文件';
  document.getElementById('submit-modal').style.display = 'flex';
}

function closeSubmitModal() {
  document.getElementById('submit-modal').style.display = 'none';
  currentSubmitTaskId = null; selectedFiles = [];
}

function submitTask() {
  const task = appData.tasks.find(t => t.id === currentSubmitTaskId);
  if (!task) return;
  const wasOD = task.status === '已逾期', wasOD24 = task.overdue24Applied;
  const os = getStage(appData.growthValue);
  const suitEffect = getSuitEffect();

  task.status = '已提交';
  task.submission = { text: document.getElementById('submit-text').value.trim(), fileNames: selectedFiles.length > 0 ? [...selectedFiles] : null };
  task.submittedAt = Date.now();
  task.aiComment = AI_COMMENTS[Math.floor(Math.random()*AI_COMMENTS.length)];

  if (!wasOD) {
    const growth = Math.round(3 * suitEffect.growthMultiplier);
    const coins = Math.round(10 * suitEffect.coinMultiplier);
    appData.growthValue += growth; 
    appData.groupCoins += coins; 
    appData.totalCoinsEarned += coins;
    updateDailyStat('tasksCompleted', 1); updateDailyStat('growthGained', growth);
    updateDailyStat('coinsGained', coins); updateDailyStat('studyMinutes', 15);
    
    let toastMsg = `按时提交成功！成长值+${growth}，金币+${coins}`;
    if (suitEffect.growthMultiplier > 1 || suitEffect.coinMultiplier > 1) {
      toastMsg += ' 🌟 套装加成生效！';
    }
    showToast(toastMsg, 'success');
  } else if (wasOD24) {
    const healthBonus = 8 + (suitEffect.healthBonus || 0);
    appData.healthValue = Math.min(100, appData.healthValue + healthBonus);
    updateDailyStat('tasksCompleted', 1);
    showToast(`补交完成，健康值+${healthBonus}`, 'warning');
  } else {
    appData.groupCoins = Math.max(0, appData.groupCoins - 15);
    appData.healthValue = Math.max(0, appData.healthValue - 10);
    const healthBonus = 8 + (suitEffect.healthBonus || 0);
    appData.healthValue = Math.min(100, appData.healthValue + healthBonus);
    updateDailyStat('tasksCompleted', 1);
    showToast(`逾期提交，金币-15，健康值-10，补交恢复+${healthBonus}`, 'warning');
  }

  updateConsecutiveDays();
  updateNoOverdueDays();
  addPetDiaryEntry(`完成了一个任务「${task.name}」，获得了成长值！`);
  checkStageEvolution(os); checkHealthEvents(); checkAchievements();
  saveData(); closeSubmitModal(); renderTaskList(); updateSidebar(); updateStudentCard();
}

function updateConsecutiveDays() {
  const today = getTodayKey();
  if (!appData.lastActiveDate) { appData.consecutiveDays = 1; }
  else {
    const diff = Math.floor((new Date(today) - new Date(appData.lastActiveDate)) / 86400000);
    appData.consecutiveDays = diff === 1 ? appData.consecutiveDays + 1 : diff > 1 ? 1 : appData.consecutiveDays;
  }
  appData.lastActiveDate = today;
}

function updateNoOverdueDays() {
  const today = getTodayKey();
  
  // 检查今天是否有逾期任务
  const hasOverdue = appData.tasks.some(t => {
    if (t.deadline && t.deadline < Date.now() && t.status !== '已提交') {
      return true;
    }
    return false;
  });
  
  // 如果今天没有逾期任务，且还未记录过今日
  if (!hasOverdue && appData.lastNoOverdueDate !== today) {
    appData.noOverdueDays++;
    appData.lastNoOverdueDate = today;
    addPetDiaryEntry(`又完成了一天无逾期！累计 ${appData.noOverdueDays} 天啦～`);
    checkAchievements();
  }
}

function addPetDiaryEntry(text) {
  appData.petDiary.unshift({ text, time: Date.now() });
  if (appData.petDiary.length > 20) appData.petDiary.pop();
}

function checkStageEvolution(os) {
  const ns = getStage(appData.growthValue);
  if (ns !== os) {
    appData.evolutionHistory.push({ stage: ns, time: Date.now() });
    addPetDiaryEntry(`进化到了${ns}！太棒了！`);
    showCelebration(`恭喜！你的宠物进化到${ns}啦！`);
  }
  const nv = getNextStageValue(appData.growthValue);
  if (nv - appData.growthValue <= 10 && nv - appData.growthValue > 0) showToast('宠物即将进化！再努力一点！', 'info');
}

function checkHealthEvents() {
  if (appData.healthValue < 30) {
    const el = Date.now() - (appData.lastHealthWarning || 0);
    if (el > 60000 || !appData.lastHealthWarning) { appData.lastHealthWarning = Date.now(); showToast('宠物健康值过低，状态不佳！', 'error'); }
  }
  if (appData.healthValue >= 50 && appData.lastHealthWarning && (!appData.lastHealthRecovery || appData.lastHealthRecovery < appData.lastHealthWarning)) {
    appData.lastHealthRecovery = Date.now(); showToast('宠物状态已恢复正常！', 'success');
  }
}

function renderPetPage() {
  const nj = document.getElementById('pet-not-joined'), js = document.getElementById('pet-joined-section');
  if (!appData.classJoined) { nj.style.display = 'flex'; js.style.display = 'none'; return; }
  nj.style.display = 'none'; js.style.display = 'flex';

  const g = GROUPS[appData.groupIndex], stage = getStage(appData.growthValue), mood = getMood(appData.healthValue);
  const nv = getNextStageValue(appData.growthValue), gp = Math.min(100, (appData.growthValue / nv) * 100);

  const petImgHTML = getPetImageHTML(mood, 290);
  if (petImgHTML) {
    const wn = appData.wornItems.map(id => { const it = SHOP_ITEMS.find(s => s.id === id); return it ? it.name : ''; }).filter(Boolean);
    const labelsHTML = wn.length > 0 ? `<div style="position:absolute;bottom:5px;left:50%;transform:translateX(-50%);text-align:center">${wn.map(n=>`<div style="font-size:9px;color:#fa8c16;font-weight:bold">[${n}]</div>`).join('')}</div>` : '';
    document.getElementById('pet-display').innerHTML = `<div style="position:relative;display:inline-block">${petImgHTML}${labelsHTML}</div>`;
  } else {
    document.getElementById('pet-display').innerHTML = generatePetSVG(g.petName, mood, stage, appData.wornItems, 190, false);
  }
  const wn = appData.wornItems.map(id => { const it = SHOP_ITEMS.find(s => s.id === id); return it ? it.name : ''; }).filter(Boolean);
  document.getElementById('pet-name-label').innerHTML = `<div style="font-weight:700;color:#165DFF">${getPetDisplayName(appData.selectedPet || g.petName)}</div><div style="font-size:11px;color:#888">${stage}</div>${wn.length > 0 ? `<div style="font-size:10px;color:#fa8c16;margin-top:2px">${wn.map(n=>`[${n}]`).join(' ')}</div>` : ''}`;
  document.getElementById('pet-name').textContent = `${g.name}的${getPetDisplayName(appData.selectedPet || g.petName)}`;

  const hbc = appData.healthValue >= 50 ? 'pf-health-good' : appData.healthValue >= 30 ? 'pf-health-warn' : 'pf-health-low';
  const ne = nv - appData.growthValue <= 10 && nv - appData.growthValue > 0;
  document.getElementById('pet-stats-card').innerHTML = `<div class="stat-row"><span class="stat-label">成长值</span><div class="progress-bar"><div class="progress-fill pf-growth" style="width:${gp}%"></div></div><span class="stat-value">${appData.growthValue}/${nv}</span></div>${ne ? '<div style="font-size:11px;color:#fa8c16;text-align:center;margin-bottom:6px">⚡ 即将进化！</div>' : ''}<div class="stat-row"><span class="stat-label">健康值</span><div class="progress-bar"><div class="progress-fill ${hbc}" style="width:${appData.healthValue}%"></div></div><span class="stat-value">${appData.healthValue}/100</span></div><div class="stat-row"><span class="stat-label">情绪</span><span class="stat-value">${getMoodEmoji(mood)} ${mood}</span></div>${appData.healthValue < 30 ? '<div class="health-warn">⚠️ 健康值过低！无法进化和穿戴稀有装扮</div>' : ''}<div style="font-size:11px;color:#888;margin-top:6px">${appData.healthValue >= 80 ? '😊 宠物心情很好，精力充沛！' : appData.healthValue >= 50 ? '😐 宠物状态正常，继续加油！' : appData.healthValue >= 30 ? '😔 宠物有些低落，注意按时完成任务哦' : '😢 宠物非常委屈！请尽快完成任务恢复健康'}</div>`;

  document.getElementById('evolution-list').innerHTML = appData.evolutionHistory.length > 0 ? appData.evolutionHistory.map(e => `<div class="evo-item">🔄 ${formatTime(e.time)} — 进化到 <b>${e.stage}</b></div>`).join('') : '<div class="evo-item" style="color:#bbb">暂无进化记录</div>';
  document.getElementById('diary-list').innerHTML = appData.petDiary.length > 0 ? appData.petDiary.slice(0, 10).map(d => `<div class="diary-item">📖 ${formatTime(d.time)} — ${d.text}</div>`).join('') : '<div class="diary-item" style="color:#bbb">暂无日记</div>';

  const rankSeed = new Date().getFullYear() * 10000 + (new Date().getMonth() + 1) * 100 + new Date().getDate();
  const ag = GROUPS.map((gr, i) => {
    const mockGrowth = i === appData.groupIndex ? appData.growthValue : ((rankSeed * (i + 7) * 13) % 60) + 20;
    return { name: gr.name, petName: gr.petName, growth: mockGrowth, stage: i === appData.groupIndex ? stage : getStage(mockGrowth) };
  }).sort((a, b) => b.growth - a.growth);
  document.getElementById('pet-rank-list').innerHTML = ag.map((gr, i) => `<div class="rank-item"><div class="rank-num ${i===0?'r1':''} ${i===1?'r2':''}">${i+1}</div><span>${gr.petName}</span><span style="flex:1"></span><span style="font-size:11px;color:#888">${gr.stage}</span><span style="font-size:11px;color:#165DFF;font-weight:600;margin-left:8px">${gr.growth}</span></div>`).join('');
}

function petInteract(type) {
  const el = document.getElementById('pet-speech');
  const msgs = type === 'pat' ? ['好舒服～','嘿嘿，再摸摸～','开心！','谢谢你～','好喜欢！'] : ['你好呀！','今天也要加油哦！','嗨！一起学习吧～','欢迎回来！','加油！你可以的～'];
  el.textContent = msgs[Math.floor(Math.random()*msgs.length)];
  el.style.display = 'block';
  const pd = document.getElementById('pet-display');
  pd.style.transform = 'scale(1.05)';
  setTimeout(() => { pd.style.transform = 'scale(1)'; }, 300);
  clearTimeout(petSpeechTimer);
  petSpeechTimer = setTimeout(() => { el.style.display = 'none'; }, 3000);
  
  if (appData.healthValue < 100) { 
    const suitEffect = getSuitEffect();
    const healthBonus = 1 + (suitEffect.healthBonus ? Math.round(suitEffect.healthBonus / 5) : 0); // 套装效果按比例
    appData.healthValue = Math.min(100, appData.healthValue + healthBonus); 
    saveData();
    if (appData.classJoined) { renderPetPage(); }
  }
}

function renderShopPage() {
  document.getElementById('shop-coins').textContent = appData.groupCoins;
  const cats = ['全部','头饰','服装','特效','背景'];
  document.getElementById('shop-tabs').innerHTML = cats.map(c => `<div class="shop-tab ${currentShopCategory===c?'active':''}" onclick="switchShopCategory('${c}')">${c}</div>`).join('');
  const filtered = currentShopCategory === '全部' ? SHOP_ITEMS : SHOP_ITEMS.filter(i => i.category === currentShopCategory);
  const sb = checkSuitBonus();

  document.getElementById('shop-grid').innerHTML = filtered.map(item => {
    const owned = appData.ownedItems.includes(item.id), worn = appData.wornItems.includes(item.id);
    const rc = item.rarity === '史诗' ? 't-epic' : item.rarity === '稀有' ? 't-rare' : 't-normal';
    const bg = item.rarity === '史诗' ? '#f9f0ff' : item.rarity === '稀有' ? '#fff7e6' : '#e6f7ff';
    const cantBuy = item.rarity !== '普通' && appData.healthValue < 30;

    let btn = '';
    if (owned && worn) btn = `<button class="btn-owned">已拥有</button><button class="btn btn-sm btn-outline btn-wear" onclick="unwearItem(${item.id})">卸下</button>`;
    else if (owned) btn = `<button class="btn-owned">已拥有</button><button class="btn btn-sm btn-wear" onclick="wearItem(${item.id})">穿戴</button>`;
    else if (cantBuy) btn = `<button class="btn btn-sm" style="background:#ff7875" onclick="showToast('宠物健康值不足，无法兑换${item.rarity}装扮','error')">兑换</button>`;
    else btn = `<button class="btn btn-sm" onclick="buyItem(${item.id})">兑换</button>`;

    return `<div class="shop-item" onmouseenter="previewItem(${item.id})" onmouseleave="clearPreview()"><div class="si-img" style="background:${bg}">${item.emoji}</div><div class="si-name">${item.name}</div><span class="si-type ${rc}">${item.rarity}</span><div class="si-price">💰 ${item.price}</div>${btn}</div>`;
  }).join('') + (sb ? `<div class="shop-item" style="grid-column:span 2;background:#fffbe6;border:1px solid #ffe58f"><div style="font-size:24px">${sb.bonus}</div><div class="si-name">${sb.name}</div><div style="font-size:10px;color:#fa8c16">套装效果已激活！</div></div>` : '');
}

function switchShopCategory(c) { currentShopCategory = c; renderShopPage(); }

function previewItem(id) {
  if (!appData.classJoined) return;
  const g = GROUPS[appData.groupIndex];
  const pd = document.getElementById('pet-display');
  if (!pd) return;
  const mood = getMood(appData.healthValue);
  const petImgHTML = getPetImageHTML(mood, 290);
  if (petImgHTML) {
    const si = SHOP_ITEMS.find(x => x.id === id);
    const labelHTML = si ? `<div style="position:absolute;bottom:5px;left:50%;transform:translateX(-50%);text-align:center"><div style="font-size:9px;color:#fa8c16;font-weight:bold">[${si.name}]</div></div>` : '';
    pd.innerHTML = `<div style="position:relative;display:inline-block">${petImgHTML}${labelHTML}</div>`;
  } else {
    pd.innerHTML = generatePetSVG(g.petName, mood, getStage(appData.growthValue), [...appData.wornItems, id], 280, false);
  }
}

function clearPreview() {
  if (!appData.classJoined) return;
  const g = GROUPS[appData.groupIndex];
  const pd = document.getElementById('pet-display');
  if (!pd) return;
  const mood = getMood(appData.healthValue);
  const petImgHTML = getPetImageHTML(mood, 290);
  if (petImgHTML) {
    const wn = appData.wornItems.map(id => { const it = SHOP_ITEMS.find(s => s.id === id); return it ? it.name : ''; }).filter(Boolean);
    const labelsHTML = wn.length > 0 ? `<div style="position:absolute;bottom:5px;left:50%;transform:translateX(-50%);text-align:center">${wn.map(n=>`<div style="font-size:9px;color:#fa8c16;font-weight:bold">[${n}]</div>`).join('')}</div>` : '';
    pd.innerHTML = `<div style="position:relative;display:inline-block">${petImgHTML}${labelsHTML}</div>`;
  } else {
    pd.innerHTML = generatePetSVG(g.petName, mood, getStage(appData.growthValue), appData.wornItems, 280, false);
  }
}

function buyItem(id) {
  const item = SHOP_ITEMS.find(s => s.id === id);
  if (!item) return;
  if (appData.ownedItems.includes(id)) { showToast('已拥有该装扮', 'warning'); return; }
  if (item.rarity !== '普通' && appData.healthValue < 30) { showToast(`宠物健康值不足，无法兑换${item.rarity}装扮`, 'error'); return; }
  if (appData.groupCoins < item.price) { showToast('小组金币不足，无法兑换', 'error'); return; }
  appData.groupCoins -= item.price; appData.ownedItems.push(id);
  addPetDiaryEntry(`兑换了装扮「${item.name}」！`);
  checkAchievements(); saveData(); renderShopPage();
  showToast(`成功兑换「${item.name}」！`, 'success');
}

function wearItem(id) {
  const item = SHOP_ITEMS.find(s => s.id === id);
  if (!item) return;
  const existing = appData.wornItems.find(wid => { const si = SHOP_ITEMS.find(s => s.id === wid); return si && si.category === item.category; });
  if (existing) appData.wornItems = appData.wornItems.filter(wid => wid !== existing);
  appData.wornItems.push(id); saveData(); renderShopPage(); renderPetPage();
  showToast(`已穿戴「${item.name}」`, 'success');
}

function unwearItem(id) {
  const item = SHOP_ITEMS.find(s => s.id === id);
  appData.wornItems = appData.wornItems.filter(wid => wid !== id);
  saveData(); renderShopPage(); renderPetPage();
  showToast(`已卸下「${item.name}」`, 'info');
}

function checkSuitBonus() {
  for (const suit of SUITS) { 
    // 需要同时拥有并穿着所有套装物品
    if (suit.items.every(id => appData.ownedItems.includes(id) && appData.wornItems.includes(id))) {
      return suit; 
    }
  }
  return null;
}

function getSuitEffect() {
  const suit = checkSuitBonus();
  return suit ? suit.effect : { growthMultiplier: 1, coinMultiplier: 1, healthBonus: 0 };
}

function renderDataPage() {
  const ts = appData.dailyStats[getTodayKey()] || { tasksCompleted: 0, growthGained: 0, coinsGained: 0, studyMinutes: 0 };
  document.getElementById('data-today-cards').innerHTML = `<div class="sc-item sc-blue"><div class="sc-val">${ts.tasksCompleted}</div><div class="sc-lbl">今日完成</div></div><div class="sc-item sc-green"><div class="sc-val">${ts.growthGained}</div><div class="sc-lbl">今日成长</div></div><div class="sc-item sc-orange"><div class="sc-val">${ts.coinsGained}</div><div class="sc-lbl">今日金币</div></div><div class="sc-item"><div class="sc-val" style="color:#722ed1">${ts.studyMinutes}</div><div class="sc-lbl">学习时长(分)</div></div>`;

  const labels = [], taskData = [], growthData = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    labels.push(`${d.getMonth()+1}/${d.getDate()}`);
    const st = appData.dailyStats[key];
    taskData.push(st ? st.tasksCompleted : 0);
    growthData.push(st ? st.growthGained : 0);
  }
  drawLineChart('chart-tasks', taskData, labels);
  drawBarChart('chart-growth', growthData, labels);

  const total = appData.tasks.length || 1, comp = appData.tasks.filter(t => t.status === '已提交').length;
  document.getElementById('study-analysis').innerHTML = `<div class="analysis-item"><span class="al-label">任务完成率</span><span class="al-value">${Math.round(comp/total*100)}%</span></div><div class="analysis-item"><span class="al-label">平均完成时间</span><span class="al-value">${comp > 0 ? 25 : 0}分钟</span></div><div class="analysis-item"><span class="al-label">最擅长类型</span><span class="al-value">${comp > 0 ? '数学' : '-'}</span></div><div class="analysis-item"><span class="al-label">累计成长值</span><span class="al-value">${appData.growthValue}</span></div><div class="analysis-item"><span class="al-label">累计金币</span><span class="al-value">${appData.totalCoinsEarned}</span></div><div class="analysis-item"><span class="al-label">已订错题</span><span class="al-value">${appData.totalMistakesCorrected}</span></div>`;
  
  const availableMistakes = MISTAKES.filter(m => !appData.correctedMistakes?.includes(m.id));
  if (availableMistakes.length === 0) {
    document.getElementById('mistake-list').innerHTML = `<div style="text-align:center;color:#999;padding:20px;">🎉 太棒了！所有错题都已订正！</div>`;
  } else {
    document.getElementById('mistake-list').innerHTML = availableMistakes.map(m => `
      <div class="mistake-item">
        <div class="mk-q">${m.question}</div>
        <div class="mk-a">❌ 你的答案：${m.wrongAnswer} → 原因：${m.reason}</div>
        <div class="mk-s">✅ 正确答案：${m.correctAnswer} → ${m.suggestion}</div>
        <div style="margin-top:8px;"><button class="btn btn-sm" onclick="correctMistake(${m.id})">📝 我已订正对这道题</button></div>
      </div>
    `).join('');
  }
}

function drawLineChart(cid, data, labels) {
  const canvas = document.getElementById(cid); if (!canvas) return;
  const ctx = canvas.getContext('2d'), W = canvas.width, H = canvas.height;
  const pad = { top: 20, right: 15, bottom: 28, left: 35 };
  const cW = W - pad.left - pad.right, cH = H - pad.top - pad.bottom;
  ctx.clearRect(0, 0, W, H);
  const maxV = Math.max(...data, 1), grid = 4;

  ctx.strokeStyle = '#f0f0f0'; ctx.lineWidth = 1;
  for (let i = 0; i <= grid; i++) { const y = pad.top + (cH / grid) * i; ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(W - pad.right, y); ctx.stroke(); }

  if (data.length < 2) return;
  const step = cW / (data.length - 1);

  ctx.beginPath(); ctx.moveTo(pad.left, pad.top + cH);
  data.forEach((v, i) => ctx.lineTo(pad.left + step * i, pad.top + cH - (v / maxV) * cH));
  ctx.lineTo(pad.left + step * (data.length - 1), pad.top + cH);
  ctx.closePath(); ctx.fillStyle = 'rgba(22,93,255,0.1)'; ctx.fill();

  ctx.beginPath();
  data.forEach((v, i) => { const x = pad.left + step * i, y = pad.top + cH - (v / maxV) * cH; i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); });
  ctx.strokeStyle = '#165DFF'; ctx.lineWidth = 2; ctx.stroke();

  data.forEach((v, i) => { ctx.beginPath(); ctx.arc(pad.left + step * i, pad.top + cH - (v / maxV) * cH, 3, 0, Math.PI * 2); ctx.fillStyle = '#165DFF'; ctx.fill(); });

  ctx.fillStyle = '#999'; ctx.font = '9px Microsoft YaHei'; ctx.textAlign = 'center';
  labels.forEach((l, i) => ctx.fillText(l, pad.left + step * i, H - 5));
  ctx.textAlign = 'right';
  for (let i = 0; i <= grid; i++) ctx.fillText(Math.round(maxV * (grid - i) / grid), pad.left - 4, pad.top + (cH / grid) * i + 3);
}

function drawBarChart(cid, data, labels) {
  const canvas = document.getElementById(cid); if (!canvas) return;
  const ctx = canvas.getContext('2d'), W = canvas.width, H = canvas.height;
  const pad = { top: 20, right: 15, bottom: 28, left: 35 };
  const cW = W - pad.left - pad.right, cH = H - pad.top - pad.bottom;
  ctx.clearRect(0, 0, W, H);
  const maxV = Math.max(...data, 1), grid = 4;

  ctx.strokeStyle = '#f0f0f0'; ctx.lineWidth = 1;
  for (let i = 0; i <= grid; i++) { const y = pad.top + (cH / grid) * i; ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(W - pad.right, y); ctx.stroke(); }

  const gw = cW / data.length, bw = gw * 0.5;
  data.forEach((v, i) => {
    const x = pad.left + gw * i + (gw - bw) / 2, bh = (v / maxV) * cH, y = pad.top + cH - bh;
    if (bh > 0) {
      const gr = ctx.createLinearGradient(x, y, x, pad.top + cH);
      gr.addColorStop(0, '#165DFF'); gr.addColorStop(1, '#4080FF'); ctx.fillStyle = gr;
      const r = Math.min(3, bw / 2, bh / 2);
      ctx.beginPath(); ctx.moveTo(x + r, y); ctx.lineTo(x + bw - r, y); ctx.quadraticCurveTo(x + bw, y, x + bw, y + r); ctx.lineTo(x + bw, pad.top + cH); ctx.lineTo(x, pad.top + cH); ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y); ctx.fill();
    }
  });

  ctx.fillStyle = '#999'; ctx.font = '9px Microsoft YaHei'; ctx.textAlign = 'center';
  labels.forEach((l, i) => ctx.fillText(l, pad.left + gw * i + gw / 2, H - 5));
  ctx.textAlign = 'right';
  for (let i = 0; i <= grid; i++) ctx.fillText(Math.round(maxV * (grid - i) / grid), pad.left - 4, pad.top + (cH / grid) * i + 3);
}

function renderAchievePage() {
  const cats = ['全部','学习达人','坚持之星','团队贡献'];
  document.getElementById('achieve-tabs').innerHTML = cats.map(c => `<div class="achieve-tab ${currentAchieveCategory===c?'active':''}" onclick="switchAchieveCategory('${c}')">${c}</div>`).join('');
  const filtered = currentAchieveCategory === '全部' ? ACHIEVEMENTS : ACHIEVEMENTS.filter(a => a.category === currentAchieveCategory);
  document.getElementById('achieve-grid').innerHTML = filtered.map(a => {
    const ul = appData.achievements.includes(a.id);
    return `<div class="achieve-item ${ul ? '' : 'locked'}"><div class="ai-icon">${a.icon}</div><div class="ai-info"><div class="ai-name">${a.name}</div><div class="ai-desc">${a.desc}</div><div class="ai-reward">奖励：💰 ${a.reward}</div>${ul ? '<div class="ai-done">✅ 已达成</div>' : ''}</div></div>`;
  }).join('');
}

function switchAchieveCategory(c) { currentAchieveCategory = c; renderAchievePage(); }

function checkAchievements() {
  const ct = appData.tasks.filter(t => t.status === '已提交').length;
  const checks = {
    first_learn: ct >= 1, streak_7: appData.consecutiveDays >= 7,
    growth_100: appData.growthValue >= 100, team_50: appData.growthValue >= 50,
    bug_10: appData.totalMistakesCorrected >= 10, coins_500: appData.totalCoinsEarned >= 500,
    dress_5: appData.ownedItems.length >= 5, evolve_master: getStage(appData.growthValue) === '成熟期',
    group_champ: getGroupRank() === 1, perfect_month: appData.noOverdueDays >= 30
  };
  let nw = false;
  for (const [id, cond] of Object.entries(checks)) {
    if (cond && !appData.achievements.includes(id)) {
      appData.achievements.push(id);
      const a = ACHIEVEMENTS.find(x => x.id === id);
      if (a) { appData.groupCoins += a.reward; appData.totalCoinsEarned += a.reward; addPetDiaryEntry(`达成成就「${a.name}」！获得${a.reward}金币！`); showCelebration(`🏆 达成成就：${a.name}！`); }
      nw = true;
    }
  }
  if (nw) saveData();
}

let aiChatHistory = [];
let aiIsStreaming = false;
let aiKeyAvailable = false;
const aiStreamCallbacks = { onChunk: null, onDone: null };

function buildAISystemPrompt() {
  const ts = appData.dailyStats[getTodayKey()] || { tasksCompleted: 0, growthGained: 0 };
  const completedTasks = appData.tasks.filter(t => t.status === '已提交');
  const pendingTasks = appData.tasks.filter(t => t.status !== '已提交' && t.status !== '已逾期');
  const overdueTasks = appData.tasks.filter(t => t.status === '已逾期');
  const achievementNames = appData.achievements.map(id => {
    const a = ACHIEVEMENTS.find(x => x.id === id);
    return a ? a.name : id;
  });
  const wornNames = appData.wornItems.map(id => {
    const it = SHOP_ITEMS.find(s => s.id === id);
    return it ? it.name : '';
  }).filter(Boolean);

  let prompt = `你是"梦幻口袋"学习激励桌宠系统的专属智能助手。你的名字叫"小梦"。

你需要完全了解以下系统功能：
1. 桌宠系统：用户可以选择不同的桌宠形象（男孩boy、女孩girl、宝贝baby），与桌宠互动，通过完成任务提升桌宠的成长值和等级
2. 任务系统：用户可以提交每日任务，完成后获得金币和成长值
3. 成就系统：用户完成特定目标可以解锁成就，获得金币奖励
4. 装扮商城：用户可以用金币购买饰品（头饰、服装、特效、背景），装扮自己的桌宠
5. 班级系统：用户可以加入班级，与同学一起学习，查看小组排名

你可以获取用户的以下数据：
- 用户名称：${appData.studentName}
- 当前桌宠：${getPetDisplayName(appData.selectedPet || '未选择')}
- 金币数量：${appData.groupCoins}
- 成长值：${appData.growthValue}（阶段：${getStage(appData.growthValue)}）
- 健康值：${appData.healthValue}
- 已解锁成就（${achievementNames.length}个）：${achievementNames.length > 0 ? achievementNames.join('、') : '暂无'}
- 今日已完成任务：${ts.tasksCompleted}个
- 待完成任务：${pendingTasks.length}个
- 逾期任务：${overdueTasks.length}个
- 班级排名：第${appData.classJoined ? getGroupRank() : '-'}名
- 已穿戴饰品：${wornNames.length > 0 ? wornNames.join('、') : '暂无'}
- 连续打卡天数：${appData.consecutiveDays}天
- 已订正错题：${appData.totalMistakesCorrected}道

请用亲切友好的语气与用户对话，帮助用户了解和使用系统功能，鼓励用户学习。回答要简洁明了，不要使用技术术语。回复控制在200字以内。`;

  return prompt;
}

function renderAIPage() {
  const container = document.getElementById('aiMessages');
  if (!container) return;

  if (aiChatHistory.length === 0) {
    container.innerHTML = `
      <div class="ai-welcome">
        <div class="ai-welcome-icon">🤖</div>
        <p>你好呀！我是小梦，你的学习小助手~</p>
        <p>有什么想问的尽管告诉我吧！</p>
        <div class="ai-suggestions">
          <button class="btn" onclick="sendAISuggestion('我现在的学习状态怎么样？')">我的学习状态</button>
          <button class="btn" onclick="sendAISuggestion('怎么提升桌宠的等级？')">提升等级攻略</button>
          <button class="btn" onclick="sendAISuggestion('有哪些成就可以解锁？')">成就解锁指南</button>
          <button class="btn" onclick="sendAISuggestion('给我一些学习建议')">学习建议</button>
        </div>
      </div>`;
  }
}

function sendAISuggestion(text) {
  document.getElementById('aiInput').value = text;
  sendAIMessage();
}

function sendAIMessage() {
  const input = document.getElementById('aiInput');
  const text = input.value.trim();
  if (!text || aiIsStreaming) return;
  input.value = '';

  const container = document.getElementById('aiMessages');
  const welcomeEl = container.querySelector('.ai-welcome');
  if (welcomeEl) welcomeEl.remove();

  appendAIMsg('user', text);
  aiChatHistory.push({ role: 'user', content: text });

  const thinkingId = appendAIMsg('ai', '', true);

  const messages = [
    { role: 'system', content: buildAISystemPrompt() },
    ...aiChatHistory.slice(-10)
  ];

  aiIsStreaming = true;
  let fullContent = '';
  let currentThinkingId = thinkingId;

  aiStreamCallbacks.onChunk = (chunk) => {
    if (chunk.startsWith('[error]')) {
      const thinkingEl = document.getElementById(currentThinkingId);
      if (thinkingEl) {
        const body = thinkingEl.querySelector('.ai-msg-body');
        if (body) body.innerHTML = chunk.replace('[error] ', '');
      }
      return;
    }
    fullContent += chunk;
    const thinkingEl = document.getElementById(currentThinkingId);
    if (thinkingEl) {
      const body = thinkingEl.querySelector('.ai-msg-body');
      if (body) {
        body.innerHTML = fullContent.replace(/\n/g, '<br>');
        body.classList.remove('thinking');
      }
    }
    container.scrollTop = container.scrollHeight;
  };

  aiStreamCallbacks.onDone = () => {
    aiIsStreaming = false;
    if (fullContent) {
      aiChatHistory.push({ role: 'assistant', content: fullContent });
    }
    const thinkingEl = document.getElementById(currentThinkingId);
    if (thinkingEl) {
      const body = thinkingEl.querySelector('.ai-msg-body');
      if (body) body.classList.remove('thinking');
      if (!fullContent) {
        body.textContent = '抱歉，我现在有点累了，稍后再试试吧~';
      }
    }
    try {
      localStorage.setItem('aiChatHistory', JSON.stringify(aiChatHistory.slice(-20)));
    } catch(e) {}
  };

  window.electronAPI.aiChat(messages);
}

function appendAIMsg(role, text, isThinking) {
  const container = document.getElementById('aiMessages');
  const id = 'ai-msg-' + Date.now() + Math.random().toString(36).slice(2, 6);
  const avatar = role === 'ai' ? '🤖' : '👤';
  const cls = role === 'ai' ? 'ai' : 'user';
  const bodyClass = isThinking ? 'ai-msg-body thinking' : 'ai-msg-body';
  const displayText = isThinking ? '小梦正在思考...' : text.replace(/\n/g, '<br>');

  const div = document.createElement('div');
  div.className = `ai-msg ${cls}`;
  div.id = id;
  div.innerHTML = `<div class="ai-msg-avatar">${avatar}</div><div class="${bodyClass}">${displayText}</div>`;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
  return id;
}

function initAIChat() {
  try {
    const saved = localStorage.getItem('aiChatHistory');
    if (saved) aiChatHistory = JSON.parse(saved);
  } catch(e) {}

  document.getElementById('aiSendBtn').addEventListener('click', sendAIMessage);
  document.getElementById('aiInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendAIMessage();
  });

  window.electronAPI.onAiChatChunk((chunk) => {
    if (aiStreamCallbacks.onChunk) aiStreamCallbacks.onChunk(chunk);
  });
  window.electronAPI.onAiChatDone(() => {
    if (aiStreamCallbacks.onDone) aiStreamCallbacks.onDone();
  });

  window.electronAPI.aiCheckKey().then(available => {
    aiKeyAvailable = available;
    if (!available) {
      const container = document.getElementById('aiMessages');
      if (container) {
        container.innerHTML = `
          <div class="ai-welcome">
            <div class="ai-welcome-icon">⚠️</div>
            <p>智能助手暂未配置API Key</p>
            <p style="font-size:11px;color:#999;margin-top:8px">请设置环境变量 OPENAI_API_KEY 后重启应用</p>
          </div>`;
      }
    }
  });
}

function renderSettingsPage() {
  const s = appData.settings;
  document.getElementById('set-dark').checked = s.darkTheme;
  document.getElementById('set-opacity').value = s.petOpacity;
  document.getElementById('opacity-val').textContent = s.petOpacity + '%';
  document.getElementById('set-auto-move').checked = s.autoMove;
  document.getElementById('set-deadline-notify').checked = s.deadlineNotify;
  document.getElementById('set-pet-notify').checked = s.petNotify;
  document.body.classList.toggle('dark', s.darkTheme);
}

function exportData() { window.electronAPI.exportData(JSON.stringify(appData, null, 2)); }

function correctMistake(id) {
  if (!appData.correctedMistakes) appData.correctedMistakes = [];
  if (appData.correctedMistakes.includes(id)) {
    showToast('这道题已经订过啦！', 'info');
    return;
  }
  
  appData.correctedMistakes.push(id);
  appData.totalMistakesCorrected++;
  addPetDiaryEntry(`订正了一道错题，真棒！`);
  checkAchievements();
  saveData();
  renderDataPage();
  showToast('🎉 错题订正成功！', 'success');
}

function resetData() {
  if (!confirm('确定要重置所有数据吗？此操作不可恢复！')) return;
  localStorage.clear();
  appData = JSON.parse(JSON.stringify(DEFAULT_DATA));
  saveData(); window.electronAPI.hidePet(); switchTab(0);
  renderClassPage(); updateSidebar(); updateStudentCard();
  showToast('数据已重置，请重新加入班级', 'info');
}

function initNav() {
  document.querySelectorAll('.nav-item').forEach((item, index) => {
    item.addEventListener('click', () => switchTab(index));
  });
}

function initClassBinding() {
  document.getElementById('join-btn').addEventListener('click', joinClass);
  document.getElementById('invite-code').addEventListener('keypress', e => { if (e.key === 'Enter') joinClass(); });
}

function initTaskCenter() {
  document.getElementById('add-task-btn').addEventListener('click', addTestTask);
}

function initSubmitModal() {
  document.getElementById('modal-close').addEventListener('click', closeSubmitModal);
  document.getElementById('cancel-submit-btn').addEventListener('click', closeSubmitModal);
  document.getElementById('confirm-submit-btn').addEventListener('click', submitTask);

  const fa = document.getElementById('file-drop'), fi = document.getElementById('submit-file');
  fa.addEventListener('click', () => fi.click());
  fa.addEventListener('dragover', e => { e.preventDefault(); fa.classList.add('dragover'); });
  fa.addEventListener('dragleave', () => fa.classList.remove('dragover'));
  fa.addEventListener('drop', e => {
    e.preventDefault(); fa.classList.remove('dragover');
    if (e.dataTransfer.files.length > 0) {
      selectedFiles = Array.from(e.dataTransfer.files).map(f => f.name);
      document.getElementById('file-name-display').textContent = `📎 ${selectedFiles.join(', ')}`;
    }
  });
  fi.addEventListener('change', e => {
    if (e.target.files.length > 0) {
      selectedFiles = Array.from(e.target.files).map(f => f.name);
      document.getElementById('file-name-display').textContent = `📎 ${selectedFiles.join(', ')}`;
    }
  });
  document.getElementById('submit-modal').addEventListener('click', e => { if (e.target === document.getElementById('submit-modal')) closeSubmitModal(); });
}

function initNameModal() {
  const ne = document.getElementById('sc-name'), modal = document.getElementById('name-modal'), input = document.getElementById('new-name-input');
  ne.addEventListener('click', () => { input.value = appData.studentName; modal.style.display = 'flex'; });
  document.getElementById('name-modal-close').addEventListener('click', () => modal.style.display = 'none');
  document.getElementById('cancel-name-btn').addEventListener('click', () => modal.style.display = 'none');
  document.getElementById('confirm-name-btn').addEventListener('click', () => {
    const nn = input.value.trim();
    if (nn) { appData.studentName = nn; saveData(); updateSidebar(); updateStudentCard(); showToast('昵称修改成功', 'success'); }
    modal.style.display = 'none';
  });
  modal.addEventListener('click', e => { if (e.target === modal) modal.style.display = 'none'; });
}

function initPetControls() {
  document.getElementById('show-pet-btn').addEventListener('click', () => { window.electronAPI.showPet(); notifyPetUpdate(); showToast('桌宠已显示', 'info'); });
  document.getElementById('hide-pet-btn').addEventListener('click', () => { window.electronAPI.hidePet(); showToast('桌宠已隐藏', 'info'); });
}

function initSettings() {
  document.getElementById('set-dark').addEventListener('change', e => {
    appData.settings.darkTheme = e.target.checked;
    document.body.classList.toggle('dark', e.target.checked);
    saveData();
  });
  document.getElementById('set-opacity').addEventListener('input', e => {
    const v = parseInt(e.target.value);
    document.getElementById('opacity-val').textContent = v + '%';
    appData.settings.petOpacity = v;
    saveData();
  });
  document.getElementById('set-auto-move').addEventListener('change', e => { appData.settings.autoMove = e.target.checked; saveData(); });
  document.getElementById('set-deadline-notify').addEventListener('change', e => { appData.settings.deadlineNotify = e.target.checked; saveData(); });
  document.getElementById('set-pet-notify').addEventListener('change', e => { appData.settings.petNotify = e.target.checked; saveData(); });
  document.getElementById('export-btn').addEventListener('click', exportData);
  document.getElementById('reset-btn').addEventListener('click', resetData);
}

function initIPC() {
  window.electronAPI.onSwitchTab((idx) => switchTab(idx));
  window.electronAPI.onSyncPetOpacity((opacity) => {
    appData.settings.petOpacity = Math.round(opacity * 100);
    const slider = document.getElementById('set-opacity');
    if (slider) slider.value = appData.settings.petOpacity;
    const valEl = document.getElementById('opacity-val');
    if (valEl) valEl.textContent = appData.settings.petOpacity + '%';
    saveData();
  });
  window.electronAPI.onExportResult((success) => {
    showToast(success ? '数据导出成功' : '数据导出取消', success ? 'success' : 'info');
  });
}

function initAutoUpdate() {
  setInterval(() => {
    if (appData.classJoined && appData.tasks.length > 0) { 
      updateTaskStatuses(); 
      renderTaskList(); 
      updateNoOverdueDays(); 
    }
  }, 30000);

  setInterval(() => {
    if (appData.classJoined) {
      if (appData.settings.deadlineNotify) {
        appData.tasks.forEach(t => {
          if ((t.status === '进行中' || t.status === '未开始') && !t.reminded) {
            const cd = getCountdown(t.deadline);
            if (cd && cd.urgent && cd.hours === 0) { showToast('⏰ 你有一个任务即将截止！', 'warning'); t.reminded = true; }
          }
        });
      }
      
      // 宠物状态提醒
      if (appData.settings.petNotify && appData.healthValue < 30) {
        const el = Date.now() - (appData.lastHealthWarning || 0);
        if (el > 60000) { 
          appData.lastHealthWarning = Date.now(); 
          showToast('😢 桌宠健康值过低，快去完成任务恢复吧！', 'error'); 
        }
      }
    }
  }, 60000);
}

async function init() {
  try { loadData(); } catch(e) { console.error('loadData error:', e); }
  try { await loadAvailablePets(); } catch(e) { console.error('loadAvailablePets error:', e); }
  try { initNav(); } catch(e) { console.error('initNav error:', e); }
  try { initClassBinding(); } catch(e) { console.error('initClassBinding error:', e); }
  try { initTaskCenter(); } catch(e) { console.error('initTaskCenter error:', e); }
  try { initSubmitModal(); } catch(e) { console.error('initSubmitModal error:', e); }
  try { initNameModal(); } catch(e) { console.error('initNameModal error:', e); }
  try { initPetControls(); } catch(e) { console.error('initPetControls error:', e); }
  try { initSettings(); } catch(e) { console.error('initSettings error:', e); }
  try { initIPC(); } catch(e) { console.error('initIPC error:', e); }
  try { initAutoUpdate(); } catch(e) { console.error('initAutoUpdate error:', e); }
  try { initAIChat(); } catch(e) { console.error('initAIChat error:', e); }

  if (appData.classJoined) {
    // 如果用户已经加入班级，并且已经选择了桌宠，启动桌宠
    if (appData.selectedPet) {
      try { 
        window.electronAPI.startPet(appData.selectedPet); 
        notifyPetUpdate();
      } catch(e) { console.error('startPet error:', e); }
    }
    if (appData.settings.darkTheme) document.body.classList.add('dark');
  }

  switchTab(0);

  if (!appData.classJoined) {
    const joinSec = document.getElementById('class-join-section');
    const homeSec = document.getElementById('class-home-section');
    if (joinSec) joinSec.style.display = 'block';
    if (homeSec) homeSec.style.display = 'none';
  }

  try { updateSidebar(); } catch(e) { console.error('updateSidebar error:', e); }
  try { updateStudentCard(); } catch(e) { console.error('updateStudentCard error:', e); }
}

document.addEventListener('DOMContentLoaded', init);
