import * as GroupService from '../services/group.service.js'

import UserModel from '../models/user.schema.js'

export const createGroup = async (req, res) => {
    const name = req.body.group.name
    const members = req.body.group.members
    let description = req.body.group.description

    if (description == undefined) {
        description = ''
    }

    const validMembers = await Promise.all(
        members.map(async member => {
          const user = await UserModel.findById(member.id);
          if (!user) {
            throw new Error(`User with id ${member.id} not found`);
          }
          return user._id; // Solo guardar el identificador de objeto del usuario
        })
      );      

    try{
        const group = await GroupService.createGroup(name, validMembers, description);

        res.status(200).json({
            group
        });
    } catch (err) {
        res.status(400).json({
            msg: err.toString()
        });
    }
}

export const getGroups = async (req, res) => {
    try{
        const groups = await GroupService.getGroups();
        res.status(200).json(
            groups
        );
    } catch (err) {
        res.status(400).json({
            msg: err.toString()
        });
    }
}

export const getGroupsFromUser = async (req, res) => {
    const { userId } = req.params
    try{
        const groups = await GroupService.getGroupsFromUser(userId)
        res.status(200).json(
            groups
        )
    } catch (err) {
        res.status(400).json({
            msg: err.toString()
        })
    }
}

export const getMessagesFromGroup = async (req, res) => {
    const {id} = req.params
    
    try{
        const messages = await GroupService.getMessagesFromGroup(id)
        res.status(200).json(
            messages
        )
    } catch (err) {
        res.status(400).json({
            msg: err.toString()
        })
    }
}

export const getGroupsExpanded = async (req, res) => {
    try{
        const groups = await GroupService.getGroupsExpanded();
        res.status(200).json(
            groups
        );
    } catch (err) {
        res.status(400).json({
            msg: err.toString()
        })
    }
}

export const createMessage = async (req, res) => {
    const {group_id, emitter, message} = req.body;
    const file = req.file;

    if (message == undefined) {
        message = ''
    }

    try{
        const group = GroupService.createMessage(group_id, emitter, message, file);
        res.status(200).json({
            group
        });
    } catch (err) {
        res.status(400).json({
            msg: err.toString()
        });
    }
}

export const updateGroup = async (req, res) => {
    const { id } = req.params;
    const { name, members } = req.body.group;

    let description = req.body.group.description

    if (!description) { description = '' }

    const validMembers = await Promise.all(
        members.map(async member => {
          const user = await UserModel.findById(member.id);
          if (!user) {
            throw new Error(`User with id ${member.id} not found`);
          }
          return user._id; // Solo guardar el identificador de objeto del usuario
        })
      );   

    try{
        const groupUpdated = await GroupService.updateGroup(id, name, description, validMembers)
        res.status(200).json(
            groupUpdated
        )
    } catch (err) {
        res.status(400).json({
            msg: err.toString()
        })
    }
}

export const deleteGroupById = async (req, res) => {
    const { id } = req.params;

    try{
        const deletedGroup = await GroupService.deleteGroupById(id);
        res.status(200).json(
            deletedGroup
        )
    } catch (err) {
        res.status(400).json({
            msg: err.toString()
        })
    }
}

export const getGroupFromTwoUsers = async (req, res) => {
    const { userId1 } = req.params;
    const { userId2 } = req.params;

    try{
        const group = await GroupService.getGroupFromTwoUsers(userId1, userId2);
        res.status(200).json(
            group
        )
    } catch (err) {
        res.status(400).json({
            msg: err.toString()
        })
    }
}