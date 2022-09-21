import { Manager, Socket } from "socket.io-client";

export const connectToServer = () => {

    const manager = new Manager('http://localhost:3000/socket.io/socket.io.js');
    const socket = manager.socket('/');
    
    addListener(socket);
}

const addListener = (socket: Socket) => {
    const serverStatusLabel = document.querySelector('#server-status')!;
    const clientsUl = document.querySelector('#clients-id')!;
    
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

}