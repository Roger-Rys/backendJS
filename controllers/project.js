'use strict'
//Para BD
var projectDB = require('../models/project');
//Para borrar archivo
var fs = require('fs');

//PARA CONTROLLERS

var controller = {
	home: function(req, res){
		res.status(200).send({
			messages: 'Soy \'Home\''
		});
	},
	test: function(req, res){
		res.status(200).send({
			messages:'Soy \'test\''
		});
	},
	//METODOS PARA API, PARA GUARDAR UN PROYECTO EN BD
	saveProject:function(req, res){
		var project = new projectDB();
		var params = req.body;
		project.name = params.name;
		project.description = params.description;
		project.category = params.category;
		project.langs = params.langs;
		project.year = params.year;
		project.image = null;

		//Se guarda en la BD el proyecto
		project.save((err,projectStorage)=>{
			if(err) return res.status(500).send({
				messages: "Error en la peticion.."
			});
			if(!projectStorage) return res.status(404).send({
				messages:"No guardado el proyecto"
			});
			
			return res.status(200).send({
				project:projectStorage
			});
		});
		/*
		return res.status(200).send({
			params:params,
			project: project, 
			messages:"Metodo save proyect"
		});*/
	},

	//METODO PARA DEVOLVER UN DOCUMENTO
	getProyect: function(req,res){
		var projecyId = req.params.id;
		if(projecyId==null) return res.status(404).send({   
			messages: 'El id no existe'
		});

		projectDB.findById(projecyId, (err, project)=>{
			if(err)return res.status(500).send({
				messages: 'Error al devolver los datos'
			});
			if(!project)return res.status(404).send({
				messages: 'El proyecto no existe'
			});

			return res.status(200).send({
				project: project
			});
		});
	},

	//Devolver listado de Todos los proyectos
	getProjects: function(req, res){
		projectDB.find({}).sort('-year').exec((err, projects)=>{
			if(err) return res.status(500).send({
				messages: 'Error en devolver errores'
			});
			if(!projects) return res.status(404).send({
				messages: 'No existen proyectos'
			});
 			return res.status(200).send({proyect: projects});
		});
	},

	//Actualizar datos
	updateProject: function(req, res){
		var projectId = req.params.id;
		var update = req.body; 
		projectDB.findByIdAndUpdate(projectId, update, {new:true}, (err, projectUpdate)=>{
			if(err) return res.status(500).send({
				messages: 'Error al actualizar'
			});
			if(!projectUpdate) return res.status(404).send({
				messages: 'No existe el proyecto para actualizar'
			});
			return res.status(200).send({
				project: projectUpdate
			});
		});
	},

	//Borrar proyectos
	deleteProject: function(req, res){
		var projectId = req.params.id;
		projectDB.findByIdAndRemove(projectId,(err, projectDelete)=>{
			if(err) return res.status(500).send({
				messages: 'No se a podido borrar el proyecto'
			});
			if(!projectDelete) return res.status(404).send({
				messages: 'No se puede borrar ese proyecto por la id'
			});
			return res.status(200).send({
				project: projectDelete
			});
		});
	},

	//Subir imagenes 
	uploadImage: function(req, res){
		var projectId = req.params.id;
		var fileName = "Sin imagen";

		if(req.files){
			var filePath = req.files.image.path;
			var fileSplit = filePath.split('\\');
			//Se captura el nombre del archivo
			fileName = fileSplit[1];
			//verificar la extension
			var extSplit = fileName.split('\.');
			var fileExt = extSplit[1];
			if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif' ){
				//Guardar en DB
				projectDB.findByIdAndUpdate(projectId, {image: fileName},{new: true},(err, projectUpdate)=>{
					if(err) return res.status(500).send({
						messages: 'El archivo no se a subido'
					});
					if(!projectUpdate) return res.status(404).send({
						messages: 'El project no existe'
					})
					return res.status(200).send({
						project: projectUpdate
					});	
				});
			}
			else{ // Si no coincide con la extension se borrara
				fs.unlink(filePath, (err)=>{
					return res.status(200).send({
						messages: 'La extension no es valida',
						file: filePath
					});
				});

			}
			
		}else{
			return res.status(200).send({
				messages: fileName
			});
		}
	},

	//Devolver Imagenes
	getImage: function(req, res){
		//console.log("req: ",req);
		var file = req.params.image;

		const path = require('path'); 
		
		var path_file = './uploads/'+file;
		console.log("path: ",path_file);

		//ref: https://nodejs.org/api/fs.html#fs_fs_exists_path_callback
		fs.exists(path_file, (exists)=>{
			if(exists){
				return res.sendFile(path.resolve(path_file));
			}
			else{
				return res.status(200).send({
					messages:"No existe imagen"
				});
			}
		})
	}

};

module.exports = controller; 


