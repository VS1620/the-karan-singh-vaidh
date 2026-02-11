const mongoose = require('mongoose');
const slugify = require('slugify');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

const Product = require('../models/ProductModel');

async function forceGenerateSlugs() {
    try {
        console.log('Starting FORCE slug generation for ALL products...\n');

        // Find ALL products
        const products = await Product.find({});

        console.log(`Found ${products.length} total products\n`);

        let updated = 0;
        let skipped = 0;

        for (const product of products) {
            // Check if product already has a valid slug
            if (product.slug && product.slug.trim() !== '') {
                console.log(`⏭️  Skipped "${product.name}" - already has slug: ${product.slug}`);
                skipped++;
                continue;
            }

            // Generate slug from product name
            let baseSlug = slugify(product.name, {
                lower: true,
                strict: true,
                remove: /[*+~.()'"!:@]/g
            });

            let slug = baseSlug;
            let counter = 1;

            // Check for uniqueness and append number if needed
            while (true) {
                const existingProduct = await Product.findOne({
                    slug: slug,
                    _id: { $ne: product._id }
                });

                if (!existingProduct) {
                    break;
                }

                slug = `${baseSlug}-${counter}`;
                counter++;
            }

            // Force update by modifying the name field to trigger pre-save hook
            product.slug = slug;
            product.name = product.name; // Touch the name field
            await product.save();

            console.log(`✅ Generated slug for "${product.name}": ${slug}`);
            updated++;
        }

        console.log('\n' + '='.repeat(60));
        console.log(`📊 Summary:`);
        console.log(`   Total products: ${products.length}`);
        console.log(`   Updated: ${updated}`);
        console.log(`   Skipped (already had slugs): ${skipped}`);
        console.log('='.repeat(60));
        console.log('\n✅ Slug generation completed successfully!\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error generating slugs:', error);
        process.exit(1);
    }
}

forceGenerateSlugs();
