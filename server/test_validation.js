const mongoose = require('mongoose');
const Product = require('./models/ProductModel'); // Using the NEW file

const run = async () => {
    try {
        console.log('Connecting to DB...');
        // Use standard URI
        await mongoose.connect('mongodb://127.0.0.1:27017/karansinghvaidh');
        console.log('Connected.');

        console.log('Testing Product Validation...');
        const p = new Product({
            name: 'Test Product',
            user: new mongoose.Types.ObjectId(), // Added user
            // NO PRICE
            image: 'test.jpg',
            shortDescription: 'test',
            fullDescription: 'test',
            category: new mongoose.Types.ObjectId(), // Dummy ID
            packs: [
                {
                    name: 'Test Pack',
                    sellingPrice: 100, // Valid selling price
                    mrp: 120
                }
            ]
        });

        console.log('Attempting to validate...');
        await p.validate();
        console.log('VALIDATION SUCCESS! The schema is correct.');

    } catch (error) {
        console.error('VALIDATION FAILED!');
        console.error(error);
    } finally {
        await mongoose.disconnect();
        process.exit();
    }
};

run();
