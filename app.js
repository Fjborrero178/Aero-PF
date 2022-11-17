const express = require("express");
const app = express();
const https = require('https');
const server = https.createServer(app);
const path = require("path");
const mongoose = require('mongoose');
//const Datos = require("./models/datos.js");
const config = require('dotenv').config();
const router = express.Router();



var Modoold = "";
var Bateria ="";
var Viento ="";
var Fecha ="";
var Hora ="";
var Modonew="";


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
   const info = await Person.find({ Fecha: { $gt:(fecha_inicio), $lt:(fecha_fin) }, $and:[{Hora:{ $gt:(hora_inicio), $lt:(hora_fin) }}]} );
    //console.log(req.body);
    send.json({data:info});
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

  
server.listen(process.env.PORT, () => {
  console.log("server listening on port", process.env.PORT||3000);
});
//MIDDLEWARES

//DATA BASE
uri = `mongodb+srv://${process.env.usuario}:${process.env.password}@cluster0.stqjv43.mongodb.net/${process.env.dbName}?retryWrites=true&w=majority`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log('conectado a mongodb')) 
  .catch(e => console.log('error de conexión', e))