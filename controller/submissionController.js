const submission = require("../models/submissions");
const comment = require("../models/comments");
const User = require("../models/user");
var validUrl = require("valid-url");

const mostrarIndex = async (req, res) => {
  let data = await submission.find().sort({ votes: -1 });
  for(sub of data){   
    if(sub.user){
      const user = await User.findOne({"_id": sub.user})
      sub.username = user.username
    } else sub.username ="undefined"
  }
  res.render("index", {
    submissions: data,
    session: req.session
  });
};

const mostrarSubmission = async (req, res) => {
  var id = req.params.id;
  await submission
    .findById(id)
    .then((result) => {
      res.redirect(result.url);
    })
    .catch((err) => {
      res.render("error");
    });
};

async function afegirComentaris(id, sub_id) {
  var array = [];
  let reply = await comment.find({submissionId: sub_id, ParentId: id});
  if(reply == null){
    let coment = await comment.findOne({"_id" : id});
    array.push(coment)
    return array
  }
  else{
    var con = Object.keys(reply).length;
    for(var i = 0; i < con; i++){
       return await afegirComentaris(reply[i], sub_id);
    }
  }
}

const mostrarSubmissionTree = async (req,res) => {
  const sub_id = req.params.id
  let data = await submission.findById(sub_id)
  let data2 = await comment.find({submissionId: sub_id, ParentId: null});
  var array = [];
  var count = Object.keys(data2).length;
  array.push(data2[0]);
  var temp = [];
  temp = await afegirComentaris(data2[0].id, sub_id);
  array.push(temp[0]);
  array.push(data2[1]);
  //array.concat(temp);
  console.log(array);
  res.render('submission', {
    subtree: data,
    comments: array
  })
}

const mostrarNewest = async (req, res) => {
  let data = await submission.find().sort({ createdAt: -1 });
  for(sub of data){   
    if(sub.user){
      const user = await User.findOne({"_id": sub.user})
      sub.username = user.username
    } else sub.username ="undefined"
  }
  res.render("newest", {
    submissions: data,
    session: req.session
  });
};

const mostrarSubmissionForm = (req, res) => {
  res.render("submit");
};

const createSubmisson = async (req, res) => {
  const sub = new submission ({ url: req.body.url, title: req.body.title, user: req.session.user});
  if (validUrl.isUri(sub.url)) {

    sub.save().then((result) => {
      res.redirect("/");
    });
  } else {
    res.render("submit", {
      errorMessage: "El texto introducido no es una URL",
    });
    // https://stackoverflow.com/questions/46906876/how-to-preserve-form-data-when-error-generate-on-nodejs-express
    // por si queremos que el form no se reinicie en el error
  }
};



const donalike = async (req,res) => {
  const id = req.params.id;
  let u = req.session.user;
  await submission.findById(id)
    .then ( async result => {
      await User.updateOne({"_id": u._id},{$push: {likedsubmissions: id}})
      result.votes+=1
      result.save()
      req.session.user.likedsubmissions.push(id)
      console.log("sumado");
      res.redirect('/')
    }).catch(err => {
      res.render('error')
    });
}

const treulike = async (req,res) => {
  const id = req.params.id;
  let u = req.session.user;
  await submission.findById(id)
    .then ( async result => {
      await User.updateOne({"_id": u._id},{$pull: {likedsubmissions: id}})
      result.votes-=1
      result.save()
      console.log("sumado1");
      req.session.user.likedsubmissions.splice(req.session.user.likedsubmissions.indexOf(id), 1)
      console.log('noooo')
      res.redirect('/')
    }).catch(err => {
      res.render('error')
    });
}

const upddateSubmisson = (req, res) => {};

const deleteSubmisson = (req, res) => {};

module.exports = {
  mostrarIndex,
  mostrarSubmission,
  mostrarNewest,
  mostrarSubmissionForm,
  createSubmisson,
  donalike,
  treulike,
  mostrarSubmissionTree
};
