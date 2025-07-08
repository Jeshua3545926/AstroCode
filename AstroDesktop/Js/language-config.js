// Configuración de lenguajes y frameworks para AstroIDE
window.LanguageConfig = {
    // Mapeo de extensiones y nombres de archivo a lenguajes
    languageMap: {
        // JavaScript y TypeScript
        'js': 'javascript',
        'jsx': 'javascript',
        'mjs': 'javascript',
        'cjs': 'javascript',
        'ts': 'typescript',
        'tsx': 'typescript',
        
        // React y React Native
        'jsx': 'javascript',
        'tsx': 'typescript',
        
        // Vue
        'vue': 'vue',
        
        // HTML y CSS
        'html': 'html',
        'htm': 'html',
        'css': 'css',
        'scss': 'scss',
        'sass': 'sass',
        'less': 'less',
        
        // Python
        'py': 'python',
        'pyw': 'python',
        'pyi': 'python',
        
        // Java
        'java': 'java',
        'class': 'java',
        
        // C/C++
        'c': 'c',
        'cpp': 'cpp',
        'cc': 'cpp',
        'cxx': 'cpp',
        'h': 'cpp',
        'hpp': 'cpp',
        
        // C#
        'cs': 'csharp',
        
        // PHP
        'php': 'php',
        'phtml': 'php',
        
        // Ruby
        'rb': 'ruby',
        'erb': 'ruby',
        
        // Go
        'go': 'go',
        
        // Rust
        'rs': 'rust',
        
        // Swift
        'swift': 'swift',
        
        // Kotlin
        'kt': 'kotlin',
        'kts': 'kotlin',
        
        // Dart
        'dart': 'dart',
        
        // JSON y YAML
        'json': 'json',
        'yaml': 'yaml',
        'yml': 'yaml',
        
        // Markdown
        'md': 'markdown',
        'markdown': 'markdown',
        
        // SQL
        'sql': 'sql',
        
        // Shell
        'sh': 'shell',
        'bash': 'shell',
        'zsh': 'shell',
        'fish': 'shell',
        
        // PowerShell
        'ps1': 'powershell',
        
        // Batch
        'bat': 'batch',
        'cmd': 'batch',
        
        // Configuración
        'env': 'properties',
        'properties': 'properties',
        'ini': 'ini',
        'toml': 'toml',
        'xml': 'xml',
        
        // Vite y configuraciones de build
        'vite.config.js': 'javascript',
        'vite.config.ts': 'typescript',
        'vite.config.mjs': 'javascript',
        
        // React Native
        'app.json': 'json',
        'metro.config.js': 'javascript',
        'babel.config.js': 'javascript',
        
        // Vue config
        'vue.config.js': 'javascript',
        
        // Package managers
        'package.json': 'json',
        'package-lock.json': 'json',
        'yarn.lock': 'yaml',
        'pnpm-lock.yaml': 'yaml'
    },

    // Función para obtener el lenguaje basado en la ruta del archivo
    getLanguageFromFile(filePath) {
        const fileName = filePath.split('/').pop().toLowerCase();
        const extension = fileName.split('.').pop().toLowerCase();
        
        // Primero verificar nombres de archivo específicos
        if (this.languageMap[fileName]) {
            return this.languageMap[fileName];
        }
        
        // Luego verificar extensiones
        if (this.languageMap[extension]) {
            return this.languageMap[extension];
        }
        
        // Fallback a JavaScript
        return 'javascript';
    },

    // Configuración de autocompletado para diferentes lenguajes
    getAutocompleteConfig() {
        return {
            javascript: {
                snippets: [
                    // React snippets
                    {
                        label: 'rfc',
                        insertText: [
                            'import React from \'react\';',
                            '',
                            'const ${1:ComponentName} = () => {',
                            '\treturn (',
                            '\t\t<div>',
                            '\t\t\t${2}',
                            '\t\t</div>',
                            '\t);',
                            '};',
                            '',
                            'export default ${1:ComponentName};'
                        ].join('\n'),
                        documentation: 'React Functional Component'
                    },
                    {
                        label: 'rcc',
                        insertText: [
                            'import React, { Component } from \'react\';',
                            '',
                            'class ${1:ComponentName} extends Component {',
                            '\trender() {',
                            '\t\treturn (',
                            '\t\t\t<div>',
                            '\t\t\t\t${2}',
                            '\t\t\t</div>',
                            '\t\t);',
                            '\t}',
                            '}',
                            '',
                            'export default ${1:ComponentName};'
                        ].join('\n'),
                        documentation: 'React Class Component'
                    },
                    {
                        label: 'useState',
                        insertText: 'const [${1:state}, set${1/(.*)/${1:/capitalize}/}] = useState(${2:initialValue});',
                        documentation: 'React useState Hook'
                    },
                    {
                        label: 'useEffect',
                        insertText: [
                            'useEffect(() => {',
                            '\t${1}',
                            '}, [${2:dependencies}]);'
                        ].join('\n'),
                        documentation: 'React useEffect Hook'
                    },
                    {
                        label: 'useRef',
                        insertText: 'const ${1:ref} = useRef(${2:initialValue});',
                        documentation: 'React useRef Hook'
                    },
                    // JavaScript snippets
                    {
                        label: 'function',
                        insertText: [
                            'function ${1:functionName}(${2:params}) {',
                            '\t${3}',
                            '}'
                        ].join('\n'),
                        documentation: 'JavaScript Function'
                    },
                    {
                        label: 'arrow',
                        insertText: 'const ${1:functionName} = (${2:params}) => {',
                        documentation: 'Arrow Function'
                    },
                    {
                        label: 'console.log',
                        insertText: 'console.log(${1:message});',
                        documentation: 'Console Log'
                    }
                ]
            },
            
            typescript: {
                snippets: [
                    // TypeScript React snippets
                    {
                        label: 'rfc-ts',
                        insertText: [
                            'import React from \'react\';',
                            '',
                            'interface ${1:ComponentName}Props {',
                            '\t${2}',
                            '}',
                            '',
                            'const ${1:ComponentName}: React.FC<${1:ComponentName}Props> = ({ ${3} }) => {',
                            '\treturn (',
                            '\t\t<div>',
                            '\t\t\t${4}',
                            '\t\t</div>',
                            '\t);',
                            '};',
                            '',
                            'export default ${1:ComponentName};'
                        ].join('\n'),
                        documentation: 'TypeScript React Functional Component'
                    },
                    {
                        label: 'interface',
                        insertText: [
                            'interface ${1:InterfaceName} {',
                            '\t${2}',
                            '}'
                        ].join('\n'),
                        documentation: 'TypeScript Interface'
                    },
                    {
                        label: 'type',
                        insertText: 'type ${1:TypeName} = ${2};',
                        documentation: 'TypeScript Type'
                    },
                    {
                        label: 'enum',
                        insertText: [
                            'enum ${1:EnumName} {',
                            '\t${2}',
                            '}'
                        ].join('\n'),
                        documentation: 'TypeScript Enum'
                    }
                ]
            },
            
            vue: {
                snippets: [
                    {
                        label: 'vue-sfc',
                        insertText: [
                            '<template>',
                            '\t<div>',
                            '\t\t${1}',
                            '\t</div>',
                            '</template>',
                            '',
                            '<script>',
                            'export default {',
                            '\tname: \'${2:ComponentName}\',',
                            '\tdata() {',
                            '\t\treturn {',
                            '\t\t\t${3}',
                            '\t\t};',
                            '\t},',
                            '\tmethods: {',
                            '\t\t${4}',
                            '\t}',
                            '};',
                            '</script>',
                            '',
                            '<style scoped>',
                            '${5}',
                            '</style>'
                        ].join('\n'),
                        documentation: 'Vue Single File Component'
                    },
                    {
                        label: 'vue-composition',
                        insertText: [
                            '<template>',
                            '\t<div>',
                            '\t\t${1}',
                            '\t</div>',
                            '</template>',
                            '',
                            '<script setup>',
                            'import { ref, reactive, computed, onMounted } from \'vue\';',
                            '',
                            '${2}',
                            '</script>',
                            '',
                            '<style scoped>',
                            '${3}',
                            '</style>'
                        ].join('\n'),
                        documentation: 'Vue Composition API'
                    }
                ]
            },
            
            css: {
                snippets: [
                    {
                        label: 'flexbox',
                        insertText: [
                            'display: flex;',
                            'justify-content: ${1:center};',
                            'align-items: ${2:center};',
                            'flex-direction: ${3:row};'
                        ].join('\n'),
                        documentation: 'CSS Flexbox'
                    },
                    {
                        label: 'grid',
                        insertText: [
                            'display: grid;',
                            'grid-template-columns: ${1:repeat(auto-fit, minmax(200px, 1fr))};',
                            'grid-gap: ${2:1rem};'
                        ].join('\n'),
                        documentation: 'CSS Grid'
                    },
                    {
                        label: 'media-query',
                        insertText: [
                            '@media (max-width: ${1:768px}) {',
                            '\t${2}',
                            '}'
                        ].join('\n'),
                        documentation: 'CSS Media Query'
                    }
                ]
            },
            
            scss: {
                snippets: [
                    {
                        label: 'mixin',
                        insertText: [
                            '@mixin ${1:mixinName}(${2:params}) {',
                            '\t${3}',
                            '}'
                        ].join('\n'),
                        documentation: 'SCSS Mixin'
                    },
                    {
                        label: 'include',
                        insertText: '@include ${1:mixinName}(${2:params});',
                        documentation: 'SCSS Include'
                    },
                    {
                        label: 'nest',
                        insertText: [
                            '${1:parent} {',
                            '\t${2:child} {',
                            '\t\t${3}',
                            '\t}',
                            '}'
                        ].join('\n'),
                        documentation: 'SCSS Nesting'
                    }
                ]
            },
            
            html: {
                snippets: [
                    {
                        label: 'html5',
                        insertText: [
                            '<!DOCTYPE html>',
                            '<html lang="en">',
                            '<head>',
                            '\t<meta charset="UTF-8">',
                            '\t<meta name="viewport" content="width=device-width, initial-scale=1.0">',
                            '\t<title>${1:Document Title}</title>',
                            '</head>',
                            '<body>',
                            '\t${2}',
                            '</body>',
                            '</html>'
                        ].join('\n'),
                        documentation: 'HTML5 Template'
                    },
                    {
                        label: 'meta-viewport',
                        insertText: '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
                        documentation: 'Viewport Meta Tag'
                    }
                ]
            },
            
            python: {
                snippets: [
                    {
                        label: 'def',
                        insertText: [
                            'def ${1:function_name}(${2:params}):',
                            '\t${3}',
                            '\treturn ${4}'
                        ].join('\n'),
                        documentation: 'Python Function'
                    },
                    {
                        label: 'class',
                        insertText: [
                            'class ${1:ClassName}:',
                            '\tdef __init__(self, ${2:params}):',
                            '\t\tself.${3} = ${3}',
                            '\t\t${4}',
                            '',
                            '\tdef ${5:method_name}(self):',
                            '\t\t${6}'
                        ].join('\n'),
                        documentation: 'Python Class'
                    },
                    {
                        label: 'if-main',
                        insertText: [
                            'if __name__ == "__main__":',
                            '\t${1}'
                        ].join('\n'),
                        documentation: 'Python Main Guard'
                    }
                ]
            },
            
            json: {
                snippets: [
                    {
                        label: 'package.json',
                        insertText: [
                            '{',
                            '\t"name": "${1:project-name}",',
                            '\t"version": "${2:1.0.0}",',
                            '\t"description": "${3:Project description}",',
                            '\t"main": "${4:index.js}",',
                            '\t"scripts": {',
                            '\t\t"start": "${5:npm start}",',
                            '\t\t"test": "${6:npm test}"',
                            '\t},',
                            '\t"dependencies": {',
                            '\t\t${7}',
                            '\t}',
                            '}'
                        ].join('\n'),
                        documentation: 'Package.json Template'
                    }
                ]
            }
        };
    },

    // Configuraciones específicas para frameworks
    getFrameworkConfig() {
        return {
            react: {
                extensions: ['.jsx', '.tsx'],
                dependencies: ['react', 'react-dom'],
                devDependencies: ['@types/react', '@types/react-dom'],
                configFiles: ['package.json', 'tsconfig.json', 'vite.config.ts']
            },
            vue: {
                extensions: ['.vue'],
                dependencies: ['vue'],
                devDependencies: ['@vitejs/plugin-vue'],
                configFiles: ['vite.config.js', 'vue.config.js']
            },
            'react-native': {
                extensions: ['.jsx', '.tsx'],
                dependencies: ['react-native'],
                devDependencies: ['@types/react-native'],
                configFiles: ['app.json', 'metro.config.js', 'babel.config.js']
            },
            vite: {
                extensions: ['.js', '.ts', '.jsx', '.tsx', '.vue'],
                dependencies: [],
                devDependencies: ['vite'],
                configFiles: ['vite.config.js', 'vite.config.ts']
            }
        };
    },

    // Detectar framework basado en archivos del proyecto
    detectFramework(projectPath) {
        const frameworks = [];
        
        // Verificar package.json
        try {
            const packageJson = require(`${projectPath}/package.json`);
            const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };
            
            if (dependencies.react) frameworks.push('react');
            if (dependencies.vue) frameworks.push('vue');
            if (dependencies['react-native']) frameworks.push('react-native');
            if (dependencies.vite) frameworks.push('vite');
        } catch (e) {
            // package.json no existe
        }
        
        return frameworks;
    }
}; 