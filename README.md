# Series Tracker - Frontend

Cliente web con diseno Cyberpunk 2077 para gestion de series de TV.

Deploy en produccion: https://proy1-fullstack-front-end.vercel.app
Backend API: https://empowering-prosperity-production-d1ee.up.railway.app
Repositorio Backend: https://github.com/Adrian-24914/Proy1_Fullstack_BackEnd

<img width="1914" height="911" alt="image" src="https://github.com/user-attachments/assets/ba4f81c4-f378-47c3-babe-b14ca7dca473" />


---

Correr Localmente

Requisitos:
- Un servidor web local (Live Server, Python, Node.js, etc.)

Pasos:

1. Clonar repositorio
git clone https://github.com/Adrian-24914/Proy1_Fullstack_FrontEnd.git
cd Proy1_Fullstack_FrontEnd

2. Configurar URL del API (opcional para desarrollo local)
Editar js/config.js:
const CONFIG = {
  API_URL: 'http://localhost:8080'
};

3. Iniciar servidor local

Opcion A - Live Server (VS Code):
- Instalar extension "Live Server"
- Click derecho en index.html → "Open with Live Server"

Opcion B - Python:
python -m http.server 8000

Opcion C - Node.js:
npx http-server

4. Abrir en navegador: http://localhost:8000

---

Funcionalidades

- Listar todas las series
- Crear nueva serie
- Editar serie existente
- Eliminar serie
- Busqueda en tiempo real
- Filtrar por genero
- Exportar a CSV (sin librerias)
- Subir imagenes (max 1MB)
- Diseno responsive Cyberpunk 2077

---

Challenges Implementados

- Exportar CSV (20 pts) - Generado manualmente desde JavaScript sin librerias
- Upload de imagenes (30 pts) - Input de archivo con validacion de tamano

Total: 50 puntos

No Implementados:
- Exportar Excel .xlsx (30 pts)
- Sistema de Rating (30 pts)

---

CORS

Que es CORS?
CORS (Cross-Origin Resource Sharing) permite que el navegador acepte peticiones desde un origen distinto; el backend esta configurado para permitir peticiones desde este dominio.

Headers configurados en el backend:
Access-Control-Allow-Origin: https://proy1-fullstack-front-end.vercel.app
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type

---

Reflexion Tecnica

JavaScript Vanilla
Lo usaria de nuevo? Depende del proyecto

Pros:
- Cero dependencias, cero build time, cero configuracion
- Performance nativa del navegador
- Excelente para entender como funciona todo por debajo
- Deployment trivial (solo archivos estaticos)

Contras:
- Mucho codigo boilerplate comparado con React/Vue
- Manipulacion del DOM manual es verbosa
- Sin reactividad automatica (todo manual)
- Dificil de escalar en proyectos grandes

Conclusion: Perfecto para proyectos pequenos o educativos. Para proyectos grandes, usaria React o Vue.

Fetch API
Lo usaria de nuevo? Si

Pros:
- Nativo del navegador, no requiere librerias
- Sintaxis moderna con async/await
- Suficientemente potente para la mayoria de casos

Contras:
- Menos features que axios (interceptors, timeouts)
- Manejo de errores menos intuitivo

CSS Puro (sin frameworks)
Lo usaria de nuevo? Solo para proyectos especificos

Pros:
- Control total sobre cada pixel
- Sin clases innecesarias
- CSS Variables para theming funciona perfecto
- Clip-path permite efectos unicos (esquinas cortadas)

Contras:
- Mucho mas tiempo que usar Tailwind
- Dificil mantener consistencia en proyectos grandes
- Responsive design mas tedioso

Conclusion: El tema Cyberpunk quedo excelente, pero para proyectos reales usaria Tailwind para ahorrar tiempo.

Vercel
Lo usaria de nuevo? Absolutamente

Pros:
- Deploy automatico instantaneo
- Preview deployments por cada commit
- CDN global incluido
- Cero configuracion para sitios estaticos

Contras:
- Ninguno para este tipo de proyecto

---

Diseno Cyberpunk 2077

Inspirado en la interfaz del juego:
- Esquinas cortadas con clip-path polygon
- Paleta de colores: Rojo (#e8615a), Cyan (#2be4ea), Amarillo (#fed33f)
- Fuentes: Rajdhani (cuerpo) + VT323 (monospace)
- Efectos: Glows, lineas diagonales, grid animado de fondo

---

Estructura del Proyecto

Proy1_Fullstack_FrontEnd/
├── index.html
├── css/styles.css
├── js/
│   ├── config.js
│   ├── api.js
│   ├── ui.js
│   └── app.js
└── README.md

Autor: Adrian-24914
