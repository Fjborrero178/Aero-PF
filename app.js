const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
//const Datos = require("./models/datos.js");
const config = require('dotenv').config();
const router = express.Router();
//express.use(express.json());
//express.use(express.text());

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
  Mayor: {
    type: String,
    required: true,
  },
});

const datos = mongoose.model("datos", datosSchema);

app.get("/", async(req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.get('/envio', (req, res) => {
  const vamos = {
    Modo: "siuuuu", // Modo
    Bateria: "234", // Modo
    Mayor: "aveces" // Modo
  }
    
    var Proceso = new datos (vamos);
    //res.json([Proceso.Bateria])
    //await Proceso.save();
    console.log(Proceso.Bateria)
  res.json(Proceso.Bateria);
//{data : 'example'}
})


app.get("/historicos", (req, res) => {
    res.sendFile(path.join(__dirname + "/historicos.html"));
  });

app.get("/estilo.css", (req, res) => {
    res.sendFile(path.join(__dirname + "/estilo.css"));
});

//app.use('/Datos', require('./route/Datos.js'));

  

app.listen(process.env.PORT, () => {
  console.log("server listening on port", process.env.PORT||3000);
});
//MIDDLEWARE

//DATA BASE
uri = `mongodb+srv://${process.env.usuario}:${process.env.password}@cluster0.stqjv43.mongodb.net/${process.env.dbName}?retryWrites=true&w=majority`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log('conectado a mongodb')) 
  .catch(e => console.log('error de conexión', e))

