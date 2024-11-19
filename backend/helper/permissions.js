const User = require("../models/user.model")

const uploadProductPermission=async(userId)=>{
    const user = await User.findById(userId)
    console.log("user",user);
    
    if(user.role === 'ADMIN'){
       return true; 
    }
    return false;
}

module.exports =uploadProductPermission;