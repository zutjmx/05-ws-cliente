import { connectToServer } from './socket-client';
import './style.css'

//import typescriptLogo from './typescript.svg'
//import { setupCounter } from './counter'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Cliente de Websockets</h1>
    <span id="server-status">OffLine</span>

    <ul id="clients-id"></ul>

  </div>
`
connectToServer();

//setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
