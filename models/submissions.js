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
    },
    {
        timestamps:true,
        versionKey:false
    }
);


module.exports = mongoose.model('submissions',submissionScheme)