
const submission = require('../models/submissions');


const mostrarIndex = (req,res) => {
   //get data de la db
    //pasarlo en submissions
    res.render('index', {
        submissions: ['LINK1', 'LINK2', 'pero ordenado por likes'],
    })
}

const mostrarSubmission = (req,res) => {
    const id =req.params.id;
    //get data de la db del id
    //redirect al parametro url
     res.redirect('https://www.google.com/')
 }

 const mostrarNewest = (req,res) => {
    //get data de la db ordenada
    //pasarlo en submissions
    res.render('index', {
        submissions: ['LINK1', 'LINK2','pero ordenados por data'],
    })
 }


 const mostrarSubmissionForm = (req,res) => {
    //get data de la db
     //pasarlo en submissions
     res.render('submit')
 }

const createSubmisson = (req,res) => {
//create Submission en la bd
res.redirect('newest')
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