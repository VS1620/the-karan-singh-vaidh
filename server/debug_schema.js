const mongoose = require('mongoose');
const Product = require('./models/Product');

console.log('--- ROOT PRODUCT SCHEMA PATHS ---');
Object.keys(Product.schema.paths).forEach(path => {
    if (path === 'price' || path === 'sellingPrice' || path.includes('price')) {
        console.log(`FOUND: ${path}`);
    }
});

console.log('--- PACK SCHEMA PATHS (via packs array) ---');
// Accessing the subdocument schema
const packsPath = Product.schema.paths['packs'];
if (packsPath && packsPath.schema) {
    Object.keys(packsPath.schema.paths).forEach(path => {
        console.log(`Pack Path: ${path}`);
    });
} else {
    console.log('Could not access packs sub-schema');
}

console.log('--- DONE ---');
process.exit();
