import * as UserService from '../services/user.service.js'

export const getUsers = async (req, res) => {
	try {
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


export const updateUser = async (req, res) => {

	const {
		id
	} = req.params;
	const {
		status
	} = req.body;

	console.log('actualizando a status: ', status)

	try {
		const user = await UserService.updateUser(id, status);
		res.status(200).json(
			user
		)
	} catch (err) {
		res.status(400).json({
			msg: err.toString()
		})
	}
}

export const updateUserStatus = async (userId, status) => {
	try {
		const user = await UserService.updateUser(userId, status);
		console.log('user', userId, status);
	} catch (err) {
		console.log('ERROR')
	}
}

export const getUserById = async (req, res) => {
	const {
		id
	} = req.params;
	console.log('id', id)

	try {
		const user = await UserService.getUserById(id);
		res.status(200).json(
			user
		)
	} catch (err) {
		res.status(400).json({
			msg: err.toString()
		})
	}
}

export const acceptUserConection = async (req, res) => {
	const {
		id
	} = req.params;
	const {
		conectionUserId
	} = req.body;

	try {
		const updatedUser = await UserService.acceptUserConection(id, conectionUserId);
		res.status(200).json(
			updatedUser
		)
	} catch (err) {
		res.status(400).json({
			msg: err.toString()
		})
	}
}

export const getUserConections = async (req, res) => {
	const {
		id
	} = req.params;

	try {
		const conections = await UserService.getUserConections(id);
		res.status(200).json(
			conections
		)
	} catch (err) {
		res.status(400).json({
			msg: err.toString()
		})
	}
}