const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);
const path = require("path");
const mongoose = require('mongoose');
const { Console } = require("console");
//const Datos = require("./models/datos.js");
const config = require('dotenv').config();
const router = express.Router();
const { DateTime } = require("luxon");


var vamos = { Modonew:"",Modoold:"",bateria:"",viento:""};
var Modoold = "";
var Bateria ="";
var Viento ="";
var Fecha ="";
var Hora ="";
var Modonew="";


app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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

//var now = new Date();

//var rightNow = new Date();
//var currentHour = rightNow.toISOString().replace("", "").split("T")
//console.log(currentHour);



    // var currentHour = now.toJSON().slice(11,19);
    // console.log(currentHour);

    var now = DateTime.now().setZone('America/Bogota');

    var currentDate = now.toFormat('yyyy-MM-dd');
    
    var currentHour = now.toFormat('HH:mm:ss');

    console.log(currentDate)
    console.log(currentHour)

app.post('/envio', async(req, res) => {

   const { bateria, viento,q1,q2 } = req.body
   vamos = {
    Modonew: q1, // Modo
    Modoold:q2,
    Bateria: bateria, // Bateria
    Viento: viento, // Viento
    Fecha: currentDate,
    Hora:currentHour
  } 

  var Proceso = new datos (vamos);
    await Proceso.save();
  res.send({status: "success", data: vamos});
})


app.get('/envio', async(req, res) => {

  if(vamos.Modonew == "" && vamos.Modoold == "" && vamos.Bateria == "" && vamos.Viento == "" && vamos.Fecha == "" && vamos.Hora == ""){
    res.send({status: "error", data: {message: "No hay datos"}});    
  }else{
    res.json(vamos);
  }
 });


app.post('/hist', async(req,res) => {
   var Person = mongoose.model('datos', datosSchema);
   
   const { fecha_inicio, hora_inicio, fecha_fin, hora_fin } = req.body;
    const info = await Person.find({ 
        Fecha: {$gt:(fecha_inicio), $lt:(fecha_fin)},
        Hora: {$gt:( hora_inicio), $lt:( hora_fin) }
    });


    //console.log(info);
    //console.log({data:info}); 
    console.log('---------------SENDING HIST DATA------------------')
    console.log(info);
    res.json(info);
    console.log('---------------------END TRANSMISSION ------------------------')
  });


app.get("/historicos", (req, res) => {
    res.sendFile(path.join(__dirname + "/historicos.html"));
  });

app.get("/estilo.css", (req, res) => {
    res.sendFile(path.join(__dirname + "/assets/css/estilo.css"));
});

app.get("/estilohist.css", (req, res) => {
  res.sendFile(path.join(__dirname + "/assets/css/estilohist.css"));
});

app.get("/index.js", (req,res) => {
  res.sendFile(path.join(__dirname + "/assets/js/index.js"));
});

app.get("/historicos.js", (req,res) => {
  res.sendFile(path.join(__dirname + "/assets/js/historicos.js"));
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
  .catch(e => console.log('error de conexi??n', e))