
const submission = require('../models/submissions');


const getSubmisson = (req,res) => {
   //get data
   //res.send("lista");
    console.log('lista')
    return res.render('index', {
        submissions: 'funciona',
    })
}

const createSubmisson = (req,res) => {


}

const upddateSubmisson = (req,res) => {


}

const deleteSubmisson = (req,res) => {


}


module.exports.mostrar = getSubmisson