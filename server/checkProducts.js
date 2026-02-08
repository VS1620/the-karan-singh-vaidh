const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const Product = require('./models/ProductModel');

const check = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const count = await Product.countDocuments();
        console.log(`Total products: ${count}`);

        const emptySlug = await Product.countDocuments({ $or: [{ slug: { $exists: false } }, { slug: null }, { slug: "" }] });
        console.log(`Products with missing/empty slug: ${emptySlug}`);

        const allProducts = await Product.find({}, 'name slug');
        console.log('--- Current Slugs ---');
        allProducts.forEach(p => {
            console.log(`ID: ${p._id} | Name: ${p.name} | Slug: "${p.slug}"`);
        });

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

check();
