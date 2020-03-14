//var validator= require('validator');
var mongoose= require('mongoose');
//var bcrypt = require('bcryptjs');
//var jwt = require("jsonwebtoken");
//const Task = require("./task_module");
var Users = require("./user_module");
var RelationsSchema  = new mongoose.Schema({
    // uid: {
    //   required:true,
    //   type:String,
    //   trim:true,
    // },
    name:{
      required:true,
      type:String,
      trim:true
    },
    // age:{
    //   type:Number,
    //   default:10,
    //   required:true,
    //   min:0,

    // } ,
  
  isFriendWith:[
    {
      uid:{
        required:true,
        type:mongoose.Schema.Types.ObjectId,
        refer:'Users'
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

// RelationsSchema.pre('save' , async function(next){
//   var user = this;
//   console.log('pizza is my love',JSON.stringify(user));

//   // var isFound = await User.findOne({email:user.email});
//   // if(isFound){
//   //   console.log(isFound);
//   //   throw new Error("email is taken");
//   //
//   // }

//   user.save();
//   next();

// });









var Realations = mongoose.model('Realations', RelationsSchema);
module.exports = Realations;
