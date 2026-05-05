import React, { lazy, Suspense } from 'react';
import SEO from '../components/seo/SEO';
import { Loader2 } from 'lucide-react';
import Hero from '../components/home/Hero';
import TrustMarquee from '../components/home/TrustMarquee';

// Lazy load below-the-fold sections
const BestSellers = lazy(() => import('../components/home/BestSellers'));
const PillsSection = lazy(() => import('../components/home/PillsSection'));
const FeatureCategories = lazy(() => import('../components/home/FeatureCategories'));
const WhyUs = lazy(() => import('../components/home/WhyUs'));
const HowItWorks = lazy(() => import('../components/home/HowItWorks'));
const Authenticity = lazy(() => import('../components/home/Authenticity'));
const RealStores = lazy(() => import('../components/home/RealStores'));
const FactoryVideo = lazy(() => import('../components/home/FactoryVideo'));
const Reviews = lazy(() => import('../components/home/Reviews'));

const SectionLoader = () => (
    <div className="py-20 flex justify-center items-center">
        <Loader2 className="animate-spin text-ayur-green/20" size={32} />
    </div>
);

const Home = () => {
    return (
        <div className="bg-ayur-beige/20 min-h-screen">
            <SEO 
                title="Best Ayurvedic Doctor in Solan | Natural Treatment by Karan Singh Vaidh"
                description="Get expert Ayurvedic treatment in Solan by Dr. Karan Singh Vaidh (23+ years experience). Natural solutions for kidney stone, piles, diabetes & more. Book consultation now!"
                keywords="Ayurvedic Doctor in Solan"
                url="/"
            >
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@graph": [
                            {
                                "@type": "Organization",
                                "@id": "https://thekaransinghvaidh.com/#organization",
                                "name": "Karan Singh Vaidh",
                                "url": "https://thekaransinghvaidh.com/",
                                "logo": "https://thekaransinghvaidh.com/thekaransinghvaidh-logo.webp",
                                "sameAs": [
                                    "https://www.youtube.com/c/karansinghvaidhhp",
                                    "https://www.facebook.com/AncientAyurvedas.org/",
                                    "https://www.instagram.com/karan_singh_vaidh/",
                                    "https://www.linkedin.com/in/karan-singh-vaidh-hp-56a903204?originalSubdomain=in"
                                ],
                                "contactPoint": {
                                    "@type": "ContactPoint",
                                    "telephone": "+91-8219658454",
                                    "contactType": "Customer Support",
                                    "areaServed": "IN",
                                    "availableLanguage": ["Hindi", "English"]
                                }
                            },
                            {
                                "@type": "MedicalBusiness",
                                "@id": "https://thekaransinghvaidh.com/#localbusiness",
                                "name": "Karan Singh Vaidh Ayurvedic Hospital",
                                "image": "https://thekaransinghvaidh.com/thekaransinghvaidh-logo.webp",
                                "address": {
                                    "@type": "PostalAddress",
                                    "streetAddress": "Radhasoami Satsang Ghar Road, Rebuan, Deoghat, Anji",
                                    "addressLocality": "Solan",
                                    "addressRegion": "Himachal Pradesh",
                                    "postalCode": "173211",
                                    "addressCountry": "IN"
                                },
                                "telephone": "+91-8219658454",
                                "openingHours": "Mo-Su 10:00-17:00",
                                "priceRange": "₹₹",
                                "areaServed": "India"
                            },
                            {
                                "@type": "Person",
                                "@id": "https://thekaransinghvaidh.com/#doctor",
                                "name": "Dr. Karan Singh Vaidh",
                                "jobTitle": "Ayurvedic Doctor",
                                "worksFor": {
                                    "@id": "https://thekaransinghvaidh.com/#organization"
                                },
                                "description": "Experienced Ayurvedic doctor specializing in chronic disease treatment using natural herbal formulations.",
                                "address": {
                                    "@type": "PostalAddress",
                                    "addressLocality": "Solan",
                                    "addressRegion": "Himachal Pradesh",
                                    "addressCountry": "India"
                                }
                            },
                            {
                                "@type": "WebSite",
                                "@id": "https://thekaransinghvaidh.com/#website",
                                "url": "https://thekaransinghvaidh.com/",
                                "name": "Karan Singh Vaidh Ayurveda",
                                "publisher": {
                                    "@id": "https://thekaransinghvaidh.com/#organization"
                                },
                                "potentialAction": {
                                    "@type": "SearchAction",
                                    "target": "https://thekaransinghvaidh.com/ayurvedic-products?s={search_term_string}",
                                    "query-input": "required name=search_term_string"
                                }
                            },
                            {
                                "@type": "WebPage",
                                "@id": "https://thekaransinghvaidh.com/#webpage",
                                "url": "https://thekaransinghvaidh.com/",
                                "name": "Best Ayurvedic Doctor in Solan | Karan Singh Vaidh",
                                "isPartOf": {
                                    "@id": "https://thekaransinghvaidh.com/#website"
                                },
                                "about": {
                                    "@id": "https://thekaransinghvaidh.com/#organization"
                                },
                                "primaryImageOfPage": {
                                    "@type": "ImageObject",
                                    "url": "https://thekaransinghvaidh.com/banner1-web.webp"
                                }
                            },
                            {
                                "@type": "FAQPage",
                                "@id": "https://thekaransinghvaidh.com/#faq",
                                "mainEntity": [
                                    {
                                        "@type": "Question",
                                        "name": "Is Ayurvedic treatment safe?",
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "Yes, Ayurvedic treatments use natural herbs and are generally safe when used under expert guidance."
                                        }
                                    },
                                    {
                                        "@type": "Question",
                                        "name": "How long does it take to see results?",
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "Most users start noticing improvements within 15 to 30 days depending on the condition and regular usage."
                                        }
                                    },
                                    {
                                        "@type": "Question",
                                        "name": "Do these treatments have side effects?",
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "These herbal formulations are designed to be natural and safe, with minimal side effects when used as directed."
                                        }
                                    }
                                ]
                            }
                        ]
                    })}
                </script>
            </SEO>
            
            {/* Eager Load Content */}
            <Hero />
            <TrustMarquee />

            {/* Lazy Load Content with Suspense */}
            <Suspense fallback={<SectionLoader />}>
                <BestSellers />
                <PillsSection />
                <FeatureCategories />
                <WhyUs />
                <HowItWorks />
                <Authenticity />
                <RealStores />
                <FactoryVideo />
                <Reviews />
            </Suspense>
        </div>
    );
};

export default Home;
