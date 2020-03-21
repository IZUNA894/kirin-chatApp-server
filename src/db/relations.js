//this model saves user and its relations
// for eg, he is friend with whom ,he has blocked whom,he has starred whoom,and all other future relations...
//basically a doc in this model will be like
                    // {
                    //   "_id":5e6d43f41d5b652300185618,
                    //   "name":"jhonny",
                    //   "isFriendWith":[
                    //     {
                    //       "_id":"5e72768023b20f3d5cf999bc",
                    //       "uid":"5e6d4293ba034b254c895a9d"
                    //     }
                    //     .
                    //     . 
                    //     .
                    //   ],
                    //   "createdAt":"1584219124589",
                    //   "updatedAt":"1584559744097"
                    // }
var mongoose= require('mongoose');
var Users = require("./user_module");
var RelationsSchema  = new mongoose.Schema({
    
    name:{
      required:true,
      type:String,
      trim:true
    },
    
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





var Realations = mongoose.model('Realations', RelationsSchema);
module.exports = Realations;
