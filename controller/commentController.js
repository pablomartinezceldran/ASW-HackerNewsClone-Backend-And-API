
const comment = require('../models/comments');

const createComment =  async (req,res) => {
    const com = new comment(req.body);
    com.save().then(result => {
        res.redirect('/')
    })
}

const mostrarNewestComment = async (req,res) => {
    return comment.find().sort({createdAt: -1});
}

const mostrarPerSubmission = async (req,res) => {
    const id = req.params.id;
    const data = await comment.find({submissionId: id})
    res.render('comments', {
        comments: data
    })
}

const mostrarCommentForm = (req,res) => {
    console.log("Hola")
    res.render('CSubmit')
}

module.exports ={
    createComment,
    mostrarNewestComment,
    mostrarCommentForm,
    mostrarPerSubmission
}