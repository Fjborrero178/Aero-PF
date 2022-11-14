const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
//const Datos = require("./models/datos.js");
const config = require('dotenv').config();

//express.use(express.json());
//express.use(express.text());

const app = express();

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/index.html"));
});

app.get("/historicos", (req, res) => {
    res.sendFile(path.join(__dirname + "/historicos.html"));
  });

app.get("/estilo.css", (req, res) => {
    res.sendFile(path.join(__dirname + "/estilo.css"));
});

app.use('/Datos', require('./route/Datos.js'));

  

app.listen(3000, () => {
  console.log("server listening on port", 3000);
});
//MIDDLEWARE

//DATA BASE
uri = `mongodb+srv://${process.env.usuario}:${process.env.password}@cluster0.stqjv43.mongodb.net/${process.env.dbName}?retryWrites=true&w=majority`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log('conectado a mongodb')) 
  .catch(e => console.log('error de conexión', e))

