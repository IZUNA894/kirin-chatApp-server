var bcrypt = require('bcryptjs');

// //var result = async ()=>{
//    var re = await bcrypt.compare("samsamsam","$2a$08$w9w6TPayiXA3X10hcBckgeN9Lu8bylBwKzhBxms.8BRiuL/OBipuu");
//    return re
// }

bcrypt.compare("samsamsam","2a$08$w9w6TPayiXA3X10hcBckgeN9Lu8bylBwKzhBxms.8BRiuL/OBipuu")
.then((res)=>{
    console.log(res)
})
console.log("jjf");
// console.log(result());
