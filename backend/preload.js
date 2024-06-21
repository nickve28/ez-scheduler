const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld('api', {
    readDirectoryConfig: () => ipcRenderer.invoke('read-directory-config'),
    readAccountConfig: () => ipcRenderer.invoke('read-account-config')
});
