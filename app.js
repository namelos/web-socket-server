import http from 'http';
import express from 'express';
import WS from 'ws';

const WSS = WS.Server;

const app = express();
app.use(express.static('.'));

const server = http.createServer();
const wss = new WSS({ port:4000 });

wss.broadcast = data =>
  wss.clients.forEach(client =>
    client.send(data));

wss.on('connection', ws => {
    ws.on('message', message => {
      console.log(message);
      wss.broadcast(message);
    });
});

app.listen(3000, () => console.log('listening at 3000...'));
