import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/seo/SEO';
import { FileText, Eye, ShieldCheck } from 'lucide-react';

const PatientReports = () => {
    const pdfReports = [
        { 
            id: 1, 
            title: 'Patient Medical Report 2026 - Nitish', 
            description: 'In-depth review of clinical outcomes and recovery tracking for the 2026 patient cycle.',
            file: '/REPORT 1 NITISH.pdf'
        },
        { 
            id: 2, 
            title: 'General Patient Medical Reports 2025', 
            description: 'A comprehensive collection of documented before & after results from our 2025 patient success stories.',
            file: '/REPORTS FOR WEBSITE.pdf'
        }
    ];

    return (
        <div className="bg-[#F8F9FA] min-h-screen pt-24 pb-20 font-sans">
            <SEO 
                title="Verified Medical Reports | Karan Singh Vaidh"
                description="See real proof of our Ayurvedic treatments. Detailed case studies and clinical results showing actual patient progress."
            />
            
            <div className="container mx-auto px-6 max-w-7xl">

                {/* Section Header */}
                <div className="text-center mb-12">
                    <span className="text-ayur-gold text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
                        Clinical Evidence
                    </span>
                    <h1 className="text-4xl md:text-5xl font-serif text-ayur-green mb-4 font-medium">
                        Verified Medical Reports
                    </h1>
                    <p className="text-lg text-ayur-green/70 font-medium mb-3">
                        Detailed case studies and clinical results.
                    </p>
                    <div className="w-20 h-1 bg-ayur-gold mx-auto rounded-full mb-6"></div>
                    <p className="text-gray-500 text-base max-w-2xl mx-auto leading-relaxed">
                        See the real proof of our treatments. Click on the medical reports below to read detailed case studies and see the actual progress our patients have made.
                    </p>
                </div>

                {/* Report Cards */}
                <div className="pt-4 flex flex-wrap justify-center gap-8 max-w-5xl mx-auto">
                    {pdfReports.map((report, index) => (
                        <motion.div 
                            key={report.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="w-full md:w-[calc(50%-1rem)] lg:w-80 max-w-md bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 flex flex-col group"
                        >
                            <div className="w-16 h-16 bg-ayur-green/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <FileText className="text-ayur-green" size={32} />
                            </div>
                            
                            <div className="flex gap-4 mt-auto">
                                <a 
                                    href={report.file}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 bg-ayur-green text-white text-center py-2.5 rounded-xl font-semibold hover:bg-ayur-olive transition-colors flex items-center justify-center gap-2"
                                >
                                    <Eye size={18} />
                                    View Report
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Trust Badge */}
                <div className="flex items-center justify-center gap-2 mt-12 text-ayur-green/60 text-sm">
                    <ShieldCheck size={18} className="text-ayur-gold" />
                    <span>All reports are authentic and verified by our medical team.</span>
                </div>
            </div>
        </div>
    );
};

export default PatientReports;
