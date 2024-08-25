import React from 'react'
import { createRoot } from 'react-dom/client';
import './index.css'
import App from './App'
import { init } from '@neutralinojs/lib'

// function onWindowClose() {
//   Neutralino.app.exit();
// }
// Neutralino.events.on("windowClose", onWindowClose);

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

init();