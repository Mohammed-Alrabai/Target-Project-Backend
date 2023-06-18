const Admin = require("../Models/admin");

const isAuth = (req,res,next)=>{
const user = res.locals.decoded;
console.log(user)
const UserId = user.result._id;
console.log(user)
Admin.findById(UserId).then((result)=>{
    if(result){
        res.status(200).json({
            result : result
        })
        next();
        return;
    }else{
         res.status(400).json({
        message: "sorry you are not authorized",
      });
    }
     
}).catch((error)=>{
      res.status(400).json({
        message: "sorry you are not authorized",
      });
})
}

module.exports = isAuth;