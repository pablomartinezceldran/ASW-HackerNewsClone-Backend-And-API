
const comment = require('../models/comments');
const submission = require("../models/submissions");
const User = require("../models/user");

const createComment =  async (req,res) => {
    const sub = new comment ({ text: req.body.text, submissionId: req.body.submissionId, user: req.session.user});
    sub.save().then(result => {
        res.redirect('/submission/'+ sub.submissionId)
    })
}
const createReply =  async (req,res) => {
    const sub = new comment ({ text: req.body.text, profunditat:req.body.profunditat, submissionId: req.body.submissionId, ParentId: req.body.parentId ,  user: req.session.user});
    sub.save().then(result => {
        res.redirect('/submission/'+ sub.submissionId)
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
    if(data.user){
        const user = await User.findOne({"_id": data.user})
        data.username = user.username
    } else data.username ="undefined"
    console.log(data);
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