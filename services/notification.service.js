import NotificationModel from '../models/notification.schema.js'

export const createNotification = async function(type, emitter_id, receiver_id) {
    try {
        const types = ['connection']

        if(!types.includes(type)) {
            throw new Error("This type doesn't exists.")
        }

        const notification = new NotificationModel({ type, emitter: emitter_id, receiver: receiver_id });
        return await notification.save();
    } catch (e) {
        throw Error('Error creating notification');
    }
}

export const getNotificationsByUserId = async function (user_id) {
    try{
        const notifications = await NotificationModel.find({receiver: user_id})
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