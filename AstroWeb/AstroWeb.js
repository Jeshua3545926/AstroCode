/*const { contextBridge } = require('electron');
const path = require('path');

// Solo inicializar Monaco en Electron
if (window.navigator.userAgent.toLowerCase().indexOf('electron/') > -1) {
    window.addEventListener('DOMContentLoaded', () => {
        // Cargar Monaco Editor
        const script = document.createElement('script');
        script.src = path.join(__dirname, 'node_modules/monaco-editor/min/vs/loader.js');
        
        script.onload = () => {
            // Configurar el loader de Monaco
            window.require.config({
                paths: {
                    'vs': path.join(__dirname, 'node_modules/monaco-editor/min/vs') 
                }
            });

            // Cargar Monaco
            window.require(['vs/editor/editor.main'], function() {
                // Asegurarse de que el contenedor del editor tenga dimensiones
                const editorContainer = document.getElementById('monaco-editor');
                if (editorContainer) {
                    editorContainer.style.width = '100%';
                    editorContainer.style.height = '100%';
                }

                // Crear el editor con configuración mejorada
                const editor = window.monaco.editor.create(document.getElementById('monaco-editor'), {
                    value: '// Escribe tu código aquí\n\nfunction ejemplo() {\n    console.log("Hola Mundo");\n}',
                    language: 'javascript',
                    theme: 'vs-dark',
                    automaticLayout: true,
                    minimap: { enabled: true },
                    fontSize: 14,
                    fontFamily: "'Fira Code', 'Consolas', 'Courier New', monospace",
                    lineNumbers: 'on',
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    readOnly: false,
                    cursorStyle: 'line',
                    tabSize: 4,
                    insertSpaces: true,
                    wordWrap: 'on',
                    folding: true,
                    renderWhitespace: 'selection',
                    renderControlCharacters: true,
                    renderIndentGuides: true,
                    renderLineHighlight: 'all',
                    scrollbar: {
                        vertical: 'visible',
                        horizontal: 'visible',
                        useShadows: false,
                        verticalScrollbarSize: 10,
                        horizontalScrollbarSize: 10
                    }
                });

                // Exponer el editor y monaco globalmente
                window.editor = editor;
                window.monaco = window.monaco;

                // Asegurarse de que el editor se ajuste al contenedor
                window.addEventListener('resize', () => {
                    editor.layout();
                });

                // Forzar un layout inicial
                setTimeout(() => {
                    editor.layout();
                }, 100);

                // Actualizar la posición del cursor en la barra de estado
                editor.onDidChangeCursorPosition((e) => {
                    const position = e.position;
                    const statusItem = document.querySelector('.status-item:last-child');
                    if (statusItem) {
                        statusItem.textContent = `Ln ${position.lineNumber}, Col ${position.column}`;
                    }
                });
            });
        };

        document.head.appendChild(script);
    });
}

// Función global para cambiar el tema
window.changeTheme = function(theme) {
    if (window.monaco && window.editor) {
        window.monaco.editor.setTheme(theme);
    }
    if (window.settingsMenu) {
        window.settingsMenu.remove();
        window.settingsMenu = null;
    }
}

// Función para enviar mensaje a Gemini
function sendGeminiMessage() {
    const input = document.getElementById('gemini-input');
    const message = input.value.trim();
    
    if (message) {
        // Agregar mensaje del usuario
        addMessage(message, 'user');
        
        // Limpiar input
        input.value = '';
        
        // Simular respuesta de Gemini (esto se reemplazará con la API real)
        setTimeout(() => {
            addMessage('Lo siento, la integración con Gemini aún no está disponible.', 'assistant');
        }, 1000);
    }
}

// Función para agregar mensaje al chat
function addMessage(text, type) {
    const messagesContainer = document.getElementById('gemini-messages');
    const messageElement = document.createElement('div');
    messageElement.className = `message ${type}`;
    messageElement.textContent = text;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Event listener para enviar mensaje con Enter
document.getElementById('gemini-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendGeminiMessage();
    }
});

// Función para nueva conversación
function newGeminiConversation() {
    const messagesContainer = document.getElementById('gemini-messages');
    messagesContainer.innerHTML = '';
}

// Agregar event listener al botón de nueva conversación
document.querySelector('.Gemini-header .action-button[title="Nueva conversación"]').addEventListener('click', newGeminiConversation); 

*/