const express = require('express');
const router = express.Router();

const Datos = require('../models/datos')

router.get('/', async (req, res) => {
    try {
        const arrayDatos = await Datos.find();
        console.log(arrayDatos)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;