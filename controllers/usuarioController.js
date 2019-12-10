'use strict'
const User = require('../models/usuario');

function getUserById(req, res) {
    User.findById(req.params.id).exec((err, usuario) => {
        if (err) return res.status(500).send(err);
        if (!usuario) return res.status(404).send({ 'Error': 'Usuario no encontrado' });

        return res.status(200).send(usuario);
    });
}

function editUserById(req, res) {
    User.findById(req.params.id).exec((err, usuario) => {
        if (err) return res.status(500).send(err);
        if (!usuario) return res.status(404).send({ 'Error': 'Usuario no encontrado' });

        usuario.nombre = req.body.nombre;
        usuario.apellido = req.body.apellido;
        usuario.correo = req.body.correo;
        usuario.telefono = req.body.telefono;

        usuario.peso = req.body.peso;
        usuario.altura = req.body.altura;
        if (req.body.peso != null && req.body.altura != null) {
            usuario.imc = req.body.peso / (req.body.altura ^ 2);//altura en metros (ver si viene en cm convertir)
        }
        usuario.lesiones = req.body.lesiones;
        usuario.enfermedades = req.body.enfermedades;

        usuario.save((err) => {
            if (err) return res.status(500).send(err);

            return res.status(200).send(usuario);
        })
    })
}

function getMe(req, res) {
    User.findById(req.user.id).exec((err, usuario) => {
        if (err) return res.status(500).send(err);
        if (!usuario) return res.status(404).send({ 'Error': 'Usuario no encontrado' });

        return res.status(200).send(usuario);
    })
}

function editMe(req, res) {
    User.findById(req.user.id).exec((err, usuario) => {
        if (err) return res.status(500).send(err);
        if (!usuario) return res.status(404).send({ 'Error': 'Usuario no encontrado' });

        usuario.nombre = req.body.nombre;
        usuario.apellido = req.body.apellido;
        usuario.correo = req.body.correo;
        usuario.telefono = req.body.telefono;

        usuario.peso = req.body.peso;
        usuario.altura = req.body.altura;
        if (usuario.peso != null && usuario.altura != null) {
            usuario.imc = req.body.peso / (req.body.altura ^ 2);//altura en metros (ver si viene en cm convertir)
        }
        usuario.lesiones = req.body.lesiones;
        usuario.enfermedades = req.body.enfermedades;

        usuario.save((err) => {
            if (err) return res.status(500).send(err);

            return res.status(200).send(usuario);
        })
    })
}

function getUsuarios(req,res){
    User.find().exec((err,usuarios)=>{
        if(err) return res.status(500).send(err);
        if(!usuarios) return res.status(404).send({'Error':'No hay usuarios registrados'});

        return res.status(200).send(usuarios);
    })
}

module.exports = {
    getMe,
    getUserById,
    editMe,
    editUserById,
    getUsuarios
}