import UserModel from '../models/user.schema.js'

export const getUsers = async function () {
    try{
        return await UserModel.find().sort('name')
    } catch (e) {
        throw new Error('Error fetching users')
    }
}   