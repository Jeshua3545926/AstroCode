// AstroIDE - Editor de Código Funcional para Electron
class AstroIDE {
    constructor() {
        this.editor = null;
        this.currentFile = 'main.js';
        this.files = {
            'main.js': `// ¡Bienvenido a AstroIDE!
console.log("¡Hola Mundo!");

function saludar(nombre) {
    return "¡Hola " + nombre + "!";
}

// Prueba el autocompletado:
// 1. Escribe "con" y presiona Ctrl+Space
// 2. Escribe "fun" y presiona Tab
// 3. Escribe "if" y presiona Tab

const mensaje = saludar("Desarrollador");
console.log(mensaje);

// Ejemplo de función con autocompletado
function calcularSuma(a, b) {
    return a + b;
}

const resultado = calcularSuma(5, 3);
console.log("Resultado:", resultado);`,
            'style.css': `/* Estilos CSS de ejemplo */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
    background: #f0f0f0;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.button {
    background: #007acc;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.3s;
}

.button:hover {
    background: #005a9e;
}`,
            'index.html': `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi Proyecto</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>¡Bienvenido a mi proyecto!</h1>
        <p>Este es un ejemplo de página HTML.</p>
        <button class="button" onclick="saludar()">Haz clic aquí</button>
    </div>
    
    <script src="main.js"></script>
</body>
</html>`
        };
        
        this.init();
    }

    async init() {
        try {
            this.log('Iniciando AstroIDE...', 'info');
            
            // Configurar Monaco Editor para Electron
            if (typeof require !== 'undefined') {
                require.config({ 
                    paths: { 
                        vs: 'https://unpkg.com/monaco-editor@0.45.0/min/vs' 
                    } 
                });
            }

            // Cargar Monaco
            await new Promise((resolve, reject) => {
                if (typeof require !== 'undefined') {
                    require(['vs/editor/editor.main'], resolve, reject);
                } else {
                    // Fallback para navegador
                    const script = document.createElement('script');
                    script.src = 'https://unpkg.com/monaco-editor@0.45.0/min/vs/editor/editor.main.js';
                    script.onload = resolve;
                    script.onerror = reject;
                    document.head.appendChild(script);
                }
            });

            this.log('Monaco Editor cargado correctamente', 'info');
            this.createEditor();
            this.setupEventListeners();
            this.loadFile('main.js');
            
            // Configurar eventos de Electron si están disponibles
            if (window.electronAPI) {
                this.setupElectronEvents();
            }
            
        } catch (error) {
            this.log('Error al cargar Monaco Editor: ' + error.message, 'error');
        }
    }

    createEditor() {
        try {
            this.editor = monaco.editor.create(document.getElementById('monaco-editor'), {
                value: this.files[this.currentFile],
                language: this.getLanguageFromFile(this.currentFile),
                theme: 'vs-dark',
                automaticLayout: true,
                fontSize: 14,
                fontFamily: 'Fira Code, monospace',
                minimap: { enabled: true },
                lineNumbers: 'on',
                wordWrap: 'on',
                suggestOnTriggerCharacters: true,
                quickSuggestions: {
                    other: true,
                    comments: false,
                    strings: true
                },
                parameterHints: { enabled: true },
                formatOnPaste: true,
                formatOnType: true,
                tabSize: 4,
                insertSpaces: true,
                detectIndentation: true,
                scrollBeyondLastLine: false,
                roundedSelection: false,
                readOnly: false,
                cursorStyle: 'line',
                cursorBlinking: 'smooth',
                cursorSmoothCaretAnimation: true,
                cursorWidth: 2,
                contextmenu: true,
                mouseWheelZoom: true,
                scrollbar: {
                    vertical: 'visible',
                    horizontal: 'visible',
                    useShadows: false,
                    verticalScrollbarSize: 10,
                    horizontalScrollbarSize: 10
                }
            });

            // Configurar eventos del editor
            this.editor.onDidChangeModelContent(() => {
                this.updateFileContent();
            });

            this.editor.onDidChangeCursorPosition(() => {
                this.updateCursorPosition();
            });

            this.log('Editor creado exitosamente', 'info');
            
        } catch (error) {
            this.log('Error al crear el editor: ' + error.message, 'error');
        }
    }

    setupEventListeners() {
        // Botones de la barra de herramientas
        document.getElementById('newFileBtn').addEventListener('click', () => this.newFile());
        document.getElementById('openFileBtn').addEventListener('click', () => this.openFile());
        document.getElementById('saveFileBtn').addEventListener('click', () => this.saveFile());
        document.getElementById('runBtn').addEventListener('click', () => this.runCode());
        document.getElementById('themeBtn').addEventListener('click', () => this.toggleTheme());

        // Explorador de archivos
        document.querySelectorAll('.file-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const fileName = e.currentTarget.dataset.file;
                this.loadFile(fileName);
            });
        });

        // Pestañas del panel inferior
        document.querySelectorAll('.panel-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const panel = e.currentTarget.dataset.panel;
                this.switchPanel(panel);
            });
        });

        // Botón de actualizar
        document.getElementById('refreshBtn').addEventListener('click', () => this.refreshExplorer());

        // Atajos de teclado
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey) {
                switch(e.key) {
                    case 's':
                        e.preventDefault();
                        this.saveFile();
                        break;
                    case 'n':
                        e.preventDefault();
                        this.newFile();
                        break;
                    case 'o':
                        e.preventDefault();
                        this.openFile();
                        break;
                    case 'r':
                        e.preventDefault();
                        this.runCode();
                        break;
                }
            }
        });
    }

    setupElectronEvents() {
        // Escuchar eventos de Electron
        if (window.electronAPI && window.electronAPI.onFileOpened) {
            window.electronAPI.onFileOpened((event, data) => {
                this.loadExternalFile(data.path, data.content);
            });
        }
    }

    loadFile(fileName) {
        if (this.files[fileName]) {
            this.currentFile = fileName;
            const content = this.files[fileName];
            const language = this.getLanguageFromFile(fileName);
            
            // Actualizar el editor
            this.editor.setValue(content);
            monaco.editor.setModelLanguage(this.editor.getModel(), language);
            
            // Actualizar la interfaz
            this.updateActiveFile(fileName);
            this.updateTab(fileName);
            this.updateStatusBar(fileName, language);
            
            this.log(`Archivo cargado: ${fileName}`, 'info');
        }
    }

    updateFileContent() {
        if (this.currentFile && this.editor) {
            this.files[this.currentFile] = this.editor.getValue();
        }
    }

    updateActiveFile(fileName) {
        document.querySelectorAll('.file-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-file="${fileName}"]`).classList.add('active');
    }

    updateTab(fileName) {
        const tabsContainer = document.getElementById('editorTabs');
        const existingTab = tabsContainer.querySelector(`[data-file="${fileName}"]`);
        
        if (!existingTab) {
            const tab = document.createElement('div');
            tab.className = 'tab active';
            tab.dataset.file = fileName;
            tab.innerHTML = `
                <span>${fileName}</span>
                <button class="tab-close" data-file="${fileName}">×</button>
            `;
            tabsContainer.appendChild(tab);
            
            // Evento para cerrar pestaña
            tab.querySelector('.tab-close').addEventListener('click', (e) => {
                e.stopPropagation();
                this.closeTab(fileName);
            });
        } else {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            existingTab.classList.add('active');
        }
    }

    closeTab(fileName) {
        const tab = document.querySelector(`.tab[data-file="${fileName}"]`);
        if (tab) {
            tab.remove();
            
            // Si era la pestaña activa, cambiar a otra
            if (this.currentFile === fileName) {
                const nextTab = document.querySelector('.tab');
                if (nextTab) {
                    const nextFileName = nextTab.dataset.file;
                    this.loadFile(nextFileName);
                }
            }
        }
    }

    updateStatusBar(fileName, language) {
        document.getElementById('currentFile').textContent = fileName;
        document.getElementById('language').textContent = language;
    }

    updateCursorPosition() {
        if (this.editor) {
            const position = this.editor.getPosition();
            document.getElementById('cursorPosition').textContent = 
                `Ln ${position.lineNumber}, Col ${position.column}`;
        }
    }

    getLanguageFromFile(fileName) {
        const ext = fileName.split('.').pop().toLowerCase();
        const languageMap = {
            'js': 'javascript',
            'html': 'html',
            'css': 'css',
            'json': 'json',
            'xml': 'xml',
            'md': 'markdown',
            'py': 'python',
            'java': 'java',
            'cpp': 'cpp',
            'c': 'c',
            'php': 'php',
            'ts': 'typescript'
        };
        return languageMap[ext] || 'plaintext';
    }

    switchPanel(panelName) {
        // Actualizar pestañas
        document.querySelectorAll('.panel-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-panel="${panelName}"]`).classList.add('active');
        
        // Actualizar contenido
        document.querySelectorAll('.panel-pane').forEach(pane => {
            pane.classList.remove('active');
        });
        document.getElementById(panelName).classList.add('active');
    }

    log(message, type = 'info') {
        const consoleOutput = document.getElementById('consoleOutput');
        const messageDiv = document.createElement('div');
        messageDiv.className = `console-message ${type}`;
        messageDiv.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
        consoleOutput.appendChild(messageDiv);
        consoleOutput.scrollTop = consoleOutput.scrollHeight;
        
        // También mostrar en la consola del navegador
        console.log(`[AstroIDE] ${message}`);
    }

    newFile() {
        const fileName = prompt('Nombre del archivo (con extensión):', 'nuevo.js');
        if (fileName) {
            this.files[fileName] = '';
            this.loadFile(fileName);
            this.log(`Nuevo archivo creado: ${fileName}`, 'info');
        }
    }

    openFile() {
        this.log('Función de abrir archivo (implementar con Electron)', 'warning');
    }

    saveFile() {
        this.updateFileContent();
        this.log(`Archivo guardado: ${this.currentFile}`, 'info');
    }

    runCode() {
        if (this.currentFile.endsWith('.js')) {
            try {
                this.log('Ejecutando código JavaScript...', 'info');
                
                // Capturar console.log
                const originalLog = console.log;
                const originalError = console.error;
                const output = [];
                
                console.log = (...args) => {
                    output.push(args.join(' '));
                    originalLog.apply(console, args);
                };
                
                console.error = (...args) => {
                    output.push('ERROR: ' + args.join(' '));
                    originalError.apply(console, args);
                };
                
                // Ejecutar código
                const code = this.editor.getValue();
                const result = new Function(code)();
                
                // Restaurar console
                console.log = originalLog;
                console.error = originalError;
                
                // Mostrar resultado
                this.switchPanel('output');
                const outputContent = document.getElementById('outputContent');
                outputContent.innerHTML = output.map(line => 
                    `<div class="output-message">${line}</div>`
                ).join('');
                
                this.log('Código ejecutado correctamente', 'info');
                
            } catch (error) {
                this.log('Error al ejecutar código: ' + error.message, 'error');
                this.switchPanel('problems');
                const problemsList = document.getElementById('problemsList');
                problemsList.innerHTML = `
                    <div class="problem-item error">
                        <i class="fas fa-exclamation-circle"></i>
                        <span>Error de ejecución: ${error.message}</span>
                    </div>
                `;
            }
        } else {
            this.log('Solo se puede ejecutar código JavaScript', 'warning');
        }
    }

    toggleTheme() {
        const body = document.body;
        if (body.classList.contains('theme-light')) {
            body.classList.remove('theme-light');
            if (this.editor) {
                monaco.editor.setTheme('vs-dark');
            }
            this.log('Tema cambiado a oscuro', 'info');
        } else {
            body.classList.add('theme-light');
            if (this.editor) {
                monaco.editor.setTheme('vs');
            }
            this.log('Tema cambiado a claro', 'info');
        }
    }

    refreshExplorer() {
        this.log('Explorador de archivos actualizado', 'info');
    }

    loadExternalFile(path, content) {
        const fileName = path.split('/').pop() || path.split('\\').pop();
        this.files[fileName] = content;
        this.loadFile(fileName);
        this.log(`Archivo externo cargado: ${fileName}`, 'info');
    }
}

// Inicializar AstroIDE cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.astroIDE = new AstroIDE();
}); 