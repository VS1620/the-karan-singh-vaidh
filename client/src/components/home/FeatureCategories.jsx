import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Local Image Imports
import asthmaImg from '../../assets/Asthma.jpeg';
import diabetesImg from '../../assets/Diabetes.jpeg';
import gallBladderImg from '../../assets/Gall Bladder.jpeg';
import gastricImg from '../../assets/Gastric.jpeg';
import kidneyStoneImg from '../../assets/Kidney Stone.jpeg';
import migraineImg from '../../assets/Migraine.jpeg';
import pilesImg from '../../assets/Piles.jpeg';

const categories = [
    {
        id: 1,
        name: 'Kidney Stone',
        description: 'Advanced Ayurvedic formula to naturally dissolve and flush out stones without pain.',
        image: kidneyStoneImg,
        link: '/product/697631c6bd94a7bc32bec1e2'
    },
    {
        id: 2,
        name: 'Gall Bladder',
        description: 'Potent herbal support for gallbladder health and stone management.',
        image: gallBladderImg,
        link: '/product/697628febd94a7bc32bebce1'
    },
    {
        id: 3,
        name: 'Piles Care',
        description: 'Quick relief from pain, swelling, and bleeding with natural healing herbs.',
        image: pilesImg,
        link: '/product/6976370fbd94a7bc32bec3fe'
    },
    {
        id: 4,
        name: 'Gastric Solution',
        description: 'Effective relief from acidity, bloating, and chronic gas issues.',
        image: gastricImg,
        link: '/product/69762e8dbd94a7bc32bec05a'
    },
    {
        id: 5,
        name: 'Asthma Care',
        description: 'Strengthen your lungs and breathe purely with ancient respiratory support.',
        image: asthmaImg,
        link: '/product/69761e95bd94a7bc32beb945'
    },
    {
        id: 6,
        name: 'Diabetes Care',
        description: 'Holistic management of blood sugar levels with natural insulin support.',
        image: diabetesImg,
        link: '/product/6976241fbd94a7bc32beba87'
    },
    {
        id: 7,
        name: 'Migraine Relief',
        description: 'Soothe neurological pathways to eliminate recurrent headaches and stress.',
        image: migraineImg,
        link: '/product/6976341abd94a7bc32bec2a8    '
    }
];

const FeatureCategories = () => {
    return (
        <section className="py-12 md:py-16 bg-[#FAFAFA]">
            <div className="w-full px-2 md:px-6">
                <div className="text-center mb-10">
                    <span className="text-ayur-gold text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Our Specializations</span>
                    <h2 className="text-4xl md:text-5xl font-serif text-ayur-green mb-4">Wellness Categories</h2>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto">Discover time-tested Ayurvedic solutions tailored for modern chronic health concerns.</p>
                    <div className="w-20 h-1 bg-ayur-gold mx-auto mt-8 rounded-full"></div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
                    {categories.map((cat) => (
                        <div key={cat.id} className="group bg-white rounded-[2rem] overflow-hidden hover:shadow-2xl hover:shadow-ayur-green/5 transition-all duration-500 border border-transparent hover:border-ayur-beige/50 flex flex-col h-full">
                            {/* Image Section */}
                            <div className="aspect-[4/3] overflow-hidden relative">
                                <img
                                    src={cat.image}
                                    alt={cat.name}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>

                            {/* Content Section */}
                            <div className="p-4 md:p-8 flex flex-col flex-grow">
                                <h3 className="text-sm md:text-xl font-serif text-ayur-green mb-2 group-hover:text-ayur-olive transition-colors">
                                    {cat.name}
                                </h3>
                                <p className="text-gray-500 mb-4 text-[10px] md:text-sm leading-relaxed line-clamp-2 md:line-clamp-3">
                                    {cat.description}
                                </p>

                                <Link
                                    to={cat.link}
                                    className="mt-auto inline-flex items-center justify-between text-ayur-green font-bold text-[10px] md:text-xs uppercase tracking-widest border-b border-ayur-beige/50 pb-1 group-hover:border-ayur-gold transition-all"
                                >
                                    Explore <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};


export default FeatureCategories;
