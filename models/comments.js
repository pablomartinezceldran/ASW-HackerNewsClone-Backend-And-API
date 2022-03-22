const mongoose = require('mongoose')

const commentScheme = new mongoose.Schema(
    {
    name:{
        type:String,
       
    },
    pasword:{
        type:String
    },
    
    },
    {
        timestamps:true,
        versionKey:false
    }
);


module.exports = mongoose.model('comments',commentScheme)