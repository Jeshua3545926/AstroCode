// Variables globales
let selectedNode: HTMLElement | null = null;
let isDragging: boolean = false;
let startX: number, startY: number;
let currentNodeType: string | null = null;
let nodes: Array<{
    element: HTMLElement;
    type: string;
    x: number;
    y: number;
    connections: Array<{
        element: HTMLElement;
        target: HTMLElement;
    }>;
}> = [];
let connections: Array<HTMLElement> = [];

// Inicializar el canvas
export function initFlowchart(): void {
    const canvas = document.getElementById('flowchart-canvas');
    if (!canvas) return;

    // Event listeners para los botones de la barra de herramientas
    document.querySelectorAll('.toolbar-button').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.toolbar-button').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentNodeType = button.getAttribute('title')?.toLowerCase() || null;
        });
    });

    // Event listeners para el canvas
    canvas.addEventListener('mousedown', handleCanvasMouseDown);
    canvas.addEventListener('mousemove', handleCanvasMouseMove);
    canvas.addEventListener('mouseup', handleCanvasMouseUp);
    canvas.addEventListener('click', handleCanvasClick);

    // Event listeners para los inputs de propiedades
    const textInput = document.getElementById('node-text') as HTMLInputElement;
    const colorInput = document.getElementById('node-color') as HTMLInputElement;
    const borderInput = document.getElementById('node-border') as HTMLInputElement;

    if (textInput) textInput.addEventListener('input', updateNodeText);
    if (colorInput) colorInput.addEventListener('input', updateNodeColor);
    if (borderInput) borderInput.addEventListener('input', updateNodeBorder);
}

// Crear un nuevo nodo
function createNode(type: string, x: number, y: number): HTMLElement {
    const node = document.createElement('div');
    node.className = `flowchart-node ${type}`;
    node.style.left = `${x}px`;
    node.style.top = `${y}px`;

    const content = document.createElement('div');
    content.className = 'node-content';
    content.textContent = getDefaultText(type);
    node.appendChild(content);

    const canvas = document.getElementById('flowchart-canvas');
    if (canvas) canvas.appendChild(node);

    nodes.push({
        element: node,
        type: type,
        x: x,
        y: y,
        connections: []
    });

    return node;
}

// Obtener texto por defecto según el tipo de nodo
function getDefaultText(type: string): string {
    switch(type) {
        case 'inicio': return 'Inicio';
        case 'proceso': return 'Proceso';
        case 'decisión': return '¿Decisión?';
        case 'entrada/salida': return 'Entrada/Salida';
        default: return 'Nodo';
    }
}

// Manejadores de eventos del canvas
function handleCanvasMouseDown(e: MouseEvent): void {
    const target = e.target as HTMLElement;
    if (target.classList.contains('flowchart-node')) {
        selectedNode = target;
        isDragging = true;
        startX = e.clientX - selectedNode.offsetLeft;
        startY = e.clientY - selectedNode.offsetTop;
        selectedNode.classList.add('selected');
    }
}

function handleCanvasMouseMove(e: MouseEvent): void {
    if (isDragging && selectedNode) {
        const x = e.clientX - startX;
        const y = e.clientY - startY;
        selectedNode.style.left = `${x}px`;
        selectedNode.style.top = `${y}px`;
        updateConnections(selectedNode);
    }
}

function handleCanvasMouseUp(): void {
    if (isDragging && selectedNode) {
        isDragging = false;
        const node = nodes.find(n => n.element === selectedNode);
        if (node) {
            node.x = parseInt(selectedNode.style.left);
            node.y = parseInt(selectedNode.style.top);
        }
    }
}

function handleCanvasClick(e: MouseEvent): void {
    const target = e.target as HTMLElement;
    if (target.id === 'flowchart-canvas' && currentNodeType) {
        const rect = target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        createNode(currentNodeType, x, y);
    }
}

// Actualizar propiedades del nodo
function updateNodeText(e: Event): void {
    const input = e.target as HTMLInputElement;
    if (selectedNode) {
        const content = selectedNode.querySelector('.node-content');
        if (content) content.textContent = input.value;
    }
}

function updateNodeColor(e: Event): void {
    const input = e.target as HTMLInputElement;
    if (selectedNode) {
        selectedNode.style.backgroundColor = input.value;
    }
}

function updateNodeBorder(e: Event): void {
    const input = e.target as HTMLInputElement;
    if (selectedNode) {
        selectedNode.style.borderWidth = `${input.value}px`;
    }
}

// Actualizar conexiones
function updateConnections(node: HTMLElement): void {
    const nodeData = nodes.find(n => n.element === node);
    if (!nodeData) return;

    nodeData.connections.forEach(conn => {
        const path = conn.element.querySelector('.connection-path') as SVGPathElement;
        const arrow = conn.element.querySelector('.connection-arrow') as SVGPathElement;
        if (path && arrow) {
            updateConnectionPath(path, arrow, node, conn.target);
        }
    });
}

// Actualizar la ruta de una conexión
function updateConnectionPath(
    path: SVGPathElement,
    arrow: SVGPathElement,
    source: HTMLElement,
    target: HTMLElement
): void {
    const sourceRect = source.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    const sourceX = sourceRect.left + sourceRect.width / 2;
    const sourceY = sourceRect.top + sourceRect.height / 2;
    const targetX = targetRect.left + targetRect.width / 2;
    const targetY = targetRect.top + targetRect.height / 2;

    const dx = targetX - sourceX;
    const dy = targetY - sourceY;
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;

    const pathData = `M ${sourceX} ${sourceY} L ${targetX} ${targetY}`;
    path.setAttribute('d', pathData);

    const arrowSize = 8;
    const arrowX = targetX - arrowSize * Math.cos(angle * Math.PI / 180);
    const arrowY = targetY - arrowSize * Math.sin(angle * Math.PI / 180);

    const arrowData = `M ${arrowX} ${arrowY} L ${targetX} ${targetY} L ${arrowX} ${arrowY}`;
    arrow.setAttribute('d', arrowData);
} 