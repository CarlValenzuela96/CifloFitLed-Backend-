'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EjercicioSchema = Schema({
    nombre: {type: String},
    instrucciones: {type: String},
    tiempo: {type: Number},
    imagen: {type: String},
    lucesEjercicio: [{type:mongoose.Schema.Types.ObjectId, ref: 'Luz'}],
});

module.exports = mongoose.model('Ejercicio', EjercicioSchema);
