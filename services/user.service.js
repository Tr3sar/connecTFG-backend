import UserModel from '../models/user.schema.js';
import bcrypt from 'bcrypt'

export const getUsers = async function () {
    try{
        return await UserModel.find().sort('name')
    } catch (e) {
        throw new Error('Error fetching users')
    }
}   

export const createUser = async function (name, surname, password, email, img_url, tfg_url, degree, description) {
    try{
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)

        const user = new UserModel({
            name,
            surname,
            password: passwordHash,
            email,
            img_url,
            tfg_url,
            degree,
            description,
            groups: [],
            notifications: [],
            posts: [],
            rol: 'Alumno',
            status: 'connected'
        })

        return await user.save();
    } catch (e) {
        throw new Error('Error creating user')
    }
}