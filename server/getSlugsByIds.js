const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const Product = require('./models/ProductModel');

const ids = [
    '697631c6bd94a7bc32bec1e2',
    '697628febd94a7bc32bebce1',
    '6976370fbd94a7bc32bec3fe',
    '69762e8dbd94a7bc32bec05a',
    '69761e95bd94a7bc32beb945',
    '6976241fbd94a7bc32beba87',
    '6976341abd94a7bc32bec2a8'
];

const check = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        for (const id of ids) {
            const p = await Product.findById(id);
            console.log(`${id}: ${p ? p.slug : 'NOT FOUND'}`);
        }
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

check();
