const comment = require("../models/comments");
const submission = require("../models/submissions");
const User = require("../models/user");

const createComment = async (req, res) => {
  const sub = new comment({
    text: req.body.text,
    submissionId: req.body.submissionId,
    user: req.session.user,
  });
  sub.save().then(async (result) => {
    await submission.findById(sub.submissionId.toString()).then((s) => {
      s.numcomments += 1;
      s.save();
      res.redirect("/submission/" + sub.submissionId);
    });
  });
};

const createReply = async (req, res) => {
  const sub = new comment({
    text: req.body.text,
    profunditat: req.body.profunditat,
    submissionId: req.body.submissionId,
    ParentId: req.body.ParentId,
    user: req.session.user,
  });
  sub.save().then(async (result) => {
    await submission.findById(sub.submissionId.toString()).then((s) => {
      s.numcomments += 1;
      s.save();
      res.redirect("/submission/" + sub.submissionId);
    });
  });
};

const mostrarNewestComment = async (req, res) => {
  const data = await comment.find();
  res.render("comments", {
    comments: data,
  });
};

const mostrarReplyForm = async (req, res) => {
  const id = req.params.id;
  let data = await comment.findById(id);
  let sub = await submission.findById(data.submissionId);
  if (data.user) {
    const user = await User.findOne({ _id: data.user });
    data.username = user.username;
  } else data.username = "undefined";
  console.log(data);
  res.render("comment", {
    comment: data,
    submission: sub,
    session: req.session,
  });
};

const donalike = async (req, res) => {
  const id = req.params.id;
  let u = req.session.user;
  await comment
    .findById(id)
    .then(async (result) => {
      await User.updateOne({ _id: u._id }, { $push: { likedcomments: id } });
      result.votes += 1;
      result.save();
      req.session.user.likedcomments.push(id);
      console.log("sumado");
      res.redirect("/comment/" + id);
    })
    .catch((err) => {
      res.render("error");
    });
};

const treulike = async (req, res) => {
  const id = req.params.id;
  let u = req.session.user;
  await comment
    .findById(id)
    .then(async (result) => {
      await User.updateOne({ _id: u._id }, { $pull: { likedcomments: id } });
      result.votes -= 1;
      result.save();
      console.log("sumado1");
      req.session.user.likedcomments.splice(
        req.session.user.likedcomments.indexOf(id),
        1
      );
      console.log("noooo");
      res.redirect("/comment/" + id);
    })
    .catch((err) => {
      res.render("error");
    });
};

const mostrarPerSubmission = async (req, res) => {
  const id = req.params.id;
  const data = await comment.find({ submissionId: id });
};

const mostrarCommentForm = (req, res) => {
  res.render("CSubmit");
};

module.exports = {
  createComment,
  mostrarNewestComment,
  mostrarCommentForm,
  mostrarPerSubmission,
  createReply,
  mostrarReplyForm,
  donalike,
  treulike,
};
