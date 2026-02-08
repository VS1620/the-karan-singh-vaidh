import React from 'react';
// import factoryVideo from '../../assets/for website factory edit.mp4';
const factoryVideo = ""; // Placeholder to prevent build errors

const FactoryVideo = () => {
    return (
        <section className="bg-white py-12 md:py-20 overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-4 md:px-12 text-center">
                <div className="mb-12">
                    <span className="text-ayur-gold text-sm tracking-widest uppercase font-bold">Manufacturing Process</span>
                    <h2 className="text-3xl md:text-5xl font-serif text-ayur-green mt-2 font-medium">Quality & Purity at Every Step</h2>
                    <div className="w-20 h-1 bg-ayur-gold mx-auto mt-6 rounded-full"></div>
                </div>

                <div className="relative group max-w-5xl mx-auto">
                    <div className="relative bg-black rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
                        <video
                            controls
                            className="w-full h-auto aspect-video"
                        >
                            <source src={factoryVideo} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FactoryVideo;
