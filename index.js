'use strict'

//cargo el modulo de moongoose por ello uso require(de node.js)
 var mongoose = require('mongoose');
//llamo al modulo de app
 var app = require('./app');
//sera el puerto del servidor
 var port = 3700; 

 //Indico que es una Promesa 
 mongoose.Promise = global.Promise;

//Ahora hago la conexion a la base de datos
//Esto es una promesa asi que puedo utilizar el metodo then
//Both connect and createConnection take a mongodb:// URI, or the parameters host, database, port, options.
mongoose.connect('mongodb://localhost:27017/portafolio')
	.then((respont)=>{
		console.log("conexion a DB establecida "+respont);
	
		//Creacion del servidor
		app.listen(port, ()=>{
			console.log('servidor corriendo correctamente en la URL: localhost: '+port);
		})
	})
	.catch(err=>console.log(err));


//CREAR SERVIDOR

