'use strict'

const express = require('express');
const publicRouter = express.Router();

const luzController = require('../controllers/luzController');
const ejercicioController = require('../controllers/ejercicioController');
const estacionController = require('../controllers/estacionController');
const sesionController = require('../controllers/sesionController');

//Luz Routes
publicRouter.get('/luz/:idLuz', luzController.getLuzById);
publicRouter.get('/luz/:idFisica/fisica', luzController.getLuzByIdFisica);
publicRouter.get('/luces', luzController.getLuces);
publicRouter.get('/luces/disponibles', luzController.getLucesDisponibles);

//Ejercicio Routes
publicRouter.get('/ejercicios', ejercicioController.getEjercicios);
publicRouter.get('/ejercicio/:idEjercicio', ejercicioController.getEjercicioById);

//Estacion Routes
publicRouter.get('/estaciones', estacionController.getEstaciones);
publicRouter.get('/estacion/:idEstacion', estacionController.getEstacionById);

//Sesion Routes
publicRouter.get('/sesiones', sesionController.getSesiones);
publicRouter.get('/sesion/:idSesion', sesionController.getSesionById);


module.exports = publicRouter;