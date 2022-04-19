const mongoose = require('mongoose')

const submissionScheme = new mongoose.Schema(
    {
    title:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    },
    votes:{
        type:Number,
        required:true,
        default: 0
    },
    subType: {
        type: String,
        enum : ['submission','ask'],
        required: true
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user',
        required: true,
        default: null
    },
    },
    {
        timestamps:true,
        versionKey:false
    }
);


module.exports = mongoose.model('submissions',submissionScheme)