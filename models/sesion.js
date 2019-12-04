'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SesionSchema = Schema({
    nombre: { type: String },
    repeticiones: { type: Number },
    tiempoDescanzo: { type: Number },
    estaciones: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Estacion' }],
    participantes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }]
});

module.exports = mongoose.model('Sesion', SesionSchema);