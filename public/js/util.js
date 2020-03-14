var addTimestamp = function(msg){
  var Msg = {};
  Msg.value =msg;
  //Msg.time = moment(new Date().getTime(),"LT");
  Msg.time = moment().format('LT');

  //console.log(Msg);
  return Msg;
};
function makeMsg(msg){
  var Msg = addTimestamp(msg);
  return Msg;
}

//module.exports = makeMsg;
