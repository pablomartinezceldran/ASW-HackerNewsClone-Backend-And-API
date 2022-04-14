const { render } = require("../app");
const User = require("../models/user");

const mostrarForm = async (req, res) => {
  res.render('login');
};


const createUser =  async (req,res) => {
  const { username,  password } = req.body;
     User.findOne({ username: username }).then((user) => {
      if (user) {
        console.log("username exists");
        res.render('login', { errorMessage: 'El nombre de usuario escogido ya existe' });
      } else {
        var newUser = new User({username,password})
        newUser.save() 
        res.redirect('/')
      }
      
    }); 
  };


module.exports = {
  mostrarForm,
  createUser
};
