
const submission = require('../models/submissions');


const mostrarIndex = (req,res) => {
   //get data de la db
    //pasarlo en submissions
    return res.render('index', {
        submissions: ['LINK1', 'LINK2'],
    })
}

const mostrarSubmission = (req,res) => {
    const id =req.params.id;
    //get data de la db del id
    //redirect al parametro url
     return res.redirect('https://www.google.com/')
 }

 const mostrarNewest = (req,res) => {
    //get data de la db ordenada
    //pasarlo en submissions
    return res.render('index', {
        submissions: ['LINK1', 'LINK2','pero ordenados por likes'],
    })
 }


 const mostrarSubmissionForm = (req,res) => {
    //get data de la db
     //pasarlo en submissions
     return res.render('submit', {
         submissions: ['LINK1', 'LINK2'],
     })
 }

const createSubmisson = (req,res) => {


}

const upddateSubmisson = (req,res) => {


}

const deleteSubmisson = (req,res) => {


}


module.exports ={
    mostrarIndex,
    mostrarSubmission,
    mostrarNewest,
    mostrarSubmissionForm
}