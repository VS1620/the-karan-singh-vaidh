import React from 'react';
import { Leaf, Ban, Award, TestTube, Recycle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const qualityPoints = [
    {
        id: 1,
        title: "Natural Herbs",
        icon: <Leaf size={40} className="text-white" />,
        color: "bg-green-400"
    },
    {
        id: 2,
        title: "No Added Sugar",
        icon: <Ban size={40} className="text-white" />,
        color: "bg-green-400"
    },
    {
        id: 3,
        title: "GMP Certified",
        icon: <Award size={40} className="text-white" />,
        color: "bg-green-400"
    },
    {
        id: 4,
        title: "No Extracts Used",
        icon: <TestTube size={40} className="text-white" />,
        color: "bg-green-400"
    },
    {
        id: 5,
        title: "BPA Free",
        icon: <Recycle size={40} className="text-white" />,
        color: "bg-green-400"
    }
];

const FinestQuality = () => {
    return (
        <section className="py-20 bg-gradient-to-b from-green-50/50 to-white overflow-hidden relative">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-green-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-200/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-serif text-[#1a4d2e] mb-6 font-bold">
                        Finest Quality Natural Product
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        Established in 2004, <span className="font-bold text-[#1a4d2e]">Karan Singh Vaidh</span> is a leading manufacturer and supplier of Ayurvedic and herbal products in Solan, Himachal Pradesh. Our vision is to enhance the quality of life by making Ayurvedic and Herbal healthcare products ensuring 100% customer satisfaction. The manufacturing unit is GMP certified by Ayush department, Govt. of India. We have a well-equipped laboratory for R&D to test the products maintained by our quality control department.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                    {qualityPoints.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center justify-center text-center group border border-green-50"
                        >
                            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#6bc47d] to-[#98e6a8] flex items-center justify-center mb-6 shadow-lg shadow-green-200 group-hover:scale-110 transition-transform duration-300">
                                {item.icon}
                            </div>
                            <h3 className="text-[#1a4d2e] font-bold text-lg">
                                {item.title}
                            </h3>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FinestQuality;
