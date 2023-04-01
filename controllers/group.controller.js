import * as GroupService from '../services/group.service.js'

export const createGroup = async (req, res) => {
    const name = req.body.group.name
    const members = req.body.group.members
    let description = req.body.group.description

    if (description == undefined) {
        description = ''
    }

    try{
        const group = await GroupService.createGroup(name, members, description);
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
    try{
        const group = GroupService.createMessage(group_id, emitter, message);
        res.status(200).json({
            group
        });
    } catch (err) {
        res.status(400).json({
            msg: err.toString()
        });
    }
}