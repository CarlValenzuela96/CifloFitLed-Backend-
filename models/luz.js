'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LuzSchema = Schema({
    nombre: {type: String},
    idFisica: {type: String, unique:true},
    disponible: {type: Boolean, default:true},
    color: {type: String},
});

module.exports = mongoose.model('Luz', LuzSchema);