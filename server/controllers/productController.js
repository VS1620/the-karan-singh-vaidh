const asyncHandler = require('express-async-handler');
const Product = require('../models/ProductModel');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).populate('category', 'name');
    res.json(products);
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id).populate('category', 'name');

    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Sample name',
        // price removed
        user: req.user._id,
        image: '/images/sample.jpg',
        images: [],
        category: req.body.category || null, // Should be provided, but handling graceful init
        countInStock: 0,
        numReviews: 0,
        shortDescription: 'Sample short description',
        fullDescription: 'Sample full description',
    });

    // We might want to allow passing data directly instead of dummy data, 
    // but typical admin flow is "Create" -> "Edit", or just "Create with Data".
    // Let's support "Create with Data" if provided, else defaults.
    if (req.body.name) {
        const { name, image, images, category, countInStock, shortDescription, fullDescription, packs, discount, isBestSeller, isWellness } = req.body;

        // Validation: Must have at least one pack with sellingPrice
        if (!packs || packs.length === 0) {
            res.status(400);
            throw new Error('At least one pack is required for the product.');
        }

        const validPacks = packs.some(p => p.sellingPrice > 0);
        if (!validPacks) {
            res.status(400);
            throw new Error('At least one pack must have a valid selling price.');
        }

        product.name = name;
        product.image = image;
        product.images = images;
        product.category = category;
        product.countInStock = countInStock;
        product.shortDescription = shortDescription;
        product.fullDescription = fullDescription;
        product.packs = packs;
        product.discount = discount;
        product.isBestSeller = isBestSeller;
        product.isWellness = isWellness;
    }

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const {
        name,
        price,
        image,
        images,
        category,
        countInStock,
        shortDescription,
        fullDescription,
        packs, // Array of packs
        discount,
        isActive,
        isBestSeller,
        isWellness
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name || product.name;
        // product.price removed - strictly pack based now
        product.image = image || product.image;
        product.images = images || product.images;
        product.category = category || product.category;
        product.countInStock = countInStock !== undefined ? countInStock : product.countInStock;
        product.shortDescription = shortDescription || product.shortDescription;
        product.fullDescription = fullDescription || product.fullDescription;
        product.packs = packs || product.packs;
        product.discount = discount !== undefined ? discount : product.discount;
        product.isActive = isActive !== undefined ? isActive : product.isActive;
        product.isBestSeller = isBestSeller !== undefined ? isBestSeller : product.isBestSeller;
        product.isWellness = isWellness !== undefined ? isWellness : product.isWellness;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await product.deleteOne();
        res.json({ message: 'Product removed' });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
