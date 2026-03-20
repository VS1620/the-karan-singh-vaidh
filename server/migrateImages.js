const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const Product = require('./models/ProductModel');
const Category = require('./models/Category');
require('dotenv').config();

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

async function downloadImage(url, filename) {
    if (!url.startsWith('http')) return url; // Already local or something else

    const filepath = path.join(uploadsDir, filename);
    
    // If it already exists, don't redownload
    if (fs.existsSync(filepath)) {
        console.log(`Already exists: ${filename}`);
        return `/uploads/${filename}`;
    }

    try {
        const response = await axios({
            url,
            method: 'GET',
            responseType: 'stream'
        });

        return new Promise((resolve, reject) => {
            const writer = fs.createWriteStream(filepath);
            response.data.pipe(writer);
            writer.on('finish', () => resolve(`/uploads/${filename}`));
            writer.on('error', reject);
        });
    } catch (error) {
        console.error(`Error downloading ${url}:`, error.message);
        return url; // Fallback to original
    }
}

function getFilenameFromUrl(url) {
    if (!url.startsWith('http')) return null;
    const urlObj = new URL(url);
    const basename = path.basename(urlObj.pathname);
    return Date.now() + '-' + basename;
}

async function migrate() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB');

        const products = await Product.find({});
        console.log(`Found ${products.length} products`);

        for (const product of products) {
            let updated = false;

            if (product.image && product.image.includes('cloudinary.com')) {
                const filename = getFilenameFromUrl(product.image);
                if (filename) {
                    const localPath = await downloadImage(product.image, filename);
                    if (localPath !== product.image) {
                        product.image = localPath;
                        updated = true;
                        console.log(`Migrated main image for product ${product.name}`);
                    }
                }
            }

            if (product.images && product.images.length > 0) {
                for (let i = 0; i < product.images.length; i++) {
                    if (product.images[i].includes('cloudinary.com')) {
                        const filename = getFilenameFromUrl(product.images[i]);
                        if (filename) {
                            const localPath = await downloadImage(product.images[i], filename);
                            if (localPath !== product.images[i]) {
                                product.images[i] = localPath;
                                updated = true;
                                console.log(`Migrated additional image for product ${product.name}`);
                            }
                        }
                    }
                }
            }

            if (updated) {
                product.markModified('images');
                await product.save({ validateBeforeSave: false }); // Bypass validation if needed
                console.log(`Saved product ${product.name}`);
            }
        }

        const categories = await Category.find({});
        console.log(`Found ${categories.length} categories`);
        for (const category of categories) {
             let updated = false;
             if (category.image && category.image.includes('cloudinary.com')) {
                const filename = getFilenameFromUrl(category.image);
                if (filename) {
                    const localPath = await downloadImage(category.image, filename);
                    if (localPath !== category.image) {
                        category.image = localPath;
                        updated = true;
                        console.log(`Migrated image for category ${category.name}`);
                    }
                }
             }
             if (updated) {
                 await category.save();
             }
        }

        console.log('Migration complete');
        process.exit(0);
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
}

migrate();
