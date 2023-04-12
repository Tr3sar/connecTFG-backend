import NotificationModel from '../models/notification.schema.js'

export const createNotification = async function(message, user_id) {
    try {
        const notification = new NotificationModel({ message, user: user_id });
        return await notification.save();
    } catch (e) {
        throw Error('Error creating notification');
    }
}

export const getNotificationsByUserId = async function (user_id) {
    try{
        const notifications = await NotificationModel.find({user: user_id})
        return notifications;
    } catch(e) {
        throw Error('Error fetching notifications')
    }
}

export const deleteNotification = async function (id) {
    try{
        const notification = await NotificationModel.findById(id);
        if (!notification) {
            throw Error('There is no notification with that id')
        }
        return await NotificationModel.findByIdAndDelete(id);
    } catch (e) {
        throw Error('Error deleting notification')
    }
}