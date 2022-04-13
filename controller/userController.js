const user = require("../models/users");

const mostrarForm = async (req, res) => {
  res.render("login", {});
};

module.exports = {
  mostrarForm,
};
