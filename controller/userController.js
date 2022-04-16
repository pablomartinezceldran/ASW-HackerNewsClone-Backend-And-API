const User = require("../models/user");

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

module.exports = {
  mostrarFormLogin,
  createUser,
  mostrarFormSignup,
  iniciaSessio,
  tancarSessio,
};
