const asyncHandler = require('express-async-handler');
const Product = require('../models/ProductModel');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    const { category, sort, keyword } = req.query;

    let query = {};

    if (category && category !== 'All') {
        const mongoose = require('mongoose');
        const Category = require('../models/Category');

        // Check if the provided category is a valid ObjectId
        if (mongoose.Types.ObjectId.isValid(category)) {
            query.category = category;
        } else {
            // If not a valid ID, it's likely a name or slug (e.g., 'kidney-stone')
            // Convert 'kidney-stone' to 'Kidney Stone' loosely for search
            const searchName = category
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

            const foundCategory = await Category.findOne({
                name: { $regex: new RegExp(`^${searchName}$`, 'i') }
            });

            if (foundCategory) {
                query.category = foundCategory._id;
            } else {
                // Return empty if category name doesn't exist
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

const getProductById = asyncHandler(async (req, res) => {
    let { id } = req.params;
    const mongoose = require('mongoose');

    console.log(`[SEO-DEBUG] Starting lookup for identifier: "${id}"`);

    try {
        let product;

        // 1. Normalize input: strictly trim and handle nulls
        id = (id || '').trim();
        if (!id) {
            console.warn('[SEO-DEBUG] Empty identifier received');
            res.status(400);
            throw new Error('Product identifier is required');
        }

        // 2. Try lookup by ObjectId first (traditional)
        if (mongoose.Types.ObjectId.isValid(id)) {
            console.log(`[SEO-DEBUG] Identifying as ObjectId: ${id}`);
            product = await Product.findById(id).populate('category', 'name');
        }

        // 3. If not found by ID, try lookup by Slug (SEO)
        if (!product) {
            const normalizedSlug = id.toLowerCase();
            console.log(`[SEO-DEBUG] Identifier not found as ID or is not an ID. Searching by slug: "${normalizedSlug}"`);

            // Explicitly search by slug field
            product = await Product.findOne({ slug: normalizedSlug }).populate('category', 'name');
        }

        if (product) {
            console.log(`[SEO-DEBUG] Success: Found product "${product.name}" (ID: ${product._id})`);
            return res.json(product);
        } else {
            console.error(`[SEO-DEBUG] Failure: No product matches identifier "${id}"`);
            res.status(404);
            return res.json({ message: 'Product not found', identifier: id });
        }
    } catch (error) {
        console.error(`[SEO-CRITICAL-ERROR] Crash prevented in getProductById:`, error.message);
        console.error(error.stack);
        res.status(500);
        return res.json({
            message: 'Internal Server Error during product lookup',
            error: error.message,
            identifier: id
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
