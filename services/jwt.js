'use strict'

/* Servicio que nos va a permitir implementar el uso de TOKENS */

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'JOSEPMARTINTORRESMATIASLEANDROFRAGA'; 

exports.createToken = function(user){
	var payload = {
		sub: user._id,
		name: user.name,
		surname: user.surname,
		nick: user.nick,
		email: user.email,
		role: user.role,
		image: user.image,
		status: user.status,
		iat: moment().unix(), 
		exp: moment().add(30, 'days').unix() 
	};

	return jwt.encode(payload, secret); 
};