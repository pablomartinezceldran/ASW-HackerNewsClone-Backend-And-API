
const comment = require('../models/comments');
const submission = require("../models/submissions");

const createComment =  async (req,res) => {
    const com = new comment(req.body);
    com.save().then(result => {
        res.redirect('/')
    })
}
const createReply =  async (req,res) => {
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

const mostrarReplyForm = async (req,res) => {
    const id = req.params.id
    let data = await comment.findById(id);
    let sub = await submission.findById(data.submissionId);
    console.log(sub)
    res.render('comment', {
        comment: data,
        submission: sub
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
    mostrarPerSubmission,
    createReply,
    mostrarReplyForm
}