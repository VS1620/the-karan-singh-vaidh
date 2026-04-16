import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowRight, Star, ShieldCheck, Leaf, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import ConsultationModal from './ConsultationModal';

import banner1Web from '../../assets/banner1-web.webp';
import himAward from '../../assets/him award.webp';

// Slider Settings
const Hero = () => {
    // State to track if the device is desktop (min-width: 768px for tablet/desktop)
    const [isDesktop, setIsDesktop] = React.useState(window.innerWidth >= 768);
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    React.useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        fade: true,
        cssEase: "linear",
        pauseOnHover: false,
        arrows: isDesktop,
        lazyLoad: 'progressive',
        customPaging: i => (
            <div className="w-3 h-3 rounded-full bg-white/40 hover:bg-white transition-all cursor-pointer mt-4"></div>
        ),
        appendDots: dots => (
            <div style={{ bottom: "30px" }}>
                <ul className="m-0 p-0 flex justify-center gap-4"> {dots} </ul>
            </div>
        )
    };

    // Slide Data
    const slides = [
        {
            id: 'banner1',
            title: null,
            subtitle: null,
            cta: null,
            link: "/ayurvedic-products",
            bgImage: banner1Web,
            theme: "dark",
            icon: null,
            desktopOnly: true,
            hasOverlay: false
        },
        {
            id: 'himAward',
            title: null,
            subtitle: null,
            cta: null,
            link: "/about-ayurvedic-doctor-in-solan",
            bgImage: himAward,
            theme: "dark",
            icon: null,
            desktopOnly: true,
            hasOverlay: false
        },
        {
            id: 1,
            title: "Ayurvedic Legacy Since 2003",
            subtitle: "Trusted ancient formulations for modern lifestyle diseases",
            cta: "Shop Now",
            link: "/ayurvedic-products",
            bgImage: "https://img.freepik.com/free-photo/high-angle-assortment-fine-powders-bowls-with-stones_23-2148774961.jpg",
            theme: "dark",
            icon: <Leaf className="text-yellow-400 mb-4" size={48} />
        },
        {
            id: 2,
            title: "Proven Results. Natural Healing.",
            subtitle: "Clinically inspired Ayurvedic medicines with no side effects",
            cta: "Consult Ayurveda Expert",
            link: "/consult",
            bgImage: "https://img.freepik.com/free-photo/hand-holding-rosemary-fresh-plant-bottle-rosemary-oil_1150-35585.jpg",
            theme: "dark",
            icon: <ShieldCheck className="text-green-400 mb-4" size={48} />
        },
        {
            id: 3,
            title: "Targeted Relief for Chronic Disorders",
            subtitle: "Diabetes, Joint Pain, Digestion, Immunity & Lifestyle Issues",
            cta: "Explore Solutions",
            link: "/ayurvedic-products",
            bgImage: "https://img.freepik.com/premium-photo/midsection-doctor-patient-shaking-hand-while-sitting-clinic_1048944-15396134.jpg",
            theme: "dark",
            icon: <Star className="text-yellow-400 mb-4" size={48} />
        },
        {
            id: 4,
            title: "Trusted by Thousands of Happy Patients",
            subtitle: "⭐⭐⭐⭐⭐ Verified reviews with real success stories",
            cta: "View Reviews",
            link: "/reviews",
            bgImage: "https://img.freepik.com/free-photo/happy-senior-man-handshaking-with-female-doctor-while-talking-lobby-clinic_637285-460.jpg",
            theme: "dark",
            icon: <Users className="text-blue-400 mb-4" size={48} />
        }
    ];

    const getOptimizedImage = (url, index) => {
        if (!url.includes('freepik')) return url;
        const width = isDesktop ? 1920 : 640;
        return `${url}?w=${width}&q=80`;
    };

    return (
        <section className="relative overflow-hidden w-full h-[500px] md:h-[700px]">
            <Slider {...settings} className="hero-slider h-full">
                {slides.filter(slide => !slide.desktopOnly || isDesktop).map((slide, index) => (
                    <div key={slide.id} className="relative h-[500px] md:h-[700px] w-full outline-none">
                        {/* Background Image with Overlay */}
                        <div className="absolute inset-0 overflow-hidden">
                             <img
                                 src={getOptimizedImage(slide.bgImage, index)}
                                 alt={slide.title || slide.subtitle || "The Karan Singh Vaidh Ayurvedic Banner"}
                                fetchpriority={index === 0 ? "high" : "auto"}
                                loading={index === 0 ? "eager" : "lazy"}
                                className={`w-full h-full object-center transition-transform duration-[5000ms] ${slide.hasOverlay !== false ? "object-cover hover:scale-105" : "object-cover md:object-fill"
                                    }`}
                            />
                            {/* Gradient Overlay for Readability - Only for slides with text */}
                            {slide.hasOverlay !== false && (
                                <div className="absolute inset-0 bg-gradient-to-r from-[#0d2e1b]/90 via-[#0d2e1b]/60 to-transparent"></div>
                            )}
                        </div>

                        {/* Content Container - Only render if title exists */}
                        {slide.title && (
                            <div className="relative z-10 container mx-auto px-4 md:px-12 h-full flex flex-col justify-center max-w-7xl">
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                    className="max-w-2xl"
                                >
                                    {/* Slide Icon */}
                                    <div className="mb-2 animate-pulse">
                                        {slide.icon}
                                    </div>

                                    {/* Headline */}
                                    <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-4 md:mb-6 leading-tight drop-shadow-lg">
                                        {slide.title}
                                    </h1>

                                    {/* Subtext */}
                                    <p className="text-sm md:text-xl text-gray-200 mb-6 md:mb-10 font-light tracking-wide leading-relaxed border-l-4 border-yellow-500 pl-4">
                                        {slide.subtitle}
                                    </p>

                                    {/* CTA Button */}
                                    <button
                                        onClick={(e) => {
                                            if (slide.cta === "Consult Ayurveda Expert") {
                                                e.preventDefault();
                                                setIsModalOpen(true);
                                            } else {
                                                window.location.href = slide.link;
                                            }
                                        }}
                                        className="inline-flex items-center gap-2 md:gap-3 bg-yellow-500 hover:bg-yellow-400 text-[#0d2e1b] px-6 py-3 md:px-10 md:py-4 rounded-full font-bold text-base md:text-lg transition-all transform hover:-translate-y-1 hover:shadow-xl group"
                                    >
                                        {slide.cta}
                                        <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                                    </button>
                                </motion.div>
                            </div>
                        )}
                    </div>
                ))}
            </Slider>

            {/* Custom Styles for Slider Dots/Arrows overrides if needed */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .hero-slider .slick-prev, .hero-slider .slick-next {
                    z-index: 20;
                    width: 50px;
                    height: 50px;
                    transition: all 0.3s;
                }
                .hero-slider .slick-prev { left: 30px; }
                .hero-slider .slick-next { right: 30px; }
                .hero-slider .slick-prev:before, .hero-slider .slick-next:before {
                    font-size: 40px;
                    opacity: 0.7;
                    color: white;
                }
                .hero-slider .slick-prev:hover:before, .hero-slider .slick-next:hover:before {
                    opacity: 1;
                    color: #eab308; /* yellow-500 */
                }
            `}} />
            {/* Appointment Modal */}
            <ConsultationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </section>
    );
};

export default Hero;
