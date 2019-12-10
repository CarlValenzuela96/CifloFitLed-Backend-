'use strict'

const Ejercicio = require('../models/ejercicio');
const Estacion = require('../models/estacion');

function createEjercicio(req, res) {

    const ejercicio = new Ejercicio({
        nombre: req.body.nombre,
        instrucciones: req.body.instrucciones,
        tiempo: req.body.tiempo,
        imagen: req.body.imagen
    });

    ejercicio.save((err) => {
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
        return res.status(201).send(ejercicio);
    })
}

function asignLuzEjercicio(req, res) {

    Estacion.findById(req.params.idEstacion).exec((err, estacion) => {
        if (err) return res.status(500).send(err);
        if (!estacion) return res.status(404).send({ 'Error': 'Estacion no existe' });

        Ejercicio.findById(req.params.idEjercicio).exec((err, ejercicio) => {
            if (err) return res.status(500).send(err);
            if (!ejercicio) return res.status(404).send({ 'Error': 'Ejercicio no existe' });

            const lucesEstacion = estacion.lucesEstacion;
            const lucesIngresar = req.body.lucesEjercicio;

            var promises = [];
            var lucescorrect;
            promises.push(
                lucescorrect = lucesIngresar.some(v => lucesEstacion.includes(v))

            );

            return Promise.all(promises).then(response => {
                if (!lucescorrect) return res.status(403).send({ 'Error': 'Almenos una luz seleccionada no esta en la estacion seleccionada' });
                ejercicio.lucesEjercicio = lucesIngresar;

                ejercicio.save((err) => {
                    if (err) return res.status(500).send(err);


                    return res.status(200).send(ejercicio);
                })
            }).catch(err => {
                if (err) return res.status(500).send(err);
            });

        });
    });
}

function getEjercicios(req, res) {
    Ejercicio.find().populate('lucesEjercicio').exec((err, ejercicios) => {
        if (err) return res.status(500).send(err);
        if (!ejercicios) return res.status(404).send({ 'Error': 'No existen ejercicios registrados' });

        return res.status(200).send(ejercicios);
    })
}

function getEjercicioById(req, res) {
    Ejercicio.findById(req.params.idEjercicio).populate('lucesEjercicio').exec((err, ejercicios) => {
        if (err) return res.status(500).send(err);
        if (!ejercicios) return res.status(404).send({ 'Error': 'No existen ejercicios registrados' });

        return res.status(200).send(ejercicios);
    })
}

function editarEjercicio(req, res) {
    Ejercicio.findById(req.params.id).exec((err, ejercicio) => {
        if (err) return res.status(400).send(err);

        ejercicio.nombre = req.body.nombre;
        ejercicio.instrucciones = req.body.instrucciones;
        ejercicio.tiempo = req.body.tiempo;
        ejercicio.imagen = req.body.imagen;

        ejercicio.save((err) => {
            if (err) return res.status(401).send({ 'Error': "Un error ha ocurrido con la Base de datos" });

            return res.status(200).send(ejercicio);
        });

    })
}

module.exports = {
    createEjercicio,
    getEjercicioById,
    getEjercicios,
    editarEjercicio,
    asignLuzEjercicio
}