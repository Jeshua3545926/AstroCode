const { contextBridge, ipcRenderer } = require('electron');

// Exponer APIs seguras al renderer process
contextBridge.exposeInMainWorld('electronAPI', {
    // Archivos
    newFile: () => ipcRenderer.send('new-file'),
    openFile: () => ipcRenderer.send('open-file'),
    saveFile: () => ipcRenderer.send('save-file'),
    saveFileAs: (path) => ipcRenderer.send('save-file-as', path),
    
    // Eventos de archivo
    onFileOpened: (callback) => ipcRenderer.on('file-opened', callback),
    onFileSaved: (callback) => ipcRenderer.on('file-saved', callback),
    
    // Código
    runCode: () => ipcRenderer.send('run-code'),
    toggleTheme: () => ipcRenderer.send('toggle-theme'),
    
    // Sistema
    getAppVersion: () => ipcRenderer.invoke('get-app-version'),
    getPlatform: () => ipcRenderer.invoke('get-platform'),
    
    // Logs
    log: (message, type) => ipcRenderer.send('log', { message, type })
});

// Configuración para Monaco Editor en Electron
window.addEventListener('DOMContentLoaded', () => {
    // Configurar Monaco para funcionar en Electron
    window.monacoConfig = {
        paths: {
            vs: 'https://unpkg.com/monaco-editor@0.45.0/min/vs'
        }
    };
    
    // Permitir que Monaco cargue recursos externos
    if (window.require) {
        window.require.config({
            paths: {
                vs: 'https://unpkg.com/monaco-editor@0.45.0/min/vs'
            }
        });
    }
}); 