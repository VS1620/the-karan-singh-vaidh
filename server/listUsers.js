const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const listUsers = async () => {
    try {
        if (!process.env.MONGO_URI) {
            console.error('MONGO_URI not found in .env');
            process.exit(1);
        }
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected...');

        const users = await User.find({}).select('name email isAdmin');
        console.log('--- USER LIST ---');
        users.forEach(u => {
            console.log(`- ${u.name} (${u.email}) [Admin: ${u.isAdmin}]`);
        });

        mongoose.connection.close();
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
};

listUsers();
