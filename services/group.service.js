import GroupModel from '../models/group.schema.js'
import MessageModel from '../models/message.schema.js';

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

export const getMessagesFromGroup = async function(id) {
    try{
        console.log('ID', id)
        const group = await GroupModel.findById(id);
        if (!group) {
            throw Error('Group not found')
        }

        const groupPopulated = await group.populate('messages')

        return groupPopulated.messages
    } catch (e) {
        throw Error('Error fetching messages')
    }

}

export const getGroupsExpanded = async function () {
    try{
        const groupsFind = GroupModel.find({})
        const groupsPopulate = groupsFind.populate('messages')
        return await groupsPopulate
    } catch (e) {
        throw Error('Error fetching groups')
    }
}

export const createMessage = async function (group_id, emitter, text) {
    try{
        const group = await GroupModel.findById(group_id);
        if (!group) {
            throw new Error('Group not found')
        }

        const message = new MessageModel({
            text: text,
            emitter: emitter
        })

        await message.save()

        group.messages.push(message);
        return group.save();
    } catch (e) {
        throw new Error('Error creating message')
    }
}