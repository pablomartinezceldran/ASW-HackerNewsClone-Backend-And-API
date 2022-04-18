
const comment = require('../models/comments');

const createComment =  async (req,res) => {
    const com = new comment(req.body);
    com.save().then(result => {
        res.redirect('/')
    })
}

const mostrarNewestComment = async (req, res) => {
    const data = await comment.find()
    res.render('comments', {
        comments: data,
    })
}

const mostrarPerSubmission = async (req,res) => {
    const id = req.params.id;
    const data = await comment.find({submissionId: id})
}

const mostrarCommentForm = (req,res) => {
    res.render('CSubmit')
}

module.exports ={
    createComment,
    mostrarNewestComment,
    mostrarCommentForm,
    mostrarPerSubmission
}