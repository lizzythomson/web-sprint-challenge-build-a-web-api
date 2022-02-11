const express = require('express');
const server = express();

const projectRouter = require('./projects/projects-router');
const actionRouter = require('./actions/actions-router');

server.use(express.json());

server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Hooray for Backend!</h2>`);
});

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;
