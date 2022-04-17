const submission = require('../models/submissions');
const comment = require('../models/comments');
const validUrl = require('valid-url');
const {mostrarNewestComment} = require("./commentController");

const mostrarIndex = async (req,res) => {
    const data = await submission.find({}) // preo ordenada por likes
    res.render('index', {
        submissions: data
    })
}

const mostrarSubmission = async (req,res) => {
    const id = req.params.id
    let data = await submission.findById(id)
    console.log(data)
        res.render('submission', {
            subtree: data
          })
 }

 const mostrarNewest = async (req,res) => {
    const data = await submission.find().sort({createdAt: -1}) 
    res.render('newest', {
        submissions: data
    })
 }


 const mostrarSubmissionForm = (req,res) => {
     res.render('submit')
 }

const createSubmisson =  async (req,res) => {
    const sub = new submission(req.body);
    if (validUrl.isUri(sub.url)){
         sub.save()
        .then(result => {
        res.redirect('/');
        })
    } else{
         res.render('submit') 
         console.log('no es un url')
        }
}

const upddateSubmisson = (req,res) => {


}

const deleteSubmisson = (req,res) => {


}


module.exports ={
    mostrarIndex,
    mostrarSubmission,
    mostrarNewest,
    mostrarSubmissionForm,
    createSubmisson
}