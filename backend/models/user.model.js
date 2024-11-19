const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:true,
        required:true
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
      },
    password : String,
    profileImage : String
},{
    timestamps:true
})

const User = mongoose.model('User',userSchema);

module.exports = User;

