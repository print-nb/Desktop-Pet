const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  scanPets: () => ipcRenderer.invoke('scan-pets'),
  startPet: (petName) => ipcRenderer.send('start-pet', petName),
  sendPetDataUpdate: (data) => ipcRenderer.send('pet-data-update', data),
  showPet: () => ipcRenderer.send('show-pet'),
  hidePet: () => ipcRenderer.send('hide-pet'),
  exportData: (data) => ipcRenderer.send('export-data', data),
  onSwitchTab: (callback) => {
    ipcRenderer.on('switch-tab', (event, index) => callback(index));
  },
  onSyncPetOpacity: (callback) => {
    ipcRenderer.on('sync-pet-opacity', (event, opacity) => callback(opacity));
  },
  onExportResult: (callback) => {
    ipcRenderer.on('export-result', (event, success) => callback(success));
  },
  aiChat: (messages) => ipcRenderer.send('ai-chat', messages),
  onAiChatChunk: (callback) => {
    ipcRenderer.on('ai-chat-chunk', (event, chunk) => callback(chunk));
  },
  onAiChatDone: (callback) => {
    ipcRenderer.on('ai-chat-done', () => callback());
  },
  aiCheckKey: () => ipcRenderer.invoke('ai-check-key')
});
