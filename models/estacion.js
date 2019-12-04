'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EstacionSchema = Schema({
    nombre: {type: String},
    ejercicios: [{type: mongoose.Schema.Types.ObjectId, ref: 'Ejercicio'}],
    lucesEstacion: [{type:mongoose.Schema.Types.ObjectId, ref: 'Luz'}],
    tiempoTotal: {type: Number}
});

module.exports = mongoose.model('Estacion', EstacionSchema);
