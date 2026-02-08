const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const Product = require('../models/ProductModel');
const Category = require('../models/Category');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    const { category, sort, keyword } = req.query;

    let query = {};

    if (category && category !== 'All') {
        // Check if the provided category is a valid ObjectId
        if (mongoose.Types.ObjectId.isValid(category)) {
            query.category = category;
        } else {
            // Check by slug first
            const foundCategory = await Category.findOne({
                $or: [
                    { slug: category },
                    { name: { $regex: new RegExp(`^${category.replace(/-/g, ' ')}$`, 'i') } }
                ]
            });

            if (foundCategory) {
                query.category = foundCategory._id;
            } else {
                return res.json([]);
            }
        }
    }

    if (keyword) {
        query.name = { $regex: keyword, $options: 'i' };
    }

    let result = Product.find(query)
        .populate('category', 'name')
        .select('-fullDescription -ingredients -usage -benefits');

    // Sorting
    if (sort === 'low') {
        // Since price is in packs, we might need to sort by the first pack's price
        // In MongoDB, sorting by an array field property works by using the min/max value in that array
        result = result.sort({ 'packs.sellingPrice': 1 });
    } else if (sort === 'high') {
        result = result.sort({ 'packs.sellingPrice': -1 });
    } else {
        result = result.sort({ createdAt: -1 });
    }

    const products = await result;
    res.json(products);
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
    try {
        const { id: idOrSlug } = req.params;

        console.log(`🔍 [Product Request] Resolving: "${idOrSlug}"`);

        let product;

        if (mongoose.Types.ObjectId.isValid(idOrSlug)) {
            product = await Product.findById(idOrSlug).populate('category', 'name slug');
        }

        // 2. Try Exact Slug
        if (!product) {
            product = await Product.findOne({ slug: idOrSlug }).populate('category', 'name slug');
        }

        // 3. Try Fuzzy Name/Slug Resolution (Direct DB Query)
        if (!product) {
            // Create a regex that allows spaces, hyphens and is case-insensitive
            const fuzzySearch = idOrSlug.replace(/[-\s]/g, '[-\\s]?');
            product = await Product.findOne({
                $or: [
                    { slug: { $regex: new RegExp(`^${fuzzySearch}$`, 'i') } },
                    { name: { $regex: new RegExp(`^${fuzzySearch}$`, 'i') } }
                ]
            }).populate('category', 'name slug');
        }

        // 4. Fallback: Search for any product containing the words (last resort)
        if (!product) {
            const words = idOrSlug.split(/[-\s]/).filter(w => w.length > 2);
            if (words.length > 0) {
                const wordRegex = new RegExp(words.join('|'), 'i');
                product = await Product.findOne({ name: { $regex: wordRegex } }).populate('category', 'name slug');
            }
        }

        if (product) {
            console.log(`✅ [Product Resolved] "${idOrSlug}" -> "${product.name}"`);
            res.json(product);
        } else {
            console.error(`❌ [Product Not Found] "${idOrSlug}"`);
            res.status(404);
            throw new Error('Product not found');
        }
    } catch (error) {
        console.error(`💥 [Product Resolution Error]: ${error.message}`);
        res.status(500).json({
            message: error.message,
            stack: process.env.NODE_ENV === 'production' ? null : error.stack
        });
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
        const {
            name, image, images, category, countInStock,
            shortDescription, fullDescription, packs,
            discount, isBestSeller, isWellness,
            ingredients, usage, benefits
        } = req.body;

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
        product.images = Array.isArray(images) ? images : [];
        product.category = category;
        product.countInStock = countInStock;
        product.shortDescription = shortDescription;
        product.fullDescription = fullDescription;
        product.packs = packs;
        product.discount = discount;
        product.isBestSeller = isBestSeller;
        product.isWellness = isWellness;
        product.ingredients = ingredients;
        product.usage = usage;
        product.benefits = benefits;
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
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name !== undefined ? name : product.name;
        product.image = image !== undefined ? image : product.image;
        product.images = Array.isArray(images) ? images : (product.images || []);
        product.category = category !== undefined ? category : product.category;
        product.countInStock = countInStock !== undefined ? countInStock : product.countInStock;
        product.shortDescription = shortDescription !== undefined ? shortDescription : product.shortDescription;
        product.fullDescription = fullDescription !== undefined ? fullDescription : product.fullDescription;
        product.packs = packs !== undefined ? packs : product.packs;
        product.discount = discount !== undefined ? discount : product.discount;
        product.isActive = isActive !== undefined ? isActive : product.isActive;
        product.isBestSeller = isBestSeller !== undefined ? isBestSeller : product.isBestSeller;
        product.isWellness = isWellness !== undefined ? isWellness : product.isWellness;
        product.ingredients = ingredients !== undefined ? ingredients : product.ingredients;
        product.usage = usage !== undefined ? usage : product.usage;
        product.benefits = benefits !== undefined ? benefits : product.benefits;

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
