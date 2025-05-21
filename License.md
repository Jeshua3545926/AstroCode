# 📄 Licencia MIT
# MIT License

<div align="center" class="license-header">
  <img src="https://img.shields.io/badge/License-MIT-2ea44f" alt="MIT License" class="license-badge"/>
  <br/>
  <h2 class="copyright-text">Copyright © 2024 [Nombre del titular de los derechos de autor]</h2>
</div>

<style>
:root {
  --bg-primary: #1a1a1a;
  --bg-secondary: #2d2d2d;
  --text-primary: #ffffff;
  --text-secondary: #b3b3b3;
  --accent-color: #2ea44f;
  --hover-color: #3fb55f;
  --shadow-color: rgba(0, 0, 0, 0.3);
}

body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
}

.license-header {
  padding: 2rem;
  background: linear-gradient(135deg, var(--bg-secondary) 0%, #1a1a1a 100%);
  border-radius: 10px;
  box-shadow: 0 4px 6px var(--shadow-color);
  transition: all 0.3s ease;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

.license-header:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 8px 15px var(--shadow-color);
}

.license-badge {
  transition: all 0.3s ease;
  filter: drop-shadow(0 2px 4px var(--shadow-color));
}

.license-badge:hover {
  transform: scale(1.1) rotate(5deg);
  filter: drop-shadow(0 4px 8px var(--shadow-color));
}

.copyright-text {
  color: var(--text-primary);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-shadow: 0 2px 4px var(--shadow-color);
}

.permission-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 10px;
}

.permission-cell {
  background: var(--bg-secondary);
  color: var(--text-primary);
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px var(--shadow-color);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.permission-cell::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: 0.5s;
}

.permission-cell:hover::before {
  left: 100%;
}

.permission-cell:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 8px 15px var(--shadow-color);
  background: var(--accent-color);
}

.warning-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 10px;
}

.warning-cell {
  background: #3a1a1a;
  color: var(--text-primary);
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px var(--shadow-color);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.warning-cell::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 0, 0, 0.2),
    transparent
  );
  transition: 0.5s;
}

.warning-cell:hover::before {
  left: 100%;
}

.warning-cell:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 8px 15px var(--shadow-color);
  background: #4a2a2a;
}

.footer {
  margin-top: 2rem;
  padding: 1rem;
  background: linear-gradient(135deg, var(--bg-secondary) 0%, #1a1a1a 100%);
  border-radius: 10px;
  box-shadow: 0 4px 6px var(--shadow-color);
  transition: all 0.3s ease;
}

.footer:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 15px var(--shadow-color);
}

.version-badge {
  transition: all 0.3s ease;
  filter: drop-shadow(0 2px 4px var(--shadow-color));
}

.version-badge:hover {
  transform: scale(1.1) rotate(5deg);
  filter: drop-shadow(0 4px 8px var(--shadow-color));
}
</style>

---

## Permisos

Se concede permiso, libre de cargos, a cualquier persona que obtenga una copia
de este software y de los archivos de documentación asociados (el "Software"), para utilizar
el Software sin restricción, incluyendo sin limitación los derechos a:

<div align="center">
  <table class="permission-table">
    <tr>
      <td class="permission-cell">📋 Usar</td>
      <td class="permission-cell">📋 Copiar</td>
      <td class="permission-cell">📋 Modificar</td>
      <td class="permission-cell">📋 Fusionar</td>
    </tr>
    <tr>
      <td class="permission-cell">📋 Publicar</td>
      <td class="permission-cell">📋 Distribuir</td>
      <td class="permission-cell">📋 Sublicenciar</td>
      <td class="permission-cell">📋 Vender</td>
    </tr>
  </table>
</div>

## Condiciones

El aviso de copyright anterior y este aviso de permiso se incluirán en todas
las copias o partes sustanciales del Software.

## Limitación de Responsabilidad

EL SOFTWARE SE PROPORCIONA "COMO ESTÁ", SIN GARANTÍA DE NINGÚN TIPO, EXPRESA O
IMPLÍCITA, INCLUYENDO PERO NO LIMITADO A GARANTÍAS DE:

<div align="center">
  <table class="warning-table">
    <tr>
      <td class="warning-cell">⚠️ COMERCIALIZACIÓN</td>
      <td class="warning-cell">⚠️ IDONEIDAD PARA UN PROPÓSITO PARTICULAR</td>
      <td class="warning-cell">⚠️ NO INFRACCIÓN</td>
    </tr>
  </table>
</div>

EN NINGÚN CASO LOS AUTORES O TITULARES DEL COPYRIGHT SERÁN RESPONSABLES DE NINGUNA RECLAMACIÓN,
DAÑOS U OTRAS RESPONSABILIDADES, YA SEA EN UNA ACCIÓN DE CONTRATO, AGRAVIO O
CUALQUIER OTRO MOTIVO, QUE SURJA DE O EN CONEXIÓN CON EL SOFTWARE O EL USO U
OTRO TIPO DE ACCIONES EN EL SOFTWARE.

---

<div align="center" class="footer">
  <sub>Desarrollado con 💚 y bajo la Licencia MIT</sub>
  <br/>
  <img src="https://img.shields.io/badge/Version-1.0-2ea44f" alt="Version 1.0" class="version-badge"/>
</div>