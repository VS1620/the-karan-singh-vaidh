export const products = [
    // Best Sellers
    {
        id: 1,
        name: "Ayurvedic Diabetic Care Juice",
        subtitle: "Natural Blood Sugar Management",
        shortDesc: "Manages blood sugar levels naturally with Karela & Jamun.",
        description: "A potent blend of Karela, Jamun, and 12 other ayurvedic herbs to help regulate blood sugar levels naturally. Certified by AYUSH ministry and proven to show results in 4 weeks.",
        rating: 4.8,
        reviews: 1240,
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1887&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1887&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1887&auto=format&fit=crop"
        ],
        packs: [
            { id: '1m', label: '1 Month', quantity_desc: '1 Bottle (1L)', mrp: 599, price: 499, discount: 17, savings: 100 },
            { id: '3m', label: '3 Months', quantity_desc: '3 Bottles (3L)', mrp: 1799, price: 1299, discount: 28, savings: 500, isPopular: true },
        ],
        benefits: ["Regulates Blood Sugar", "Boosts Metabolism", "Improves Digestion", "Purifies Blood"],
        ingredients: "Karela (Bitter Gourd), Jamun (Indian Blackberry), Gudmar, Methi, Amla",
        howToUse: "Mix 30ml juice with 30ml water. Consume twice daily before meals.",
        category: "diabetes"
    },
    {
        id: 2,
        name: "Shilajit Gold Resin",
        subtitle: "Power & Stamina Booster",
        shortDesc: "Stamina, Strength & Vitality booster.",
        description: "Pure Himalayan Shilajit enriched with Gold (Swarna Bhasma) for maximum stamina, strength, and vitality.",
        rating: 4.9,
        reviews: 856,
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1887&auto=format&fit=crop",
        images: ["https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1887&auto=format&fit=crop"],
        packs: [
            { id: '1m', label: '20g', quantity_desc: '20g Jar', mrp: 999, price: 899, discount: 10, savings: 100 },
            { id: '2m', label: '40g', quantity_desc: '40g Jar', mrp: 1998, price: 1599, discount: 20, savings: 399, isPopular: true },
        ],
        benefits: ["Boosts Stamina", "Improves Strength", "Reduces Stress"],
        ingredients: "Shilajit, Swarna Bhasma, Kesar",
        howToUse: "Take a pea-sized amount with warm milk.",
        category: "mens-wellness"
    },
    {
        id: 3,
        name: "Liver Detox Syrup",
        subtitle: "Complete Liver Protection",
        shortDesc: "Protects liver from alcohol & toxins.",
        description: "Ayurvedic liver tonic to cleanse, protect, and rejuvenate liver function. Effective for fatty liver and digestion.",
        rating: 4.7,
        reviews: 430,
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1887&auto=format&fit=crop",
        images: ["https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1887&auto=format&fit=crop"],
        packs: [
            { id: '1m', label: '1 Bottle', quantity_desc: '200ml', mrp: 450, price: 399, discount: 11 },
            { id: '3m', label: '3 Bottles', quantity_desc: '3 x 200ml', mrp: 1350, price: 999, discount: 26, isPopular: true },
        ],
        benefits: ["Detoxifies Liver", "Improves Digestion", "Boosts Metabolism"],
        ingredients: "Kalmegh, Bhumi Amla, Kutki",
        howToUse: "10ml twice daily before meals.",
        category: "liver"
    },
    {
        id: 4,
        name: "Hair Growth Oil",
        subtitle: "Advanced Hair Regrowth Formula",
        shortDesc: "Reduces hair fall & promotes regrowth.",
        description: "Herbal hair oil infused with 21 herbs to reduce hair fall and promote strong, healthy hair growth.",
        rating: 4.6,
        reviews: 2100,
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1887&auto=format&fit=crop",
        images: ["https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1887&auto=format&fit=crop"],
        packs: [
            { id: '1m', label: '1 Bottle', quantity_desc: '100ml', mrp: 399, price: 349, discount: 12 },
            { id: '3m', label: '3 Bottles', quantity_desc: '3 x 100ml', mrp: 1197, price: 899, discount: 25, isPopular: true },
        ],
        benefits: ["Reduces Hair Fall", "Strengthens Roots", "Prevents Dandruff"],
        ingredients: "Bhringraj, Amla, Brahmi, Coconut Oil",
        howToUse: "Massage into scalp and leave overnight.",
        category: "hair"
    },
    // Pills & Capsules
    {
        id: 101,
        name: "Ashwagandha Gold Capsules",
        subtitle: "Stress Relief & Immunity",
        shortDesc: "Boosts immunity, reduces stress & improves stamina.",
        description: "Premium Ashwagandha capsules for stress relief, better sleep, and improved immunity.",
        rating: 4.9,
        reviews: 512,
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1887&auto=format&fit=crop",
        images: ["https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1887&auto=format&fit=crop"],
        packs: [
            { id: '1p', label: '30 Caps', quantity_desc: '30 Capsules', mrp: 499, price: 399, discount: 20 },
            { id: '2p', label: '60 Caps', quantity_desc: '60 Capsules', mrp: 998, price: 699, discount: 30, isPopular: true }
        ],
        benefits: ["Reduces Stress", "Improves Sleep", "Boosts Energy"],
        ingredients: "Ashwagandha Root Extract",
        howToUse: "1 capsule twice daily.",
        category: "immunity"
    },
    {
        id: 102,
        name: "Joint Relief Tablets",
        subtitle: "Pain Free Joints",
        shortDesc: "Relieves joint pain & inflammation naturally.",
        description: "Natural formula to reduce joint pain, inflammation, and stiffness. Improves mobility.",
        rating: 4.7,
        reviews: 320,
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1887&auto=format&fit=crop",
        images: ["https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1887&auto=format&fit=crop"],
        packs: [
            { id: '1p', label: '60 Tabs', quantity_desc: '60 Tablets', mrp: 599, price: 499, discount: 17 },
            { id: '2p', label: '120 Tabs', quantity_desc: '120 Tablets', mrp: 1198, price: 899, discount: 25, isPopular: true }
        ],
        benefits: ["Relieves Pain", "Reduces Inflammation", "Lubricates Joints"],
        ingredients: "Shallaki, Guggul, Curcumin",
        howToUse: "2 tablets twice daily after food.",
        category: "pain-relief"
    },
    {
        id: 103,
        name: "Digestive Care Pills",
        subtitle: "Healthy Gut Formula",
        shortDesc: "Improves digestion and gut health.",
        description: "Relieves gas, acidity, and bloating. Improves overall gut health and digestion.",
        rating: 4.8,
        reviews: 180,
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1887&auto=format&fit=crop",
        images: ["https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1887&auto=format&fit=crop"],
        packs: [
            { id: '1p', label: '30 Pills', quantity_desc: '30 Pills', mrp: 350, price: 299, discount: 15 },
            { id: '2p', label: '60 Pills', quantity_desc: '60 Pills', mrp: 700, price: 549, discount: 22, isPopular: true }
        ],
        benefits: ["Improves Digestion", "Relieves Bloating", "Prevents Acidity"],
        ingredients: "Triphala, Ajwain, Hing",
        howToUse: "1 pill after meals.",
        category: "digestive"
    },
    {
        id: 104,
        name: "Sleep Well Capsules",
        subtitle: "Natural Sleep Aid",
        shortDesc: "Promotes deep, restful sleep naturally.",
        description: "Non-habit forming natural sleep aid for better sleep quality and relaxation.",
        rating: 4.6,
        reviews: 210,
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1887&auto=format&fit=crop",
        images: ["https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1887&auto=format&fit=crop"],
        packs: [
            { id: '1p', label: '30 Caps', quantity_desc: '30 Capsules', mrp: 450, price: 399, discount: 11 },
            { id: '2p', label: '60 Caps', quantity_desc: '60 Capsules', mrp: 900, price: 749, discount: 17, isPopular: true }
        ],
        benefits: ["Deep Sleep", "Calms Mind", "Non-Addictive"],
        ingredients: "Jatamansi, Brahmi, Shankhpushpi",
        howToUse: "1 capsule 30 mins before bedtime.",
        category: "wellness"
    }
];
