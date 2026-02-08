const mongoose = require('mongoose');
const Product = require('./models/ProductModel');
const Category = require('./models/Category');
const User = require('./models/User');
require('dotenv').config();

const run = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB');

        const productId = '696fa9870b6f6dc6db28bd2e';
        const product = await Product.findById(productId);

        if (!product) {
            console.log('Product not found');
            process.exit(0);
        }

        console.log('Product found:', product.name);

        // Simulate update logic from controller
        const reqBody = {
            name: product.name + ' Updated Manually',
            ingredients: 'New Ingredients',
            usage: 'New Usage',
            benefits: 'New Benefits',
            packs: product.packs,
            category: product.category
        };

        const {
            name,
            image,
            images,
            category,
            countInStock,
            shortDescription,
            fullDescription,
            packs,
            discount,
            isActive,
            isBestSeller,
            isWellness,
            ingredients,
            usage,
            benefits
        } = reqBody;

        product.name = name || product.name;
        product.image = image || product.image;
        product.images = Array.isArray(images) ? images : (product.images || []);
        product.category = category || product.category;
        product.countInStock = countInStock !== undefined ? countInStock : product.countInStock;
        product.shortDescription = shortDescription || product.shortDescription;
        product.fullDescription = fullDescription || product.fullDescription;
        product.packs = packs || product.packs;
        product.discount = discount !== undefined ? discount : product.discount;
        product.isActive = isActive !== undefined ? isActive : product.isActive;
        product.isBestSeller = isBestSeller !== undefined ? isBestSeller : product.isBestSeller;
        product.isWellness = isWellness !== undefined ? isWellness : product.isWellness;
        product.ingredients = ingredients || product.ingredients;
        product.usage = usage || product.usage;
        product.benefits = benefits || product.benefits;

        console.log('Saving product...');
        const updatedProduct = await product.save();
        console.log('Product updated successfully:', updatedProduct.name);

        process.exit(0);
    } catch (error) {
        console.error('ERROR DURING UPDATE:', error);
        process.exit(1);
    }
};

run();
