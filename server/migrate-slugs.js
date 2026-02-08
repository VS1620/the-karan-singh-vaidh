const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

const Product = require('./models/ProductModel');
const Category = require('./models/Category');

const migrateSlugs = async () => {
    try {
        const mongoURI = process.env.MONGO_URI;
        if (!mongoURI) {
            console.error('❌ MONGO_URI is not defined in .env');
            process.exit(1);
        }

        console.log('Connecting to MongoDB...');
        await mongoose.connect(mongoURI);
        console.log('✅ Connected to MongoDB');

        // Helper to generate unique slug
        const slugify = async (text, Model, currentId) => {
            let baseSlug = text.toLowerCase().split(' ').join('-').replace(/[^\w-]+/g, '');
            let slug = baseSlug;
            let counter = 1;

            while (true) {
                const existing = await Model.findOne({ slug, _id: { $ne: currentId } });
                if (!existing) return slug;
                slug = `${baseSlug}-${counter}`;
                counter++;
            }
        };

        // Migrate Categories
        const categories = await Category.find({});
        console.log(`Found ${categories.length} categories...`);

        for (const cat of categories) {
            const newSlug = await slugify(cat.name, Category, cat._id);
            if (cat.slug !== newSlug) {
                await Category.updateOne({ _id: cat._id }, { $set: { slug: newSlug } });
                console.log(`  ✅ Migrated category: ${cat.name} -> ${newSlug}`);
            }
        }

        // Migrate Products
        const products = await Product.find({});
        console.log(`Found ${products.length} products...`);

        for (const prod of products) {
            const newSlug = await slugify(prod.name, Product, prod._id);
            if (prod.slug !== newSlug) {
                await Product.updateOne({ _id: prod._id }, { $set: { slug: newSlug } });
                console.log(`  ✅ Migrated product: ${prod.name} -> ${newSlug}`);
            }
        }

        console.log('✅ Migration completed successfully');
        process.exit(0);
    } catch (error) {
        console.error('❌ Migration failed:', error.message);
        process.exit(1);
    }
};

migrateSlugs();
