// Import dependencies
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

// Create Express app
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Set up a route
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Set up Socket.io connection
io.on("connection", (socket) => {
  console.log("A user connected.");

  // Handle events
  socket.on("chat message", (msg) => {
    console.log("Message:", msg);
    socket.broadcast.emit("chat message", msg); // Broadcast the message to all connected clients
  });

  socket.on("audio stream", (audioData) => {
    socket.broadcast.emit("audio stream", audioData); // Broadcast the audio stream to other connected clients
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected.");
  });
});

// Start the server
const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
