const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld('api', {
    readDirectoryConfig: () => ipcRenderer.invoke('read-directory-config')
})