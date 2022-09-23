import { connectToServer } from './socket-client';
import Swal from 'sweetalert2';
import './style.css'

//import typescriptLogo from './typescript.svg'
//import { setupCounter } from './counter'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h2>Cliente de Websockets</h2>

    <input placeholder="JSON Web Token" id="jwt-token"/>
    <button id="btn-conectar">Conectar</button>
    <br/>

    <span id="server-status">OffLine</span>

    <ul id="clients-id"></ul>

    <form id="message-form">
      <input placeholder="mensaje" id="message-input"/>
    </form>

    <h3>Mensajes</h3>
    <ul id="messages-ul"></ul>

  </div>
`
//connectToServer();
//setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

const jwtToken = document.querySelector<HTMLInputElement>('#jwt-token')!;
const btnConectar = document.querySelector<HTMLButtonElement>('#btn-conectar')!;

btnConectar.addEventListener('click', () => {
  if(jwtToken.value.trim().length <= 0) {
    Swal.fire(
      'Cliente WebSocket',
      'Se requiere un JSON Web Token válido',
      'info'
    );
    return;
  }
  connectToServer(jwtToken.value.trim());
});
