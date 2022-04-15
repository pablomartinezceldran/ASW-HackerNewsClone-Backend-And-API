
const comment = require('../models/comments');

const createComment =  async (req,res) => {
    const com = new comment(req.body);
    com.save().then(result => {
        res.redirect('/')
    })
}

const mostrarNewestComment = async (req,res) => {
    const data = await comment.find().sort({createdAt: -1})
    res.render('comments', {
        comments: data
    })
}

const mostrarCommentForm = (req,res) => {
    res.render('CSubmit')
}

module.exports ={
    createComment,
    mostrarNewestComment,
    mostrarCommentForm
}