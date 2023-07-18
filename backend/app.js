const { Server } = require('socket.io');
const { createServer } = require('http');

const PORT = 3001;
const httpServer = createServer();
const io = new Server(httpServer, { cors: { origin: '*' } });

io.on('connection', socket => {
  socket.on('chat-message', newMessage => {
    socket.broadcast.emit('chat-message', newMessage);
  });
});

httpServer.listen(PORT);
