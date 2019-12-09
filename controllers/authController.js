'use strict'

const User = require('../models/usuario');
const Service = require('../services/services');
const bcrypt = require('bcrypt-nodejs');
const rutVerify = require('chilean-rut');
const emailVerify = require('email-validator');

//Para encryptar password
const saltRounds = 10;
var salt = bcrypt.genSaltSync(saltRounds);

/**
 * Metodo que permite registrar admin en el sistema
 * @param {*} req 
 * @param {*} res 
 */
function registrarAdmin(req, res) {

    //valida si rut a ingresar es valido
    if (!rutVerify.validate(req.body.rut)) return res.status(400).send({
        'Error': 'Rut no valido'
    });

    // parsea rut a formato correcto
    const rutformat = rutFormat(req.body.rut);

    //valida si correo a ingresar es valido
    if (!emailVerify.validate(req.body.correo)) return res.status(400).send({
        'Error': 'Email no valido'
    });

    //Valida que exista solo un admin con el mismo rut
    User.findOne({
        rut: rutformat,
        rol: 'ADMIN'
    }).exec((err, userFound) => {
        if (err) return res.status(500).send(err.message);

        if (userFound != null) return res.status(400).send({
            'Error': 'Ya existe administrador con ese rut'
        });

        var hashPass = bcrypt.hashSync(req.body.password, salt);

        const user = new User({
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            correo: req.body.correo,
            telefono: req.body.telefono,
            rut: rutformat,
            password: hashPass,
            rol: 'ADMIN'
        })

        user.save((err) => {
            if (err) return res.status(500).send({ 'Error': `Error al crear administrador ` + err });

            return res.status(200).send(user);
        });
    });
}

/**
 * Metodo que permite registrar usuario en el sistema
 * @param {*} req 
 * @param {*} res 
 */
function registrarUsuario(req, res) {

    // valida si rut a ingresar es valido
    if (!rutVerify.validate(req.body.rut)) return res.status(400).send({
        'Error': 'Rut no valido'
    });

    // parsea rut a formato correcto
    const rutformat = rutFormat(req.body.rut);

    //valida si correo a ingresar es valido
    if (!emailVerify.validate(req.body.correo)) return res.status(400).send({
        'Error': 'Email no valido'
    });

    //Valida que exista solo un usuario con el mismo rut
    User.findOne({
        telefono: rutformat,
        rol: 'USER'
    }).exec((err, userFound) => {
        if (err) return res.status(500).send(err.message);

        if (userFound != null) return res.status(400).send({
            'Error': 'Ya existe usuario con ese rut'
        });

        var hashPass = bcrypt.hashSync(req.body.password, salt);

        const user = new User({
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            correo: req.body.correo,
            telefono: req.body.telefono,
            rut: rutformat,
            password: hashPass,
            rol: 'USER'
        })

        user.save((err) => {
            if (err) return res.status(500).send({ 'Error': `Error al crear usuario ` + err });

            return res.status(200).send(user);
        });
    });
}

/**
 * Metodo que permite al usuario (medico o paciente) logearse al sistema
 * @param {*} req 
 * @param {*} res 
 */
function login(req, res) {

    // valida si rut a ingresar es valido
    if (!rutVerify.validate(req.body.rut)) return res.status(400).send({
        'Error': 'Rut no valido'
    });

    // parsea rut a formato correcto
    const rutformat = rutFormat(req.body.rut);

    User.findOne({
        rut: rutformat
    }).select("+password").exec((err, user) => {
        if (err) return res.status(500).send(err.message);

        if (user == null) return res.status(404).send({
            "Error": "Usuario no encontrado"
        });

        bcrypt.compare(req.body.password, user.password, (err, decrypt) => {

            if (err) return res.status(500).send(err.message);

            if (decrypt) {

                var token = Service.createToken(user);
                user.token = token;

                user.save((err, user) => {
                    if (err) {
                        return res.status(401).send({
                            "error": "Un error ha ocurrido con la Base de datos"
                        });
                    }

                    return res.status(200).send({
                        "token": token
                    });
                });

            } else {
                return res.status(401).send({
                    "Error": "Contraseña no corresponde"
                });
            }
        });
    });
}

function rutFormat(rut) {
    const rutraw = rutVerify.unformat(rut);//elimina formato del rut sacando . y -
    const rutbody = rutraw.substring(0, rut.length - 1);//elimina el digito verificador del rut sin formato
    const rutdigit = rutVerify.getValidatorDigit(rutbody);//calcula el digito verificador del rut sin formato
    const rutformat = rutVerify.format(rutbody) + '-' + rutdigit;//le da formato correcto al rut con su digito

    return rutformat;
}

module.exports = {
    registrarAdmin,
    registrarUsuario,
    login
}