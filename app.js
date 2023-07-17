const ws = new require('ws');

const wsServer = new ws.Server({ port: 4000 });

const clients = [];

wsServer.on('connection', newClient => {
  clients.push(newClient);
  newClient.send('Welcome');
  newClient.on('message', message => console.log(message.toString()));
  clients.forEach(client => {
    if (client !== newClient) client.send('New client connected');
  });
});
