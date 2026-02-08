const mongoose = require('mongoose');
const dotenv = require('dotenv');
const slugify = require('slugify');
const path = require('path');

// Load env vars
dotenv.config({ path: path.join(__dirname, '.env') });

const Product = require('./models/ProductModel');

const migrate = async () => {
    try {
        console.log('Connecting to database...');
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ayurveda');
        console.log('Connected.');

        const products = await Product.find({ slug: { $exists: false } });
        console.log(`Found ${products.length} products without slugs.`);

        for (const product of products) {
            product.slug = slugify(product.name, { lower: true, strict: true });

            // Handle duplicates
            let slugExists = await Product.findOne({ slug: product.slug, _id: { $ne: product._id } });
            let counter = 1;
            const originalSlug = product.slug;
            while (slugExists) {
                product.slug = `${originalSlug}-${counter}`;
                slugExists = await Product.findOne({ slug: product.slug, _id: { $ne: product._id } });
                counter++;
            }

            await product.save();
            console.log(`Updated: ${product.name} -> ${product.slug}`);
        }

        console.log('Migration completed successfully.');
        process.exit();
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
};

migrate();
