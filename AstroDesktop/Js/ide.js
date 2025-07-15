// AstroIDE - Editor de Código Funcional para Electron
class AstroIDE {
    constructor() {
        this.editor = null;
        this.currentFile = null;
        this.nodeProcess = null;
        this.currentWorkspace = null;
        this.openTabs = new Map(); // Para manejar pestañas abiertas
        this.fileWatchers = new Map(); // Para observar cambios en archivos

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

            // Configurar eventos de Electron si están disponibles
            if (window.electronAPI) {
                this.setupElectronEvents();
                // Abrir diálogo para seleccionar carpeta de trabajo
                // this.openWorkspace();
            } else {
                // Modo navegador - usar directorio actual
                this.currentWorkspace = '.';
                this.updateFileExplorer();
            }

        } catch (error) {
            this.log('Error al cargar Monaco Editor: ' + error.message, 'error');
        }
    }

    async openWorkspace() {
        try {
            if (window.electronAPI) {
                const result = await window.electronAPI.openFolder();
                if (result.success) {
                    this.currentWorkspace = result.path;
                    this.log(`Carpeta de trabajo abierta: ${this.currentWorkspace}`, 'info');
                    this.updateFileExplorer();
                    this.updateTitle();
                }
            }
        } catch (error) {
            this.log('Error al abrir carpeta de trabajo: ' + error.message, 'error');
        }
    }

    updateTitle() {
        if (this.currentWorkspace) {
            const folderName = this.currentWorkspace.split(/[\\/]/).pop();
            document.title = `AstroIDE - ${folderName}`;
        }
    }

    createEditor() {
        try {
            this.editor = monaco.editor.create(document.getElementById('monaco-editor'), {
                value: '',
                language: 'javascript',
                theme: 'vs-dark',
                automaticLayout: true,
                fontSize: 14,
                fontFamily: 'Fira Code, Consolas, "Courier New", monospace',
                fontLigatures: true,
                minimap: { enabled: true },
                lineNumbers: 'on',
                wordWrap: 'on',
                suggestOnTriggerCharacters: true,
                quickSuggestions: {
                    other: true,
                    comments: true,
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
                bracketPairColorization: { enabled: true },
                guides: {
                    bracketPairs: true,
                    indentation: true
                },
                autoIndent: 'full',
                folding: true,
                foldingStrategy: 'indentation',
                showFoldingControls: 'always',
                unfoldOnClickAfterEnd: false,
                links: true,
                colorDecorators: true,
                lightbulb: { enabled: true },
                codeActionsOnSave: {
                    'source.fixAll': true,
                    'source.organizeImports': true
                },
                suggest: {
                    showKeywords: true,
                    showSnippets: true,
                    showClasses: true,
                    showFunctions: true,
                    showVariables: true,
                    showConstants: true,
                    showEnums: true,
                    showInterfaces: true,
                    showModules: true,
                    showProperties: true,
                    showEvents: true,
                    showOperators: true,
                    showUnits: true,
                    showValues: true,
                    showColors: true,
                    showFiles: true,
                    showReferences: true,
                    showFolders: true,
                    showTypeParameters: true,
                    showWords: true
                },
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

            // Configurar autocompletado personalizado
            this.setupCustomAutocomplete();

            this.log('Editor creado exitosamente', 'info');

        } catch (error) {
            this.log('Error al crear el editor: ' + error.message, 'error');
        }
    }

    setupCustomAutocomplete() {
        // Usar la configuración de autocompletado mejorada
        if (window.LanguageConfig) {
            const config = window.LanguageConfig.getAutocompleteConfig();

            // Registrar proveedores para cada lenguaje
            Object.keys(config).forEach(language => {
                monaco.languages.registerCompletionItemProvider(language, {
                    provideCompletionItems: (model, position) => {
                        const suggestions = config[language].snippets.map(snippet => ({
                            label: snippet.label,
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: snippet.insertText,
                            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                            documentation: snippet.documentation
                        }));
                        return { suggestions };
                    }
                });
            });
        }

        // Configuración básica como fallback
        monaco.languages.registerCompletionItemProvider('javascript', {
            provideCompletionItems: (model, position) => {
                const suggestions = [
                    {
                        label: 'console.log',
                        kind: monaco.languages.CompletionItemKind.Function,
                        insertText: 'console.log(${1:value})',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Imprime un mensaje en la consola'
                    },
                    {
                        label: 'function',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: 'function ${1:name}(${2:params}) {\n\t${3}\n}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Declara una función'
                    },
                    {
                        label: 'if',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: 'if (${1:condition}) {\n\t${2}\n}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Declara una condición if'
                    },
                    {
                        label: 'for',
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: 'for (let ${1:i} = 0; ${1:i} < ${2:array}.length; ${1:i}++) {\n\t${3}\n}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Bucle for'
                    },
                    {
                        label: 'forEach',
                        kind: monaco.languages.CompletionItemKind.Method,
                        insertText: '${1:array}.forEach((${2:item}) => {\n\t${3}\n})',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Itera sobre un array'
                    }
                ];
                return { suggestions };
            }
        });

        monaco.languages.registerCompletionItemProvider('html', {
            provideCompletionItems: (model, position) => {
                const suggestions = [
                    {
                        label: 'div',
                        kind: monaco.languages.CompletionItemKind.Class,
                        insertText: '<div>\n\t${1}\n</div>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Elemento div'
                    },
                    {
                        label: 'span',
                        kind: monaco.languages.CompletionItemKind.Class,
                        insertText: '<span>${1}</span>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Elemento span'
                    },
                    {
                        label: 'p',
                        kind: monaco.languages.CompletionItemKind.Class,
                        insertText: '<p>${1}</p>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Párrafo'
                    },
                    {
                        label: 'h1',
                        kind: monaco.languages.CompletionItemKind.Class,
                        insertText: '<h1>${1}</h1>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Encabezado 1'
                    },
                    {
                        label: 'script',
                        kind: monaco.languages.CompletionItemKind.Class,
                        insertText: '<script>\n\t${1}\n</script>',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Script JavaScript'
                    },
                    {
                        label: 'link',
                        kind: monaco.languages.CompletionItemKind.Class,
                        insertText: '<link rel="stylesheet" href="${1}">',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Enlace a CSS'
                    }
                ];
                return { suggestions };
            }
        });

        monaco.languages.registerCompletionItemProvider('css', {
            provideCompletionItems: (model, position) => {
                const suggestions = [
                    {
                        label: 'color',
                        kind: monaco.languages.CompletionItemKind.Property,
                        insertText: 'color: ${1:#000};',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Color del texto'
                    },
                    {
                        label: 'background-color',
                        kind: monaco.languages.CompletionItemKind.Property,
                        insertText: 'background-color: ${1:#fff};',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Color de fondo'
                    },
                    {
                        label: 'margin',
                        kind: monaco.languages.CompletionItemKind.Property,
                        insertText: 'margin: ${1:0};',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Margen'
                    },
                    {
                        label: 'padding',
                        kind: monaco.languages.CompletionItemKind.Property,
                        insertText: 'padding: ${1:0};',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Padding'
                    },
                    {
                        label: 'display',
                        kind: monaco.languages.CompletionItemKind.Property,
                        insertText: 'display: ${1|block,inline,flex,grid,none|};',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Tipo de display'
                    }
                ];
                return { suggestions };
            }
        });
    }

    setupEventListeners() {
        // Botones de la barra de herramientas
        document.getElementById('newFileBtn').addEventListener('click', () => this.newFile());
        document.getElementById('openFileBtn').addEventListener('click', () => this.openFile());
        document.getElementById('saveFileBtn').addEventListener('click', () => this.saveFile());
        document.getElementById('npmInstallBtn').addEventListener('click', () => this.installNpmPackages());
        document.getElementById('startServerBtn').addEventListener('click', () => this.startNodeServer());
        document.getElementById('runAllBtn').addEventListener('click', () => this.runAll());
        document.getElementById('runBtn').addEventListener('click', () => this.runCode());
        document.getElementById('themeBtn').addEventListener('click', () => this.toggleTheme());
        document.getElementById('openFolderBtn').addEventListener('click', () => this.openWorkspace());

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
                switch (e.key) {
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

            // Ctrl+Shift+N para nuevo archivo
            if (e.ctrlKey && e.shiftKey && e.key === 'N') {
                e.preventDefault();
                this.showNewFileInput();
            }

            // Ctrl+Shift+F para nueva carpeta
            if (e.ctrlKey && e.shiftKey && e.key === 'F') {
                e.preventDefault();
                this.showNewFolderInput();
            }
        });
    }

    setupElectronEvents() {
        if (window.electronAPI) {
            // Eventos para Node.js
            window.electronAPI.onNodeJSResult((data) => {
                this.handleNodeJSResult(data);
            });

            window.electronAPI.onNpmResult((data) => {
                this.handleNpmResult(data);
            });

            window.electronAPI.onServerOutput((data) => {
                this.handleServerOutput(data);
            });

            window.electronAPI.onServerError((data) => {
                this.handleServerError(data);
            });

            window.electronAPI.onServerClosed((data) => {
                this.handleServerClosed(data);
            });

            // Eventos para archivos
            window.electronAPI.onFileRead((data) => {
                this.handleFileRead(data);
            });

            window.electronAPI.onFileWrite((data) => {
                this.handleFileWrite(data);
            });

            window.electronAPI.onFileList((data) => {
                this.handleFileList(data);
            });

            window.electronAPI.onFileCreated((data) => {
                this.handleFileCreated(data);
            });

            window.electronAPI.onFileDeleted((data) => {
                this.handleFileDeleted(data);
            });

            window.electronAPI.onFileChanged((data) => {
                this.handleFileChanged(data);
            });
        }
    }

    handleFileRead(data) {
        if (data.success) {
            const filePath = data.path;
            const content = data.content;

            // Actualizar el editor con el contenido del archivo
            this.editor.setValue(content);
            this.editor.setModelLanguage(monaco.editor.createModel(content), this.getLanguageFromFile(filePath));

            // Agregar a pestañas abiertas
            this.openTabs.set(filePath, {
                content: content,
                modified: false,
                language: this.getLanguageFromFile(filePath)
            });

            this.currentFile = filePath;
            this.updateStatusBar(filePath, this.getLanguageFromFile(filePath));
            this.log(`Archivo cargado: ${filePath}`, 'info');
        } else {
            this.log(`Error al leer archivo: ${data.error}`, 'error');
        }
    }

    handleFileWrite(data) {
        if (data.success) {
            this.log(`Archivo guardado: ${data.path}`, 'info');
            // Marcar como no modificado
            if (this.openTabs.has(data.path)) {
                this.openTabs.get(data.path).modified = false;
            }
        } else {
            this.log(`Error al guardar archivo: ${data.error}`, 'error');
        }
    }

    handleFileList(data) {
        if (data.success) {
            this.renderFileExplorer(data.files, data.folders);
            this.log(`Explorador actualizado: ${data.files.length} archivos, ${data.folders.length} carpetas`, 'info');
        } else {
            this.log(`Error al listar archivos: ${data.error}`, 'error');
        }
    }

    handleFileCreated(data) {
        if (data.success) {
            this.log(`Archivo creado: ${data.path}`, 'info');
            this.updateFileExplorer();
        } else {
            this.log(`Error al crear archivo: ${data.error}`, 'error');
        }
    }

    handleFileDeleted(data) {
        if (data.success) {
            this.log(`Archivo eliminado: ${data.path}`, 'info');
            // Remover de pestañas abiertas
            this.openTabs.delete(data.path);
            this.updateFileExplorer();
        } else {
            this.log(`Error al eliminar archivo: ${data.error}`, 'error');
        }
    }

    handleFileChanged(data) {
        // Archivo modificado externamente
        this.log(`Archivo modificado externamente: ${data.path}`, 'warning');
        // Recargar si está abierto
        if (this.openTabs.has(data.path) && this.currentFile === data.path) {
            this.loadFile(data.path);
        }
    }

    handleNodeJSResult(data) {
        if (data.success) {
            this.log(`Node.js ejecutado exitosamente:\n${data.output}`, 'success');
        } else {
            this.log(`Error en Node.js:\n${data.error}`, 'error');
        }
    }

    handleNpmResult(data) {
        if (data.success) {
            this.log(`npm ejecutado exitosamente:\n${data.output}`, 'success');
        } else {
            this.log(`Error en npm:\n${data.error}`, 'error');
        }
    }

    handleServerOutput(data) {
        // Agrega cada línea nueva al panel de salida, no reemplaza el contenido
        const outputContent = document.getElementById('outputContent');
        if (outputContent) {
            const div = document.createElement('div');
            div.className = 'output-message info';
            div.textContent = data.output;
            outputContent.appendChild(div);
            outputContent.scrollTop = outputContent.scrollHeight; // Auto-scroll
        }
        this.log(`Servidor: ${data.output}`, 'info');
    }

    handleServerError(data) {
        this.log(`Error del servidor: ${data.error}`, 'error');
    }

    handleServerClosed(data) {
        this.log('Servidor detenido', 'info');
        this.nodeProcess = null;
    }

    async loadFile(filePath) {
        try {
            if (window.electronAPI) {
                const result = await window.electronAPI.readFile(filePath);
                if (result && result.success) {
                    // Procesar el contenido directamente aquí
                    const content = result.content;
                    const language = this.getLanguageFromFile(filePath);

                    // Actualizar el editor con el contenido del archivo
                    this.editor.setValue(content);

                    // Configurar el lenguaje del modelo
                    const model = this.editor.getModel();
                    if (model) {
                        monaco.editor.setModelLanguage(model, language);
                    }

                    // Agregar a pestañas abiertas
                    this.openTabs.set(filePath, {
                        content: content,
                        modified: false,
                        language: language
                    });

                    this.currentFile = filePath;
                    this.updateStatusBar(filePath, language);
                    this.log(`Archivo cargado: ${filePath} (${language})`, 'info');
                } else {
                    this.log(`Error al leer archivo: ${result?.error || 'Error desconocido'}`, 'error');
                }
            } else {
                // Simulación para navegador
                this.log('Modo navegador - simulación de carga de archivo', 'info');
                const mockContent = `// Contenido simulado de ${filePath}\nconsole.log('Hola desde ${filePath}');`;
                const language = this.getLanguageFromFile(filePath);

                this.editor.setValue(mockContent);
                const model = this.editor.getModel();
                if (model) {
                    monaco.editor.setModelLanguage(model, language);
                }

                // Agregar a pestañas abiertas (esto faltaba)
                this.openTabs.set(filePath, {
                    content: mockContent,
                    modified: false,
                    language: language
                });

                this.currentFile = filePath;
                this.updateStatusBar(filePath, language);
            }
        } catch (error) {
            this.log('Error al cargar archivo: ' + error.message, 'error');
        }
    }

    updateFileContent() {
        if (this.currentFile && this.editor) {
            const content = this.editor.getValue();

            // Marcar como modificado
            if (this.openTabs.has(this.currentFile)) {
                this.openTabs.get(this.currentFile).content = content;
                this.openTabs.get(this.currentFile).modified = true;
            }
        }
    }

    updateCursorPosition() {
        if (this.editor) {
            const position = this.editor.getPosition();
            document.getElementById('cursorPosition').textContent =
                `Ln ${position.lineNumber}, Col ${position.column}`;
        }
    }

    getLanguageFromFile(filePath) {
        // Usar la configuración de lenguajes mejorada
        if (window.LanguageConfig) {
            return window.LanguageConfig.getLanguageFromFile(filePath);
        }

        // Fallback a la configuración básica
        const ext = filePath.split('.').pop().toLowerCase();
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
            'ts': 'typescript',
            'sql': 'sql',
            'txt': 'plaintext',
            'sh': 'shell',
            'bat': 'batch',
            'ps1': 'powershell',
            'rb': 'ruby',
            'go': 'go',
            'rs': 'rust',
            'swift': 'swift',
            'kt': 'kotlin',
            'scala': 'scala',
            'r': 'r',
            'm': 'matlab',
            'pl': 'perl',
            'lua': 'lua',
            'hs': 'haskell',
            'ml': 'ocaml',
            'fs': 'fsharp',
            'cs': 'csharp',
            'vb': 'vb',
            'asm': 'assembly',
            's': 'assembly',
            'yaml': 'yaml',
            'yml': 'yaml',
            'toml': 'toml',
            'ini': 'ini',
            'conf': 'conf',
            'log': 'log',
            'lock': 'json',
            'map': 'json'
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

    async updateFileExplorer() {
        if (!this.currentWorkspace) return;

        try {
            if (window.electronAPI) {
                const result = await window.electronAPI.listFiles(this.currentWorkspace);
                if (result && result.success) {
                    this.renderFileExplorer(result.files, result.folders);
                    this.log(`Explorador actualizado: ${result.files.length} archivos, ${result.folders.length} carpetas`, 'info');
                } else {
                    this.log('Error al listar archivos: ' + (result?.error || 'Error desconocido'), 'error');
                }
            } else {
                // Simulación para navegador
                this.renderFileExplorer(
                    ['index.html', 'style.css', 'script.js', 'package.json'],
                    ['src', 'public', 'assets']
                );
            }
        } catch (error) {
            this.log('Error al actualizar explorador: ' + error.message, 'error');
        }
    }

    async renderFileExplorer(files, folders) {
        const explorer = document.getElementById('fileExplorer');
        explorer.innerHTML = '';

        // Agregar botones de acción
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'explorer-actions';
        actionsDiv.innerHTML = `
            <button class="action-btn" onclick="astroIDE.showNewFileInput()" title="Nuevo archivo (Ctrl+Shift+N)">
                <i class="fas fa-file-plus"></i>
            </button>
            <button class="action-btn" onclick="astroIDE.showNewFolderInput()" title="Nueva carpeta (Ctrl+Shift+F)">
                <i class="fas fa-folder-plus"></i>
            </button>
            <button class="action-btn" onclick="astroIDE.refreshExplorer()" title="Actualizar">
                <i class="fas fa-sync-alt"></i>
            </button>
        `;
        explorer.appendChild(actionsDiv);

        // Verificar si hay contenido
        if ((!files || files.length === 0) && (!folders || folders.length === 0)) {
            const emptyDiv = document.createElement('div');
            emptyDiv.className = 'empty-explorer';
            emptyDiv.innerHTML = `
                <i class="fas fa-folder-open"></i>
                <p>Carpeta vacía</p>
                <small>Haz clic en los botones de arriba para crear archivos o carpetas</small>
            `;
            explorer.appendChild(emptyDiv);
            return;
        }

        // Crear estructura de árbol
        const treeContainer = document.createElement('div');
        treeContainer.className = 'file-tree';
        explorer.appendChild(treeContainer);

        // Renderizar carpetas como árbol
        if (folders && folders.length > 0) {
            folders.forEach(folder => {
                const folderPath = this.currentWorkspace + '/' + folder;
                const folderItem = this.createTreeFolderItem(folder, folderPath);
                treeContainer.appendChild(folderItem);
            });
        }

        // Renderizar archivos en el nivel raíz
        if (files && files.length > 0) {
            files.forEach(file => {
                const filePath = this.currentWorkspace + '/' + file;
                const fileItem = this.createTreeFileItem(file, filePath);
                treeContainer.appendChild(fileItem);
            });
        }
    }

    createTreeFolderItem(folderName, folderPath = null) {
        const folderItem = document.createElement('div');
        folderItem.className = 'tree-folder-item';
        folderItem.dataset.folder = folderName;

        // Si no se proporciona folderPath, construir desde el workspace
        if (!folderPath) {
            folderPath = this.currentWorkspace + '/' + folderName;
        }
        folderItem.dataset.path = folderPath;

        folderItem.innerHTML = `
            <div class="tree-item-content">
                <i class="fas fa-chevron-right tree-expand-icon"></i>
                <i class="fas fa-folder tree-folder-icon"></i>
                <span class="tree-item-name">${folderName}</span>
                <button class="tree-delete-btn" onclick="astroIDE.deleteFolder('${folderPath}')" title="Eliminar carpeta">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            <div class="tree-children" style="display: none;"></div>
        `;

        // Evento para expandir/contraer carpeta
        const expandIcon = folderItem.querySelector('.tree-expand-icon');
        const childrenContainer = folderItem.querySelector('.tree-children');

        expandIcon.addEventListener('click', async (e) => {
            e.stopPropagation();
            await this.toggleFolder(folderItem, folderName, folderPath);
        });

        // Evento para abrir carpeta (doble clic)
        folderItem.addEventListener('dblclick', (e) => {
            if (!e.target.classList.contains('tree-delete-btn') && !e.target.classList.contains('tree-expand-icon')) {
                this.openFolderInEditor(folderPath);
            }
        });

        return folderItem;
    }

    async toggleFolder(folderItem, folderName, folderPath) {
        const expandIcon = folderItem.querySelector('.tree-expand-icon');
        const childrenContainer = folderItem.querySelector('.tree-children');
        const folderIcon = folderItem.querySelector('.tree-folder-icon');

        if (childrenContainer.style.display === 'none') {
            // Expandir carpeta
            try {
                const result = await window.electronAPI.listFiles(folderPath);

                if (result && result.success) {
                    // Limpiar contenido anterior
                    childrenContainer.innerHTML = '';

                    // Agregar carpetas
                    if (result.folders && result.folders.length > 0) {
                        result.folders.forEach(subFolder => {
                            const subFolderItem = this.createTreeFolderItem(subFolder, folderPath + '/' + subFolder);
                            subFolderItem.style.marginLeft = '20px';
                            childrenContainer.appendChild(subFolderItem);
                        });
                    }

                    // Agregar archivos
                    if (result.files && result.files.length > 0) {
                        result.files.forEach(file => {
                            const filePath = folderPath + '/' + file;
                            const fileItem = this.createTreeFileItem(file, filePath);
                            fileItem.style.marginLeft = '20px';
                            childrenContainer.appendChild(fileItem);
                        });
                    }

                    // Cambiar iconos
                    expandIcon.classList.remove('fa-chevron-right');
                    expandIcon.classList.add('fa-chevron-down');
                    folderIcon.classList.remove('fa-folder');
                    folderIcon.classList.add('fa-folder-open');
                    childrenContainer.style.display = 'block';
                }
            } catch (error) {
                this.log('Error al expandir carpeta: ' + error.message, 'error');
            }
        } else {
            // Contraer carpeta
            expandIcon.classList.remove('fa-chevron-down');
            expandIcon.classList.add('fa-chevron-right');
            folderIcon.classList.remove('fa-folder-open');
            folderIcon.classList.add('fa-folder');
            childrenContainer.style.display = 'none';
        }
    }

    createTreeFileItem(fileName, filePath = null) {
        const fileItem = document.createElement('div');
        fileItem.className = 'tree-file-item';
        fileItem.dataset.file = fileName;

        // Si no se proporciona filePath, construir desde el workspace
        if (!filePath) {
            filePath = this.currentWorkspace + '/' + fileName;
        }
        fileItem.dataset.path = filePath;

        const icon = this.getFileIcon(fileName);

        fileItem.innerHTML = `
            <div class="tree-item-content">
                <i class="fas fa-file tree-file-icon ${icon}"></i>
                <span class="tree-item-name">${fileName}</span>
                <button class="tree-delete-btn" onclick="astroIDE.deleteFile('${filePath}')" title="Eliminar archivo">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;

        // Evento para abrir archivo
        fileItem.addEventListener('click', (e) => {
            if (!e.target.classList.contains('tree-delete-btn')) {
                if (this.openTabs.has(filePath)) {
                    this.loadFile(filePath);
                } else {
                    this.loadFile(filePath);
                }
            }
        });

        return fileItem;
    }

    getFileIcon(fileName) {
        const ext = fileName.split('.').pop().toLowerCase();
        const iconMap = {
            'js': 'fab fa-js-square',
            'ts': 'fab fa-js-square',
            'jsx': 'fab fa-react',
            'tsx': 'fab fa-react',
            'html': 'fab fa-html5',
            'htm': 'fab fa-html5',
            'css': 'fab fa-css3-alt',
            'scss': 'fab fa-sass',
            'sass': 'fab fa-sass',
            'less': 'fab fa-less',
            'json': 'fas fa-code',
            'xml': 'fas fa-code',
            'md': 'fas fa-file-alt',
            'txt': 'fas fa-file-alt',
            'py': 'fab fa-python',
            'java': 'fab fa-java',
            'c': 'fas fa-file-code',
            'cpp': 'fas fa-file-code',
            'cs': 'fas fa-file-code',
            'php': 'fab fa-php',
            'rb': 'fas fa-gem',
            'go': 'fas fa-file-code',
            'rs': 'fas fa-file-code',
            'swift': 'fas fa-file-code',
            'kt': 'fas fa-file-code',
            'sql': 'fas fa-database',
            'sh': 'fas fa-terminal',
            'bat': 'fas fa-terminal',
            'ps1': 'fas fa-terminal',
            'yml': 'fas fa-file-code',
            'yaml': 'fas fa-file-code',
            'toml': 'fas fa-file-code',
            'ini': 'fas fa-file-code',
            'cfg': 'fas fa-file-code',
            'conf': 'fas fa-file-code',
            'log': 'fas fa-file-alt',
            'lock': 'fas fa-lock',
            'gitignore': 'fab fa-git-alt',
            'dockerfile': 'fab fa-docker',
            'dockerignore': 'fab fa-docker',
            'env': 'fas fa-file-alt',
            'example': 'fas fa-file-alt',
            'sample': 'fas fa-file-alt',
            'test': 'fas fa-vial',
            'spec': 'fas fa-vial'
        };
        return iconMap[ext] || 'fas fa-file';
    }

    openFolderInEditor(folderPath) {
        // Abrir la carpeta en el explorador de archivos del sistema
        this.log(`Abriendo carpeta en explorador: ${folderPath}`, 'info');
        if (window.electronAPI) {
            window.electronAPI.openFolderInSystem(folderPath);
        }
    }

    openFolder(folderName) {
        // Función legacy - ahora se usa toggleFolder
        this.log(`Abriendo carpeta: ${folderName}`, 'info');
    }

    newFile() {
        this.showNewFileInput();
    }

    showNewFileInput() {
        const fileExplorer = document.getElementById('fileExplorer');
        const newFileInput = document.createElement('div');
        newFileInput.className = 'new-file-input';
        newFileInput.innerHTML = `
            <i class="fas fa-file"></i>
            <input type="text" placeholder="nombre.extension" class="file-name-input" autofocus>
            <button class="create-btn" title="Crear">✓</button>
            <button class="cancel-btn" title="Cancelar">✕</button>
        `;

        fileExplorer.appendChild(newFileInput);

        const input = newFileInput.querySelector('.file-name-input');
        const createBtn = newFileInput.querySelector('.create-btn');
        const cancelBtn = newFileInput.querySelector('.cancel-btn');

        // Enfocar el input
        input.focus();

        // Evento para crear archivo
        const createFile = async () => {
            const fileName = input.value.trim();
            if (fileName) {
                await this.createFile(fileName);
            }
            newFileInput.remove();
        };

        // Evento para cancelar
        const cancel = () => {
            newFileInput.remove();
        };

        // Eventos
        createBtn.addEventListener('click', createFile);
        cancelBtn.addEventListener('click', cancel);
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                createFile();
            } else if (e.key === 'Escape') {
                cancel();
            }
        });

        // Enfocar fuera para cancelar
        input.addEventListener('blur', () => {
            setTimeout(() => {
                if (document.activeElement !== input && document.activeElement !== createBtn && document.activeElement !== cancelBtn) {
                    cancel();
                }
            }, 100);
        });
    }

    async createFile(fileName) {
        try {
            // Validar nombre del archivo
            if (!fileName || fileName.trim() === '') {
                this.log('El nombre del archivo no puede estar vacío', 'error');
                return;
            }

            // Limpiar el nombre del archivo
            fileName = fileName.trim();

            // Verificar si el archivo ya existe (solo en modo navegador)
            if (!window.electronAPI) {
                // En modo navegador, verificar si ya está en pestañas abiertas
                const filePath = this.currentWorkspace + '/' + fileName;
                if (this.openTabs.has(filePath)) {
                    this.log(`El archivo ${fileName} ya está abierto`, 'warning');
                    return;
                }
            }

            // Verificar caracteres válidos
            const invalidChars = /[<>:"/\\|?*]/;
            if (invalidChars.test(fileName)) {
                this.log('El nombre del archivo contiene caracteres inválidos', 'error');
                return;
            }

            // Crear contenido por defecto según la extensión
            const ext = fileName.split('.').pop().toLowerCase();
            let defaultContent = '';

            switch (ext) {
                case 'js':
                    defaultContent = `// ${fileName}
console.log("¡Hola desde ${fileName}!");

// Tu código aquí
`;
                    break;
                case 'html':
                    defaultContent = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${fileName.replace('.html', '')}</title>
</head>
<body>
    <h1>¡Hola Mundo!</h1>
    <p>Este es el archivo ${fileName}</p>
</body>
</html>`;
                    break;
                case 'css':
                    defaultContent = `/* Estilos para ${fileName} */

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
}`;
                    break;
                case 'json':
                    defaultContent = `{
  "name": "${fileName.replace('.json', '')}",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \\"Error: no test specified\\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}`;
                    break;
                case 'md':
                    defaultContent = `# ${fileName.replace('.md', '')}

## Descripción

Este es el archivo ${fileName}.

## Uso

Describe cómo usar este archivo aquí.

## Ejemplos

\`\`\`javascript
// Ejemplo de código
console.log("Hola mundo");
\`\`\`
`;
                    break;
                case 'ts':
                    defaultContent = `// ${fileName}
console.log("¡Hola desde ${fileName}!");

// Tu código TypeScript aquí
`;
                    break;
                case 'py':
                    defaultContent = `# ${fileName}
print("¡Hola desde ${fileName}!")

# Tu código Python aquí
`;
                    break;
                case 'php':
                    defaultContent = `<?php
// ${fileName}
echo "¡Hola desde ${fileName}!";

// Tu código PHP aquí
?>`;
                    break;
                case 'java':
                    const className = fileName.replace('.java', '');
                    defaultContent = `public class ${className} {
    public static void main(String[] args) {
        System.out.println("¡Hola desde ${fileName}!");
    }
}`;
                    break;
                case 'cpp':
                    defaultContent = `#include <iostream>

int main() {
    std::cout << "¡Hola desde ${fileName}!" << std::endl;
    return 0;
}`;
                    break;
                case 'c':
                    defaultContent = `#include <stdio.h>

int main() {
    printf("¡Hola desde ${fileName}!\\n");
    return 0;
}`;
                    break;
                case 'sql':
                    defaultContent = `-- ${fileName}
-- Consultas SQL aquí

SELECT * FROM tabla_ejemplo;
`;
                    break;
                case 'xml':
                    defaultContent = `<?xml version="1.0" encoding="UTF-8"?>
<root>
    <title>${fileName.replace('.xml', '')}</title>
    <content>Contenido del archivo ${fileName}</content>
</root>`;
                    break;
                case 'txt':
                    defaultContent = `${fileName}

Este es un archivo de texto creado con AstroIDE.

Fecha de creación: ${new Date().toLocaleDateString()}
`;
                    break;
                default:
                    defaultContent = `// ${fileName}
// Archivo creado con AstroIDE

// Tu contenido aquí
`;
            }

            // Crear archivo real
            if (window.electronAPI) {
                const filePath = this.currentWorkspace + '/' + fileName;
                const result = await window.electronAPI.writeFile(filePath, defaultContent);
                if (result && result.success) {
                    this.log(`Archivo creado: ${fileName}`, 'success');

                    // Agregar a pestañas abiertas y cargar en el editor
                    const language = this.getLanguageFromFile(filePath);

                    this.openTabs.set(filePath, {
                        content: defaultContent,
                        modified: false,
                        language: language
                    });

                    this.currentFile = filePath;
                    this.editor.setValue(defaultContent);

                    const model = this.editor.getModel();
                    if (model) {
                        monaco.editor.setModelLanguage(model, language);
                    }

                    this.updateStatusBar(filePath, language);

                    // Actualizar el explorador después de crear el archivo
                    setTimeout(() => this.updateFileExplorer(), 100);
                } else {
                    this.log(`Error al crear archivo: ${result?.error || 'Error desconocido'}`, 'error');
                }
            } else {
                // Simulación para navegador
                this.log(`Archivo creado (simulación): ${fileName}`, 'success');

                // Agregar a pestañas abiertas y cargar en el editor
                const filePath = this.currentWorkspace + '/' + fileName;
                const language = this.getLanguageFromFile(filePath);

                this.openTabs.set(filePath, {
                    content: defaultContent,
                    modified: false,
                    language: language
                });

                this.currentFile = filePath;
                this.editor.setValue(defaultContent);

                const model = this.editor.getModel();
                if (model) {
                    monaco.editor.setModelLanguage(model, language);
                }

                this.updateStatusBar(filePath, language);
                this.updateFileExplorer();
            }

        } catch (error) {
            this.log('Error al crear archivo: ' + error.message, 'error');
        }
    }

    createFolder() {
        this.showNewFolderInput();
    }

    showNewFolderInput() {
        const fileExplorer = document.getElementById('fileExplorer');
        const newFolderInput = document.createElement('div');
        newFolderInput.className = 'new-folder-input';
        newFolderInput.innerHTML = `
            <i class="fas fa-folder"></i>
            <input type="text" placeholder="nombre-carpeta" class="folder-name-input" autofocus>
            <button class="create-btn" title="Crear">✓</button>
            <button class="cancel-btn" title="Cancelar">✕</button>
        `;

        fileExplorer.appendChild(newFolderInput);

        const input = newFolderInput.querySelector('.folder-name-input');
        const createBtn = newFolderInput.querySelector('.create-btn');
        const cancelBtn = newFolderInput.querySelector('.cancel-btn');

        // Enfocar el input
        input.focus();

        // Evento para crear carpeta
        const createFolder = async () => {
            const folderName = input.value.trim();
            if (folderName) {
                await this.createFolderStructure(folderName);
            }
            newFolderInput.remove();
        };

        // Evento para cancelar
        const cancel = () => {
            newFolderInput.remove();
        };

        // Eventos
        createBtn.addEventListener('click', createFolder);
        cancelBtn.addEventListener('click', cancel);
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                createFolder();
            } else if (e.key === 'Escape') {
                cancel();
            }
        });

        // Enfocar fuera para cancelar
        input.addEventListener('blur', () => {
            setTimeout(() => {
                if (document.activeElement !== input && document.activeElement !== createBtn && document.activeElement !== cancelBtn) {
                    cancel();
                }
            }, 100);
        });
    }

    async createFolderStructure(folderName) {
        try {
            // Validar nombre de la carpeta
            if (!folderName || folderName.trim() === '') {
                this.log('El nombre de la carpeta no puede estar vacío', 'error');
                return;
            }

            // Limpiar el nombre de la carpeta
            folderName = folderName.trim();

            // Verificar caracteres válidos
            const invalidChars = /[<>:"/\\|?*]/;
            if (invalidChars.test(folderName)) {
                this.log('El nombre de la carpeta contiene caracteres inválidos', 'error');
                return;
            }

            // Crear carpeta real
            if (window.electronAPI) {
                const folderPath = this.currentWorkspace + '/' + folderName;
                const result = await window.electronAPI.createFolder(folderPath);
                if (result && result.success) {
                    this.log(`Carpeta creada: ${folderName}`, 'success');
                    // Actualizar el explorador después de crear la carpeta
                    setTimeout(() => this.updateFileExplorer(), 100);
                } else {
                    this.log(`Error al crear carpeta: ${result?.error || 'Error desconocido'}`, 'error');
                }
            } else {
                // Simulación para navegador
                this.log(`Carpeta creada (simulación): ${folderName}`, 'success');
                this.updateFileExplorer();
            }

        } catch (error) {
            this.log('Error al crear carpeta: ' + error.message, 'error');
        }
    }

    async deleteFile(filePath) {
        const fileName = filePath.split(/[\\/]/).pop();
        if (confirm(`¿Estás seguro de que quieres eliminar ${fileName}?`)) {
            try {
                if (window.electronAPI) {
                    const result = await window.electronAPI.deleteFile(filePath);
                    if (result && result.success) {
                        this.log(`Archivo eliminado: ${fileName}`, 'info');
                        // Si era el archivo actual, cambiar a otro
                        if (this.currentFile === filePath) {
                            this.editor.setValue('// No hay archivos disponibles');
                            this.currentFile = null;
                            this.updateStatusBar('', '');
                        }
                        this.updateFileExplorer();
                    } else {
                        this.log(`Error al eliminar archivo: ${result?.error || 'Error desconocido'}`, 'error');
                    }
                } else {
                    // Simulación para navegador
                    this.log(`Archivo eliminado (simulación): ${fileName}`, 'info');
                    this.updateFileExplorer();
                }

            } catch (error) {
                this.log('Error al eliminar archivo: ' + error.message, 'error');
            }
        }
    }

    async deleteFolder(folderPath) {
        const folderName = folderPath.split(/[\\/]/).pop();
        if (confirm(`¿Estás seguro de que quieres eliminar la carpeta ${folderName} y todo su contenido?`)) {
            try {
                if (window.electronAPI) {
                    const result = await window.electronAPI.deleteFolder(folderPath);
                    if (result && result.success) {
                        this.log(`Carpeta eliminada: ${folderName}`, 'info');
                        this.updateFileExplorer();
                    } else {
                        this.log(`Error al eliminar carpeta: ${result?.error || 'Error desconocido'}`, 'error');
                    }
                } else {
                    // Simulación para navegador
                    this.log(`Carpeta eliminada (simulación): ${folderName}`, 'info');
                    this.updateFileExplorer();
                }

            } catch (error) {
                this.log('Error al eliminar carpeta: ' + error.message, 'error');
            }
        }
    }

    openFile() {
        this.log('Función de abrir archivo (implementar con Electron)', 'warning');
    }

    async saveFile() {
        if (!this.currentFile) {
            this.log('No hay archivo abierto para guardar', 'warning');
            return;
        }

        try {
            const content = this.editor.getValue();

            if (window.electronAPI) {
                const result = await window.electronAPI.writeFile(this.currentFile, content);
                if (result && result.success) {
                    this.log(`Archivo guardado: ${this.currentFile}`, 'info');
                    // Marcar como no modificado
                    if (this.openTabs.has(this.currentFile)) {
                        this.openTabs.get(this.currentFile).modified = false;
                    }
                } else {
                    this.log(`Error al guardar archivo: ${result?.error || 'Error desconocido'}`, 'error');
                }
            } else {
                // Simulación para navegador
                this.log(`Archivo guardado (simulación): ${this.currentFile}`, 'info');
                // Marcar como no modificado
                if (this.openTabs.has(this.currentFile)) {
                    this.openTabs.get(this.currentFile).modified = false;
                }
            }

        } catch (error) {
            this.log('Error al guardar archivo: ' + error.message, 'error');
        }
    }

    runCode() {
        const fileExt = this.currentFile.split('.').pop().toLowerCase();

        switch (fileExt) {
            case 'html':
                this.runHTML();
                break;
            case 'css':
                this.runCSS();
                break;
            case 'js':
                // Verificar si es código Node.js o JavaScript del navegador
                if (this.isNodeJSFile()) {
                    this.runNodeJS();
                } else {
                    this.runJavaScript();
                }
                break;
            case 'json':
                if (this.currentFile === 'package.json') {
                    this.installNpmPackages();
                } else {
                    this.log('Archivo JSON no ejecutable', 'warning');
                }
                break;
            default:
                this.log('Formato de archivo no soportado para ejecución', 'warning');
        }
    }

    isNodeJSFile() {
        const content = this.editor.getValue();
        // Verificar si el código usa módulos de Node.js
        const nodeKeywords = [
            'require(', 'module.exports', 'process.', 'fs.', 'http.',
            'path.', 'os.', 'crypto.', 'buffer.', 'events.', 'stream.',
            'util.', 'url.', 'querystring.', 'child_process.', 'cluster.',
            'dgram.', 'dns.', 'net.', 'tls.', 'tty.', 'v8.', 'vm.', 'zlib.'
        ];

        return nodeKeywords.some(keyword => content.includes(keyword));
    }

    runNodeJS() {
        try {
            this.log('Ejecutando código Node.js...', 'info');

            // Detener proceso anterior si existe
            if (this.nodeProcess) {
                this.nodeProcess.kill();
                this.nodeProcess = null;
            }

            // Crear archivo temporal
            const tempFile = `temp_${Date.now()}.js`;
            const tempContent = this.editor.getValue();

            // Ejecutar con Node.js usando Electron
            if (window.electronAPI) {
                window.electronAPI.runNodeJS(tempFile, this.editor.getValue());
            } else {
                // Fallback para navegador (simulado)
                this.simulateNodeJSExecution();
            }

            this.switchPanel('output');
            const outputContent = document.getElementById('outputContent');
            outputContent.innerHTML = `
                <div class="output-message success">
                    <i class="fas fa-check-circle"></i>
                    Código Node.js enviado para ejecución
                </div>
                <div class="output-message">
                    <strong>Archivo:</strong> ${tempFile}
                </div>
                <div class="output-message">
                    <strong>Estado:</strong> Ejecutándose...
                </div>
            `;

        } catch (error) {
            this.log('Error al ejecutar Node.js: ' + error.message, 'error');
            this.showError('Error al ejecutar Node.js', error.message);
        }
    }

    simulateNodeJSExecution() {
        this.log('Simulando ejecución de Node.js (modo navegador)', 'warning');
        this.switchPanel('output');
        const outputContent = document.getElementById('outputContent');
        outputContent.innerHTML = `
            <div class="output-message warning">
                <i class="fas fa-exclamation-triangle"></i>
                Ejecución de Node.js simulada (modo navegador)
            </div>
            <div class="output-message">
                <strong>Nota:</strong> Para ejecución completa de Node.js, usa la aplicación Electron
            </div>
            <div class="output-message">
                <strong>Comandos disponibles:</strong>
            </div>
            <div class="output-message">
                • npm install - Instalar dependencias
            </div>
            <div class="output-message">
                • npm start - Iniciar servidor
            </div>
            <div class="output-message">
                • node server.js - Ejecutar servidor
            </div>
        `;
    }

    installNpmPackages() {
        try {
            this.log('Instalando paquetes npm...', 'info');

            if (window.electronAPI) {
                window.electronAPI.installNpmPackages();
            } else {
                this.simulateNpmInstall();
            }

            this.switchPanel('output');
            const outputContent = document.getElementById('outputContent');
            outputContent.innerHTML = `
                <div class="output-message info">
                    <i class="fas fa-download"></i>
                    Instalando paquetes npm...
                </div>
                <div class="output-message">
                    <strong>Archivo:</strong> package.json
                </div>
                <div class="output-message">
                    <strong>Estado:</strong> Procesando dependencias
                </div>
            `;

        } catch (error) {
            this.log('Error al instalar paquetes: ' + error.message, 'error');
            this.showError('Error al instalar paquetes', error.message);
        }
    }

    simulateNpmInstall() {
        this.log('Simulando instalación de npm (modo navegador)', 'warning');
        this.switchPanel('output');
        const outputContent = document.getElementById('outputContent');
        outputContent.innerHTML = `
            <div class="output-message warning">
                <i class="fas fa-exclamation-triangle"></i>
                Instalación de npm simulada (modo navegador)
            </div>
            <div class="output-message">
                <strong>Paquetes detectados:</strong>
            </div>
            <div class="output-message">
                • express@^4.18.2
            </div>
            <div class="output-message">
                • cors@^2.8.5
            </div>
            <div class="output-message">
                • dotenv@^16.3.1
            </div>
            <div class="output-message">
                <strong>DevDependencies:</strong>
            </div>
            <div class="output-message">
                • nodemon@^3.0.1
            </div>
        `;
    }

    startNodeServer() {
        try {
            this.log('Iniciando servidor Node.js...', 'info');
            if (window.electronAPI) {
                window.electronAPI.startNodeServer();
            } else {
                this.simulateServerStart();
            }
            this.switchPanel('output');
            const outputContent = document.getElementById('outputContent');
            outputContent.innerHTML = `
                <div class="output-message success">
                    <i class="fas fa-server"></i>
                    Iniciando servidor Node.js...
                </div>
                <div class="output-message">
                    <strong>Estado:</strong> Iniciando...
                </div>
            `;
        } catch (error) {
            this.log('Error al iniciar servidor: ' + error.message, 'error');
            this.showError('Error al iniciar servidor', error.message);
        }
    }

    simulateServerStart() {
        this.log('Simulando inicio de servidor (modo navegador)', 'warning');
        this.switchPanel('output');
        const outputContent = document.getElementById('outputContent');
        outputContent.innerHTML = `
            <div class="output-message warning">
                <i class="fas fa-exclamation-triangle"></i>
                Inicio de servidor simulado (modo navegador)
            </div>
            <div class="output-message">
                <strong>Servidor:</strong> http://localhost:3000
            </div>
            <div class="output-message">
                <strong>Endpoints:</strong>
            </div>
            <div class="output-message">
                • GET / - Página principal
            </div>
            <div class="output-message">
                • GET /api/status - Estado del servidor
            </div>
            <div class="output-message">
                • GET /api/time - Hora actual
            </div>
        `;
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

            // Obtener contenido de todos los archivos (simulación para navegador)
            let htmlContent = '';
            let cssContent = '';
            let jsContent = '';

            if (window.electronAPI && this.currentWorkspace) {
                // En Electron, intentar leer los archivos reales
                try {
                    // TODO: Implementar lectura de archivos reales
                    this.log('Ejecutando proyecto completo desde archivos reales', 'info');
                } catch (error) {
                    this.log('Error al leer archivos del proyecto: ' + error.message, 'error');
                }
            } else {
                // En navegador, usar contenido simulado
                htmlContent = '<h1>Proyecto de ejemplo</h1><p>Este es un proyecto simulado</p>';
                cssContent = 'body { font-family: Arial, sans-serif; margin: 20px; }';
                jsContent = 'console.log("Proyecto ejecutado correctamente");';
            }

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
        this.updateFileExplorer();
        this.log('Explorador de archivos actualizado', 'info');
    }

    loadExternalFile(path, content) {
        const fileName = path.split('/').pop() || path.split('\\').pop();

        if (window.electronAPI) {
            // En Electron, guardar el archivo real
            const filePath = this.currentWorkspace + '/' + fileName;
            window.electronAPI.writeFile(filePath, content);
        } else {
            // En navegador, simular carga
            this.log(`Archivo externo cargado (simulación): ${fileName}`, 'info');
        }

        this.loadFile(fileName);
        this.updateFileExplorer();
    }
}

// Inicializar AstroIDE cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.astroIDE = new AstroIDE();
}); 