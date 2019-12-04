'use strict'

const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/usuario');

/**
 * Metodo que permite verificar si el usuario se encuentra logeado
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function isAuth(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({ 'Error': 'Debe estar logeado' });
    }

    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.decode(token, config.app.secret);

    User.findById(payload.id).exec((err, user) => {
        if (err) return res.status(406).send({ 'Error': 'No se encontro un usuario asociado a la sesion' });
        if (!user) return res.status(404).send({ 'Error': 'No se encontro Usuario' });
        if (user.token != token) return res.status(403).send({ 'Error': 'Token ya expiro' });
        req.user = user;
        next();
    });
}

/**
 * Metodo que permite verificar si el usuario tiene el rol requerido
 * @param {*} rol 
 */
function hasRole(rol) {
    return function (req, res, next) {
        if (req.user.rol !== rol) return res.status(401).send({ 'Error': 'Usuario no autorizado' });
        next();
    }
}

module.exports = {
    isAuth,
    hasRole
};