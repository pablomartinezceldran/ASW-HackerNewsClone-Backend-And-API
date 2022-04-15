const mongoose = require('mongoose')
const Schema = mongoose.Schema;

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

    comments:{
        type: Schema.Types.ObjectId, ref: 'comments'
    },

    },
    {
        timestamps:true,
        versionKey:false
    }
);


module.exports = mongoose.model('submissions',submissionScheme)