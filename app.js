
const express = require('express')
const cors = require('cors')
const app = express()
const path =  require('path');
const session = require('express-session');
const dbConnect=require('./config/mongo')

app.use(cors())


//GUARDAMOS LAS RUTAS
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


// ENGINE PARA MOSTRAR EL HTML
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//FUNCIONES PARA USAR
//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


//ESTABLECEMOS LAS RUTAS
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



//APP LOCAL
module.exports = app;
const port = 3000;

app.listen(port, () =>{

    console.log('Listening on port 3000');
})

