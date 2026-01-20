const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const checkAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected...');

        const email = process.argv[2];
        if (!email) {
            console.log('Please provide an email: node checkAdmin.js <email>');
            process.exit(1);
        }

        const user = await User.findOne({ email });
        if (!user) {
            console.log(`User with email ${email} not found.`);
        } else {
            console.log(`User Found: ${user.name}`);
            console.log(`Email: ${user.email}`);
            console.log(`Is Admin: ${user.isAdmin}`);

            if (!user.isAdmin) {
                console.log('Updating user to be admin...');
                user.isAdmin = true;
                await user.save();
                console.log('User is now an ADMIN.');
            } else {
                console.log('User is already an ADMIN.');
            }
        }

        mongoose.connection.close();
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
};

checkAdmin();
