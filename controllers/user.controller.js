import {bcrypt} from 'bcrypt-nodejs';
import {User} from '../models/user';
import {jwt} from '../services/jwt';
import * as UserService from '../services/user.service.js'


/*** Método para registrar Usuarios ***/
function saveUser(req, res){
	var params = req.body;
	var user = new User();

	if (params.name && params.surname && params.nick && params.email && params.password){
		user.name = params.name;
		user.surname = params.surname;
		user.nick = params.nick;
		user.email = params.email;
		user.role = 'ROLE_USER';
		user.image = null;
		user.status = null;

		// Comprobamos que no haya usuarios duplicados
		User.find({ $or: [{email: user.email.toLowerCase()},{nick: {$regex : new RegExp(user.nick, "i")}}]}).exec((err, users) => {
			if(err) return res.status(500).send({message: 'Error en la petición de usuarios!!'});
			if(users && users.length >= 1){
				users.forEach((bad_user) =>{
					if ((bad_user.nick.toLowerCase() == user.nick.toLowerCase())&&(bad_user.email.toLowerCase() == user.email.toLowerCase())){
						return res.status(200).send({message: 'Ya hay un usuario con nick '+user.nick+' y email '+user.email+' registrado!!!'});
					}
					if (bad_user.nick.toLowerCase() == user.nick.toLowerCase()){
						return res.status(200).send({message: 'Ya hay un usuario con nick '+user.nick+' registrado!!!'});
					}
					if (bad_user.email.toLowerCase() == user.email.toLowerCase()){
						return res.status(200).send({message: 'Ya hay un usuario con email '+user.email+' registrado!!!'});
					}
				});
			} else {
				// Guardamos la contraseña cifrada
				bcrypt.hash(params.password, null, null, (err, hash) => {
					user.password = hash;

					// Guardamos el usuario
					user.save((err, userStore) => {
						if(err) return res.status(500).send({message: 'Error al guardar el usuario'});
						if(userStore){
							res.status(200).send({user: userStore});
						} else {
							res.status(404).send({message: 'No se ha registrado el usuario'});
						}
					});
				});
			}
		});
	} else {
		res.status(200).send({message: 'Envía todos los campos necesarios!!'});
	}
}

/*** Método para Loguear Usuarios ***/
function loginUser(req, res){
	var params = req.body;

	var email = params.email;
	var password = params.password;

	User.findOne({email: email}, (err, user) => {
		if (err) return res.status(500).send({message: 'Error en la petición!!'});
		if (user){
			bcrypt.compare(password, user.password, (err, check) => {
				if (check){
				if (params.gettoken){ 
					return res.status(200).send({token: jwt.createToken(user)});
				} else {
					user.password = undefined;
					return res.status(200).send({user});
				}


			} else {
				return res.status(404).send({message: 'Email o contraseña incorrectos!!'});
			}
		});
		} else {
			return res.status(404).send({message: 'Email o contraseña incorrectos!!!!'});
		}
	});
}
module.exports = {
	saveUser,
	loginUser, 
}
export const getUsers = async (req, res) => {
    try{
        const users = await UserService.getUsers();
        res.status(200).json(
            users
        );
    } catch (err) {
        res.status(400).json({
            msg: err.toString()
        });
    }
}