
const submission = require("../models/submissions");
const comment = require("../models/comments");
const User = require("../models/user");
var validUrl = require("valid-url");

const mostrarIndex = async (req, res) => {
  let data = await submission.find().sort({ votes: -1 });
  if (data.length > 0) {
    for (sub of data) {
      if (sub.user) {
        await User.findOne({ _id: sub.user }).then((result) => {
          if (result) {
            sub.username = result.username;
          }
        });
      } else sub.username = "undefined";
    }
  }
  res.render("index", {
    submissions: data,
    session: req.session,
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
  let reply = await comment.find({ submissionId: sub_id, ParentId: id });
  //console.log(reply[0]);
  if (reply == null) {
    return array;
  } else {
    var con = Object.keys(reply).length;
    for (var i = 0; i < con; i++) {
      var temp = [];
      temp = await afegirComentaris(reply[i].id, sub_id);
      console.log(reply[i].id);
      array.push(reply[i]);
      var long = temp.length;
      for (var j = 0; j < long; j++) {
        array.push(temp[j]);
      }
    }
    return array;
  }
}

const mostrarSubmissionTree = async (req, res) => {
  const sub_id = req.params.id;
  let data = await submission.findById(sub_id);
  if (data.user) {
    const user = await User.findOne({ _id: data.user });
    data.username = user.username;
  } else data.username = "undefined";
  let data2 = await comment.find({ submissionId: sub_id, ParentId: null });
  var array = [];
  var count = Object.keys(data2).length;
  for (var i = 0; i < count; i++) {
    if (data2[i].user) {
      const user = await User.findOne({ _id: data2[i].user });
      data2[i].username = user.username;
    } else data2[i].username = "undefined";
    array.push(data2[i]);
    var temp = [];
    temp = await afegirComentaris(data2[i].id, sub_id);
    for (var j = 0; j < temp.length; j++) {
      if (temp[j].user) {
        const user = await User.findOne({ _id: temp[j].user });
        temp[j].username = user.username;
      } else temp[j].username = "undefined";
      array.push(temp[j]);
    }
  }
  res.render("submission", {
    subtree: data,
    comments: array,
    session: req.session,
  });
};

const mostrarNewest = async (req, res) => {
  let data = await submission.find().sort({ createdAt: -1 });
  for (sub of data) {
    if (sub.user) {
      const user = await User.findOne({ _id: sub.user });
      sub.username = user.username;
    } else sub.username = "undefined";
  }
  res.render("newest", {
    submissions: data,
    session: req.session,
  });
};

const mostrarAsk = async (req, res) => {
  console.log("llega");
  let data = await submission.find().sort({ createdAt: -1 });
  for (sub of data) {
    if (sub.user) {
      const user = await User.findOne({ _id: sub.user });
      sub.username = user.username;
    } else sub.username = "undefined";
  }
  res.render("ask", {
    submissions: data,
    session: req.session,
  });
};

const mostrarSubmissionForm = (req, res) => {
  res.render("submit", {
    errorMessage: [],
    formData: {},
  });
};

const createSubmisson = async (req, res) => {
  var title = req.body.title;
  var url = req.body.url;
  var text = req.body.text;
  var message = [];
  if (!url && !text) {
    message.push("Inserta url o text");
    res.render("submit", {
      errorMessage: message,
      formData: {
        title: title,
        url: url,
        text: text,
      },
    });
  } else {
    if (url) {
      const sub = new submission({
        url: url,
        title: title,
        user: req.session.user,
        subType: "url",
      });
      if (validUrl.isUri(sub.url)) {
        submission.countDocuments(
          { url: sub.url },
          async function (err, count) {
            if (count > 0) {
              var existent = await submission.findOne({ url: sub.url });
              console.log(existent.id);
              console.log("Soc Repetit");
              res.redirect("/submission/" + existent.id);
            } else {
              sub.save().then((result) => {});
            }
          }
        );
      } else message.push("El texto introducido en URL no es una URL");
    }
  }
  if (text) {
    const sub = new submission({
      text: text,
      title: title,
      user: req.session.user,
      subType: "ask",
    });
    sub.save().then((result) => {});
  }
  if (message.length == 0) res.redirect("/");
  else {
    res.render("submit", {
      errorMessage: message,
      formData: {
        title: title,
        url: url,
        text: text,
      },
    });
  }
};

const donalike = async (req, res) => {
  const id = req.params.id;
  let u = req.session.user;
  await submission
    .findById(id)
    .then(async (result) => {
      await User.updateOne({ _id: u._id }, { $push: { likedsubmissions: id } });
      result.votes += 1;
      result.save();
      req.session.user.likedsubmissions.push(id);
      console.log("sumado");
      res.redirect("/");
    })
    .catch((err) => {
      res.render("error");
    });
};
const donalikeSub = async (req, res) => {
  const id = req.params.id;
  let u = req.session.user;
  await submission
      .findById(id)
      .then(async (result) => {
        await User.updateOne({ _id: u._id }, { $push: { likedsubmissions: id } });
        result.votes += 1;
        result.save();
        req.session.user.likedsubmissions.push(id);
        console.log("sumado");
        res.redirect("/submission/"+id);
      })
      .catch((err) => {
        res.render("error");
      });
};

const donalikeNew = async (req, res) => {
  const id = req.params.id;
  let u = req.session.user;
  await submission
      .findById(id)
      .then(async (result) => {
        await User.updateOne({ _id: u._id }, { $push: { likedsubmissions: id } });
        result.votes += 1;
        result.save();
        req.session.user.likedsubmissions.push(id);
        console.log("sumado");
        res.redirect("/newest");
      })
      .catch((err) => {
        res.render("error");
      });
};
const treulikeNew = async (req, res) => {
  const id = req.params.id;
  let u = req.session.user;
  await submission
      .findById(id)
      .then(async (result) => {
        await User.updateOne({ _id: u._id }, { $pull: { likedsubmissions: id } });
        result.votes -= 1;
        result.save();
        console.log("sumado1");
        req.session.user.likedsubmissions.splice(
            req.session.user.likedsubmissions.indexOf(id),
            1
        );
        console.log("noooo");
        res.redirect("/newest");
      })
      .catch((err) => {
        res.render("error");
      });
};

const treulike = async (req, res) => {
  const id = req.params.id;
  let u = req.session.user;
  await submission
    .findById(id)
    .then(async (result) => {
      await User.updateOne({ _id: u._id }, { $pull: { likedsubmissions: id } });
      result.votes -= 1;
      result.save();
      console.log("sumado1");
      req.session.user.likedsubmissions.splice(
        req.session.user.likedsubmissions.indexOf(id),
        1
      );
      console.log("noooo");
      res.redirect("/");
    })
    .catch((err) => {
      res.render("error");
    });
};
const treulikeSub = async (req, res) => {
  const id = req.params.id;
  let u = req.session.user;
  await submission
      .findById(id)
      .then(async (result) => {
        await User.updateOne({ _id: u._id }, { $pull: { likedsubmissions: id } });
        result.votes -= 1;
        result.save();
        console.log("sumado1");
        req.session.user.likedsubmissions.splice(
            req.session.user.likedsubmissions.indexOf(id),
            1
        );
        console.log("noooo");
        res.redirect("/submission/"+id);
      })
      .catch((err) => {
        res.render("error");
      });
};

const mostrarThreads = async (req, res) => {
  console.log(req.session.user.username);
  var u = req.session.user.username;
  await User.findOne({ username: u }).then(async (user) => {
    if (user) {
      let data = await comment.find({ user: user._id });
      res.render("threads", {
        submissions: data,
        user: user,
        session: req.session,
      });
    } else res.render("error");
  });
};

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
  mostrarSubmissionTree,
  mostrarAsk,
  mostrarThreads,
  donalikeNew,
  treulikeNew,
  donalikeSub,
  treulikeSub,

};
