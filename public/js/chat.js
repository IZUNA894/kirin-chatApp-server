var socket = io();
//const Util = require("./util.js");
var form =  document.getElementById("msgForm")
var msgData= form.elements.namedItem("msgData");
var submit = form.elements.namedItem("submit-button");
var msgBoard = document.getElementById("msgBoard");

//submit.preventDefault();
//console.log(submit);
var qString = Qs.parse(location.search, { ignoreQueryPrefix: true });
sender = qString.name.split(" ").join(",").replace(",","").toLowerCase();

socket.emit('join', {sender});


submit.addEventListener("click",function(event){
  event.preventDefault();
  var msgVal = msgData.value;
  msgData.value = "";
  if(msgVal === "")
  return;
  //console.log(msgVal);
  $('.contact.active .preview').html('<span>You: </span>' + msgVal);
  $(".messages").animate({
    scrollTop: $(document).height()
  }, "fast");
  //firing event..
  sendMsg(msgVal);
})


socket.on("recieve",(msg,callback)=>{
  console.log("msg body received as:" , msg);
  addMsgToMsgBoard(msg, "replies");
  //msgBoard.innerHTML=msg.msg || msg.link;
  //callback();
});


socket.on("WelcomeGreetings",()=>{
  changeBanner("welcome");
});
socket.on("joined",()=>{
  changeBanner("joined");
})
socket.on("leave",()=>{
  changeBanner("disconnection");
})
socket.on("msgBlocked",()=>{
  changeBanner("msgBlocked");
})




function changeBanner(str)
{
  //initialising toastr library...
    toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "200",
    "hideDuration": "1000",
    "timeOut": "2000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }
 var title="";
 var message="";
switch(str)
  {
    case "welcome":{  toastr["info"]("welcome user!")
                    }
                    break;
    case "disconnection" :{ toastr["info"]("1 user left");
                          }
                    break;
    case "joined" : { toastr["success"]("1 user just joined")
                    }
                    break;
    case "msgBlocked" : { toastr["error"]("Sorry! foul language not allowed");
                        }
                    break;
    case "msgRead" : { toastr["success"]("message read");
                     }
                    break;
    }

}


//add incomming msg to msg BOard...
var msgBoardUl = msgBoard.getElementsByTagName("ul")[0];

function addMsgToMsgBoard(msg,route)
{
  var profilePicName=""
  if(route === "sent")
  {
    profilePicName=sender;
  }
  else{
    profilePicName = reciever;
  }
//console.log(msg);
  var ele = '<li class="' + route +  '">' +
            '<img src="http://emilcarlsson.se/assets/' + profilePicName + '.png" alt="" />' +
            "<p>" + msg.value +  '&nbsp;<span style="float:right ; color:grey ;font-size:10px;"> '
            + msg.time + "</span></p>" +
            '</li>';
  //console.log(msgBoardUl);
//  msgBoardUl.appendChild(ele);
$(ele).appendTo($('#msgBoardUl'));

}


function sendMsg(msg)
{
  var Msg = makeMsg(msg);
  //console.log("reciever is "+reciever)
  Msg.reciever=reciever;
  socket.emit("sendMsg",Msg,(success,error)=>{
    if(error){
      return;
    }
  else{
    addMsgToMsgBoard(Msg,"sent");

     }

  });

  //console.log(msg);
}


function readMsgBanner(){
  changeBanner("msgRead");
}


//console.log(location.search);
// rendering whole content panel here.....
var contactProfile = document.getElementById("contact-profile");
var profileImg = contactProfile.getElementsByTagName("img")[0];
var profileName= contactProfile.getElementsByTagName("p")[0];
// console.log(contactProfile);
// console.log(profileImg);
// console.log(profileName);

function renderMsgBoard(firstname,secondname)
{
 msgBoardUl.innerHTML="";
 profileImg.src="http://emilcarlsson.se/assets/"+firstname + secondname +".png"
 profileName.innerHTML=firstname+ " " + secondname;


 // var qs = document.createElement('script'); // Create new script element
 // qs.type = 'text/javascript'; // Set appropriate type
 // qs.src = 'https://cdnjs.cloudflare.com/ajax/libs/qs/6.9.1/qs.js'; // Load javascript file

//console.log(qs[0])

reciever= firstname+secondname;
reciever= reciever.toLowerCase();
console.log("sender: " ,sender);
console.log("receiver: " , reciever);



}
