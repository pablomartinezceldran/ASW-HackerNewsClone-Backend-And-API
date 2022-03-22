const mongoose = require('mongoose')

const userScheme = new mongoose.Schema(
    {
    name:{
        type:String,
        unique:true
    },
    pasword:{
        type:String
    },
    role:{
        type: ['user','admin'],
        default: 'user'
    },
    },
    {
        timestamps:true,
        versionKey:false
    }
);


module.exports = mongoose.model('users',userScheme)