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