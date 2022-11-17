const http = require('http');
const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
//const Datos = require("./models/datos.js");
const config = require('dotenv').config();
const router = express.Router();
const SocketIO = require('socket.io')


var Modoold = "";
var Bateria ="";
var Viento ="";
var Fecha ="";
var Hora ="";
var Modonew="";

const app = express();
app.use(express.json());

const datosSchema = new mongoose.Schema({
  Modonew: {
    type: String,
    //required: true,
  },
  Modoold: {
    type: String,
    //required: true,
  },
  Bateria: {
    type: String,
    //required: true,
  },
  Viento: {
    type: String,
    //required: true,
  },
  Fecha: {
    type: String,
    required: true,
  },
  Hora: {
    type: String,
    required: true,
  },
});

const datos = mongoose.model("datos", datosSchema);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

let currentDate = new Date().toJSON().slice(0, 10);
console.log(currentDate);

let currentHour = new Date().toJSON().slice(11, 23);
console.log(currentHour);


app.get('/envio', async(req, res) => {
  var vamos = {
    Modonew: Modonew, // Modo
    Modoold:Modoold,
    Bateria: Bateria, // Bateria
    Viento: Viento, // Viento
    Fecha: currentDate,
    Hora:currentHour
  } 
  var Proceso = new datos (vamos);
    //await Proceso.save();
    console.log(Proceso)
    res.json(Proceso);
})




app.post('/hist', async(req,res) => {
   var Person = mongoose.model('datos', datosSchema);
 
   const { fecha_inicio, hora_inicio, fecha_fin, hora_fin } = req.body;
   const info = Person.find({ Fecha: { $gt:(fecha_inicio), $lt:(fecha_fin) }, $and:[{Hora:{ $gt:(hora_inicio), $lt:(hora_fin) }}]} );


    info.exec(function (err, person) {
    if (err) return handleError(err);
    // Prints "Space Ghost is a talk show host."
    //console.log(person);
});
    //console.log(req.body);
    res.json({data: info});
  });


app.get("/historicos", (req, res) => {
    res.sendFile(path.join(__dirname + "/historicos.html"));
  });

app.get("/estilo.css", (req, res) => {
    res.sendFile(path.join(__dirname + "/estilo.css"));
});

app.get("/estilohist.css", (req, res) => {
  res.sendFile(path.join(__dirname + "/estilohist.css"));
});

//app.use('/Datos', require('./route/Datos.js'));

  
const server = app.listen(process.env.PORT, () => {
  console.log("server listening on port", process.env.PORT||3000);
});
//MIDDLEWARES

//DATA BASE
uri = `mongodb+srv://${process.env.usuario}:${process.env.password}@cluster0.stqjv43.mongodb.net/${process.env.dbName}?retryWrites=true&w=majority`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log('conectado a mongodb')) 
  .catch(e => console.log('error de conexión', e))

//WEBSOCKET
// const io = SocketIO(server);

// io.on('conection',(socket) =>{
//   console.log(socket.id);

//   socket.on('conection',() =>{
//     console.log('se ha desconectado');

//   });

// });