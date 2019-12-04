'use strict'

const Sesion = require('../models/sesion');

function createSesion(req, res) {
    const sesion = new Sesion({
        nombre: req.body.nombre,
        repeticiones: req.body.repeticiones,
        tiempoDescanzo: req.body.tiempoDescanzo,
        estaciones: req.body.estaciones
    })

    sesion.save((err) => {
        if (err) {
            if (err.code == 11000) {
                var field = err.message.split("index:")[1];
                field = field.split(" dup key")[0];
                field = field.substring(0, field.lastIndexOf("_"));
                return res.status(401).send({
                    "Error": "Un error ha ocurrido con el " + field + ", ya existe."
                });
            }
        }
        return res.status(201).send(sesion);
    })
}

function editSesion(req, res) {
}

function agregarParticipantes(req, res) {

}

function getSesionById(req, res) {
    Sesion.findById(req.params.idSesion).populate('Estacion').exec((err, sesion) => {
        if (err) return res.status(500).send(err);
        if (!sesion) return res.status(404).send({ 'Error': 'No existe sesión con esa id' });
        return res.status(200).send(sesion);
    })
}

function getSesiones(req, res) {
    Sesion.find().populate('Estacion').exec((err, sesiones) => {
        if (err) return res.status(500).send(err);
        if (!sesiones) return res.status(404).send({ 'Error': 'No existen sesiones registradas' });
        return res.status(200).send(sesiones);
    })
}

module.exports = {
    createSesion,
    editSesion,
    getSesionById,
    getSesiones
}