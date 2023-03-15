import mongoose from 'mongoose';

const connectDB = async (url) => {

    try {
        await mongoose.connect(url);
        console.log('BBDD connected');
    } catch (error) {
        throw new Error('Error initiating BBDD:' + error);
    }
}

export default connectDB;
