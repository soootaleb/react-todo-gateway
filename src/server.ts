
import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';

const app = express();

//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

let clients = new Array<any>();

wss.on('connection', (ws: WebSocket) => {

    let client = {
        ws: ws,
        todos: new Array<string>()
    }

    clients.forEach(client => {
        client.ws.send(JSON.stringify({
            message: 'New client connected !'
        }))
    })

    clients.push(client)

    ws.on('message', (message: string) => {

        client.todos.push(JSON.parse(message))

        //log the received message and send it back to the client
        ws.send(JSON.stringify({
            message: 'You have ' + client.todos.length + ' todos'
        }));
    });
});

//start our server
server.listen(process.env.PORT || 8999, () => {
    console.log(`Server started on port 8999 :)`);
});