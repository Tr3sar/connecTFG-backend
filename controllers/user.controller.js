import * as UserService from '../services/user.service.js'

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

export const createUser = async (req, res) => {
	try{
		const{ name, surname, password, email, img_url, tfg_url, degree, description } = req.body
		if(name == null) { throw new Error('Error creating user') }
		else if (surname == null) { throw new Error('Error creating user') }
		else if (password == null) { throw new Error('Error creating user') }
		else if (email == null) { throw new Error('Error creating user') }
		else if (img_url == null) { throw new Error('Error creating user') }
		else if (tfg_url == null) { throw new Error('Error creating user') }
		else if (degree == null) { throw new Error('Error creating user') }
		else if (description == null) { throw new Error('Error creating user') }

		const user = await UserService.createUser(name, surname, password, email, img_url, tfg_url, degree, description);

		res.status(200).json({
			user
		})
		


	} catch (err) {
		res.status(400).json({
			msg: err.toString()
		})
	}
}
