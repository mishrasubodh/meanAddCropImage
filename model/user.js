const mongoose = require('mongoose');
const jwt =require('jsonwebtoken')

//user registration  schema
const UserSChema = new mongoose.Schema({

    Name:{
       type: String,
       text: true,
      
   },    
   DateofBirth:{
    type: Date
},
Gender:{
    type: String,
   }
   ,
   MobileNumber:{
    type: Number,
   }
   ,
   Email:{
    type: String,
   },
   password:{
       type: String
   }
  
});
UserSChema.index({'firstName': 'text'});
//login user schema
const Loginuser = new mongoose.Schema({
    username:{
     type: String,
    },
    password:{
        type: String
    }
 });

const userSChema = mongoose.model('userSChema',UserSChema);
const loginuser = mongoose.model('loginuser',Loginuser);
module.exports={
    userSChema,
    loginuser
} 

