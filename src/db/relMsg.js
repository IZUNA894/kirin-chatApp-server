var validator= require('validator');
var mongoose= require('mongoose');
//var bcrypt = require('bcryptjs');
//var jwt = require("jsonwebtoken");
//const Task = require("./task_module");
var userSchema  = new mongoose.Schema({
  tokenId:{
      required:true,
      type:String,
      trim:true
  },
  msgs:[
    {
        sender: {
            required:true,
            type:String,
            trim:true,
        },
        reciever: {
            required:true,
            type:String,
            trim:true,
        },
        val:{
            type:String,
            required:true,
            trim:true,
        }
      
    }
  ]
  
},
{
  timestamps:true
} );

// userSchema.virtual("tasks",{
//   ref:'Task',
//   localField:"_id",
//   foreignField:"owner"
// });

userSchema.pre('save' , async function(next){
  var user = this;

  // var isFound = await User.findOne({email:user.email});
  // if(isFound){
  //   console.log(isFound);
  //   throw new Error("email is taken");
  //
  // }

//   var hashedPass ="";
//   if(user.isModified('password'))
//   {
//    hashedPass =  await bcrypt.hash(user.password,8);
//    //console.log(hashedPass);
//    user.password =hashedPass;
//   }
  next();
});




// userSchema.methods.getAuthToken = async function(){
//   var user = this;
//   var token = await jwt.sign({_id:user._id.toString()},"secretkey");
//   user.tokens= user.tokens.concat({token});
//   await user.save();
//   return token;

// }

// userSchema.methods.toJSON = function (){
//   var user= this;
//   user = user.toObject();
//   // delete user.tokens;
//   // delete user.password;
//   // delete user.__v;
//   // delete user.avatar;
//   //console.log(user);
//   return user;
// }

// userSchema.statics.findByCredentials = async (email,password) =>
// {
//   var user = await User.findOne({email});
//   if(!user){
//     // throw new Error("unable to login");
//     return undefined;
//   }

//   var isFound = bcrypt.compare(password,user.password);
//   //console.log("value of is found"+ JSON.stringify(isFound));
//   if(!isFound){
//     console.log("error thrrownnnnn");
//     throw new Error("unable to login");
//   }
//   return user
// }
  
var RelMsg = mongoose.model('RelMsg', userSchema);
module.exports =RelMsg;
