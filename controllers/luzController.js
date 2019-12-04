'use strict'

const Luz = require('../models/luz');

/**
 * Metodo que permite ingresar una luz al sistema
 * @param {*} req 
 * @param {*} res 
 */
function createLuz(req, res) {

    const luz = new Luz({
        nombre: req.body.nombre,
        idFisica: req.body.idFisica,
        color: req.body.color
    })

    luz.save((err) => {
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
        return res.status(200).send(luz);
    })
}

/**
 * metodo que permite obtener una luz segun su id
 * @param {*} req 
 * @param {*} res 
 */
function getLuzById(req, res) {

    Luz.findById(req.params.idLuz).exec((err, luz) => {
        if (err) return res.status(500).send(err);
        if (!luz) return res.status(404).send({ 'Error': 'Luz no encontrada' });

        return res.status(200).send(luz);
    });

}

/**
 * metodo que permite obtener una luz segun su id fisica
 * @param {*} req 
 * @param {*} res 
 */
function getLuzByIdFisica(req, res) {

    Luz.findOne({
        idFisica: req.params.idFisica
    }).exec((err, luz) => {
        if (err) return res.status(500).send(err);
        if (!luz) return res.status(404).send({ 'Error': 'Luz no encontrada' });

        return res.status(200).send(luz);
    });

}

/**
 * Metodo que permite obtener todas las luces ingresadas al sistema
 * @param {*} req 
 * @param {*} res 
 */
function getLuces(req, res) {
    Luz.find().exec((err, luces) => {
        if (err) return res.status(500).send(err);
        if (!luces) return res.status(404).send({ 'Error': 'No hay luces registradas' });

        return res.status(200).send(luces);
    });
}

/**
 * Metodo que permite obtener todas las luces disponibles del sistema
 * @param {*} req 
 * @param {*} res 
 */
function getLucesDisponibles(req, res) {
    Luz.find({
        disponible: true
    }).exec((err, luces) => {
        if (err) return res.status(500).send(err);
        if (!luces) return res.status(404).send({ 'Error': ' no hay luces disponibles' });

        return res.status(200).send(luces);
    });
}

module.exports = {
    createLuz,
    getLuzById,
    getLuzByIdFisica,
    getLuces,
    getLucesDisponibles
}