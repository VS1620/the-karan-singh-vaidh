const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
// const connectDB = require('../config/db'); // Removed incorrect import

dotenv.config();

const importData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/karansinghvaidh');

        const adminUser = {
            name: 'Karan Singh Vaidh',
            email: 'vikasrajput1620@gmail.com',
            password: 'Vikas@1620', // Will be hashed by model
            isAdmin: true,
        };

        await User.deleteMany({ email: adminUser.email }); // Clean up if exists

        await User.create(adminUser);

        console.log('Admin User Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
