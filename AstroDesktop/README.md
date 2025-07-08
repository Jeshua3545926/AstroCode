# 🚀 AstroIDE - Editor de Código Completo

Un IDE moderno y funcional basado en Monaco Editor para desarrollo web, con soporte completo para HTML, CSS y JavaScript.

## ✨ Características Principales

### 🎯 **Editor Inteligente**
- **Monaco Editor** con resaltado de sintaxis completo
- **Autocompletado inteligente** para JavaScript, CSS y HTML
- **Detectión de errores** en tiempo real
- **Múltiples temas** (claro/oscuro)
- **Fuente Fira Code** para mejor legibilidad

### 🗂️ **Gestión de Archivos**
- **Explorador de archivos** lateral
- **Sistema de pestañas** para múltiples archivos
- **Nuevo archivo** (Ctrl+N)
- **Abrir archivo** (Ctrl+O)
- **Guardar archivo** (Ctrl+S)

### 🚀 **Ejecución de Código**
- **HTML**: Se abre en nueva ventana/pestaña
- **CSS**: Se aplica en tiempo real al IDE
- **JavaScript**: Se ejecuta con captura de console.log
- **Proyecto completo**: Combina HTML + CSS + JS

### 🎨 **Interfaz Moderna**
- Diseño inspirado en VS Code
- **Barra de herramientas** con botones funcionales
- **Panel inferior** con consola, problemas y salida
- **Barra de estado** con información del cursor
- **Responsive design** para diferentes pantallas

## 🎮 Cómo Usar

### **Atajos de Teclado**
- `Ctrl+N` - Nuevo archivo
- `Ctrl+O` - Abrir archivo
- `Ctrl+S` - Guardar archivo
- `F5` - Ejecutar proyecto completo
- `F6` - Ejecutar archivo actual
- `Ctrl+T` - Cambiar tema

### **Ejecutar Código**
1. **HTML**: Haz clic en el botón ▶️ o presiona F6
2. **CSS**: Se aplica automáticamente al IDE
3. **JavaScript**: Se ejecuta en la consola integrada
4. **Proyecto completo**: Presiona F5 o el botón 🚀

### **Navegación**
- Usa el **explorador lateral** para cambiar entre archivos
- Las **pestañas** muestran archivos abiertos
- El **panel inferior** muestra resultados y errores

## 📁 Estructura del Proyecto

```
AstroDesktop/
├── html/
│   └── index.html          # Interfaz principal del IDE
├── Js/
│   ├── main.js            # Proceso principal de Electron
│   ├── preload.js         # API segura para comunicación
│   └── ide.js             # Lógica del IDE
├── Style/
│   └── style.css          # Estilos del IDE
└── package.json           # Configuración del proyecto
```

## 🛠️ Instalación y Uso

### **Requisitos**
- Node.js (versión 14 o superior)
- npm o yarn

### **Instalación**
```bash
cd AstroDesktop
npm install
```

### **Ejecutar en Desarrollo**
```bash
npm start
```

### **Construir Aplicación**
```bash
npm run build
```

## 🎯 Funcionalidades Avanzadas

### **Ejecución de HTML**
- Se abre en nueva ventana del navegador
- Soporte completo para HTML5
- Incluye todos los elementos semánticos

### **Ejecución de CSS**
- Se aplica en tiempo real al IDE
- Botón para remover estilos temporales
- Contador de reglas CSS aplicadas

### **Ejecución de JavaScript**
- Captura de `console.log`, `console.error`, `console.warn`
- Ejecución segura en sandbox
- Mostrar resultados en panel de salida

### **Proyecto Completo**
- Combina automáticamente HTML + CSS + JS
- Crea una página web funcional completa
- Abre en nueva ventana con todos los recursos

## 🎨 Temas Disponibles

### **Tema Oscuro (Por defecto)**
- Fondo oscuro para mejor concentración
- Colores suaves para los ojos
- Alto contraste para mejor legibilidad

### **Tema Claro**
- Fondo claro para trabajo diurno
- Colores vibrantes
- Ideal para presentaciones

## 🔧 Configuración

### **Monaco Editor**
- Configurado para funcionar en Electron
- Workers cargados desde CDN
- Soporte completo para TypeScript/JavaScript

### **Seguridad**
- Context isolation habilitado
- Preload script para comunicación segura
- Content Security Policy configurado

## 🐛 Solución de Problemas

### **Monaco Editor no carga**
- Verificar conexión a internet
- Revisar consola para errores de CORS
- Reiniciar la aplicación

### **Workers no funcionan**
- Los workers se cargan desde CDN
- Fallback automático al hilo principal
- No afecta la funcionalidad básica

### **Errores de seguridad**
- Las advertencias son normales en desarrollo
- Se resuelven al empaquetar la aplicación
- No afectan la funcionalidad

## 🚀 Próximas Características

- [ ] Soporte para más lenguajes (Python, Java, etc.)
- [ ] Git integration
- [ ] Extensiones personalizables
- [ ] Terminal integrado
- [ ] Debugger avanzado
- [ ] Snippets de código
- [ ] Búsqueda y reemplazo global

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request.

---

**¡Disfruta programando con AstroIDE! 🎉** 