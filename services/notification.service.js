import NotificationModel from '../models/notification.schema'

export const createNotification = async function(name) {
    try {
        const notification = new NotificationModel({ name });
        return await notification.save();
    } catch (e) {
        throw Error('Error creating notification');
    }
}