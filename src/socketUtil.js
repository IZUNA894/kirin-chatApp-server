var socketUtil = (io)=> {
var RawMsg = require('./db/rawMsg');
var Relations = require('./db/relations');
var RelMsg = require('./db/relMsg');
var User = require('./db/user_module');
const Filter= require("bad-words");
var filter = new Filter();

io.on("connection",(socket)=>{
    // if new user arrives...
          //sendGreetings(socket);
          // sendJoinedbanner(socket);
    //console.log("socket" , socket);
    socket.on('join', function (name) {
        socket.join(name.toString());
        console.log("joined"+ name);
      });
  
   // when msg is recieved...
    socket.on("sendMsg",async (msg,callback)=>{
      console.log("msg recieved");
      console.log(msg.val);
  
      if(filter.isProfane(msg.value))
      {
  
        //socket.emit("msgBlocked");
        callback(undefined,{error:"blocked!"});
      }
      else{
        callback("succes",undefined);
        console.log("msg recieved");
        console.log("sending msg to");
        console.log(msg.reciever);
        
        var reciever = msg.reciever;
        var sender = msg.sender;
        var val = msg.val;
        var tokenId="";
        var  MsgObj = new RawMsg({reciever:msg.reciever,sender:msg.sender,val:msg.val});
        MsgObj.save();

        if(sender.length < reciever.length)
        {
          tokenId=sender + reciever;
        }
        else{
        
          tokenId=reciever + sender;
        }

        var RelMsgObj = await RelMsg.findOne({tokenId});
        console.log(RelMsgObj);
        if(RelMsgObj == null){
          RelMsgObj = new RelMsg({tokenId,msgs:[{
            sender,reciever,val
          }]});
          RelMsgObj.save();
        }
        else{
          var msgsArray =  RelMsgObj.msgs;
          msgObj = {reciever,sender,val};
          msgsArray = [ ...msgsArray, msgObj];
          console.log(msgsArray);
          var result = await RelMsg.updateOne({tokenId} , { msgs: msgsArray });
          console.log(result);
        }
        //io.sockets.in(msg.reciever).emit('recieveMsg', msg);
  
        socket.broadcast.to(msg.reciever).emit("recieveMsg",msg);
      // callback(); 
      }
  
    })
  
  
   // if a user leave..
    socket.on("disconnect",()=>{
      //sendLeaveBanner(socket);
    });
  
    console.log("connection establlished");
  })

}

module.exports.socketUtil = socketUtil;