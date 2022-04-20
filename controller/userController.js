const User = require("../models/user");
const submission = require("../models/submissions");
const comments = require("../models/comments");
const submissions = require("../models/submissions");

const mostrarFormLogin = async (req, res) => {
  res.render("login");
};

const mostrarFormSignup = async (req, res) => {
  res.render("signup");
};

const createUser = async (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username: username }).then((user) => {
    if (user) {
      console.log("username exists");
      res.render("signup", {
        errorMessage: "El nombre de usuario escogido ya existe",
      });
      // https://stackoverflow.com/questions/46906876/how-to-preserve-form-data-when-error-generate-on-nodejs-express
      // por si queremos que el form no se reinicie en el error
    } else {
      var newUser = new User({ username, password });
      newUser.save();
      req.session.user = newUser;
      res.redirect("/");
    }
  });
};

const iniciaSessio = async (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username: username }).then((user) => {
    if (user && JSON.stringify(user.password) === JSON.stringify(password)) {
      req.session.loggedin = true;
      req.session.user = user;

      res.redirect("/");
    } else {
      res.render("login", {
        errorMessage: "Usuario y/o contraseña incorrectos",
      });
    }
  });
};

const tancarSessio = async (req, res) => {
  req.session.destroy();
  res.redirect("/");
};

const mostrarUser = async (req, res) => {
  var id = req.params.id;
  await User.findOne({ username: id }).then((user) => {
    if (user) {
      res.render("user", {
        user: user,
        session: req.session,
      });
    } else res.render("error");
  });
};

const mostrarSubmsUser = async (req, res) => {
  var u = req.params.id;
  await User.findOne({ username: u }).then(async (user) => {
    if (user) {
      let data = await submission.find({ user: user._id });
      res.render("userOptions", {
        submissions: data,
        user: user,
        param: "submissions",
        session: req.session,
      });
    } else res.render("error");
  });
};

const mostrarComsUser = async (req, res) => {
  var u = req.params.id;
  await User.findOne({ username: u }).then(async (user) => {
    if (user) {
      let data = await comments.find({ user: user._id });
      res.render("/threads", {
        submissions: data,
        user: user,
        param: "comments",
        session: req.session,
      });
    } else res.render("error");
  });
};

const mostrarLikedSubmsUser = async (req, res) => {
  var id = req.params.id;
  let data = [];
  await User.findOne({ username: id }).then(async (user) => {
    if (user) {
      if (typeof user.likedsubmissions !== "undefined") {
        for (liked of user.likedsubmissions) {
          data.push(await submissions.findById(liked));
        }
      }
      res.render("userOptions", {
        submissions: data,
        user: user,
        param: "liked submissions",
        session: req.session,
      });
    } else res.render("error");
  });
};

const mostrarLikedCommsUser = async (req, res) => {
  var id = req.params.id;
  let data = [];
  await User.findOne({ username: id }).then(async (user) => {
    if (user) {
      if (typeof user.likedcomments !== "undefined") {
        for (liked of user.likedcomments) {
          data.push(await comments.findById(liked));
        }
      }
      res.render("userOptions", {
        submissions: data,
        user: user,
        param: "liked comments",
        session: req.session,
      });
    } else res.render("error");
  });
};

module.exports = {
  mostrarFormLogin,
  createUser,
  mostrarFormSignup,
  iniciaSessio,
  tancarSessio,
  mostrarUser,
  mostrarSubmsUser,
  mostrarComsUser,
  mostrarLikedSubmsUser,
  mostrarLikedCommsUser,
};
