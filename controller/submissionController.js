
const submission = require('../models/submissions');
var validUrl = require('valid-url');

const mostrarIndex = async (req,res) => {
    const data = await submission.find({}) // preo ordenada por likes
    res.render('index', {
        submissions: data
    })
}

const mostrarSubmission = async (req,res) => {
    var id = req.params.id;
    await submission.findById(id)
      .then(result => {
        res.redirect( result.url)
      }).catch(err => {
        res.render('error')
      });
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
         res.render('submit', { errorMessage: 'El texto introducido no es una URL' });
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