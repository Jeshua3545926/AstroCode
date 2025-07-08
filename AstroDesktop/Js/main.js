const { app, BrowserWindow, Menu, dialog, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

function createWindow() {
    // Crear la ventana del navegador
    mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
        minWidth: 800,
        minHeight: 600,
    webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false,
      webSecurity: false,
      allowRunningInsecureContent: true,
      preload: path.join(__dirname, 'preload.js')
        },
        icon: path.join(__dirname, '../assets/icon.png'),
        titleBarStyle: 'default',
        show: false
    });

    // Cargar el archivo HTML principal
    mainWindow.loadFile(path.join(__dirname, '../html/index.html'));

    // Mostrar la ventana cuando esté lista
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    // Manejar el cierre de la ventana
    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    // Abrir DevTools en desarrollo
    if (process.env.NODE_ENV === 'development') {
        mainWindow.webContents.openDevTools();
    }
}

// Crear menú de la aplicación
function createMenu() {
    const template = [
        {
            label: 'Archivo',
            submenu: [
                {
                    label: 'Nuevo',
                    accelerator: 'CmdOrCtrl+N',
                    click: () => {
                        mainWindow.webContents.send('new-file');
                    }
                },
                {
                    label: 'Abrir',
                    accelerator: 'CmdOrCtrl+O',
                    click: async () => {
                        const result = await dialog.showOpenDialog(mainWindow, {
                            properties: ['openFile'],
                            filters: [
                                { name: 'Archivos de texto', extensions: ['txt', 'js', 'html', 'css', 'json', 'md'] },
                                { name: 'Todos los archivos', extensions: ['*'] }
                            ]
                        });

                        if (!result.canceled && result.filePaths.length > 0) {
                            const filePath = result.filePaths[0];
                            const content = fs.readFileSync(filePath, 'utf8');
                            mainWindow.webContents.send('file-opened', {
                                path: filePath,
                                content: content
                            });
                        }
                    }
                },
                {
                    label: 'Guardar',
                    accelerator: 'CmdOrCtrl+S',
                    click: () => {
                        mainWindow.webContents.send('save-file');
                    }
                },
                {
                    label: 'Guardar como',
                    accelerator: 'CmdOrCtrl+Shift+S',
                    click: async () => {
                        const result = await dialog.showSaveDialog(mainWindow, {
                            filters: [
                                { name: 'Archivos de texto', extensions: ['txt', 'js', 'html', 'css', 'json', 'md'] },
                                { name: 'Todos los archivos', extensions: ['*'] }
                            ]
                        });

                        if (!result.canceled) {
                            mainWindow.webContents.send('save-file-as', {
                                path: result.filePath
                            });
                        }
                    }
                },
                { type: 'separator' },
                {
                    label: 'Salir',
                    accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
                    click: () => {
                        app.quit();
                    }
                }
            ]
        },
        {
            label: 'Editar',
            submenu: [
                { role: 'undo' },
                { role: 'redo' },
                { type: 'separator' },
                { role: 'cut' },
                { role: 'copy' },
                { role: 'paste' },
                { role: 'selectall' }
            ]
        },
        {
            label: 'Ver',
            submenu: [
                { role: 'reload' },
                { role: 'forceReload' },
                { role: 'toggleDevTools' },
                { type: 'separator' },
                { role: 'resetZoom' },
                { role: 'zoomIn' },
                { role: 'zoomOut' },
                { type: 'separator' },
                { role: 'togglefullscreen' }
            ]
        },
        {
            label: 'Herramientas',
            submenu: [
                {
                    label: 'Ejecutar código',
                    accelerator: 'F5',
                    click: () => {
                        mainWindow.webContents.send('run-code');
                    }
                },
                {
                    label: 'Cambiar tema',
                    accelerator: 'CmdOrCtrl+T',
                    click: () => {
                        mainWindow.webContents.send('toggle-theme');
                    }
                }
            ]
        }
    ];

    // Agregar menú de ayuda en macOS
    if (process.platform === 'darwin') {
        template.push({
            label: 'AstroIDE',
            submenu: [
                { role: 'about' },
                { type: 'separator' },
                { role: 'services' },
                { type: 'separator' },
                { role: 'hide' },
                { role: 'hideothers' },
                { role: 'unhide' },
                { type: 'separator' },
                { role: 'quit' }
            ]
        });
    }

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}

// Eventos de la aplicación
app.whenReady().then(() => {
    createWindow();
    createMenu();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
    }
    });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
        app.quit();
  }
});

// Manejadores IPC para comunicación con el renderer

// Abrir carpeta de trabajo
ipcMain.handle('open-folder', async (event) => {
    try {
        const result = await dialog.showOpenDialog(mainWindow, {
            properties: ['openDirectory'],
            title: 'Seleccionar carpeta de trabajo'
        });

        if (!result.canceled && result.filePaths.length > 0) {
            return { success: true, path: result.filePaths[0] };
        } else {
            return { success: false, error: 'No se seleccionó ninguna carpeta' };
        }
    } catch (error) {
        return { success: false, error: error.message };
    }
});

// Abrir carpeta en el explorador del sistema
ipcMain.handle('open-folder-in-system', async (event, folderPath) => {
    try {
        const { shell } = require('electron');
        await shell.openPath(folderPath);
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
});

// Leer archivo
ipcMain.handle('read-file', async (event, filePath) => {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        return { success: true, path: filePath, content: content };
    } catch (error) {
        return { success: false, path: filePath, error: error.message };
    }
});

// Escribir archivo
ipcMain.handle('write-file', async (event, { filePath, content }) => {
    try {
        fs.writeFileSync(filePath, content, 'utf8');
        return { success: true, path: filePath };
    } catch (error) {
        return { success: false, path: filePath, error: error.message };
    }
});

// Eliminar archivo
ipcMain.handle('delete-file', async (event, filePath) => {
    try {
        fs.unlinkSync(filePath);
        return { success: true, path: filePath };
    } catch (error) {
        return { success: false, path: filePath, error: error.message };
    }
});

// Eliminar carpeta
ipcMain.handle('delete-folder', async (event, folderPath) => {
    try {
        fs.rmSync(folderPath, { recursive: true, force: true });
        return { success: true, path: folderPath };
    } catch (error) {
        return { success: false, path: folderPath, error: error.message };
    }
});

// Listar archivos y carpetas
ipcMain.handle('list-files', async (event, folderPath) => {
    try {
        const items = fs.readdirSync(folderPath);
        const files = [];
        const folders = [];

        for (const item of items) {
            const itemPath = path.join(folderPath, item);
            const stats = fs.statSync(itemPath);
            
            if (stats.isDirectory()) {
                folders.push(item);
            } else {
                files.push(item);
            }
        }

        return { success: true, files, folders };
    } catch (error) {
        return { success: false, error: error.message };
    }
});

// Crear archivo
ipcMain.handle('create-file', async (event, { filePath, content }) => {
    try {
        fs.writeFileSync(filePath, content, 'utf8');
        return { success: true, path: filePath };
    } catch (error) {
        return { success: false, path: filePath, error: error.message };
    }
});

// Crear carpeta
ipcMain.handle('create-folder', async (event, folderPath) => {
    try {
        fs.mkdirSync(folderPath, { recursive: true });
        return { success: true, path: folderPath };
    } catch (error) {
        return { success: false, path: folderPath, error: error.message };
    }
});

// Legacy handlers
ipcMain.handle('save-file-content', async (event, { filePath, content }) => {
    try {
        fs.writeFileSync(filePath, content, 'utf8');
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
});

ipcMain.handle('get-file-info', async (event, filePath) => {
    try {
        const stats = fs.statSync(filePath);
        return {
            success: true,
            size: stats.size,
            modified: stats.mtime,
            isDirectory: stats.isDirectory()
        };
    } catch (error) {
        return { success: false, error: error.message };
    }
});

// Manejadores para Node.js y npm
ipcMain.handle('run-nodejs', async (event, { filename, content }) => {
    try {
        const tempPath = path.join(__dirname, '..', 'temp', filename);
        
        // Crear directorio temp si no existe
        const tempDir = path.dirname(tempPath);
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
        }
        
        // Escribir archivo temporal
        fs.writeFileSync(tempPath, content, 'utf8');
        
        // Ejecutar con Node.js
        const { spawn } = require('child_process');
        const nodeProcess = spawn('node', [tempPath], {
            cwd: path.dirname(tempPath),
            stdio: ['pipe', 'pipe', 'pipe']
        });
        
        let output = '';
        let errorOutput = '';
        
        nodeProcess.stdout.on('data', (data) => {
            output += data.toString();
        });
        
        nodeProcess.stderr.on('data', (data) => {
            errorOutput += data.toString();
        });
        
        nodeProcess.on('close', (code) => {
            // Limpiar archivo temporal
            try {
                fs.unlinkSync(tempPath);
            } catch (err) {
                console.log('No se pudo eliminar archivo temporal:', err.message);
            }
            
            mainWindow.webContents.send('nodejs-result', {
                success: code === 0,
                output: output,
                error: errorOutput,
                code: code
            });
        });
        
        return { success: true, message: 'Proceso Node.js iniciado' };
        
    } catch (error) {
        return { success: false, error: error.message };
    }
});

ipcMain.handle('install-npm-packages', async (event) => {
    try {
        const projectPath = path.join(__dirname, '..');
        const packageJsonPath = path.join(projectPath, 'package.json');
        
        if (!fs.existsSync(packageJsonPath)) {
            return { success: false, error: 'No se encontró package.json' };
        }
        
        const { spawn } = require('child_process');
        const npmProcess = spawn('npm', ['install'], {
            cwd: projectPath,
            stdio: ['pipe', 'pipe', 'pipe']
        });
        
        let output = '';
        let errorOutput = '';
        
        npmProcess.stdout.on('data', (data) => {
            output += data.toString();
        });
        
        npmProcess.stderr.on('data', (data) => {
            errorOutput += data.toString();
        });
        
        npmProcess.on('close', (code) => {
            mainWindow.webContents.send('npm-result', {
                success: code === 0,
                output: output,
                error: errorOutput,
                code: code
            });
        });
        
        return { success: true, message: 'Instalación de npm iniciada' };
        
    } catch (error) {
        return { success: false, error: error.message };
    }
});

ipcMain.handle('start-node-server', async (event) => {
    try {
        const projectPath = path.join(__dirname, '..');
        const serverPath = path.join(projectPath, 'server.js');
        
        if (!fs.existsSync(serverPath)) {
            return { success: false, error: 'No se encontró server.js' };
        }
        
        const { spawn } = require('child_process');
        const serverProcess = spawn('node', [serverPath], {
            cwd: projectPath,
            stdio: ['pipe', 'pipe', 'pipe']
        });
        
        let output = '';
        let errorOutput = '';
        
        serverProcess.stdout.on('data', (data) => {
            output += data.toString();
            mainWindow.webContents.send('server-output', data.toString());
        });
        
        serverProcess.stderr.on('data', (data) => {
            errorOutput += data.toString();
            mainWindow.webContents.send('server-error', data.toString());
        });
        
        serverProcess.on('close', (code) => {
            mainWindow.webContents.send('server-closed', {
                code: code,
                output: output,
                error: errorOutput
            });
        });
        
        return { success: true, message: 'Servidor Node.js iniciado' };
        
    } catch (error) {
        return { success: false, error: error.message };
    }
});

// Manejar errores no capturados
process.on('uncaughtException', (error) => {
    console.error('Error no capturado:', error);
    dialog.showErrorBox('Error', `Ha ocurrido un error: ${error.message}`);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Promesa rechazada no manejada:', reason);
    dialog.showErrorBox('Error', `Promesa rechazada: ${reason}`);
});
