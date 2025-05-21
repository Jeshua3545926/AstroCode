const express = require('express');
const cors = require('cors');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Directorio para almacenar las extensiones
const extensionsDir = path.join(__dirname, 'extensions');
if (!fs.existsSync(extensionsDir)) {
    fs.mkdirSync(extensionsDir);
}

// Obtener extensiones del marketplace
app.get('/api/extensions', async (req, res) => {
    try {
        const { query, category } = req.query;
        const response = await axios.get('https://marketplace.visualstudio.com/_apis/public/gallery/extensionquery', {
            params: {
                'api-version': '3.0-preview.1',
                'filters': JSON.stringify([{
                    criteria: [
                        { filterType: 7, value: category || 'recommended' },
                        { filterType: 8, value: query || '' }
                    ],
                    pageNumber: 1,
                    pageSize: 50,
                    sortBy: 0,
                    sortOrder: 0
                }])
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener extensiones' });
    }
});

// Instalar una extensión
app.post('/api/extensions/install', async (req, res) => {
    try {
        const { publisher, name, version } = req.body;
        const extensionId = `${publisher}.${name}`;
        
        // Descargar la extensión
        const response = await axios.get(
            `https://marketplace.visualstudio.com/_apis/public/gallery/publishers/${publisher}/vsextensions/${name}/${version}/vspackage`,
            { responseType: 'arraybuffer' }
        );

        // Guardar la extensión
        const extensionPath = path.join(extensionsDir, `${extensionId}.vsix`);
        fs.writeFileSync(extensionPath, response.data);

        // Instalar la extensión usando el comando de VS Code
        exec(`code --install-extension ${extensionPath}`, (error) => {
            if (error) {
                res.status(500).json({ error: 'Error al instalar la extensión' });
                return;
            }
            res.json({ message: 'Extensión instalada correctamente' });
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al instalar la extensión' });
    }
});

// Obtener extensiones instaladas
app.get('/api/extensions/installed', (req, res) => {
    exec('code --list-extensions', (error, stdout) => {
        if (error) {
            res.status(500).json({ error: 'Error al obtener extensiones instaladas' });
            return;
        }
        const extensions = stdout.split('\n').filter(Boolean);
        res.json(extensions);
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
}); 