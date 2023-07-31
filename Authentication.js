const UserModel = require("./Usermodel")
var jwt = require('jsonwebtoken');

const Authentication = (req, res, next) =>{

    const token=req.headers.authorization?.split(" ")[1]
    if(token){
        jwt.verify(token, 'Dibakar',async function(err, decoded) {
           
            if(err){
                res.status(200).send("not authorized")
            }else{
                const user_id=decoded.user_id
                req.user_id=user_id,
                next()
            }
          });
          
    }
}

module.exports ={Authentication}