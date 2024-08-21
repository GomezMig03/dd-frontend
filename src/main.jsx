import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { init } from '@neutralinojs/lib'

// function onWindowClose() {
//   Neutralino.app.exit();
// }
// Neutralino.events.on("windowClose", onWindowClose);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

init();