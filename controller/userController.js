
const User = require("../models/user");

const mostrarFormLogin = async (req, res) => {
  res.render('login');
};

const mostrarFormSignin = async (req, res) => {
  res.render('signin');
};

const createUser =  async (req,res) => {
  const { username,  password } = req.body;
     User.findOne({ username: username }).then((user) => {
      if (user) {
        console.log("username exists");
        res.render('signin', { errorMessage: 'El nombre de usuario escogido ya existe' }); 
        // https://stackoverflow.com/questions/46906876/how-to-preserve-form-data-when-error-generate-on-nodejs-express
        // por si queremos que el form no se reinicie en el error
      } else {
        var newUser = new User({username,password})
        newUser.save() 
        res.redirect('/')
      }
      
    }); 
  };

const  iniciaSessio =  async (req,res) => {
    const { username,  password } = req.body;
       User.findOne({ username: username }).then((user) => {
        if (user && JSON.stringify(user.password) === JSON.stringify(password)) {
          req.session.loggedin = true;
				  req.session.user = user;
          
          res.render('login', { errorMessage: 'oleee pero falta implementar la session' });

        } else {
          res.render('login', { errorMessage: 'Usuario i/o contraseña incorectos' });
        }
        
      }); 
    };

module.exports = {
  mostrarFormLogin,
  createUser,
  mostrarFormSignin,
  iniciaSessio
};
