const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

// Create an Express app and HTTP server
const app = express();
const server = http.createServer(app);

// Set up Socket.IO
const io = new Server(server, {cors: {
    origin: '*',
    methods: ["GET", "POST"]
}});

// Serve static files (e.g., player and leaderboard HTML)
app.use(express.static('public'));

let players = [];

// Listen for connections from clients
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  players = [...players, socket];
  console.log(players.length);

  // Handling disconnections
  socket.on('disconnect', () => {
    console.log('A user disconnected');
    players = players.filter(e => e !== socket);
  });

  // Handling disconnections
  socket.on('foo', (text) => {
    console.log(text);
    console.log(players);
    players.forEach(e => e.emit('foo', text));
  });
});

// Start the server
const PORT = 8000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
