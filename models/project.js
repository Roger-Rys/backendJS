'use strict'
//MODELS

//Mongoose se encargara de trabajar con los modelos
var mongoose = require('mongoose');
//Esquema del modelo
var Schema = mongoose.Schema;
//Esquema de proyect, es el objeto molde el cual se utiliza para crear documentos  
var ProjectSchema = Schema({
	name: String,
	description: String,
	category: String,
	langs:String,
	year: Number,
	image: String
});

//Exportar el modulo | cojo el esquema y lo uso como modelo
								//name, proyect
//necesitamos convertir nuestro "ProjectSchema" en un modelo con el que podamos trabajar.
module.exports = mongoose.model("Project",ProjectSchema);

/*
Dos tipos de modelos 
-MODELO ENTIDAD
Referencia a un objeto, utilizado para guardar dato sa la base de datos

-MODELOS DE CONSULTAS
Realizan consultas para devolver al controlador
*/
