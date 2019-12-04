'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResultadoSchema = Schema({
    ejercicio: {type: mongoose.Schema.Types.ObjectId, ref:''},
    usuario: {type: mongoose.Schema.Types.ObjectId, ref:''},
    sesion: {type: mongoose.Schema.Types.ObjectId, ref:''},
    velReaccion: {type: Number},
    toques: {type: Number},
    frecCardiaca: {type: Number},
    caloriasQuemadas: {type: Number},
    porcentajeGrasa: {type: Number},
    tiempoTotal: {type: Number},
    fecha: {type: Date}
});

module.exports = mongoose.model('Resultado', ResultadoSchema);
