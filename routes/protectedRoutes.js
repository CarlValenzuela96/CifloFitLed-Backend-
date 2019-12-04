'use strict'

const express = require('express');
const protectedRouter = express.Router();
const luzController = require('../controllers/luzController');
const ejercicioController = require('../controllers/ejercicioController');
const estacionController = require('../controllers/estacionController');
const usuarioController = require('../controllers/usuarioController');
const sesionController = require('../controllers/sesionController');
const middleware = require('../middlewares/middleware');

//luces
protectedRouter.post('/luz',middleware.isAuth, middleware.hasRole('ADMIN'), luzController.createLuz);
protectedRouter.get('/luz/:idLuz',middleware.isAuth, middleware.hasRole('ADMIN'), luzController.getLuzById);
protectedRouter.get('/luz/:idFisica/fisica',middleware.isAuth, middleware.hasRole('ADMIN'), luzController.getLuzByIdFisica);
protectedRouter.get('/luces', middleware.isAuth, middleware.hasRole('ADMIN'), luzController.getLuces);
protectedRouter.get('/luces/disponibles', middleware.isAuth, middleware.hasRole('ADMIN'), luzController.getLucesDisponibles);

//ejercicio
protectedRouter.post('/ejercicio',middleware.isAuth, middleware.hasRole('ADMIN'), ejercicioController.createEjercicio);
protectedRouter.put('/ejercicio/:idEjercicio', middleware.isAuth, middleware.hasRole('ADMIN'), ejercicioController.editarEjercicio);
protectedRouter.get('/ejercicios', middleware.isAuth, ejercicioController.getEjercicios);
protectedRouter.get('/ejercicio/:idEjercicio', middleware.isAuth, ejercicioController.getEjercicioById);
protectedRouter.put('/luces/estacion/:idEstacion/ejercicio/:idEjercicio', middleware.isAuth, middleware.hasRole('ADMIN'), ejercicioController.asignLuzEjercicio);

//estacion
protectedRouter.post('/estacion', middleware.isAuth,middleware.hasRole('ADMIN'),estacionController.createEstacion);
protectedRouter.get('/estaciones', middleware.isAuth, estacionController.getEstaciones);
protectedRouter.get('/estacion/:idEstacion', middleware.isAuth, estacionController.getEstacionById);
protectedRouter.put('/estacion/:idEstacion', middleware.isAuth, middleware.hasRole('ADMIN'), estacionController.editEstacion);

//Usuario
protectedRouter.put('/me',middleware.isAuth, middleware.hasRole('USER'),usuarioController.editMe);
protectedRouter.get('/me',middleware.isAuth, middleware.hasRole('USER'),usuarioController.getMe);
protectedRouter.put('/usuario/:id',middleware.isAuth, middleware.hasRole('ADMIN'),usuarioController.editUserById);
protectedRouter.get('/usuario/:id',middleware.isAuth, middleware.hasRole('ADMIN'),usuarioController.getUserById)
protectedRouter.get('/usuarios',middleware.isAuth, middleware.hasRole('ADMIN'),usuarioController.getUsuarios);

//Sesión
protectedRouter.post('/sesion',middleware.isAuth,middleware.hasRole('ADMIN'),sesionController.createSesion);
protectedRouter.get('/sesiones', middleware.isAuth, middleware.hasRole('ADMIN'), sesionController.getSesiones);
protectedRouter.get('/sesion/:idSesion', middleware.isAuth, middleware.hasRole('ADMIN'), sesionController.getSesionById);


module.exports = protectedRouter;