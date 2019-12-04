'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsuarioSchema = Schema({
    nombre: {type:String},
    apellido: {type: String},
    correo: {type: String, require:true, unique: true},
    telefono: {type: String},
    rut: {type: String, require: true, unique: true},
    password: {type: String, require:true, select:false},
    peso: {type: Number},
    altura: {type: Number},
    imc: {type: Number},
    lesiones: {type: String},
    enfermedades: {type: String},
    rol: {type: String, require:true}, // ADMIN, USER
    token: {type: String}
});

module.exports = mongoose.model('Usuario', UsuarioSchema);