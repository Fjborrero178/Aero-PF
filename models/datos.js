const mongoose = require("mongoose");

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

const Datos = mongoose.model(" Datos", datosSchema);
module.exports =  Datos;