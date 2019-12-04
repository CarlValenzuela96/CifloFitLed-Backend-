'use strict'

const Estacion = require('../models/estacion');


function createEstacion(req, res) {
    const estacion = new Estacion({
        nombre: req.body.nombre,
        ejercicios: req.body.ejercicios,
        lucesEstacion: req.body.lucesEstacion
    })

    var promises = []
    const tiempoTotal = 0;
    promises.push(
        estacion.ejercicios.forEach(ejercicio => {
            tiempoTotal = tiempoTotal + ejercicio.tiempo
        })
    )

    return Promise.all(promises).then(response => {
        estacion.tiempoTotal = tiempoTotal;

        estacion.save((err) => {
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
            return res.status(201).send(estacion);
        })

    }).catch(err => {
        if (err) return res.status(500).send(err);
    });
}

function getEstaciones(req, res) {
    Estacion.find().populate('Ejercicio Luz').exec((err, estaciones) => {
        if (err) return res.status(500).send(err);
        if (!estaciones) return res.status(404).send({ 'Error': 'No hay estaciones creadas' });

        return res.status(200).send(estaciones);
    })
}

function getEstacionById(req, res) {
    Estacion.findById(req.params.idEstacion).populate('Ejercicio Luz').exec((err, estacion) => {
        if (err) return res.status(500).send(err);
        if (!estacion) return res.status(404).send({ 'Error': 'No existe estacion con esa id' });

        return res.status(200).send(estacion);
    })
}

function editEstacion(req, res) {
    Estacion.findById(req.params.idEstacion).populate('Ejercicio Luz').exec((err, estacion) => {
        if (err) return res.status(500).send(err);
        if (!estacion) return res.status(404).send({ 'Error': 'No existe estacion con esa id' });

        estacion.nombre = req.body.nombre;
        estacion.ejercicios = req.body.ejercicios;
        estacion.lucesEstacion = req.body.lucesEstacion;

        const tiempoTotal = 0;
        promises.push(
            estacion.ejercicios.forEach(ejercicio => {
                tiempoTotal = tiempoTotal + ejercicio.tiempo
            })
        )

        return Promise.all(promises).then(response => {
            estacion.tiempoTotal = tiempoTotal;

            estacion.save((err) => {
                if (err) return res.status(500).send(err);

                return res.status(201).send(estacion);
            })

        }).catch(err => {
            if (err) return res.status(500).send(err);
        });
    })
}

module.exports = {
    createEstacion,
    getEstacionById,
    getEstaciones,
    editEstacion
}