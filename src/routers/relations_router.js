var express = require("express");
var router = express.Router();
var Relations= require('../db/relations');
var auth = require('../middleware/auth_ware');

router.get("/rel/hello",function(req,res){
  res.send("hello from mongo db");
})


// add a friend to friend list ...
router.patch('/rel/addFriend',async function(req,res)
{
   var body = req.body;
   var {uid,sender} = body;
   var name = sender;
   var user = await Relations.find({name});
  //  console.log('user',user,'name',name);
   if(user.length == 0){
       console.log("inisde if");
       var name = sender;
       var RelObj = new Relations({name});
       //var RelObj = Relations.insertMany([{name}]);
       RelObj.isFriendWith.push({uid});
       var report = await RelObj.save();
      //  console.log(report)
       res.send(report);
   }
   else{
      //  console.log("inside else");
       var name = sender;
       var RelObj = await Relations.find({name});
      //  console.log(RelObj);
       RelObj = RelObj[0];
       RelObj.isFriendWith.push({uid});
       var report = await RelObj.save();
       //console.log(report)
       res.send(report);
   }
   
},(err,req,res,next)=>{
  res.status(400).send({error:err.message});
});


//delete a friend from user friend list...
router.patch('/rel/deleteFriend',async function(req,res)
{
   var body = req.body;
   var {uid,sender} = body;
   var name = sender;
   var user = await Relations.find({name});
  //  console.log('user',user,'name',name);
   
      //  console.log("inside else");
       var name = sender;
       var RelObj = await Relations.find({name});
      //  console.log(RelObj);
       RelObj = RelObj[0];
       //RelObj.isFriendWith.push({uid});
       RelObj.isFriendWith = RelObj.isFriendWith.filter((idObj)=>{
                                                                return idObj.uid != uid
                                                               })
       var report = await RelObj.save();
       //console.log(report)
       res.send(report);
   
   
},(err,req,res,next)=>{
  res.status(400).send({error:err.message});
});


//get a user list...
router.get('/rel/getFriend',async function(req,res){
  //var body = req.body;
  //console.log('body',req.query.sender);
  //var {sender} =  body;
  var name = req.query.sender;
  var user = await Relations.find({name});
  // console.log('getFriend',user,name);
  if(user.length == 0){
    //console.log("inside if");
    res.status(200).send([]);
  }
  else{
    //console.log("inside else");
    await Relations.find({name}).populate({
       path:'isFriendWith.uid',
       model:'Users',
       select:{
         'name':1,
         'email':1,
         'username':1
       }
      }).
    exec(async function (err, usr) {
      if (err) return handleError(err);
      // console.log('in population ' ,usr[0].isFriendWith);
      var report = await usr[0].save();
      //console.log('report',JSON.stringify(report));
      res.status(200).send(JSON.stringify(usr[0].isFriendWith));
    
    });
    
  }
})
module.exports = router;