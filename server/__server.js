const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const PORT = 3000;

let routerHome = express.Router()
let routerLogin = express.Router()

const app = express();
const login = express();

// const clientPath = `${__dirname}/../client`;
const loginPath = `${__dirname}/../client/login.html`;

// console.log(`serving static from ${clientPath}`);
console.log(`serving static from ${loginPath}`);

routerHome.get('/', function(req, res, next){
  res.status(200);
  res.send("Welcome to root URL of Server");
})

app.get('/login', function(req, res, next){
  // res.render("login.html")
  res.sendFile(__dirname+'/../client/login.html')
})

app.use('/', express.static(loginPath));
// app.use('/login', express.static(loginPath));



// const server = http.createServer(app);
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (sock) => {
  console.log(sock)
});

server.on('error', (err) => {
  console.error('Server error:', err);
});

server.listen(PORT, (error) =>{
  if(!error)
      console.log("Server is Successfully Running, and App is listening on port "+ PORT)
  else 
      console.log("Error occurred, server can't start", error);
  }
);