import * as GroupService from '../services/group.service.js'

export const createGroup = async (req, res) => {
    const {name, members, description} = req.body

    if (description == null) {
        description = '';
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