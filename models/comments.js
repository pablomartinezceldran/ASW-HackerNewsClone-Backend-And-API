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

        profunditat:{
          type:Number,
          required:true,
          default: 0
        },

        submissionId:{
            type: Schema.Types.ObjectId, ref: 'submission',
            required: true
        },

        ParentId: {
            type: Schema.Types.ObjectId, ref: 'comment',
            required: false
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true,
            default: null,
        },
    
    },
    {
        timestamps:true,
        versionKey:false
    }
);


module.exports = mongoose.model('comments',commentScheme)