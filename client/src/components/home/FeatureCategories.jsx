import React from 'react';
import { ArrowRight } from 'lucide-react';

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
        link: '/shop?category=kidney-stone'
    },
    {
        id: 2,
        name: 'Gall Bladder',
        description: 'Potent herbal support for gallbladder health and stone management.',
        image: gallBladderImg,
        link: '/shop?category=gall-bladder'
    },
    {
        id: 3,
        name: 'Piles Care',
        description: 'Quick relief from pain, swelling, and bleeding with natural healing herbs.',
        image: pilesImg,
        link: '/shop?category=piles'
    },
    {
        id: 4,
        name: 'Gastric Solution',
        description: 'Effective relief from acidity, bloating, and chronic gas issues.',
        image: gastricImg,
        link: '/shop?category=gastric'
    },
    {
        id: 5,
        name: 'Asthma Care',
        description: 'Strengthen your lungs and breathe purely with ancient respiratory support.',
        image: asthmaImg,
        link: '/shop?category=asthma'
    },
    {
        id: 6,
        name: 'Diabetes Care',
        description: 'Holistic management of blood sugar levels with natural insulin support.',
        image: diabetesImg,
        link: '/shop?category=diabetes'
    },
    {
        id: 7,
        name: 'Migraine Relief',
        description: 'Soothe neurological pathways to eliminate recurrent headaches and stress.',
        image: migraineImg,
        link: '/shop?category=migraine'
    }
];

const FeatureCategories = () => {
    return (
        <section className="py-24 bg-[#FAFAFA]">
            <div className="container mx-auto px-4 md:px-12">
                <div className="text-center mb-16">
                    <span className="text-ayur-gold text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Our Specializations</span>
                    <h2 className="text-4xl md:text-5xl font-serif text-ayur-green mb-4">Wellness Categories</h2>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto">Discover time-tested Ayurvedic solutions tailored for modern chronic health concerns.</p>
                    <div className="w-20 h-1 bg-ayur-gold mx-auto mt-8 rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                            <div className="p-8 flex flex-col flex-grow">
                                <h3 className="text-xl font-serif text-ayur-green mb-3 group-hover:text-ayur-olive transition-colors">
                                    {cat.name}
                                </h3>
                                <p className="text-gray-500 mb-6 text-sm leading-relaxed line-clamp-3">
                                    {cat.description}
                                </p>

                                <a
                                    href={cat.link}
                                    className="mt-auto inline-flex items-center justify-between text-ayur-green font-bold text-xs uppercase tracking-widest border-b border-ayur-beige/50 pb-2 group-hover:border-ayur-gold transition-all"
                                >
                                    Explore Solution <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};


export default FeatureCategories;
