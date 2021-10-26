'use strict';

const express = require('express');
const cors = require('cors');

const { PORT } = require('../config');
const { socketController } = require('../controllers/sockets.controller');

class Server {
  constructor() {
    this.app = express();
    this.port = PORT;
    this.server = require('http').createServer(this.app);
    this.io = require('socket.io')(this.server); // All sockets

    this.paths = {};

    // Middlerares
    this.middlewares();

    // Routes
    this.routes();

    // Sockets
    this.sockets();
  }

  middlewares() {
    // Cors
    this.app.use(cors());

    // Static directory
    this.app.use(express.static('public'));
  }

  routes() {
    // this.app.use(this.paths.uploads, uploadRouter);
  }

  sockets() {
    this.io.on('connection', socketController);
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Server on port ${this.port}`);
    });
  }
}

module.exports = new Server();
