'use strict'
//PARA RUTAS

var express = require('express');
//Cargar las rutas
var projectController = require("../controllers/project.js");
//Cargare el router
var router = express.Router();

//Se ejecuta un middleware
var multipart = require('connect-multiparty');
	//Indicando donde se guardaran
var multipartMiddleware = multipart({ uploadDir: './uploads' }); 

//Rutas
router.get('/home', projectController.home);
router.post('/test', projectController.test);
router.post('/api/save-project', projectController.saveProject);
router.get('/get-project/:id?', projectController.getProyect);
router.get('/api/projects', projectController.getProjects);
router.put('/update/:id',projectController.updateProject);
router.delete('/update/:id',projectController.deleteProject);
//Para subir archivos
router.post('/api/upload-image/:id', multipartMiddleware,projectController.uploadImage);
router.get("/get-image/:image?", projectController.getImage);
module.exports = router;