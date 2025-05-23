# Stack Que Usaremos En Alguna Actualizacion

<div class="nav">
    <div class="nav-left">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="Logo" class="logo">
        <span class="version">v19.1</span>
    </div>
    <div class="nav-right">
        <a href="#learn">Aprender</a>
        <a href="#reference">Referencia</a>
        <a href="#community">Comunidad</a>
        <a href="#blog">Blog</a>
    </div>
</div>

<div class="hero">
    <h1>Stack Tecnológico</h1>
    <p class="subtitle">La biblioteca para interfaces de usuario web y nativas</p>
    <div class="cta-buttons">
        <a href="#learn" class="cta-primary">Aprender Stack</a>
        <a href="#reference" class="cta-secondary">Referencia API</a>
    </div>
</div>

<div class="features">
    <div class="feature">
        <h2>Crear interfaces de usuario a partir de componentes</h2>
        <p>Nuestro stack te permite construir interfaces de usuario a partir de piezas individuales llamadas componentes. Crea tus propios componentes como `Thumbnail`, `LikeButton`, y `Video`. Luego combínalos en pantallas, páginas y aplicaciones completas.</p>
</div>

<div class="tech-container">
    <div class="tech-card typescript">
        <div class="tech-icon">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript">
        </div>
        <h3>TypeScript</h3>
        <p>Desarrollo de aplicaciones empresariales robustas</p>
        <div class="tech-details">
            <ul>
                <li>Sistema de tipos avanzado</li>
                <li>Desarrollo escalable y mantenible</li>
                <li>Integración nativa con Electron</li>
                <li>Manejo de errores mejorado</li>
                <li>Autocompletado inteligente</li>
                <li>Documentación automática</li>
            </ul>
        </div>
    </div>
    <div class="tech-card react">
        <div class="tech-icon">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React">
        </div>
        <h3>React</h3>
        <p>Interfaces de usuario modernas y responsivas</p>
        <div class="tech-details">
            <ul>
                <li>Arquitectura basada en componentes</li>
                <li>Renderizado eficiente y optimizado</li>
                <li>Ecosistema empresarial robusto</li>
                <li>Virtual DOM de alto rendimiento</li>
                <li>Hooks y estados avanzados</li>
                <li>Testing integrado</li>
            </ul>
        </div>
    </div>
    <div class="tech-card electron">
        <div class="tech-icon">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/electron/electron-original.svg" alt="Electron">
        </div>
        <h3>Electron</h3>
        <p>Aplicaciones multiplataforma nativas</p>
        <div class="tech-details">
            <ul>
                <li>Desarrollo cross-platform profesional</li>
                <li>Acceso completo a APIs nativas</li>
                <li>Sistema de actualizaciones automáticas</li>
                <li>Integración profunda con Node.js</li>
                <li>Empaquetado y distribución simplificada</li>
                <li>Seguridad empresarial</li>
            </ul>
        </div>
    </div>
</div>

<div class="info-section">
    <h2>Información Adicional</h2>
    <table class="info-table">
        <thead>
            <tr>
                <th>Tecnología</th>
                <th>Descripción</th>
                <th>Enlace</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>TypeScript</td>
                <td>Lenguaje de programación que extiende JavaScript con tipos estáticos.</td>
                <td><a href="https://www.typescriptlang.org/" target="_blank">Visitar</a></td>
            </tr>
            <tr>
                <td>React</td>
                <td>Biblioteca de JavaScript para construir interfaces de usuario.</td>
                <td><a href="https://reactjs.org/" target="_blank">Visitar</a></td>
            </tr>
            <tr>
                <td>Electron</td>
                <td>Framework para construir aplicaciones de escritorio multiplataforma.</td>
                <td><a href="https://www.electronjs.org/" target="_blank">Visitar</a></td>
            </tr>
        </tbody>
    </table>
</div>

<style>
:root {
    --primary-color: #61dafb;
    --dark-bg: #282c34;
    --text-color: #ffffff;
    --code-bg: #1a1a1a;
}

body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: var(--dark-bg);
    color: var(--text-color);
}

.nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: var(--dark-bg);
    border-bottom: 1px solid rgba(255,255,255,0.1);
}

.nav-left {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.logo {
    width: 40px;
    height: 40px;
}

.version {
    color: var(--primary-color);
    font-size: 0.9rem;
}

.nav-right {
    display: flex;
    gap: 2rem;
}

.nav-right a {
    color: var(--text-color);
    text-decoration: none;
    font-size: 1rem;
}

.nav-right a:hover {
    color: var(--primary-color);
}

.hero {
    text-align: center;
    padding: 6rem 2rem;
    background: linear-gradient(139deg, 
        rgb(0, 0, 0),
        rgb(0, 54, 87),
        rgb(0, 0, 0)
    );
}

.hero h1 {
    font-size: 4rem;
    margin-bottom: 1rem;
}

.subtitle {
    font-size: 1.5rem;
    margin-bottom: 2rem;
}

.cta-buttons {
    display: flex;
    justify-content: center;
    gap: 1rem;
}

.cta-primary, .cta-secondary {
    padding: 1rem 2rem;
    border-radius: 5px;
    text-decoration: none;
    font-weight: bold;
    transition: all 0.3s ease;
}

.cta-primary {
    background-color: var(--primary-color);
    color: var(--dark-bg);
}

.cta-secondary {
    background-color: transparent;
    border: 2px solid var(--primary-color);
    color: var(--primary-color);
}

.features {
    padding: 4rem 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

.feature {
    margin-bottom: 4rem;
}

.feature h2 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
}

.code-example {
    background-color: var(--code-bg);
    padding: 2rem;
    border-radius: 10px;
    margin-top: 2rem;
    overflow-x: auto;
}

.tech-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

.tech-card {
    background: linear-gradient(165deg, #1a1a1a, #2a2a2a);
    border-radius: 15px;
    padding: 2rem;
    text-align: center;
    color: var(--text-color);
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
    transition: transform 0.3s ease;
}

.tech-card:hover {
    transform: translateY(-10px);
}

.tech-icon {
    font-size: 3rem;
    margin-bottom: 1.5rem;
}

.tech-icon img {
    width: 80px;
    height: 80px;
}

.tech-card h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: var(--primary-color);
}

.tech-details ul {
    list-style: none;
    padding: 0;
    text-align: left;
}

.tech-details li {
    margin: 0.5rem 0;
    color: #ddd;
}

.info-section {
    margin-top: 3rem;
    padding: 2rem;
    background: #1a1a1a;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    color: #fff;
}

.info-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
}

.info-table th, .info-table td {
    border: 1px solid #333;
    padding: 8px;
    text-align: left;
}

.info-table th {
    background-color: #2a2a2a;
}

.info-table a {
    color: #00a8ff;
    text-decoration: none;
}

.info-table a:hover {
    text-decoration: underline;
}

@media (max-width: 768px) {
    .nav {
        flex-direction: column;
        gap: 1rem;
    }
    
    .hero h1 {
        font-size: 2.5rem;
    }
    
    .cta-buttons {
        flex-direction: column;
    }
}
</style>

