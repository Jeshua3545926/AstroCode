# Soporte para Frameworks en AstroIDE

AstroIDE ahora incluye soporte completo para los frameworks y herramientas más populares del ecosistema JavaScript/TypeScript.

## 🚀 Frameworks Soportados

### React
- **Extensiones**: `.jsx`, `.tsx`
- **Snippets disponibles**:
  - `rfc` - React Functional Component
  - `rcc` - React Class Component
  - `useState` - React useState Hook
  - `useEffect` - React useEffect Hook
  - `useRef` - React useRef Hook

### Vue
- **Extensiones**: `.vue`
- **Snippets disponibles**:
  - `vue-sfc` - Vue Single File Component (Options API)
  - `vue-composition` - Vue Composition API

### TypeScript
- **Extensiones**: `.ts`, `.tsx`
- **Snippets disponibles**:
  - `rfc-ts` - TypeScript React Functional Component
  - `interface` - TypeScript Interface
  - `type` - TypeScript Type
  - `enum` - TypeScript Enum

### Vite
- **Archivos de configuración**: `vite.config.js`, `vite.config.ts`, `vite.config.mjs`
- **Soporte para plugins**: React, Vue, y otros plugins populares
- **Configuración automática** para desarrollo y build

### React Native
- **Extensiones**: `.jsx`, `.tsx`
- **Archivos de configuración**: `app.json`, `metro.config.js`, `babel.config.js`
- **Snippets específicos** para componentes móviles

## 📁 Estructura de Ejemplos

```
AstroDesktop/examples/
├── react-app/          # React + TypeScript + Vite
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── src/
│       ├── App.tsx
│       └── App.css
├── vue-app/            # Vue 3 + TypeScript + Vite
│   ├── package.json
│   └── src/
│       └── App.vue
└── react-native-app/   # React Native + TypeScript
    ├── package.json
    └── App.tsx
```

## 🎯 Características Implementadas

### 1. Detección Automática de Lenguajes
- Mapeo de más de 100 extensiones de archivo
- Detección por nombre de archivo específico
- Soporte para archivos de configuración

### 2. Autocompletado Inteligente
- Snippets específicos para cada framework
- Autocompletado contextual
- Documentación integrada

### 3. Configuración de Editor
- Sintaxis highlighting optimizado
- Configuración específica por lenguaje
- Soporte para TypeScript avanzado

### 4. Explorador de Archivos
- Estructura de árbol expandible
- Iconos específicos por tipo de archivo
- Navegación intuitiva

## 🔧 Configuración

### Archivo de Configuración
El archivo `language-config.js` contiene toda la configuración de lenguajes y frameworks:

```javascript
window.LanguageConfig = {
    // Mapeo de extensiones
    languageMap: { ... },
    
    // Función de detección
    getLanguageFromFile(filePath) { ... },
    
    // Configuración de autocompletado
    getAutocompleteConfig() { ... },
    
    // Configuración de frameworks
    getFrameworkConfig() { ... }
}
```

### Integración con Monaco Editor
El editor se configura automáticamente para:
- Detectar el lenguaje correcto
- Aplicar snippets apropiados
- Mostrar autocompletado contextual
- Resaltar sintaxis correctamente

## 📝 Uso

### Abrir un Proyecto
1. Haz clic en "Abrir carpeta" en la barra de herramientas
2. Selecciona la carpeta de tu proyecto
3. El explorador mostrará la estructura de archivos
4. Haz doble clic en cualquier archivo para abrirlo

### Crear Nuevos Archivos
1. Haz clic en el botón "Nuevo archivo" en el explorador
2. Escribe el nombre con la extensión correcta (ej: `Component.tsx`)
3. El editor detectará automáticamente el lenguaje

### Usar Snippets
1. Abre un archivo del framework correspondiente
2. Escribe el trigger del snippet (ej: `rfc` para React)
3. Presiona Tab para expandir el snippet
4. Navega entre los campos con Tab

## 🎨 Temas y Personalización

### Temas Disponibles
- **vs-dark** (por defecto)
- **vs-light**
- **hc-black** (alto contraste)

### Configuración del Editor
- Fuente: Fira Code con ligaduras
- Tamaño de fuente: 14px
- Tab size: 4 espacios
- Autoguardado habilitado
- Minimap habilitado

## 🚀 Próximas Mejoras

- [ ] Soporte para más frameworks (Angular, Svelte, etc.)
- [ ] Integración con ESLint y Prettier
- [ ] Debugger integrado
- [ ] Terminal integrado
- [ ] Git integration
- [ ] Extensiones personalizables

## 📚 Recursos

- [Documentación de React](https://react.dev/)
- [Documentación de Vue](https://vuejs.org/)
- [Documentación de TypeScript](https://www.typescriptlang.org/)
- [Documentación de Vite](https://vitejs.dev/)
- [Documentación de React Native](https://reactnative.dev/)

---

**AstroIDE** - Tu editor de código moderno para el desarrollo web y móvil. 