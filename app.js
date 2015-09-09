import http from 'http';
import express from 'express';
import WS from 'ws';

const WSS = WS.Server;

const app = express();
app.use(express.static('.'));

const server = http.createServer();
const wss = new WSS({ port:8000 });

var clients = [];

wss.on('connection', ws => {
  console.log('connected');
  clients.push(ws);
  ws.on('message', msg => {
    console.log(clients.indexOf(ws));
    sendAll(msg, ws);
  });
  ws.on('close', () => {
    console.log(clients.indexOf(ws) + ' disconnected');
    clients.splice(clients.indexOf(ws), 1);
  });
  ws.on('error', () => {
    console.log(clients.indexOf(ws) + ' errored');
    clients.splice(clients.indexOf(ws), 1);
  })
});

function sendAll(msg, ws) {
  for(var i = 0; i < clients.length; i ++) {
    var type;
    if (i === clients.indexOf(ws)) {
      type = 'self'
    } else {
      type = 'others'
    }

    clients[i].send(JSON.stringify({
      type: type,
      content: msg,
      portrait: 'http://localhost:5000/jiongun.jpg',
      date: Date.now()
    }))
  }
}



//wss.broadcast = data => {
//  wss.clients.forEach(client => {
//    var type;
//
//    client.send(JSON.stringify({
//
//      content: data,
//      portrait: 'http://localhost:5000/jiongun.jpg',
//      date: Date()
//    }));
//  })
//};
//
//wss.on('connection', ws => {
//    ws.on('message', message => {
//      console.log(message);
//      wss.broadcast(message);
//    });
//});

app.listen(5000, () => console.log('listening at 5000...'));
