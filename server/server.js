const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { GameState } = require('./gamestate');

// Create an Express app and HTTP server
const app = express();
const server = http.createServer(app);

// Set up Socket.IO
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ["GET", "POST"]},   
  connectionStateRecovery: {
      // the backup duration of the sessions and the packets
      maxDisconnectionDuration: 2 * 60 * 1000,
      // whether to skip middlewares upon successful recovery
      // idk what this is, it was in the docs
      skipMiddlewares: true,
    }});

// Serve static files (e.g., player and leaderboard HTML)
app.use(express.static('public'));

let game = new GameState();
let hostSocket = null;
let playerSockets = [];
let leaderboardSocket = null;

game.onGameStateChange(() => io.emit('gameStateChange', game.getGameState()));

// Listen for connections from clients
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  
  // Handling disconnections
  socket.on('disconnect', () => {
    console.log('A user disconnected');
    if(socket === hostSocket)
    {
      console.log("The host has disconnected");
    }
    else if (socket === leaderboardSocket)
    {
      console.log("The leaderboard has disconnected");
    }
    else 
    {
      console.log("A player has disconnected");
      playerSockets = playerSockets.filter(e => e !== socket);
      game.removePlayer(socket.id);
    }
  });

  socket.on('registerLeaderboard', () => {
    if(leaderboardSocket !== null)
      {
        console.log(`The leaderboard already has an active connection but received another connection request. Ignoring.`);
        return;
      }
    console.log(`The leaderboard has connected.`);
    leaderboardSocket = socket;
  })

  // Host functions
  socket.on('registerHost', (name) => {
    console.log(`The host has connected`);
    if(hostSocket !== null)
    {
      console.log(`The host already has an active connection but received another connection request. Ignoring.`);
      return;
    }
    hostSocket = socket;
  })

  socket.on('updateScore', (id, score) => {
    console.log(`Host has updated score for player ${name}`);
    game.updateScore(id, score);
  })

  socket.on('nextQuestion', () => {
    console.log('Host has requested next question');
    game.nextQuestion();
  })

  // Player functions
  socket.on('registerPlayer', (name) => {
    console.log(`A player named ${name}, socket id ${socket.id}, has registered.`);
    playerSockets.push(socket);
    game.addPlayer(name, socket.id);
  })

  socket.on('submitAnswer', (answer) => {
    console.log(`Player ID ${socket.id} has submitted answer: ${answer}`);
    game.submitAnswer(socket.id, answer);
  })
});

// Start the server
const PORT = 8000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
