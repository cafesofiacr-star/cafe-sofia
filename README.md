# Café SofIA — prototipo en código

Este es tu prototipo de Café SofIA, ya convertido a un proyecto real de **React + Vite**, listo para abrir en Visual Studio Code y seguir construyendo con Claude Code.

## Qué incluye

- Menú con categorías y carrito de compra.
- Sección de Desafíos de ADEN (los cinco desafíos del Café SofIA).
- Asistente virtual SofIA (chat de ejemplo, en modo texto y voz simulada).
- Panel de Administrador con inventario, mínimos editables y pedidos automáticos a proveedores.

Todo el contenido (menú, inventario, textos del chat) usa **datos de ejemplo**, tal como en el prototipo del navegador. Conectar esto a datos reales es el siguiente paso del curso, con Claude Code.

## Cómo abrirlo y correrlo

1. Abre esta carpeta en Visual Studio Code (`Archivo → Abrir carpeta…`).
2. Abre una terminal dentro de VS Code (`Terminal → Nueva terminal`).
3. Instala las dependencias (solo la primera vez):

   ```
   npm install
   ```

4. Arranca el proyecto:

   ```
   npm run dev
   ```

5. Abre en tu navegador la dirección que te muestre la terminal (normalmente `http://localhost:5173`).

## Estructura del proyecto

```
cafe-sofia/
├─ index.html          punto de entrada de Vite
├─ package.json        dependencias y scripts (npm run dev / build)
├─ src/
│  ├─ main.jsx          arranca la aplicación React
│  ├─ App.jsx            componente principal (navegación y estado general)
│  ├─ data.js             menú, inventario, desafíos y textos de SofIA
│  ├─ utils.js            funciones auxiliares (formato de precios, estados)
│  ├─ icons.jsx            íconos e ilustraciones SVG reutilizables
│  ├─ index.css             estilos de todo el sitio
│  └─ components/
│     ├─ TopBar.jsx        barra de navegación
│     ├─ MenuView.jsx      vista del menú
│     ├─ DesafiosView.jsx  vista de los desafíos de ADEN
│     ├─ CartView.jsx      vista del carrito
│     ├─ AdminView.jsx     vista de Administrador
│     ├─ ChatWidget.jsx    asistente virtual SofIA
│     └─ Toast.jsx         aviso emergente de confirmación
```
