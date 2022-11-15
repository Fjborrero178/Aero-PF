const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
//const Datos = require("./models/datos.js");
const config = require('dotenv').config();
const router = express.Router();
//express.use(express.json());
//express.use(express.text());
var Modo = "";
var Bateria ="";
var Viento ="";
var Fecha ="";
var Hora ="";

const app = express();

const datosSchema = new mongoose.Schema({
  Modo: {
    type: String,
    required: true,
  },
  Bateria: {
    type: String,
    required: true,
  },
  Viento: {
    type: String,
    required: true,
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

app.get("/", async(req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.get('/envio', (req, res) => {
  var vamos = {
    Modo: Modo, // Modo
    Bateria: Bateria, // Bateria
    Viento: Viento, // Viento
    Fecha: Fecha,
    Hora:Hora
  }
    var Proceso = new datos (vamos);
    //res.json([Proceso.Bateria])
    //await Proceso.save();
    console.log(Proceso)
    res.json(Proceso);
//{data : 'example'}
})





app.get("/historicos", (req, res) => {
    res.sendFile(path.join(__dirname + "/historicos.html"));
  });

app.get("/estilo.css", (req, res) => {
    res.sendFile(path.join(__dirname + "/estilo.css"));
});

//app.use('/Datos', require('./route/Datos.js'));

  

app.listen(3000, () => {
  console.log("server listening on port",3000);
});
//app.listen(process.env.PORT, () => {
  //console.log("server listening on port", process.env.PORT||3000);
//});
//MIDDLEWARE

//DATA BASE
uri = `mongodb+srv://${process.env.usuario}:${process.env.password}@cluster0.stqjv43.mongodb.net/${process.env.dbName}?retryWrites=true&w=majority`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log('conectado a mongodb')) 
  .catch(e => console.log('error de conexión', e))


  // Reloj 
