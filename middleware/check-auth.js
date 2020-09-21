const jwt = require('jsonwebtoken');
const jwt_key = require('../variables/variables')


module.exports = (req,res,next)=>{
    try{
        const bearertoken = req.headers.authorization;
        console.log('bearertoken====',bearertoken)
         const token = bearertoken.replace('Bearer','').trim();
         console.log('token--===',token)
        const decoded = jwt.verify(token,jwt_key,{"tokens.token":token})
        console.log('TOKEN VARIFICATION',decoded)
         req.body.userdata = decoded;
          next();
    }catch(error){
         return res.status(401).json({
             message:'auth failed '
             });
    }
  next(); 
 };  