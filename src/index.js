const express = require("express");
const path = require("path");
const http = require("http");
const socket = require("socket.io");
const Filter= require("bad-words");
const cors = require("cors");

var UserRouter = require("./routers/user_router");
var MsgRouter = require("./routers/msg_router");
var RelRouter = require("./routers/relations_router");

require('./db/mongoose');

var app = express();
var publicPath= path.join(__dirname , "../","/public");
var filter = new Filter();
var server = http.createServer(app);

app.use(express.json());
app.use(express.static(publicPath),(req,res,next)=>{
  next();
});
app.use(require("cors")());
app.use(
  cors({
    origin: ["http://localhost:3001"],
    credentials: true
  })
);

app.use(UserRouter);
app.use(MsgRouter);
app.use(RelRouter);

var io= socket(server)
const {socketUtil} = require('./socketUtil.js');
//console.log(socketUtil);
socketUtil(io);

app.get('/hello',function(req,res){
 res.end("hello from express sever req processing");
});

server.listen(3001,()=>{
  console.log("listening on port 3001");
});


// function readMsgBanner(socket)
// {
//   socket.emit("msgRead");
// }
// function sendGreetings(socket){
//   socket.emit("WelcomeGreetings");
// }

// function sendJoinedbanner(socket)
// {
//   socket.broadcast.emit("joined");
// }
// function sendAlert(e){
//   socket.broadcast.emit("alert",e);
// }
// function sendLeaveBanner(socket){
//   socket.broadcast.emit("leave");
// }
