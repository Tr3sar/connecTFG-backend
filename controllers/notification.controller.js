import * as NotificationService from "../services/notification.service.js";

export const createNotification = async (req, res) => {
    const { message, user_id } = req.body;

    try{
        const notification = await NotificationService.createNotification(message, user_id);
        res.status(200).json(
            notification
        )
    } catch (err) {
        res.status(400).json({
            msg: err.toString()
        })
    }
}

export const getNotificationsByUserId = async (req, res) => {
    const { user_id } = req.params;

    try{
        const notifications = await NotificationService.getNotificationsByUserId(user_id)
        res.status(200).json(
            notifications
        )
    } catch (err) {
        res.status(400).json({
            msg: err.toString()
        })
    }
}

export const deleteNotification = async (req, res) => {
    const { id } = req.params;

    try{
        const notification = await NotificationService.deleteNotification(id);
        res.status(200).json(
            notification
        )
    } catch (err) {
        res.status(400).json({
            msg: err.toString()
        })
    }
}