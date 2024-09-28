const mongoose = require('mongoose');

const connectDB = () => {
    try {
        mongoose.connect(process.env.DB_URL);
        console.log('Successfully connected to DB');
    } catch (error) {
        console.log(`error connecting to DB: ${error}`);
    }
};

module.exports = { connectDB };
