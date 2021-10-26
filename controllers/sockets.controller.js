'use strict';

const socketController = socket => {
  console.log(`Client connected`, socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected', socket.id);
  });

  socket.on('send-message-from-client', (payload, callback) => {
    socket.broadcast.emit('send-message-from-server', payload);

    // Receive callback from client - Optional
    callback(payload.message);
  });
};

module.exports = {
  socketController,
};
