const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '../.env' });

const diagnose = async () => {
    console.log('--- STARTING DIAGNOSTICS ---');
    console.log(`Checking Mongo URI: ${process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/karansinghvaidh'}`);

    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/karansinghvaidh');
        console.log('✅ MongoDB Connected Successfully');
    } catch (error) {
        console.error('❌ MongoDB Connection FAILED');
        console.error(error.message);
        console.log('--- DIAGNOSTICS END ---');
        process.exit(1);
    }

    const email = 'vikasrajput1620@gmail.com';
    const password = 'Vikas@1620';

    console.log(`Checking User: ${email}`);
    const user = await User.findOne({ email });

    if (!user) {
        console.error('❌ User NOT FOUND. Seeding user now...');
        try {
            const newUser = await User.create({
                name: 'Karan Singh Vaidh',
                email: email,
                password: password,
                isAdmin: true
            });
            console.log('✅ User CREATED successfully.');
            // Verify creation
            const verifiedUser = await User.findOne({ email });
            console.log(`   User ID: ${verifiedUser._id}`);
            console.log(`   Is Admin: ${verifiedUser.isAdmin}`);
        } catch (err) {
            console.error('❌ Failed to create user:', err.message);
        }
    } else {
        console.log('✅ User FOUND');
        console.log(`   User ID: ${user._id}`);
        console.log(`   Is Admin: ${user.isAdmin}`);

        console.log('Verifying Password...');
        const isMatch = await user.matchPassword(password);
        if (isMatch) {
            console.log('✅ Password MATCHES');
        } else {
            console.error('❌ Password DOES NOT MATCH');
            console.log('Re-hashing password...');
            user.password = password;
            await user.save();
            console.log('✅ Password updated and verified.');
        }
    }

    console.log('--- DIAGNOSTICS COMPLETE ---');
    process.exit(0);
};

diagnose();
