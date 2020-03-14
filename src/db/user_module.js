var validator= require('validator');
var mongoose= require('mongoose');
var bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");
//const Task = require("./task_module");
var userSchema  = new mongoose.Schema({
    name: {
      required:true,
      type:String,
      trim:true,
    },
    username:{
      required:true,
      type:String,
      trim:true,
      unique:true,
      lowercase:true
    },
    phoneno:{
      type:String,
      default:10,
      required:true,
      min:0,
      unique:true,
      validate(value){
        if(!validator.isMobilePhone(value))
        throw new Error("phone number is not valid");
      }

    } ,
  email:{
    type:String,
    required:true,
    trim:true,
    lowercase:true,
    unique:true,
    validate(value){
      if(!validator.isEmail(value))
      throw new Error("email is not valid");
    }
  },
  password:{
    type:String,
    trim:true,
    minlength:8,
    required:true
  },
  tokens:[
    {
      token:{
        required:true,
        type:String
      }
    }
  ],
  avatar:{
    type:Buffer,
    default:null
  }
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
  //console.log("saved runned...........................")
  
  var hashedPass ="";
  if(user.isModified('password'))
  {
   hashedPass =  await bcrypt.hash(user.password,8);
   //console.log(hashedPass);
   user.password =hashedPass;
  }
  next();
});




userSchema.methods.getAuthToken = async function(){
  var user = this;
  var token = await jwt.sign({_id:user._id.toString()},"secretkey");
  user.tokens= user.tokens.concat({token});
  //console.log("runned get auth token")
  await user.save();
  return token;

}

userSchema.methods.toJSON = function (){
  var user= this;
  user = user.toObject();
   delete user.tokens;
   delete user.password;
   delete user.__v;
   delete user.avatar;
  //console.log(user);
  return user;
}

userSchema.statics.findByCredentials = async (email,password) =>
{
  var user = await User.findOne({email});
  if(!user){
    // throw new Error("unable to login");
    return undefined;
  }
  //console.log(password,user.password);
  var result = await bcrypt.compare(password,user.password)
  // .then((result)=>{
  //   console.log("value of is found"+ result);
  //   if(!result){
  //   //console.log("error thrrownnnnn");
  //   //throw new Error("unable to login from121");
  //   cb();
  //   }
    
  // })
  // .catch((e)=>{
  
  // })
  if(!result)
  {
    return undefined
  }
  //console.log(result);
  return user
}

var User = mongoose.model('Users', userSchema);
module.exports =User;
