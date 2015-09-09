import http from 'http';
import express from 'express';
import WS from 'ws';

const WSS = WS.Server;

const app = express();
app.use(express.static('.'));

const server = http.createServer();
const wss = new WSS({ port:8000 });

wss.broadcast = data => {
  wss.clients.forEach(client => {
    client.send(JSON.stringify({
      id: wss.clients.indexOf(client),
      content: data,
      portrait: 'http://localhost:5000/jiongun.jpg',
      date: Date()
    }));
  })
};

wss.on('connection', ws => {
    ws.on('message', message => {
      console.log(message);
      wss.broadcast(message);
    });
});

app.listen(5000, () => console.log('listening at 5000...'));
