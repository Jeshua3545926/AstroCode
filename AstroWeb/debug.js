// Variables globales para la depuración
let isDebugging = false;
let breakpoints = new Set();
let debugPanels = {
    breakpoints: true,
    variables: true,
    callStack: true
};

// Funciones para manejar los paneles de depuración
function toggleBreakpoints() {
    debugPanels.breakpoints = !debugPanels.breakpoints;
    updateDebugPanels();
}

function toggleVariables() {
    debugPanels.variables = !debugPanels.variables;
    updateDebugPanels();
}

function toggleCallStack() {
    debugPanels.callStack = !debugPanels.callStack;
    updateDebugPanels();
}

function updateDebugPanels() {
    const debugPanel = document.querySelector('.debug-panel');
    if (!debugPanel) return;

    const sections = debugPanel.querySelectorAll('.debug-section');
    sections.forEach(section => {
        const type = section.querySelector('h4').textContent.toLowerCase();
        if (type.includes('puntos')) {
            section.style.display = debugPanels.breakpoints ? 'block' : 'none';
        } else if (type.includes('variables')) {
            section.style.display = debugPanels.variables ? 'block' : 'none';
        } else if (type.includes('pila')) {
            section.style.display = debugPanels.callStack ? 'block' : 'none';
        }
    });
}

// Función para ejecutar el código
function runCode() {
    if (currentView !== 'debug') {
        changeView('debug');
    }
    
    const code = window.editor.getValue();
    const debugContent = document.querySelector('.debug-content');
    
    // Limpiar resultados anteriores
    debugContent.innerHTML = `
        <div class="debug-section">
            <h4>Consola</h4>
            <div class="console-container"></div>
        </div>
    `;
    
    const consoleContainer = debugContent.querySelector('.console-container');
    
    // Guardar la función console.log original
    const originalConsoleLog = console.log;
    const originalConsoleError = console.error;
    
    // Sobrescribir console.log para capturar la salida
    console.log = function(...args) {
        const output = document.createElement('div');
        output.className = 'console-output';
        output.textContent = args.map(arg => {
            if (typeof arg === 'object') {
                return JSON.stringify(arg, null, 2);
            }
            return String(arg);
        }).join(' ');
        consoleContainer.appendChild(output);
        originalConsoleLog.apply(console, args);
    };
    
    // Sobrescribir console.error para capturar errores
    console.error = function(...args) {
        const output = document.createElement('div');
        output.className = 'console-error';
        output.textContent = args.map(arg => {
            if (typeof arg === 'object') {
                return JSON.stringify(arg, null, 2);
            }
            return String(arg);
        }).join(' ');
        consoleContainer.appendChild(output);
        originalConsoleError.apply(console, args);
    };
    
    try {
        // Crear un contexto aislado para ejecutar el código
        const context = {
            console: console,
            setTimeout: setTimeout,
            setInterval: setInterval,
            clearTimeout: clearTimeout,
            clearInterval: clearInterval,
            Math: Math,
            Date: Date,
            JSON: JSON,
            Array: Array,
            Object: Object,
            String: String,
            Number: Number,
            Boolean: Boolean,
            RegExp: RegExp,
            Error: Error,
            Promise: Promise
        };
        
        // Ejecutar el código en el contexto aislado
        const wrappedCode = `
            (function() {
                try {
                    ${code}
                } catch (error) {
                    console.error(error);
                }
            })();
        `;
        
        const runFunction = new Function(...Object.keys(context), wrappedCode);
        runFunction(...Object.values(context));
        
    } catch (error) {
        console.error('Error al ejecutar el código:', error);
    } finally {
        // Restaurar las funciones originales de console
        console.log = originalConsoleLog;
        console.error = originalConsoleError;
    }
}

// Función para iniciar la depuración
function startDebugging() {
    if (currentView !== 'debug') {
        changeView('debug');
    }
    
    if (isDebugging) return;
    
    isDebugging = true;
    const debugPanel = document.querySelector('.debug-panel');
    if (debugPanel) {
        debugPanel.style.display = 'block';
    }
    
    const code = window.editor.getValue();
    const lines = code.split('\n');
    
    // Agregar puntos de interrupción
    lines.forEach((line, index) => {
        if (breakpoints.has(index + 1)) {
            console.log(`Punto de interrupción en línea ${index + 1}`);
        }
    });
    
    // Simular ejecución paso a paso
    let currentLine = 0;
    
    function executeStep() {
        if (currentLine < lines.length) {
            try {
                // Ejecutar línea actual
                const line = lines[currentLine];
                if (line.trim()) {
                    new Function(line)();
                }
                
                // Actualizar UI
                updateDebugUI(currentLine + 1);
                
                // Resaltar línea actual en el editor
                window.editor.deltaDecorations([], [{
                    range: new monaco.Range(currentLine + 1, 1, currentLine + 1, 1),
                    options: {
                        isWholeLine: true,
                        className: 'debug-line-highlight'
                    }
                }]);
                
                currentLine++;
                if (isDebugging) {
                    setTimeout(executeStep, 1000); // Pausa de 1 segundo entre líneas
                }
            } catch (error) {
                console.error('Error en línea', currentLine + 1, ':', error);
                isDebugging = false;
                
                // Mostrar error en la consola
                const consoleError = document.createElement('div');
                consoleError.className = 'console-error';
                consoleError.textContent = `Error en línea ${currentLine + 1}: ${error.message}`;
                document.querySelector('.debug-content').appendChild(consoleError);
            }
        } else {
            isDebugging = false;
        }
    }
    
    executeStep();
}

// Función para actualizar la UI de depuración
function updateDebugUI(currentLine) {
    // Actualizar lista de variables
    const variablesList = document.getElementById('variablesList');
    variablesList.innerHTML = `
        <div class="debug-item">
            <span class="debug-label">currentLine:</span>
            <span class="debug-value">${currentLine}</span>
        </div>
    `;
    
    // Actualizar pila de llamadas
    const callStack = document.getElementById('callStack');
    callStack.innerHTML = `
        <div class="debug-item">
            <span class="debug-label">Línea ${currentLine}</span>
        </div>
    `;
}

// Función para manejar puntos de interrupción
function toggleBreakpoint(lineNumber) {
    if (breakpoints.has(lineNumber)) {
        breakpoints.delete(lineNumber);
    } else {
        breakpoints.add(lineNumber);
    }
    updateBreakpointsList();
}

function updateBreakpointsList() {
    const breakpointsList = document.getElementById('breakpointsList');
    breakpointsList.innerHTML = Array.from(breakpoints).map(line => `
        <div class="debug-item">
            <span class="debug-label">Línea ${line}</span>
            <button class="debug-remove" onclick="toggleBreakpoint(${line})">
                <i class="ri-close-line"></i>
            </button>
        </div>
    `).join('');
}

// Event listeners para los botones de depuración
document.addEventListener('DOMContentLoaded', () => {
    const runButton = document.getElementById('runButton');
    const debugButton = document.getElementById('debugButton');
    const continueButton = document.getElementById('continueButton');
    const stopButton = document.getElementById('stopButton');

    if (runButton) runButton.addEventListener('click', runCode);
    if (debugButton) debugButton.addEventListener('click', startDebugging);
    if (continueButton) continueButton.addEventListener('click', () => {
        if (!isDebugging) startDebugging();
    });
    if (stopButton) stopButton.addEventListener('click', () => {
        isDebugging = false;
        const debugPanel = document.querySelector('.debug-panel');
        if (debugPanel) {
            debugPanel.style.display = 'none';
        }
    });

    // Event listener para agregar puntos de interrupción
    if (window.editor) {
        window.editor.onMouseDown((e) => {
            if (e.event.altKey) {
                const position = e.target.position;
                if (position) {
                    toggleBreakpoint(position.lineNumber);
                }
            }
        });
    }
}); 