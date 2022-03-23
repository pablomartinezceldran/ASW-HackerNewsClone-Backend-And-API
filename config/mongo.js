const mongoose = require('mongoose')

const dbConnect = () =>{
    const DB_URI = 'mongodb+srv://ASW:1234@cluster0.pe2gu.mongodb.net/DB?retryWrites=true&w=majority';
    mongoose.connect( DB_URI ,
        {
            useNewUrlParser: true,
            useUnifiedTopology:true,
        },(err,res) =>{
            if(!err) console.log('Conectado a la DB correctamente')
            else console.log('Error de conexión con la DB'+ err)
        });

};

module.exports = dbConnect;