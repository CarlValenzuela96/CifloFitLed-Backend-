'use strict'

const jwt = require('jsonwebtoken');
const config = require('../config');

//Metodo que crea token
function createToken(user){
    const payload = {
        id: user._id,
        name: user.nombre,
        rut: user.rut,
        rol: user.rol,
    }

    var token = jwt.sign(payload, config.app.secret,{
        expiresIn: 60 * 60 * 24 // expires in 24 hours
    });
    return token;
}

module.exports = {
    createToken
}