const mongoose = require('mongoose');
const Product = require('./models/ProductModel');
require('dotenv').config();

const updates = [
    {
        oldSlug: 'gastritis-digestion',
        newSlug: 'gastritis-ayurvedic-treatment',
        metaTitle: 'Buy Gastritis – Digestion Ayurvedic Support Online in India',
        metaDescription: 'Shop Gastritis – Digestion Ayurvedic wellness support by Karan Singh Vaidh for digestive balance, bowel regularity, gut cleansing, and natural stomach wellness.',
        shortDescription: 'Gastritis – Digestion by Karan Singh Vaidh is an Ayurvedic herbal wellness formulation designed to support digestion, bowel regularity, gut cleansing, stomach comfort, and natural digestive wellness daily.',
        fullDescription: `Gastritis – Digestion by Karan Singh Vaidh is a carefully prepared Ayurvedic herbal formulation crafted using traditional ingredients like Haritaki, Ajwain, Sunthi, Sandhav Namak, and Sanay. This natural wellness blend is designed to support digestive balance, bowel regularity, and gut cleansing naturally. The formulation helps maintain digestive comfort and supports overall stomach wellness as part of a balanced lifestyle. Manufactured with authentic Ayurvedic practices and quality-focused preparation methods, it reflects purity and trusted herbal care. Regular use along with healthy eating habits may support better digestion, internal cleansing, and daily digestive wellness naturally while promoting holistic Ayurvedic wellness support.

Why Choose:
- Prepared with authentic Ayurvedic ingredients
- Traditional herbal wellness formulation
- Quality-focused manufacturing process
- GMP-certified Ayurvedic preparation
- No harmful additives used
- Trusted herbal wellness support
- Crafted using traditional Ayurvedic knowledge`,
        benefits: `Supports healthy digestion naturally
Helps maintain bowel regularity
Supports stomach comfort and wellness
Helps cleanse the digestive system
Supports gut balance and wellness
Promotes natural internal cleansing
Made with traditional Ayurvedic herbs`,
        usage: `Take one to two pouches with water
Consume before going to sleep
Use regularly for best wellness support
Follow healthcare guidance if needed`
    },
    {
        oldSlug: 'hypertension-high-blood-pressure',
        newSlug: 'high-blood-pressure-ayurvedic-treatment',
        metaTitle: 'Buy Hypertension High Blood Pressure Ayurvedic Support Online',
        metaDescription: 'Shop Hypertension High Blood Pressure Ayurvedic wellness support by Karan Singh Vaidh for urinary wellness, kidney support, detoxification, and daily wellness.',
        shortDescription: 'Hypertension High Blood Pressure by Karan Singh Vaidh is an Ayurvedic herbal wellness formulation crafted to support kidney wellness, urinary balance, detoxification, and overall body wellness naturally every day.',
        fullDescription: `Hypertension High Blood Pressure by Karan Singh Vaidh is a traditional Ayurvedic herbal formulation prepared with carefully selected ingredients including Gokshur, Varuna, Pashanbhed, Haridra, and Yavkshar. This wellness blend is designed to support kidney health, urinary wellness, and natural detoxification processes. The formulation helps maintain overall internal balance while supporting healthy urinary flow and renal wellness naturally. Crafted using authentic Ayurvedic preparation methods and quality-focused herbal ingredients, it reflects trusted Ayurvedic care for daily wellness support. Regular use along with a healthy lifestyle may help support overall wellness, cleansing, and balance naturally while promoting holistic Ayurvedic wellness support.

Why Choose:
- Made with authentic Ayurvedic ingredients
- Traditional herbal wellness formulation
- Prepared using quality-focused methods
- Supports holistic wellness naturally
- No harmful additives used
- Trusted Ayurvedic wellness support
- Crafted with herbal purity and care`,
        benefits: `Supports kidney and urinary wellness
Helps maintain healthy urinary flow
Supports natural detoxification
Helps maintain internal balance
Supports renal wellness naturally
Crafted with traditional Ayurvedic herbs
Promotes daily wellness support`,
        usage: `Take 3 pouches at one time
Use 3–4 times daily
Consume with soda water
Use as directed by a healthcare professional`
    },
    {
        oldSlug: 'jaundice',
        newSlug: 'jaundice-ayurvedic-treatment',
        metaTitle: 'Buy Jaundice Ayurvedic Liver Support Online in India',
        metaDescription: 'Shop Jaundice Ayurvedic wellness support by Karan Singh Vaidh for liver care, digestion support, detoxification, and gut balance with natural herbal formulation.',
        shortDescription: 'Jaundice by Karan Singh Vaidh is an Ayurvedic herbal formulation crafted to support liver wellness, digestion, detoxification, gut balance, and overall internal health naturally every day.',
        fullDescription: `Jaundice by Karan Singh Vaidh is a traditional Ayurvedic herbal formulation prepared using carefully selected ingredients like Bilva, Kutaja, Amalaki, Khadira, and Dadima. This natural wellness blend is designed to support liver function, digestive balance, and internal detoxification processes. It helps maintain gut health and supports overall internal harmony naturally. Crafted using authentic Ayurvedic methods and high-quality herbal ingredients, this formulation reflects purity and trusted wellness care. Regular use alongside a balanced lifestyle may support digestive comfort, liver wellness, and natural detoxification while promoting overall Ayurvedic wellness support and internal balance.

Why Choose:
- Made with authentic Ayurvedic herbs
- Traditional herbal wellness formulation
- Prepared using quality-focused methods
- Supports liver and digestive wellness
- No harmful additives used
- Trusted Ayurvedic formulation
- Crafted with herbal purity and care`,
        benefits: `Supports liver wellness naturally
Helps improve digestion and gut balance
Supports natural detoxification
Helps maintain bowel regularity
Supports internal cleansing processes
Helps maintain digestive comfort
Promotes overall wellness support`,
        usage: `Take 6 gms, two–three times daily
Consume with cold water
Use regularly for best results
Follow healthcare advice if needed`
    },
    {
        oldSlug: 'kidney-stone',
        newSlug: 'kidney-stone-ayurvedic-treatment',
        metaTitle: 'Buy Kidney Stone Ayurvedic Treatment Support Online India',
        metaDescription: 'Shop Kidney Stone Ayurvedic support by Karan Singh Vaidh for urinary health, kidney wellness, detoxification, and natural stone management support online in India.',
        shortDescription: 'Kidney Stone by Karan Singh Vaidh is an Ayurvedic herbal formulation designed to support kidney wellness, urinary health, detoxification, and natural balance for overall urinary system support.',
        fullDescription: `Kidney Stone by Karan Singh Vaidh is a traditional Ayurvedic herbal formulation prepared using powerful ingredients like Gokshru, Pashanbhed, Varuna, and Haridra. This natural blend is designed to support kidney health, urinary wellness, and detoxification processes. It helps maintain smooth urinary flow and supports overall renal balance naturally. Crafted using authentic Ayurvedic methods and high-quality herbal ingredients, this formulation reflects purity and trusted wellness care. Regular use alongside a healthy lifestyle may support urinary comfort, kidney wellness, and natural cleansing while promoting overall Ayurvedic wellness support and internal balance.

Why Choose:
- Authentic Ayurvedic herbal formulation
- Made with traditional ingredients
- Quality-tested preparation process
- Supports kidney wellness naturally
- No harmful additives used
- Trusted Ayurvedic brand
- Designed for daily wellness support`,
        benefits: `Supports kidney and urinary health
Helps maintain smooth urine flow
Supports natural detoxification
Promotes renal wellness
Helps maintain urinary balance
Supports internal cleansing
Made with Ayurvedic herbs`,
        usage: `Take 3 pouches at one time
Use 3–4 times daily
Consume with soda water
Follow healthcare advice if needed`
    },
    {
        oldSlug: 'loose-motion',
        newSlug: 'loose-motion-ayurvedic-treatment',
        metaTitle: 'Best Ayurvedic Medicine for Loose Motion & Diarrhea Relief',
        metaDescription: 'Get fast relief from loose motion with Ayurvedic herbal formula. Helps control diarrhea, improve digestion & restore gut balance naturally. Order online now.',
        shortDescription: 'Loose Motion by Karan Singh Vaidh is an Ayurvedic herbal formula that helps control diarrhea, improve digestion, reduce weakness, and restore gut balance naturally for better daily health.',
        fullDescription: `Loose Motion by Karan Singh Vaidh is a powerful Ayurvedic herbal formulation designed to help control diarrhea, improve digestion, and restore gut balance naturally. Made with traditional ingredients like Isabgol, Bilva Giri, Mishri, and Kathha Gond, it helps soothe the intestines, reduce frequent bowel movements, and support digestive stability. This herbal blend works effectively to relieve weakness, bloating, and stomach discomfort caused by loose motion. Prepared in a GMP-certified facility, it ensures quality and safety. Regular use along with a balanced diet helps maintain digestive health and promotes faster recovery naturally.

Why Choose:
- Trusted Ayurvedic formula by Karan Singh Vaidh
- Made with powerful traditional herbal ingredients
- GMP certified and safe manufacturing
- No harmful chemicals or additives
- Fast-acting digestive relief support
- Designed for modern lifestyle digestive issues
- Trusted by thousands of users`,
        benefits: `Helps control loose motion quickly
Supports faster recovery from diarrhea
Soothes intestines and reduces irritation
Helps reduce bloating, cramps, and weakness
Improves digestion and gut stability
Supports natural digestive balance
Helps restore energy levels`,
        usage: `Take 2–3 pouches two to three times daily
Consume with water
Use regularly for better results
Or as directed by a healthcare professional`
    },
    {
        oldSlug: 'migraine',
        newSlug: 'migraine-ayurvedic-treatment',
        metaTitle: 'Ayurvedic Migraine Support for Headache Relief & Stress Balance',
        metaDescription: 'Suffering from migraine? Try Ayurvedic herbal treatment for fast headache relief, stress reduction & long-term migraine control. Safe & natural solution.',
        shortDescription: 'Migraine by Karan Singh Vaidh is an Ayurvedic herbal formula that helps relieve headache, reduce stress, improve digestion, and support long-term migraine control naturally and effectively.',
        fullDescription: `Migraine by Karan Singh Vaidh is a powerful Ayurvedic herbal formulation designed to help relieve headache, reduce migraine frequency, and support overall nervous system balance naturally. Enriched with herbs like Amalaki, Haritaki, Bibhitaka, Guduchi, and Dadima, it works to improve digestion, reduce acidity, and eliminate toxin buildup, which are common migraine triggers. This formulation helps relax the mind, reduce stress, and improve blood circulation for better brain health. Manufactured in a GMP-certified facility, it ensures safety and quality. Regular use supports long-term migraine management and promotes a balanced and healthy lifestyle.

Why Choose:
- Herbal & safe formula
- No chemicals
- GMP certified
- Trusted solution`,
        benefits: `Reduces headache pain
Controls migraine frequency
Improves digestion
Reduces stress
Supports brain health`,
        usage: `Take daily as advised
Consume with water
Use consistently`
    },
    {
        oldSlug: 'ortho-arthritis-joint-pain-ayurvedic-treatment',
        newSlug: 'joint-pain-arthritis-ayurvedic-treatment',
        metaTitle: 'Best Ayurvedic Medicine for Joint Pain & Arthritis Relief',
        metaDescription: 'Get natural relief from joint pain & arthritis with Ayurvedic treatment. Helps reduce stiffness, improve mobility & support joint health. Safe herbal solution.',
        shortDescription: 'Ortho Arthritis Joint Pain by Karan Singh Vaidh is an Ayurvedic formula that helps reduce joint pain, improve mobility, relieve stiffness, and support overall bone and joint health naturally.',
        fullDescription: `Ortho Arthritis Joint Pain by Karan Singh Vaidh is a powerful Ayurvedic herbal formulation designed to help reduce joint pain, stiffness, and inflammation naturally. Enriched with traditional ingredients like Haritaki, Ajwain, Sunthi, and Sandhav Namak, it supports better digestion and toxin removal, which are key causes of joint discomfort. This formula helps improve flexibility, supports joint lubrication, and enhances mobility for daily comfort. Manufactured in a GMP-certified facility, it ensures safety and quality. Regular use helps manage arthritis symptoms, reduce pain, and promote long-term joint health and strength naturally.

Why Choose:
- Trusted Ayurvedic formula by Karan Singh Vaidh
- Made with powerful traditional herbs
- GMP certified and safe manufacturing
- No harmful chemicals or additives
- Targets root cause of joint pain
- Supports long-term relief and mobility
- Suitable for daily use`,
        benefits: `Helps reduce joint pain and stiffness
Supports better joint mobility and flexibility
Helps reduce inflammation naturally
Supports detoxification (reduces toxin buildup)
Helps improve digestion linked to joint health
Supports stronger bones and joints
Promotes long-term joint comfort`,
        usage: `Take one–two pouches daily
Consume with water before sleep
Use regularly for best results
Or as directed by a healthcare professional`
    },
    {
        oldSlug: 'over-weight',
        newSlug: 'weight-loss-ayurvedic-treatment',
        metaTitle: 'Best Ayurvedic Medicine for Weight Loss & Fat Reduction',
        metaDescription: 'Lose weight naturally with Ayurvedic medicine. Helps boost metabolism, improve digestion, reduce fat & support healthy weight management without side effects.',
        shortDescription: 'Over Weight by Karan Singh Vaidh is an Ayurvedic formula that helps reduce fat, improve metabolism, support digestion, and promote natural weight loss safely and effectively.',
        fullDescription: `Over Weight by Karan Singh Vaidh is a powerful Ayurvedic formulation designed to support natural weight loss and fat reduction. Made with traditional herbs like Haritaki, Ajwain, Sunthi, and Sandhav Namak, it helps improve digestion, boost metabolism, and eliminate toxins from the body. This combination supports better nutrient absorption and reduces fat accumulation over time. It also helps regulate bowel movements and improve gut health, which plays a key role in weight management. Manufactured in a GMP-certified facility, this herbal solution is safe for regular use and promotes healthy, sustainable weight loss without harmful chemicals.

Why Choose:
- Trusted Ayurvedic formula by Karan Singh Vaidh
- Made with natural herbal ingredients
- No harmful chemicals or side effects
- GMP certified quality assurance
- Targets root cause of weight gain
- Supports long-term weight management
- Safe for regular use`,
        benefits: `Helps reduce excess body fat naturally
Supports faster metabolism
Improves digestion and gut health
Helps detoxify the body
Supports regular bowel movement
Reduces bloating and heaviness
Promotes healthy weight management`,
        usage: `Take one–two pouches daily
Consume with water before sleep
Use regularly for better results
Or as directed by a healthcare professional`
    },
    {
        oldSlug: 'piles',
        newSlug: 'piles-ayurvedic-treatment',
        metaTitle: 'Ayurvedic Piles Support for Digestive Comfort & Relief',
        metaDescription: 'Get natural relief from piles with Ayurvedic medicine. Helps reduce pain, swelling, bleeding & improves digestion for long-term hemorrhoids management.',
        shortDescription: 'Piles by Karan Singh Vaidh is an Ayurvedic formula that helps reduce swelling, pain, and discomfort, improves digestion, and supports natural healing of hemorrhoids effectively and safely.',
        fullDescription: `Piles by Karan Singh Vaidh is a powerful Ayurvedic formulation designed to support natural relief from hemorrhoids. Enriched with herbs like Bilva, Guduchi, Pudina, and Dhanyaka, it helps reduce swelling, pain, and discomfort associated with piles. This herbal blend improves digestion, regulates bowel movements, and reduces strain during passing stools. It also supports internal healing and strengthens the digestive system, preventing recurrence. Prepared in a GMP-certified facility, this product is safe, effective, and free from harmful chemicals. Regular use helps manage piles naturally while improving overall gut health and comfort.

Why Choose:
- Trusted Ayurvedic formula by Karan Singh Vaidh
- Made with natural herbal ingredients
- No harmful chemicals or side effects
- GMP certified quality assurance
- Targets root cause of piles
- Supports long-term digestive health
- Safe for regular use`,
        benefits: `Helps reduce piles pain and swelling
Supports relief from bleeding piles
Improves digestion and bowel movement
Reduces constipation and strain
Supports natural healing of hemorrhoids
Strengthens digestive system
Promotes overall gut health`,
        usage: `Take 3 grams, 2–3 times daily
Consume with water
Use regularly for better results
Or as directed by a healthcare professional`
    },
    {
        oldSlug: 'polyps',
        newSlug: 'polyps-ayurvedic-treatment',
        metaTitle: 'Best Ayurvedic Medicine for Polyps Natural Treatment',
        metaDescription: 'Manage polyps naturally with Ayurvedic medicine. Helps reduce inflammation, boost immunity, improve circulation & support overall recovery safely.',
        shortDescription: 'Polyps by Karan Singh Vaidh is an Ayurvedic formula that helps support polyp management, boosts immunity, reduces inflammation, and improves circulation for overall recovery and wellness.',
        fullDescription: `Polyps by Karan Singh Vaidh is a scientifically formulated Ayurvedic solution designed to support natural management of polyps. Enriched with powerful herbs like Haridra, Brahmi, Arjun, and Marich, it helps reduce inflammation, improve blood circulation, and strengthen the body’s immune response. This herbal blend supports better nutrient absorption and promotes overall healing and recovery. It also helps balance internal systems and enhances the body’s natural defense mechanisms. Manufactured in a GMP-certified facility, this product ensures safety, purity, and effectiveness, making it a reliable choice for long-term wellness and polyp management.

Why Choose:
- Trusted Ayurvedic formula by Karan Singh Vaidh
- Made with natural herbal ingredients
- No harmful chemicals or side effects
- GMP certified quality assurance
- Supports internal healing naturally
- Suitable for long-term use
- Focuses on root cause management`,
        benefits: `Supports natural management of polyps
Helps reduce inflammation in the body
Boosts immunity and body defense
Improves blood circulation
Enhances nutrient absorption
Supports healthy cell function
Promotes overall wellness and recovery`,
        usage: `Take 1–2 capsules twice daily
Consume after meals
Use regularly for best results
Or as directed by a healthcare professional`
    },
    {
        oldSlug: 'prostate',
        newSlug: 'prostate-ayurvedic-treatment',
        metaTitle: 'Best Ayurvedic Medicine for Prostate Health Support',
        metaDescription: 'Support prostate health naturally with Ayurvedic medicine. Helps improve urinary flow, reduce discomfort, boost digestion & support overall wellness safely.',
        shortDescription: 'Prostate by Karan Singh Vaidh is an Ayurvedic formula that supports prostate health, improves urinary function, boosts digestion, and promotes natural balance for overall male wellness safely.',
        fullDescription: `Prostate by Karan Singh Vaidh is a carefully formulated Ayurvedic solution designed to support prostate health and urinary function naturally. Made with powerful herbs like Bilva, Kutaja, Amlaki, and Khadira, it helps improve digestion, reduce internal imbalance, and support smooth urinary flow. This herbal combination aids in detoxification, enhances metabolic function, and strengthens internal systems. It also supports overall male wellness and helps maintain long-term balance. Manufactured in a GMP-certified facility, this product ensures safety, purity, and effectiveness. Regular use promotes natural support for prostate health without harmful chemicals or side effects.

Why Choose:
- Trusted Ayurvedic formula by Karan Singh Vaidh
- Made with natural herbal ingredients
- No harmful chemicals or side effects
- GMP certified quality assurance
- Supports root cause management
- Suitable for long-term use
- Promotes holistic wellness`,
        benefits: `Supports healthy prostate function
Helps improve urinary flow
Reduces discomfort and imbalance
Supports digestion and metabolism
Helps detoxify the body
Promotes internal strength and wellness
Supports long-term male health`,
        usage: `Take 6 grams, 2–3 times daily
Consume with cold water
Use regularly for best results
Or as directed by a healthcare professional`
    },
    {
        oldSlug: 'psoriasis-and-skin-allergy',
        newSlug: 'psoriasis-skin-allergy-ayurvedic-treatment',
        metaTitle: 'Best Ayurvedic Medicine for Psoriasis & Skin Allergy',
        metaDescription: 'Get natural relief from psoriasis & skin allergies with Ayurvedic medicine. Helps reduce itching, inflammation, detoxify blood & support healthy skin naturally.',
        shortDescription: 'Psoriasis & Skin Allergy by Karan Singh Vaidh is an Ayurvedic formula that helps reduce itching, inflammation, improves skin health, and supports natural detox for long-term relief.',
        fullDescription: `Psoriasis & Skin Allergy by Karan Singh Vaidh is a powerful Ayurvedic formulation designed to support healthy skin and manage skin-related conditions naturally. Enriched with herbs like Bilva, Guduchi, Pudina, and Dhanyaka, it helps reduce itching, inflammation, and skin irritation. This herbal blend supports blood purification, improves digestion, and strengthens immunity, which are essential for healthy skin. It also promotes natural detoxification and helps restore skin balance over time. Manufactured in a GMP-certified facility, this product ensures safety, purity, and effectiveness. Regular use supports long-term skin health and overall wellness without harmful chemicals.

Why Choose:
- Trusted Ayurvedic formula by Karan Singh Vaidh
- Made with natural herbal ingredients
- No harmful chemicals or side effects
- GMP certified quality assurance
- Supports root cause (blood + digestion)
- Suitable for long-term use
- Promotes holistic skin wellness`,
        benefits: `Helps reduce itching and skin irritation
Supports management of psoriasis and allergies
Helps reduce inflammation naturally
Supports blood purification
Improves digestion and gut health
Boosts immunity
Promotes healthy and clear skin`,
        usage: `Take 3 grams, 2–3 times daily
Consume with water
Use regularly for best results
Or as directed by a healthcare professional`
    },
    {
        oldSlug: 'sinus',
        newSlug: 'sinus-ayurvedic-treatment',
        metaTitle: 'Best Ayurvedic Medicine for Sinus Relief & Nasal Congestion',
        metaDescription: 'Get natural sinus relief with Ayurvedic medicine. Helps reduce congestion, headache, allergies, and supports respiratory health with herbal detox and immunity support.',
        shortDescription: 'Sinus by Karan Singh Vaidh is an Ayurvedic formula that helps relieve sinus congestion, headaches, allergies, and supports respiratory health with natural detox and immunity support.',
        fullDescription: `Sinus by Karan Singh Vaidh is a powerful Ayurvedic formulation designed to support respiratory health and provide natural relief from sinus-related discomfort. Enriched with herbs like Amalaki, Bibhitaka, Haritaki, and Guduchi, it helps reduce nasal congestion, headaches, and allergic reactions. This herbal blend supports detoxification, improves digestion, and strengthens immunity, which plays a key role in sinus management. It also helps balance body doshas and promotes overall respiratory wellness. Manufactured in a GMP-certified facility, it ensures purity and safety. Regular use supports long-term sinus relief and improves overall internal health naturally.

Why Choose:
- Trusted Ayurvedic formula by Karan Singh Vaidh
- Made with natural herbal ingredients
- No harmful chemicals
- GMP certified product
- Supports root cause (immunity + digestion)
- Safe for long-term use
- Holistic respiratory care`,
        benefits: `Helps relieve sinus congestion and pressure
Supports respiratory health
Helps reduce headache and nasal blockage
Supports relief from allergies
Improves digestion and detoxification
Boosts immunity
Promotes overall respiratory wellness`,
        usage: `Take 1 pouch, two–three times daily
Consume with water
Use regularly for better results
Or as directed by a healthcare professional`
    },
    {
        oldSlug: 'tbtuberculosis',
        newSlug: 'tuberculosis-ayurvedic-support',
        metaTitle: 'Ayurvedic Immunity Support for TB Recovery & Strength Care',
        metaDescription: 'Ayurvedic herbal support for TB recovery. Helps boost immunity, improve strength, reduce weakness, and support overall respiratory and systemic health naturally.',
        shortDescription: 'T.B (Tuberculosis) by Karan Singh Vaidh is an Ayurvedic formulation that supports immunity, strength, and recovery while helping improve respiratory health and overall body wellness naturally.',
        fullDescription: `T.B (Tuberculosis) by Karan Singh Vaidh is a carefully crafted Ayurvedic formulation designed to support recovery, improve immunity, and strengthen the body naturally. Enriched with powerful herbs like Kanchanara, Guggulu, Haritaki, Bibhitaki, Amalaki, and Pippali, it helps enhance respiratory health and supports detoxification. This formulation aids in reducing weakness, improving energy levels, and promoting overall systemic wellness. It also supports the body’s natural healing process by strengthening internal defense mechanisms. Manufactured in a GMP-certified facility, it ensures purity, safety, and effectiveness for long-term wellness support.

Why Choose:
- Trusted Ayurvedic formulation by Karan Singh Vaidh
- Made with powerful herbal ingredients
- GMP certified and safe
- Supports immunity and recovery
- No harmful chemicals
- Suitable for long-term use
- Holistic health approach`,
        benefits: `Supports immunity and natural recovery
Helps improve strength and energy levels
Supports respiratory health
Helps reduce internal weakness
Supports detoxification
Promotes overall systemic wellness
Helps strengthen internal defense system`,
        usage: `Take 2 capsules, twice daily
Consume with water
Follow regularly for best results
Or as directed by a healthcare professional`
    },
    {
        oldSlug: 'thyroid',
        newSlug: 'thyroid-ayurvedic-treatment',
        metaTitle: 'Ayurvedic Thyroid Support for Hormonal Balance & Metabolism',
        metaDescription: 'Ayurvedic thyroid support formula helps balance metabolism, improve digestion, reduce swelling, and support hormonal wellness naturally with herbal ingredients.',
        shortDescription: 'Thyroid by Karan Singh Vaidh is an Ayurvedic formulation that supports thyroid balance, metabolism, digestion, and hormonal wellness while helping improve overall internal health naturally.',
        fullDescription: `Thyroid by Karan Singh Vaidh is a natural Ayurvedic formulation designed to support thyroid balance and improve metabolic function. Enriched with herbs like Amalaki, Dadima, Dhanyaka, and Sandhav Namak, it helps enhance digestion, reduce internal swelling, and support detoxification. This formulation works holistically by strengthening liver function and improving nutrient absorption, which plays an important role in hormonal balance. It also helps maintain energy levels and overall well-being. Manufactured in a GMP-certified facility, it ensures purity and safety. Regular use supports long-term metabolic balance and promotes overall internal health naturally.

Why Choose:
- Trusted Ayurvedic formula by Karan Singh Vaidh
- Made with natural herbal ingredients
- GMP certified and safe
- Supports metabolism and hormonal balance
- No harmful chemicals
- Suitable for long-term use
- Holistic health approach`,
        benefits: `Supports thyroid balance and function
Helps improve metabolism
Supports digestion and gut health
Helps reduce internal swelling
Supports detoxification
Helps improve energy levels
Promotes hormonal balance`,
        usage: `Take 4 gms, two–three times daily
Consume with cold water
Use regularly for best results
Or as directed by a healthcare professional`
    }
];

const runMigration = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/karansinghvaidh');
        console.log('Connected to Database');

        for (const update of updates) {
            console.log(`Updating product: ${update.oldSlug}...`);
            const product = await Product.findOne({ slug: update.oldSlug });

            if (!product) {
                console.warn(`Product with slug "${update.oldSlug}" not found. Skipping.`);
                continue;
            }

            product.slug = update.newSlug;
            product.metaTitle = update.metaTitle;
            product.metaDescription = update.metaDescription;
            product.shortDescription = update.shortDescription;
            product.fullDescription = update.fullDescription;
            product.benefits = update.benefits;
            product.usage = update.usage;

            await product.save();
            console.log(`Successfully updated ${update.oldSlug} to ${update.newSlug}`);
        }

        console.log('Migration completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
};

runMigration();
