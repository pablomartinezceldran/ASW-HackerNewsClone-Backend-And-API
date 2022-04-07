const comment = require('../models/comments');
const validUrl = require("valid-url");

const createSubmisson =  async (req,res) => {
    const com = new comment(req.body);
    com.save().then(result => {
        res.redirect('/')
    })
}

const mostrarNewestComment = async (req,res) => {
    const data = await comment.find().sort({createdAt: -1})
    res.render('newest', {
        comment: data
    })
}