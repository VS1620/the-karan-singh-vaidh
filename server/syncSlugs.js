const mongoose = require('mongoose');
const dotenv = require('dotenv');
const slugify = require('slugify');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const Product = require('./models/ProductModel');

const syncSlugs = async () => {
    try {
        console.log('Connecting to database...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected.');

        const products = await Product.find({});
        console.log(`Found ${products.length} products to sync.`);

        for (const product of products) {
            const oldSlug = product.slug;
            // Force regenerate from name to ensure strict formatting
            // using strict: true removes chars like parentheses, dots, etc.
            let generatedSlug = slugify(product.name, { lower: true, strict: true });

            if (!generatedSlug) {
                console.warn(`[SYNC-WARN] Could not generate slug for product: "${product.name}". Using fallback.`);
                generatedSlug = 'product';
            }

            // Ensure uniqueness
            let slugExists = await Product.findOne({ slug: generatedSlug, _id: { $ne: product._id } });
            let counter = 1;
            const baseSlug = generatedSlug;
            while (slugExists) {
                generatedSlug = `${baseSlug}-${counter}`;
                slugExists = await Product.findOne({ slug: generatedSlug, _id: { $ne: product._id } });
                counter++;
            }

            product.slug = generatedSlug;
            await product.save();
            console.log(`[SYNC-SUCCESS] "${product.name}" | ID: ${product._id} | Old: "${oldSlug}" -> New: "${product.slug}"`);
        }

        console.log('All slugs synchronized successfully.');
        process.exit();
    } catch (error) {
        console.error('Error synchronizing slugs:', error);
        process.exit(1);
    }
};

syncSlugs();
