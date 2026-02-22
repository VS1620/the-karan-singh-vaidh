const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Product = require('../models/ProductModel');

const DOMAIN = 'https://thekaransinghvaidh.com';

// Static pages
const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/shop', priority: '0.9', changefreq: 'daily' },
    { url: '/about', priority: '0.8', changefreq: 'monthly' },
    { url: '/contact', priority: '0.8', changefreq: 'monthly' },
    { url: '/cart', priority: '0.5', changefreq: 'always' },
    { url: '/login', priority: '0.5', changefreq: 'monthly' },
    { url: '/register', priority: '0.5', changefreq: 'monthly' },
    { url: '/privacy', priority: '0.6', changefreq: 'yearly' },
    { url: '/terms', priority: '0.6', changefreq: 'yearly' },
    { url: '/shipping', priority: '0.6', changefreq: 'yearly' },
    { url: '/cancellation', priority: '0.6', changefreq: 'yearly' },
];

async function generateSitemap() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB Connected\n');

        // Fetch all products with slugs
        const products = await Product.find({}, 'slug updatedAt').lean();
        console.log(`Found ${products.length} products\n`);

        // Start XML
        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
        xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

        // Add static pages
        staticPages.forEach(page => {
            xml += '  <url>\n';
            xml += `    <loc>${DOMAIN}${page.url}</loc>\n`;
            xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
            xml += `    <priority>${page.priority}</priority>\n`;
            xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
            xml += '  </url>\n';
        });

        // Add product pages
        products.forEach(product => {
            if (product.slug) {
                xml += '  <url>\n';
                xml += `    <loc>${DOMAIN}/product/${product.slug}</loc>\n`;
                xml += `    <changefreq>weekly</changefreq>\n`;
                xml += `    <priority>0.9</priority>\n`;
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
        console.log(`📊 Total URLs: ${staticPages.length + products.filter(p => p.slug).length}`);
        console.log(`   - Static pages: ${staticPages.length}`);
        console.log(`   - Product pages: ${products.filter(p => p.slug).length}`);
        console.log('\n🌐 Sitemap URL: https://thekaransinghvaidh.com/sitemap.xml\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error generating sitemap:', error);
        process.exit(1);
    }
}

generateSitemap();
