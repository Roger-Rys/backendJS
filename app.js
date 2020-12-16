'use strinct'

//cargo el modulo de express
var express = require('express');
//carga el modulo 	parse
var bodyParser = require("body-parser");
//aqui ejecute la funcion express
var app = express();

//archivos de rutas
var proyect_routes = require("./routes/project");

//middlewares
//middlewares metodo que se ejecuta antes de ejecutar la accion de un controlador o peticion
	//Configuracion para bodyParser
	// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}));
	//cualquier peticion lo convierte a JSON
	//parse application/json
app.use(bodyParser.json());

//CORS (Intercambio de Recursos de Origen Cruzado)
// ver https://developer.mozilla.org/es/docs/Web/HTTP/Access_control_CORS
// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');//Permito a ciertas paginas
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//rutas
app.use('/',proyect_routes); //.use --> creo el middleware
//ó app.get('/home',proyect_routes);
//ó app.post('/test',proyect_routes);

	//prueba 2
	//metodo GET
	// respond with "Hola mundo..." when a GET request is made to the homepage
	/* las rutas se configuran en el controllers/project.js
app.get('/',(req,res)=>{
	res.status(200).send(
		'<h1>Hola mundo desde API de nodejs</h1>'
	);
});
	//ruta de prueba, req(request), res(response)
	//metodo POST
app.post('/test',(req,res)=>{
	//req->los datos que le puedo enviar desde la peticio
	//res->es el response que enviare
	res.status(200).send({
		message:"Hola mundo desde API de nodejs"
	});
	//Por medio del cliente RESTful (POSTMAN) envio parametros 
	//como nombre y apellido, estos valores se contiene en el objeto body
	//del formato enviado por POSTMAN

	console.log(req.body.nombre+" "+req.body.apellido);
});
*/


//export - se debe exportar este modulo (app)
module.exports = app;