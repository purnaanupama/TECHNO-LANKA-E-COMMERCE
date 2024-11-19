const jwt = require('jsonwebtoken')

exports.authToken=(req,res,next)=>{
 try {
   const token = req.cookies?.token
   if(!token){
    return res.status(200).json({
        message:"user not logged in",
        error:true,
        success:false
    })
   }
   jwt.verify(token,process.env.JWT_SECRET,function(err,decoded){
    console.log(decoded);
    if(err){
        console.log("error auth",err);
    }
    req.userId = decoded?._id
    
   })
   next()
 } catch (error) {
    res.json({
        message : error.message||error,
        data:[],
        error : true,
        success : false
     })
 }
}