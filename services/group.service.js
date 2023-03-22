import GroupModel from '../models/group.schema.js'

export const createGroup = async function(name, members, description) {
    try{
        const group = new GroupModel({
            name: name,
            member_id: members,
            message: [],
            file: [],
            description: description
        })

        return await group.save();

    } catch (e) {
        throw Error('Error creating group');
    }
}

export const getGroups = async function () {
    try{
        return await GroupModel.find().sort('name');
    } catch (e) {
        throw Error('Error fetching groups')
    }
}