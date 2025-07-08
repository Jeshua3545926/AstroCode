// AstroIDE - Editor de Código Funcional para Electron
class AstroIDE {
    constructor() {
        this.editor = null;
        this.currentFile = 'main.js';
        this.files = {
            'main.js': `// ¡Bienvenido a AstroIDE!
// Este archivo contiene funcionalidades interactivas para el proyecto

console.log("¡Hola Mundo! AstroIDE está funcionando correctamente");

// Función para mostrar saludos
function saludar() {
    const nombres = ['Desarrollador', 'Programador', 'Coder', 'Hacker', 'Developer'];
    const nombreAleatorio = nombres[Math.floor(Math.random() * nombres.length)];
    const mensaje = \`¡Hola \${nombreAleatorio}! 👋\nBienvenido a tu proyecto web.\nFecha: \${new Date().toLocaleDateString()}\`;
    
    mostrarResultado(mensaje, 'success');
    console.log('Función saludar() ejecutada');
}

// Función para cambiar colores del fondo
function cambiarColor() {
    const colores = [
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    ];
    
    const colorAleatorio = colores[Math.floor(Math.random() * colores.length)];
    document.body.style.background = colorAleatorio;
    
    mostrarResultado(\`Color de fondo cambiado a: \${colorAleatorio}\`, 'info');
    console.log('Función cambiarColor() ejecutada');
}

// Función para mostrar fecha y hora
function mostrarFecha() {
    const ahora = new Date();
    const opciones = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    
    const fechaCompleta = ahora.toLocaleDateString('es-ES', opciones);
    const timestamp = ahora.getTime();
    
    const mensaje = \`📅 Fecha y hora actual:\n\${fechaCompleta}\n\n⏰ Timestamp: \${timestamp}\`;
    
    mostrarResultado(mensaje, 'info');
    console.log('Función mostrarFecha() ejecutada');
}

// Función para mostrar resultados en la página
function mostrarResultado(mensaje, tipo = 'info') {
    const resultadoDiv = document.getElementById('resultado');
    if (resultadoDiv) {
        resultadoDiv.textContent = mensaje;
        resultadoDiv.className = \`resultado \${tipo}\`;
        
        // Limpiar después de 5 segundos
        setTimeout(() => {
            resultadoDiv.textContent = '';
            resultadoDiv.className = 'resultado';
        }, 5000);
    }
}

// Función para calcular suma (ejemplo de autocompletado)
function calcularSuma(a, b) {
    return a + b;
}

// Función para generar números aleatorios
function numeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Función para validar email
function validarEmail(email) {
    const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    return regex.test(email);
}

// Función para formatear texto
function formatearTexto(texto, tipo) {
    switch(tipo) {
        case 'uppercase':
            return texto.toUpperCase();
        case 'lowercase':
            return texto.toLowerCase();
        case 'capitalize':
            return texto.replace(/\\b\\w/g, l => l.toUpperCase());
        default:
            return texto;
    }
}

// Ejemplo de uso de las funciones
const resultado = calcularSuma(5, 3);
console.log("Resultado de la suma:", resultado);

// Mostrar mensaje de bienvenida al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página cargada correctamente');
    mostrarResultado('¡Página cargada! Haz clic en los botones para probar las funcionalidades.', 'success');
});

// Función para animar elementos
function animarElemento(elemento) {
    elemento.style.transform = 'scale(1.1)';
    setTimeout(() => {
        elemento.style.transform = 'scale(1)';
    }, 200);
}

// Agregar efectos de hover a los botones
document.addEventListener('DOMContentLoaded', function() {
    const botones = document.querySelectorAll('.button');
    botones.forEach(boton => {
        boton.addEventListener('mouseenter', function() {
            animarElemento(this);
        });
    });
});`,
            'style.css': `/* Estilos CSS modernos para el proyecto */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: #333;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(10px);
}

.header {
    text-align: center;
    padding: 40px 0;
    border-bottom: 2px solid #eee;
    margin-bottom: 30px;
}

.header h1 {
    font-size: 2.5rem;
    color: #2c3e50;
    margin-bottom: 10px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.header p {
    font-size: 1.2rem;
    color: #7f8c8d;
}

.main-content {
    display: grid;
    gap: 30px;
}

.demo-section, .info-section {
    padding: 25px;
    background: #f8f9fa;
    border-radius: 10px;
    border-left: 4px solid #007acc;
}

.demo-section h2, .info-section h2 {
    color: #2c3e50;
    margin-bottom: 20px;
    font-size: 1.8rem;
}

.button-group {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
    margin-bottom: 25px;
}

.button {
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    color: white;
}

.button.primary {
    background: linear-gradient(45deg, #007acc, #005a9e);
}

.button.secondary {
    background: linear-gradient(45deg, #6c757d, #495057);
}

.button.success {
    background: linear-gradient(45deg, #28a745, #20c997);
}

.button:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.button:active {
    transform: translateY(0);
}

.output-area {
    background: white;
    padding: 20px;
    border-radius: 8px;
    border: 1px solid #dee2e6;
}

.output-area h3 {
    color: #495057;
    margin-bottom: 15px;
}

.resultado {
    min-height: 60px;
    padding: 15px;
    background: #f8f9fa;
    border-radius: 6px;
    border-left: 4px solid #007acc;
    font-family: 'Courier New', monospace;
    white-space: pre-wrap;
}

.info-section ul {
    list-style: none;
    padding: 0;
}

.info-section li {
    padding: 10px 0;
    border-bottom: 1px solid #eee;
    font-size: 1.1rem;
}

.info-section li:last-child {
    border-bottom: none;
}

.footer {
    text-align: center;
    padding: 30px 0;
    margin-top: 30px;
    border-top: 2px solid #eee;
    color: #6c757d;
    font-size: 1.1rem;
}

/* Responsive design */
@media (max-width: 768px) {
    .container {
        margin: 10px;
        padding: 15px;
    }
    
    .header h1 {
        font-size: 2rem;
    }
    
    .button-group {
        flex-direction: column;
    }
    
    .button {
        width: 100%;
        justify-content: center;
    }
}

/* Animaciones */
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

.demo-section, .info-section {
    animation: fadeIn 0.6s ease-out;
}

/* Estados especiales */
.resultado.error {
    border-left-color: #dc3545;
    background: #f8d7da;
    color: #721c24;
}

.resultado.success {
    border-left-color: #28a745;
    background: #d4edda;
    color: #155724;
}`,
            'index.html': `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi Proyecto Web</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header class="header">
            <h1>¡Bienvenido a mi proyecto!</h1>
            <p>Este es un ejemplo de página HTML creada con AstroIDE</p>
        </header>
        
        <main class="main-content">
            <section class="demo-section">
                <h2>Funcionalidades de ejemplo</h2>
                <div class="button-group">
                    <button class="button primary" onclick="saludar()">
                        <i class="fas fa-hand-wave"></i> Saludar
                    </button>
                    <button class="button secondary" onclick="cambiarColor()">
                        <i class="fas fa-palette"></i> Cambiar Color
                    </button>
                    <button class="button success" onclick="mostrarFecha()">
                        <i class="fas fa-calendar"></i> Mostrar Fecha
                    </button>
                </div>
                
                <div class="output-area">
                    <h3>Resultados:</h3>
                    <div id="resultado" class="resultado"></div>
                </div>
            </section>
            
            <section class="info-section">
                <h2>Información del proyecto</h2>
                <ul>
                    <li>✅ HTML semántico</li>
                    <li>✅ Estilos CSS modernos</li>
                    <li>✅ JavaScript interactivo</li>
                    <li>✅ Diseño responsive</li>
                </ul>
            </section>
        </main>
        
        <footer class="footer">
            <p>Creado con ❤️ usando AstroIDE</p>
        </footer>
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
        document.getElementById('runAllBtn').addEventListener('click', () => this.runAll());
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
                    case 'Shift':
                        if (e.key === 'R') {
                            e.preventDefault();
                            this.runAll();
                        }
                        break;
                }
            }
            
            // F5 para ejecutar todo el proyecto
            if (e.key === 'F5') {
                e.preventDefault();
                this.runAll();
            }
            
            // F6 para ejecutar archivo actual
            if (e.key === 'F6') {
                e.preventDefault();
                this.runCode();
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
        
        // Escuchar eventos de ejecución desde el menú
        if (window.electronAPI) {
            // Usar ipcRenderer directamente si está disponible
            if (window.electronAPI.runAll) {
                window.electronAPI.runAll = () => this.runAll();
            }
            if (window.electronAPI.runCode) {
                window.electronAPI.runCode = () => this.runCode();
            }
            if (window.electronAPI.toggleTheme) {
                window.electronAPI.toggleTheme = () => this.toggleTheme();
            }
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
        const fileExt = this.currentFile.split('.').pop().toLowerCase();
        
        switch(fileExt) {
            case 'html':
                this.runHTML();
                break;
            case 'css':
                this.runCSS();
                break;
            case 'js':
                this.runJavaScript();
                break;
            default:
                this.log('Formato de archivo no soportado para ejecución', 'warning');
        }
    }

    runHTML() {
        try {
            this.log('Ejecutando archivo HTML...', 'info');
            
            const htmlContent = this.editor.getValue();
            
            // Crear una nueva ventana para mostrar el HTML
            const newWindow = window.open('', '_blank', 'width=800,height=600,scrollbars=yes,resizable=yes');
            
            if (newWindow) {
                newWindow.document.write(htmlContent);
                newWindow.document.close();
                
                this.log('HTML ejecutado en nueva ventana', 'info');
                this.switchPanel('output');
                const outputContent = document.getElementById('outputContent');
                outputContent.innerHTML = `
                    <div class="output-message success">
                        <i class="fas fa-check-circle"></i>
                        HTML ejecutado correctamente en nueva ventana
                    </div>
                    <div class="output-message">
                        <strong>Ventana:</strong> ${newWindow.location.href}
                    </div>
                `;
            } else {
                throw new Error('No se pudo abrir la ventana (bloqueador de popups)');
            }
            
        } catch (error) {
            this.log('Error al ejecutar HTML: ' + error.message, 'error');
            this.showError('Error al ejecutar HTML', error.message);
        }
    }

    runCSS() {
        try {
            this.log('Aplicando estilos CSS...', 'info');
            
            const cssContent = this.editor.getValue();
            
            // Crear un elemento de estilo temporal
            const styleElement = document.createElement('style');
            styleElement.id = 'astroide-temp-css';
            styleElement.textContent = cssContent;
            
            // Remover estilos anteriores si existen
            const existingStyle = document.getElementById('astroide-temp-css');
            if (existingStyle) {
                existingStyle.remove();
            }
            
            // Aplicar estilos al documento actual
            document.head.appendChild(styleElement);
            
            this.log('Estilos CSS aplicados correctamente', 'info');
            this.switchPanel('output');
            const outputContent = document.getElementById('outputContent');
            outputContent.innerHTML = `
                <div class="output-message success">
                    <i class="fas fa-check-circle"></i>
                    Estilos CSS aplicados correctamente
                </div>
                <div class="output-message">
                    <strong>Reglas CSS aplicadas:</strong> ${cssContent.split('}').length - 1}
                </div>
                <div class="output-message">
                    <button class="btn-remove-css" onclick="window.astroIDE.removeTempCSS()">
                        <i class="fas fa-times"></i> Remover estilos temporales
                    </button>
                </div>
            `;
            
        } catch (error) {
            this.log('Error al aplicar CSS: ' + error.message, 'error');
            this.showError('Error al aplicar CSS', error.message);
        }
    }

    runJavaScript() {
        try {
            this.log('Ejecutando código JavaScript...', 'info');
            
            // Capturar console.log y console.error
            const originalLog = console.log;
            const originalError = console.error;
            const originalWarn = console.warn;
            const output = [];
            
            console.log = (...args) => {
                output.push({ type: 'log', message: args.join(' ') });
                originalLog.apply(console, args);
            };
            
            console.error = (...args) => {
                output.push({ type: 'error', message: args.join(' ') });
                originalError.apply(console, args);
            };
            
            console.warn = (...args) => {
                output.push({ type: 'warn', message: args.join(' ') });
                originalWarn.apply(console, args);
            };
            
            // Ejecutar código
            const code = this.editor.getValue();
            const result = new Function(code)();
            
            // Restaurar console
            console.log = originalLog;
            console.error = originalError;
            console.warn = originalWarn;
            
            // Mostrar resultado
            this.switchPanel('output');
            const outputContent = document.getElementById('outputContent');
            
            if (output.length === 0) {
                outputContent.innerHTML = `
                    <div class="output-message success">
                        <i class="fas fa-check-circle"></i>
                        Código JavaScript ejecutado correctamente
                    </div>
                    <div class="output-message">
                        <strong>Resultado:</strong> ${result !== undefined ? result : 'undefined'}
                    </div>
                `;
            } else {
                const outputHTML = output.map(item => 
                    `<div class="output-message ${item.type}">
                        <i class="fas fa-${item.type === 'error' ? 'exclamation-circle' : item.type === 'warn' ? 'exclamation-triangle' : 'info-circle'}"></i>
                        ${item.message}
                    </div>`
                ).join('');
                
                outputContent.innerHTML = `
                    <div class="output-message success">
                        <i class="fas fa-check-circle"></i>
                        Código JavaScript ejecutado correctamente
                    </div>
                    ${outputHTML}
                `;
            }
            
        } catch (error) {
            this.log('Error al ejecutar JavaScript: ' + error.message, 'error');
            this.showError('Error al ejecutar JavaScript', error.message);
        }
    }

    runAll() {
        try {
            this.log('Ejecutando proyecto completo (HTML + CSS + JS)...', 'info');
            
            // Obtener contenido de todos los archivos
            const htmlContent = this.files['index.html'] || '';
            const cssContent = this.files['style.css'] || '';
            const jsContent = this.files['main.js'] || '';
            
            if (!htmlContent) {
                throw new Error('No se encontró archivo HTML para ejecutar');
            }
            
            // Crear HTML completo con CSS y JS integrados
            const fullHTML = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Proyecto AstroIDE</title>
    <style>
        ${cssContent}
    </style>
</head>
<body>
    ${htmlContent.replace(/<head>[\s\S]*?<\/head>/gi, '').replace(/<script[\s\S]*?<\/script>/gi, '')}
    <script>
        ${jsContent}
    </script>
</body>
</html>`;
            
            // Crear nueva ventana
            const newWindow = window.open('', '_blank', 'width=1000,height=700,scrollbars=yes,resizable=yes');
            
            if (newWindow) {
                newWindow.document.write(fullHTML);
                newWindow.document.close();
                
                this.log('Proyecto completo ejecutado en nueva ventana', 'info');
                this.switchPanel('output');
                const outputContent = document.getElementById('outputContent');
                outputContent.innerHTML = `
                    <div class="output-message success">
                        <i class="fas fa-check-circle"></i>
                        Proyecto completo ejecutado correctamente
                    </div>
                    <div class="output-message">
                        <strong>Archivos incluidos:</strong> HTML, CSS, JavaScript
                    </div>
                    <div class="output-message">
                        <strong>Ventana:</strong> ${newWindow.location.href}
                    </div>
                `;
            } else {
                throw new Error('No se pudo abrir la ventana (bloqueador de popups)');
            }
            
        } catch (error) {
            this.log('Error al ejecutar proyecto completo: ' + error.message, 'error');
            this.showError('Error al ejecutar proyecto completo', error.message);
        }
    }

    removeTempCSS() {
        const tempStyle = document.getElementById('astroide-temp-css');
        if (tempStyle) {
            tempStyle.remove();
            this.log('Estilos temporales removidos', 'info');
            this.switchPanel('output');
            const outputContent = document.getElementById('outputContent');
            outputContent.innerHTML = `
                <div class="output-message info">
                    <i class="fas fa-info-circle"></i>
                    Estilos temporales removidos correctamente
                </div>
            `;
        }
    }

    showError(title, message) {
        this.switchPanel('problems');
        const problemsList = document.getElementById('problemsList');
        problemsList.innerHTML = `
            <div class="problem-item error">
                <i class="fas fa-exclamation-circle"></i>
                <span><strong>${title}:</strong> ${message}</span>
            </div>
        `;
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