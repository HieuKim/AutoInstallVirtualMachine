const { contextBridge, ipcRenderer } = require('electron')

// contextBridge.exposeInMainWorld('darkMode', {
//   toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
//   system: () => ipcRenderer.invoke('dark-mode:system')
// })

contextBridge.exposeInMainWorld('OsInformation', {
    checkOS: () => ipcRenderer.invoke('Os-Information:checkOS'),
  })

contextBridge.exposeInMainWorld('OpenScript', {
    OpenShellFile: () => ipcRenderer.invoke('Open-Script:OpenShellFile'),
  })