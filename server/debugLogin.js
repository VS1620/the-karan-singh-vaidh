const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Define User Schema manually to ensure no Model file issues
const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
}, { timestamps: true });

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('UserDebug', userSchema, 'users'); // Use existing 'users' collection

const run = async () => {
    console.log('--- STARTING DEBUG ---');

    // 1. Connection
    const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/karansinghvaidh';
    console.log(`Connecting to: ${uri}`);
    try {
        await mongoose.connect(uri);
        console.log('✅ Connected to MongoDB');
    } catch (e) {
        console.error('❌ Connection Failed:', e.message);
        return;
    }

    // 2. Find User
    const email = 'vikasrajput1620@gmail.com'; // user's email
    console.log(`Searching for: ${email}`);
    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.error('❌ User NOT FOUND in database');
            // List all users
            const allUsers = await User.find({});
            console.log('Current users in DB:', allUsers.map(u => u.email));
            return;
        }
        console.log('✅ User Found:', user._id);
        console.log('   Stored Hash:', user.password);

        // 3. Match Password
        const password = 'Vikas@1620';
        console.log(`Matching password: ${password}`);
        const isMatch = await user.matchPassword(password);
        console.log(`✅ Password Match Result: ${isMatch}`);

        if (!isMatch) {
            console.error('❌ Password Mismatch!');
            // Try hashing 'Vikas@1620' to see what it should look like
            const salt = await bcrypt.genSalt(10);
            const testHash = await bcrypt.hash(password, salt);
            console.log(`   Expected format (example): ${testHash}`);
        } else {
            // 4. Generate Token
            const secret = process.env.JWT_SECRET || 'default_secret'; // Fallback
            console.log(`Generating Token with secret length: ${secret.length}`);
            const token = jwt.sign({ id: user._id }, secret, { expiresIn: '30d' });
            console.log('✅ Token Generated:', token.substring(0, 20) + '...');
        }

    } catch (e) {
        console.error('❌ Error during Logic:', e);
    } finally {
        await mongoose.disconnect();
        console.log('--- END DEBUG ---');
    }
};

run();
