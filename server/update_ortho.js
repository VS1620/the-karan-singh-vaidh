const mongoose = require('mongoose');
const Product = require('./models/ProductModel');
require('dotenv').config();

const updateOrtho = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/karansinghvaidh');
        const product = await Product.findOne({ slug: 'ortho-arthritis-joint-pain' });
        if (product) {
            product.slug = 'joint-pain-arthritis-ayurvedic-treatment';
            product.metaTitle = 'Best Ayurvedic Medicine for Joint Pain & Arthritis Relief';
            product.metaDescription = 'Get natural relief from joint pain & arthritis with Ayurvedic treatment. Helps reduce stiffness, improve mobility & support joint health. Safe herbal solution.';
            product.shortDescription = 'Ortho Arthritis Joint Pain by Karan Singh Vaidh is an Ayurvedic formula that helps reduce joint pain, improve mobility, relieve stiffness, and support overall bone and joint health naturally.';
            product.fullDescription = `Ortho Arthritis Joint Pain by Karan Singh Vaidh is a powerful Ayurvedic herbal formulation designed to help reduce joint pain, stiffness, and inflammation naturally. Enriched with traditional ingredients like Haritaki, Ajwain, Sunthi, and Sandhav Namak, it supports better digestion and toxin removal, which are key causes of joint discomfort. This formula helps improve flexibility, supports joint lubrication, and enhances mobility for daily comfort. Manufactured in a GMP-certified facility, it ensures safety and quality. Regular use helps manage arthritis symptoms, reduce pain, and promote long-term joint health and strength naturally.

Why Choose:
- Trusted Ayurvedic formula by Karan Singh Vaidh
- Made with powerful traditional herbs
- GMP certified and safe manufacturing
- No harmful chemicals or additives
- Targets root cause of joint pain
- Supports long-term relief and mobility
- Suitable for daily use`;
            product.benefits = `Helps reduce joint pain and stiffness
Supports better joint mobility and flexibility
Helps reduce inflammation naturally
Supports detoxification (reduces toxin buildup)
Helps improve digestion linked to joint health
Supports stronger bones and joints
Promotes long-term joint comfort`;
            product.usage = `Take one–two pouches daily
Consume with water before sleep
Use regularly for best results
Or as directed by a healthcare professional`;
            await product.save();
            console.log('Ortho product updated successfully!');
        } else {
            console.log('Ortho product not found.');
        }
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};
updateOrtho();
