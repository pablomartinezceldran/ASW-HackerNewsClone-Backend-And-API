const mongoose = require('mongoose')

const submissionScheme = new mongoose.Schema(
    {
    title:{
        type:String,
    },
    url:{
        type:String
    },
    },
    {
        timestamps:true,
        versionKey:false
    }
);


module.exports = mongoose.model('submissions',submissionScheme)