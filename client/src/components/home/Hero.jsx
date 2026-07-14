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
    const [currentSlide, setCurrentSlide] = React.useState(0);

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
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 6000,
        adaptiveHeight: true,
        fade: true,
        speed: 800,
        cssEase: "linear",
        pauseOnHover: false,
        arrows: isDesktop,
        lazyLoad: 'progressive',
        afterChange: (current) => {
            setCurrentSlide(current);
            if (import.meta.env.DEV) {
                console.log(`[Slider] Focus transferred safely to slide: ${current}`);
            }
        },
        customPaging: i => (
            <div className={`w-3 h-3 rounded-full transition-all cursor-pointer mt-4 ${i === currentSlide ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white'}`}></div>
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
            desktopOnly: true,
            title: null,
            subtitle: null,
            cta: null,
            link: "/contact",
            bgImage: banner1Web,
            theme: "dark",
            icon: null,
            hasOverlay: false
        },
        {
            id: 'himAward',
            desktopOnly: true,
            title: null,
            subtitle: null,
            cta: null,
            link: "/about-ayurvedic-doctor-in-solan",
            bgImage: himAward,
            theme: "dark",
            icon: null,
            hasOverlay: false
        },
        {
            id: 'nirmalRishi1',
            title: null,
            subtitle: null,
            cta: null,
            link: "/contact",
            bgImage: '/Nirmal Rishi banner for Web.png',
            mobileBgImage: '/Nirmal rishi Banner 4.png',
            theme: "dark",
            icon: null,
            hasOverlay: false
        },
        {
            id: 'nirmalRishi2',
            title: null,
            subtitle: null,
            cta: null,
            link: "/about-ayurvedic-doctor-in-solan",
            bgImage: '/VIDHUVADHA X NIRMAL RISHI JI.png',
            mobileBgImage: '/KSV X NR !.png',
            theme: "dark",
            icon: null,
            hasOverlay: false
        },
        {
            id: 'gallbladder-mobile',
            mobileOnly: true,
            title: null,
            subtitle: null,
            cta: null,
            link: "/gallbladder-stone-ayurvedic-treatment",
            bgImage: '/Gallbladder stone Mobile Banner Size 800 x 1200px.png',
            mobileBgImage: '/Gallbladder stone Mobile Banner Size 800 x 1200px.png',
            theme: "dark",
            icon: null,
            hasOverlay: false
        },
        {
            id: 'gallbladder-ak-cap-mobile',
            mobileOnly: true,
            title: null,
            subtitle: null,
            cta: null,
            link: "/gallbladder-stone-ayurvedic-treatment",
            bgImage: '/Gallbladder stone AK CAP Mobile Banner Size 800 x 1200px.png',
            mobileBgImage: '/Gallbladder stone AK CAP Mobile Banner Size 800 x 1200px.png',
            theme: "dark",
            icon: null,
            hasOverlay: false
        },
        {
            id: 'diabetes-mobile',
            mobileOnly: true,
            title: null,
            subtitle: null,
            cta: null,
            link: "/ayurvedic-diabetes-treatment",
            bgImage: '/Diabetes Banner Mobile Banner Size 800 x 1200px.png',
            mobileBgImage: '/Diabetes Banner Mobile Banner Size 800 x 1200px.png',
            theme: "dark",
            icon: null,
            hasOverlay: false
        },
        {
            id: 'piles-mobile',
            mobileOnly: true,
            title: null,
            subtitle: null,
            cta: null,
            link: "/ayurvedic-piles-treatment",
            bgImage: '/Piles Mobile Banner Size 800 x 1200px.png',
            mobileBgImage: '/Piles Mobile Banner Size 800 x 1200px.png',
            theme: "dark",
            icon: null,
            hasOverlay: false
        },
        {
            id: 'kidney-stone-mobile',
            mobileOnly: true,
            title: null,
            subtitle: null,
            cta: null,
            link: "/kidney-stone-ayurvedic-treatment",
            bgImage: '/Kidney stone Mobile Banner Size 800 x 1200px.png',
            mobileBgImage: '/Kidney stone Mobile Banner Size 800 x 1200px.png',
            theme: "dark",
            icon: null,
            hasOverlay: false
        },
    ];

    const getOptimizedImage = (url, index) => {
        if (!url.includes('freepik')) return url;
        const width = isDesktop ? 1920 : 640;
        return `${url}?w=${width}&q=80`;
    };

    return (
        <section className="relative w-full">
            <Slider {...settings} className="hero-slider">
                {slides.filter(slide => {
                    if (slide.desktopOnly && !isDesktop) return false;
                    if (slide.mobileOnly && isDesktop) return false;
                    return true;
                }).map((slide, index) => (
                    <div key={slide.id} className="relative w-full outline-none">
                        {/* Background Image with Overlay */}
                        <div className="w-full relative overflow-hidden flex items-center justify-center">
                             <img
                                 src={getOptimizedImage(!isDesktop && slide.mobileBgImage ? slide.mobileBgImage : slide.bgImage, index)}
                                 alt={slide.title || slide.subtitle || "The Karan Singh Vaidh Ayurvedic Banner"}
                                fetchPriority={index === 0 ? "high" : "auto"}
                                loading={index === 0 ? "eager" : "lazy"}
                                className={`w-full h-auto block transition-transform duration-[5000ms] ${slide.hasOverlay !== false ? "hover:scale-105" : "bg-white"}`}
                            />
                            {/* Gradient Overlay for Readability - Only for slides with text */}
                            {slide.hasOverlay !== false && (
                                <div className="absolute inset-0 bg-gradient-to-r from-[#0d2e1b]/90 via-[#0d2e1b]/60 to-transparent pointer-events-none"></div>
                            )}
                        </div>

                        {/* Content Container - Render if any text or CTA exists */}
                        {(slide.title || slide.subtitle || slide.cta) && (
                            <div className="absolute inset-0 z-10 container mx-auto px-4 md:px-12 flex flex-col justify-center max-w-7xl">
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                    className="max-w-2xl"
                                >
                                    {/* Slide Icon */}
                                    {slide.icon && (
                                        <div className="mb-2 animate-pulse">
                                            {slide.icon}
                                        </div>
                                    )}

                                    {/* Headline */}
                                    {slide.title && (
                                        index === 0 ? (
                                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4 md:mb-6 leading-tight drop-shadow-lg">
                                                {slide.title}
                                            </h1>
                                        ) : (
                                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4 md:mb-6 leading-tight drop-shadow-lg">
                                                {slide.title}
                                            </h2>
                                        )
                                    )}

                                    {/* Subtext */}
                                    {slide.subtitle && (
                                        <p className="text-sm md:text-xl text-gray-200 mb-6 md:mb-10 font-light tracking-wide leading-relaxed border-l-4 border-yellow-500 pl-4">
                                            {slide.subtitle}
                                        </p>
                                    )}

                                    {/* CTA Button */}
                                    {slide.cta && (
                                        <button
                                            tabIndex={index === currentSlide ? 0 : -1}
                                            aria-hidden={index !== currentSlide}
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
                                    )}
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
                .hero-slider .slick-slide {
                    visibility: hidden;
                    transition: visibility 0s 0.8s;
                }
                .hero-slider .slick-slide.slick-active {
                    visibility: visible;
                    transition: visibility 0s;
                    z-index: 10;
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
