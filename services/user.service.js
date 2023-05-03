import UserModel from '../models/user.schema.js';
import bcrypt from 'bcrypt'

export const getUsers = async function () {
    try {
        return await UserModel.find().sort('name')
    } catch (e) {
        throw new Error('Error fetching users')
    }
}

export const createUser = async function (name, surname, password, email, img_url, tfg_url, degree, description) {
    try {
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

export const updateUser = async function (id, status) {
    try {
        const user = UserModel.findById(id);
        if (!user) {
            throw Error('There is no user with that id')
        }

        return await UserModel.findByIdAndUpdate(id, {
            status
        })
    } catch (e) {
        throw Error('Error updating user')
    }
}

export const getUserById = async function (id) {
    try {
        const user = await UserModel.findById(id);
        if (!user) {
            throw Error('There is no user with that id')
        }

        return user
    } catch (e) {
        throw Error('Error fetching user')
    }
}

export const acceptUserConection = async function (id, conectionUserId) {
    try {
        const user = await UserModel.findById(id);
        const userConection = await UserModel.findById(conectionUserId);

        if (!user || !userConection) {
            throw Error('There is no user with that id')
        }

        if (!user.conections.includes(conectionUserId)) {
            user.conections.push(conectionUserId)
        }

        if (!userConection.conections.includes(id)) {
            userConection.conections.push(conectionUserId);
        }

        await user.save()
        await userConection.save();

        return user;
    } catch (e) {
        throw Error('error updating user')
    }
}

export const getUserConections = async function (id) {
    try{
        const user = await UserModel.findById(id).populate('conections')
        if (!user) {
            throw Error('There is no user with that id')
        }

        return user.conections;
    } catch (e) {
        throw Error('Error fetching user conections')
    }
}