const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('petWindowAPI', {
  onSetPet: (callback) => {
    ipcRenderer.on('set-pet', (event, petName) => callback(petName));
  },
  getPetEmotion: (petName, emotion) => ipcRenderer.invoke('get-pet-emotion', petName, emotion),
  scanPets: () => ipcRenderer.invoke('scan-pets'),
  movePet: (dx, dy) => ipcRenderer.send('move-pet', dx, dy),
  onUpdatePetData: (callback) => {
    ipcRenderer.on('update-pet-data', (event, data) => callback(data));
  },
  resizePet: (width, height) => ipcRenderer.send('resize-pet', width, height),
  setPetOpacity: (opacity) => ipcRenderer.send('set-pet-opacity', opacity),
  syncPetOpacity: (opacity) => ipcRenderer.send('sync-pet-opacity', opacity),
  togglePetTop: (isTop) => ipcRenderer.send('toggle-pet-top', isTop),
  switchPet: (petName) => ipcRenderer.send('switch-pet', petName),
  showPet: () => ipcRenderer.send('show-pet'),
  hidePet: () => ipcRenderer.send('hide-pet'),
  switchTab: (index) => ipcRenderer.send('switch-tab', index),
  quitApp: () => ipcRenderer.send('quit-app')
});
