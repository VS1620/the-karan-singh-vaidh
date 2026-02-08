const mongoose = require('mongoose');

const packSchema = mongoose.Schema({
    name: { type: String, required: true }, // e.g., "1 Month Pack"
    mrp: { type: Number, required: true, default: 0 }, // Original Price
    sellingPrice: { type: Number, required: true, default: 0 }, // Discounted/Final Price
    medicines: [{ type: String }], // List of included items e.g. ["Vigor Oil", "Stamina Caps"]
    isDefault: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true }
});

// Virtual for discount percentage
packSchema.virtual('discountPercentage').get(function () {
    if (this.mrp > 0 && this.sellingPrice < this.mrp) {
        return Math.round(((this.mrp - this.sellingPrice) / this.mrp) * 100);
    }
    return 0;
});

// Ensure virtuals are included in JSON
packSchema.set('toJSON', { virtuals: true });
packSchema.set('toObject', { virtuals: true });

const productSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        unique: true,
        sparse: true,
    },
    image: {
        type: String,
        required: true,
    },
    images: [String], // Array of additional images
    shortDescription: {
        type: String,
        required: true,
    },
    fullDescription: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Please select a category'],
        ref: 'Category',
    },
    ingredients: {
        type: String,
        required: false,
    },
    usage: {
        type: String,
        required: false,
    },
    benefits: {
        type: String,
        required: false,
    },
    packs: [packSchema],
    discount: {
        type: Number,
        default: 0,
    },
    countInStock: {
        type: Number,
        required: true,
        default: 100, // Default generous stock as per requirement usually
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    isBestSeller: {
        type: Boolean,
        default: false,
    },
    isWellness: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
});

productSchema.pre('save', async function () {
    if (this.isModified('name')) {
        let baseSlug = this.name.toLowerCase().split(' ').join('-').replace(/[^\w-]+/g, '');
        let slug = baseSlug;
        let counter = 1;

        while (true) {
            const existing = await mongoose.model('Product').findOne({ slug, _id: { $ne: this._id } });
            if (!existing) break;
            slug = `${baseSlug}-${counter}`;
            counter++;
        }
        this.slug = slug;
    }
});

productSchema.index({ name: 'text' });
productSchema.index({ category: 1 });
productSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Product', productSchema);
