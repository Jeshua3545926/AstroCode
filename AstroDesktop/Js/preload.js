const { contextBridge, ipcRenderer } = require('electron');

// Exponer APIs seguras al renderer process
contextBridge.exposeInMainWorld('electronAPI', {
    // Manejo de carpetas de trabajo
    openFolder: () => ipcRenderer.invoke('open-folder'),
    openFolderInSystem: (folderPath) => ipcRenderer.invoke('open-folder-in-system', folderPath),
    
    // Manejo de archivos reales
    readFile: (filePath) => ipcRenderer.invoke('read-file', filePath),
    writeFile: (filePath, content) => ipcRenderer.invoke('write-file', { filePath, content }),
    deleteFile: (filePath) => ipcRenderer.invoke('delete-file', filePath),
    deleteFolder: (folderPath) => ipcRenderer.invoke('delete-folder', folderPath),
    listFiles: (folderPath) => ipcRenderer.invoke('list-files', folderPath),
    createFile: (filePath, content) => ipcRenderer.invoke('create-file', { filePath, content }),
    createFolder: (folderPath) => ipcRenderer.invoke('create-folder', folderPath),
    
    // Eventos de archivos
    onFileRead: (callback) => ipcRenderer.on('file-read', callback),
    onFileWrite: (callback) => ipcRenderer.on('file-write', callback),
    onFileList: (callback) => ipcRenderer.on('file-list', callback),
    onFileCreated: (callback) => ipcRenderer.on('file-created', callback),
    onFileDeleted: (callback) => ipcRenderer.on('file-deleted', callback),
    onFileChanged: (callback) => ipcRenderer.on('file-changed', callback),
    
    // Archivos (legacy)
    newFile: () => ipcRenderer.send('new-file'),
    openFile: () => ipcRenderer.send('open-file'),
    saveFile: () => ipcRenderer.send('save-file'),
    saveFileAs: (path) => ipcRenderer.send('save-file-as', path),
    
    // Eventos de archivo (legacy)
    onFileOpened: (callback) => ipcRenderer.on('file-opened', callback),
    onFileSaved: (callback) => ipcRenderer.on('file-saved', callback),
    
    // Eventos de Node.js y npm
    onNodeJSResult: (callback) => ipcRenderer.on('nodejs-result', callback),
    onNpmResult: (callback) => ipcRenderer.on('npm-result', callback),
    onServerOutput: (callback) => ipcRenderer.on('server-output', callback),
    onServerError: (callback) => ipcRenderer.on('server-error', callback),
    onServerClosed: (callback) => ipcRenderer.on('server-closed', callback),
    
    // Código
    runCode: () => ipcRenderer.send('run-code'),
    runAll: () => ipcRenderer.send('run-all'),
    runNodeJS: (filename, content) => ipcRenderer.send('run-nodejs', { filename, content }),
    installNpmPackages: () => ipcRenderer.send('install-npm-packages'),
    startNodeServer: () => ipcRenderer.send('start-node-server'),
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