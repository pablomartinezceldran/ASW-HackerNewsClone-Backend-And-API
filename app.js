//SETUP
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const passport = require("passport");
const session = require("express-session");
const dbConnect = require("./config/mongo");

/* const submission = require("./models/submissions");
function renameCreatorField() {
  submission.updateMany({}, { $set: { subType : 'url' } }, { multi: true }, function(err, data) {
      if (!err) { 
          //success 
      }
  })
}

renameCreatorField();   */

//X si aca
const flash = require("connect-flash");
app.use(cors());

require("./config/passport")(passport);

var expressValidator = require("express-validator");

//session
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//GUARDAMOS LAS RUTAS
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

// ENGINE PARA MOSTRAR EL HTML
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//FUNCIONES PARA USAR
//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//ESTABLECEMOS LAS RUTAS
app.use("/", indexRouter);
app.use("/", usersRouter);

// // catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

//Conexion a Base de Datos
dbConnect();

//APP LOCAL
module.exports = app;

//Puertos
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
