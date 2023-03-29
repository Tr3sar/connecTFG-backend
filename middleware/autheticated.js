'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');

// string secreto que sólo lo conoce el programador del backend
var secret = 'JOSEPMARTINTORRESMATIASLEANDROFRAGA'; 

exports.ensureAuth = function(req, res, next){
	if(!req.headers.authorization){
		return res.status(403).send({message: 'La petición no tiene header de autenticación!!!'});
	}

	// quitamos las comillas dobles y simples
	var token = req.headers.authorization.replace(/['"]+/g, ''); 

	// decodificamos el payload
	try{
		var payload = jwt.decode(token, secret);
		if(payload.exp <= moment().unix()){
			return res.status(401).send({message: 'El token ha expirado!!'});
		}
	}catch(ex){
		return res.status(404).send({message: 'El token no es válido!!'});
	}

	// Guarda los datos del usuario
	req.user = payload;

	// Saltamos a lo siguiente
	next();
}