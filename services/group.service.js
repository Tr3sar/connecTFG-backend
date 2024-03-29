import GroupModel from '../models/group.schema.js'
import MessageModel from '../models/message.schema.js';

export const createGroup = async function(name, members, description) {
    try{
        const group = new GroupModel({
            name: name,
            members: members,
            message: [],
            file: [],
            description: description
        })

        return await group.save()

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

export const getGroupsFromUser = async function (userId) {
    try{
        return await GroupModel.find({members: userId})
                        .sort('name')
                        .populate('members')
    } catch (e) {
        throw Error('Error fetching groups')
    }
}

export const getMessagesFromGroup = async function(id) {
    try{
        const group = await GroupModel.findById(id);
        if (!group) {
            throw Error('Group not found')
        }

        const groupPopulated = await group.populate({
            path: 'messages',
            populate: {
                path: 'emitter',
                model: 'User'
            }
        })

        const formattedMessages = groupPopulated.messages.map(message => {
            const {_id, text, file, emitter } = message;

            return {
                _id,
                text,
                file: file.data instanceof Buffer
                ? {
                    href: 'data:' + file.contentType + ';base64,' + file.data.toString('base64'),
                    filename: file.filename
                  }
                : null,
                emitter
            };
        });

        return formattedMessages
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

export const createMessage = async function (group_id, emitter, text, file) {
    try{
        if (!text && !file) {
            throw new Error('Message without content')
        } else if (!file) {
            file = { 
                buffer : '',
                mimetype: '',
                originalname: ''
            }
        } else if (text == 'undefined' || text == undefined) {
            text = ''
        }

        const group = await GroupModel.findById(group_id);
        if (!group) {
            throw new Error('Group not found')
        }

        

        const message = new MessageModel({
            text: text || '',
            file: {
                data: file.buffer,
                contentType: file.mimetype,
                filename: file.originalname
            },
            emitter: emitter
        })

        await message.save()

        group.messages.push(message);
        return group.save();
    } catch (e) {
        throw new Error('Error creating message')
    }
}

export const updateGroup = async (id, name, description, members) => {
    try{
        const group = await GroupModel.findById(id);
        if (!group) {
            throw Error('There is no group with that id')
        }

        return await GroupModel.findByIdAndUpdate(id, {name, description, members});
    } catch (e) {
        throw new Error('Error updating group')
    }
}

export const deleteGroupById = async (id) => {
    try{
        const group = await GroupModel.findById(id);
        if (!group) {
            throw Error('There is no group with that id')
        }

        return await GroupModel.findByIdAndDelete(id);
    } catch (e) {
        throw Error('Error deleting group.')
    }
}

export const getGroupFromTwoUsers = async (userId1, userId2) => {
    try{
        const group = await GroupModel.find({
            members: { 
                $all: [userId1, userId2]
            }
        })

        if (group.length === 0) {
            throw new Error('There is no grouop with those users')
        }

        return group
    } catch (e) {
        throw Error('Error obtaining group')
    }
}