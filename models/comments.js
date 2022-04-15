const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const commentScheme = new mongoose.Schema(
    {
    text:{
        type:String,
        required: true
    },

    votes:{
        type:Number,
        required:true,
        default: 0
    },
    
    },
    {
        timestamps:true,
        versionKey:false
    }
);


module.exports = mongoose.model('comments',commentScheme)