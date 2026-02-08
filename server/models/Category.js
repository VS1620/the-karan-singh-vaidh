const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    slug: {
        type: String,
        unique: true,
        sparse: true,
    },
    description: {
        type: String,
    },
    image: {
        type: String, // URL to image
    },
    isActive: {
        type: Boolean,
        default: true,
    }
}, {
    timestamps: true,
});

categorySchema.pre('save', async function () {
    if (this.isModified('name')) {
        let baseSlug = this.name.toLowerCase().split(' ').join('-').replace(/[^\w-]+/g, '');
        let slug = baseSlug;
        let counter = 1;

        while (true) {
            const existing = await mongoose.model('Category').findOne({ slug, _id: { $ne: this._id } });
            if (!existing) break;
            slug = `${baseSlug}-${counter}`;
            counter++;
        }
        this.slug = slug;
    }
});

module.exports = mongoose.model('Category', categorySchema);
