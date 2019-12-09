'use strict'

const Sesion = require('../models/sesion');
const Usuario = require('../models/usuario')

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
    Sesion.findById(req.params.sesion).exec((err, sesion) => {
        if (err) return res.status(500).send(err);
        if (!sesion) return res.status(404).send({ 'Error': 'No existe sesión con esa id' });

        sesion.nombre = req.body.nombre;
        sesion.repeticiones = req.body.repeticiones;
        sesion.tiempoDescanzo = req.body.tiempoDescanzo;
        sesion.estaciones = req.body.estaciones;

        sesion.save((err) => {
            if (err) return res.status(500).send(err);
            return res.status(200).send(sesion);
        })
    });
}

function agregarParticipante(req, res) {
    Sesion.findById(req.params.sesion).exec((err, sesion) => {
        if (err) return res.status(500).send(err);
        if (!sesion) return res.status(404).send({ 'Error': 'No existe sesión con esa id' });

        Usuario.find(
            {
                _id: req.params.idUsuario,
                rol: "USER"
            }).exec((err, user) => {
                if (err) return res.status(500).send(err);
                if (!user) return res.status(404).send({ 'Error': 'No existe usuario con esa id' });
                if (sesion.participantes.contains(user)) return res.status(404).send({ 'Error': 'Usuario ya participa en esta sesion' });

                sesion.participantes.push(user);

                sesion.save((err) => {
                    if (err) return res.status(500).send(err);
                    return res.status(200).send(sesion);
                })

            });
    })

}

function quitarParticipante(req, res) {
    Sesion.findById(req.params.sesion).exec((err, sesion) => {
        if (err) return res.status(500).send(err);
        if (!sesion) return res.status(404).send({ 'Error': 'No existe sesión con esa id' });

        Usuario.find(
            {
                _id: req.params.idUsuario,
                rol: "USER"
            }).exec((err, user) => {
                if (err) return res.status(500).send(err);
                if (!user) return res.status(404).send({ 'Error': 'No existe usuario con esa id' });

                let index = sesion.participantes.indexOf(req.params.idUsuario);
                if (index != -1) {
                    sesion.participantes.splice(index, 1);
                    sesion.save(function (err, event) {
                        if (err) return res.status(500).send(err);
                        return res.status(200).send(sesion);
                    });
                } else {
                    return res.status(403).send({ error: "Participante no pertenece a esta sesion" });
                }
            });
    })

    Sesion.findById(req.params.idSesion).exec(function (err, event) {
        if (err) return res.status(400).send({ "error": "Error de DB" });
        if (!event) return res.status(404).send({ error: "Este evento no existe" });

        User.findById(req.user._id).exec(function (err, user) {
            if (err) return res.status(400).send({ "error": "Error de DB" });
            if (!user) return res.status(404).send({ error: "El usuario no existe" });

            let index = user.favorites.indexOf(req.params.idEvent);
            if (index != -1) {
                user.favorites.splice(index, 1);
                user.save(function (err, event) {
                    if (err) {
                        return res.status(400).send({ "error": "Error de DB" });
                    }
                    return res.status(200).send({ succes: true });
                });
            } else {
                return res.status(403).send({ error: "Evento no esta en favoritos" });
            }
        })
    });
}

function getSesionById(req, res) {
    Sesion.findById(req.params.idSesion).populate('estaciones').exec((err, sesion) => {
        if (err) return res.status(500).send(err);
        if (!sesion) return res.status(404).send({ 'Error': 'No existe sesión con esa id' });
        return res.status(200).send(sesion);
    })
}

function getSesiones(req, res) {
    Sesion.find().populate('estaciones').exec((err, sesiones) => {
        if (err) return res.status(500).send(err);
        if (!sesiones) return res.status(404).send({ 'Error': 'No existen sesiones registradas' });
        return res.status(200).send(sesiones);
    })
}

module.exports = {
    createSesion,
    editSesion,
    getSesionById,
    getSesiones,
    agregarParticipante,
    quitarParticipante
}