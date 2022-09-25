import { Manager, Socket } from "socket.io-client";
import Swal from 'sweetalert2';

let socket: Socket;

export const connectToServer = (token: string) => {

    const manager = new Manager('https://zutjmx-teslo-nest-api.herokuapp.com/socket.io/socket.io.js',{
        extraHeaders: {
            hola: 'mundo',
            authentication: token
        }
    });
    
    socket?.removeAllListeners();
    socket = manager.socket('/');
    
    addListener();
}

const addListener = () => {
    const serverStatusLabel = document.querySelector('#server-status')!;
    const clientsUl = document.querySelector('#clients-id')!;
    const messageForm = document.querySelector<HTMLFormElement>('#message-form')!;
    const messageInput = document.querySelector<HTMLInputElement>('#message-input')!;
    const messagesUl = document.querySelector<HTMLUListElement>('#messages-ul')!;
    
    socket.on('connect', () => {
        console.log('conectado');
        serverStatusLabel.innerHTML = 'conectado';
    });

    socket.on('disconnect', () => {
        console.log('desconectado');
        serverStatusLabel.innerHTML = 'desconectado';
    });

    socket.on('clients-updated', (clients: string[]) => {
        let clientsHtml = '';
        clients.forEach(clientId => {
            clientsHtml += `
                <li>${clientId}</li>
            `
        });
        clientsUl.innerHTML = clientsHtml;
    });

    messageForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if(messageInput.value.trim().length <= 0) {
            Swal.fire(
                'Cliente WebSocket',
                'Se debe de capturar un mensaje',
                'info'
            );
            return;
        }
        socket.emit('message-from-client',{
            id: 'zutjmx', 
            message: messageInput.value
        });
        messageInput.value = '';
    });

    socket.on('message-from-server', (payload: {fullName: string, message: string}) => {
        const nuevoMensaje = `
            <li>
                <strong>${payload.fullName}</strong>
                <span>${payload.message}</span>
            </li>
        `;
        const li = document.createElement('li');
        li.innerHTML = nuevoMensaje;
        messagesUl.append(li);
    });

}