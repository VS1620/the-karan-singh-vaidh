const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Product = require('../models/ProductModel');
const Category = require('../models/Category');

const DOMAIN = 'https://thekaransinghvaidh.com';

/**
 * Identify and REMOVE:
 * - Duplicate URLs (Not added in logic)
 * - Thin pages (cart, login, register, account removed from static list)
 */
const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/shop', priority: '0.9', changefreq: 'daily' },
    { url: '/about', priority: '0.8', changefreq: 'monthly' },
    { url: '/contact', priority: '0.8', changefreq: 'monthly' },
    { url: '/privacy', priority: '0.5', changefreq: 'yearly' },
    { url: '/terms', priority: '0.5', changefreq: 'yearly' },
    { url: '/shipping', priority: '0.5', changefreq: 'yearly' },
    { url: '/cancellation', priority: '0.5', changefreq: 'yearly' },
];

/**
 * Slugify function to generate SEO-friendly strings
 */
const slugify = (text) => {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start
        .replace(/-+$/, '');            // Trim - from end
};

async function generateSitemap() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB Connected\n');

        // Fetch all products
        const products = await Product.find({ isActive: true }, 'slug updatedAt').lean();
        console.log(`Found ${products.length} products`);

        // Fetch all categories for SEO-optimized concern landing pages
        const categories = await Category.find({ isActive: true }, 'name updatedAt').lean();
        console.log(`Found ${categories.length} categories\n`);

        // Start XML
        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
        xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';

        // Add static pages
        staticPages.forEach(page => {
            xml += '  <url>\n';
            xml += `    <loc>${DOMAIN}${page.url}</loc>\n`;
            xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
            xml += `    <priority>${page.priority}</priority>\n`;
            xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
            xml += '  </url>\n';
        });

        // Add category concern pages (SEO optimized landing urls)
        categories.forEach(cat => {
            const slug = slugify(cat.name);
            xml += '  <url>\n';
            xml += `    <loc>${DOMAIN}/shop?category=${slug}</loc>\n`;
            xml += `    <changefreq>weekly</changefreq>\n`;
            xml += `    <priority>0.8</priority>\n`;
            const lastmod = cat.updatedAt ? cat.updatedAt.toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
            xml += `    <lastmod>${lastmod}</lastmod>\n`;
            xml += '  </url>\n';
        });

        // Add product pages
        products.forEach(product => {
            if (product.slug) {
                xml += '  <url>\n';
                xml += `    <loc>${DOMAIN}/product/${product.slug}</loc>\n`;
                xml += `    <changefreq>weekly</changefreq>\n`;
                xml += `    <priority>0.8</priority>\n`;
                const lastmod = product.updatedAt ? product.updatedAt.toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
                xml += `    <lastmod>${lastmod}</lastmod>\n`;
                xml += '  </url>\n';
            }
        });

        // Close XML
        xml += '</urlset>';

        // Save to public folder
        const publicPath = path.join(__dirname, '../../client/public/sitemap.xml');
        fs.writeFileSync(publicPath, xml);

        console.log('✅ Sitemap generated successfully!');
        console.log(`📍 Location: ${publicPath}`);
        console.log(`📊 Total URLs: ${staticPages.length + categories.length + products.filter(p => p.slug).length}`);
        console.log(`   - Static core pages: ${staticPages.length}`);
        console.log(`   - Concern/Category landing pages: ${categories.length}`);
        console.log(`   - Individual product pages: ${products.length}`);
        console.log('\n🌐 Sitemap URL: https://thekaransinghvaidh.com/sitemap.xml\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error generating sitemap:', error);
        process.exit(1);
    }
}

generateSitemap();
