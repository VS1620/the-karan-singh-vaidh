import React, { useEffect } from 'react';
import { Truck, Package, MapPin, Clock, IndianRupee } from 'lucide-react';

const ShippingPolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-16">
            <div className="max-w-5xl mx-auto px-6 md:px-12">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#2C5F4F] to-[#3d7a67] rounded-full mb-6 shadow-lg">
                        <Truck className="text-white" size={36} />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Shipping & Delivery Policy</h1>
                    <p className="text-lg text-gray-600">Last Updated: January 23, 2026</p>
                </div>

                {/* Introduction */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-10 mb-8">
                    <p className="text-lg text-gray-700 leading-relaxed">
                        At <span className="font-semibold text-[#2C5F4F]">The Karan Singh&nbsp;&nbsp;Vaidh</span>, we are committed to delivering your Ayurvedic products safely and promptly. Please review our shipping policy to understand our delivery process and timelines.
                    </p>
                </div>

                {/* Content Sections */}
                <div className="space-y-8">
                    {/* Section 1 */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-10">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-12 h-12 bg-[#2C5F4F]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                <MapPin className="text-[#2C5F4F]" size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Shipping Coverage</h2>
                                <div className="h-1 w-20 bg-gradient-to-r from-[#2C5F4F] to-[#A8C5B5]"></div>
                            </div>
                        </div>

                        <div className="space-y-4 text-gray-700">
                            <p className="leading-relaxed">
                                We currently ship to all locations across India. Our shipping coverage includes:
                            </p>
                            <ul className="list-disc list-inside space-y-2 pl-4">
                                <li>All major cities and metro areas</li>
                                <li>Tier 2 and Tier 3 cities</li>
                                <li>Rural and remote areas (extended delivery time may apply)</li>
                                <li>Serviceable pin codes across all Indian states and union territories</li>
                            </ul>
                            <p className="leading-relaxed">
                                Please note: We do not currently offer international shipping. For bulk orders or special delivery requests, please contact our customer service team.
                            </p>
                        </div>
                    </div>

                    {/* Section 2 */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-10">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-12 h-12 bg-[#2C5F4F]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Clock className="text-[#2C5F4F]" size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Delivery Timeline</h2>
                                <div className="h-1 w-20 bg-gradient-to-r from-[#2C5F4F] to-[#A8C5B5]"></div>
                            </div>
                        </div>

                        <div className="space-y-6 text-gray-700">
                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-[#2C5F4F] p-6 rounded-r-xl">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Processing Time</h3>
                                <p className="leading-relaxed">
                                    Orders are processed within <strong>1-2 business days</strong> after payment confirmation. Orders placed on weekends or public holidays will be processed on the next business day.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Standard Delivery Times</h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="border border-gray-200 rounded-xl p-5">
                                        <h4 className="font-semibold text-[#2C5F4F] mb-2">Metro Cities</h4>
                                        <p className="text-2xl font-bold text-gray-900 mb-1">3-5 Days</p>
                                        <p className="text-sm text-gray-600">Delhi, Mumbai, Bangalore, Chennai, Kolkata, Hyderabad</p>
                                    </div>
                                    <div className="border border-gray-200 rounded-xl p-5">
                                        <h4 className="font-semibold text-[#2C5F4F] mb-2">Other Cities</h4>
                                        <p className="text-2xl font-bold text-gray-900 mb-1">5-7 Days</p>
                                        <p className="text-sm text-gray-600">All other urban and semi-urban areas</p>
                                    </div>
                                    <div className="border border-gray-200 rounded-xl p-5">
                                        <h4 className="font-semibold text-[#2C5F4F] mb-2">Remote Areas</h4>
                                        <p className="text-2xl font-bold text-gray-900 mb-1">7-10 Days</p>
                                        <p className="text-sm text-gray-600">Rural and hard-to-reach locations</p>
                                    </div>
                                    <div className="border border-gray-200 rounded-xl p-5">
                                        <h4 className="font-semibold text-[#2C5F4F] mb-2">Himachal Pradesh</h4>
                                        <p className="text-2xl font-bold text-gray-900 mb-1">2-4 Days</p>
                                        <p className="text-sm text-gray-600">Within our home state</p>
                                    </div>
                                </div>
                            </div>

                            <p className="text-sm italic bg-amber-50 border border-amber-200 rounded-xl p-4">
                                <strong>Note:</strong> Delivery timelines are estimates and may vary due to courier delays, natural calamities, political disruptions, or force majeure events.
                            </p>
                        </div>
                    </div>

                    {/* Section 3 */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-10">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-12 h-12 bg-[#2C5F4F]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                <IndianRupee className="text-[#2C5F4F]" size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Shipping Charges</h2>
                                <div className="h-1 w-20 bg-gradient-to-r from-[#2C5F4F] to-[#A8C5B5]"></div>
                            </div>
                        </div>

                        <div className="space-y-6 text-gray-700">
                            <div className="bg-gradient-to-br from-[#2C5F4F] to-[#3d7a67] text-white rounded-xl p-6">
                                <h3 className="text-xl font-bold mb-3">🚚 Delivery Update</h3>
                                <p className="text-lg leading-relaxed">
                                    We now offer <strong>All India Delivery</strong> at your doorstep!
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Standard Shipping Charges</h3>
                                <div className="border border-gray-200 rounded-xl overflow-hidden">
                                    <table className="w-full">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Destination</th>
                                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Shipping Mode</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            <tr>
                                                <td className="px-6 py-4 text-gray-700">All India</td>
                                                <td className="px-6 py-4 font-semibold text-[#2C5F4F]">Doorstep Delivery</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <p className="leading-relaxed">
                                Shipping charges are calculated automatically at checkout based on your location and order value.
                            </p>
                        </div>
                    </div>

                    {/* Section 4 */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-10">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-12 h-12 bg-[#2C5F4F]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Package className="text-[#2C5F4F]" size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Tracking</h2>
                                <div className="h-1 w-20 bg-gradient-to-r from-[#2C5F4F] to-[#A8C5B5]"></div>
                            </div>
                        </div>

                        <div className="space-y-4 text-gray-700">
                            <p className="leading-relaxed">
                                Once your order is dispatched, you will receive:
                            </p>
                            <ul className="list-disc list-inside space-y-2 pl-4">
                                <li>Email notification with tracking details</li>
                                <li>SMS with courier partner name and tracking number</li>
                                <li>Real-time tracking link to monitor your shipment</li>
                                <li>Updates on key delivery milestones</li>
                            </ul>
                            <p className="leading-relaxed">
                                You can also track your order by logging into your account and visiting the "My Orders" section.
                            </p>
                        </div>
                    </div>

                    {/* Section 5 */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Delivery Process</h2>
                        <div className="h-1 w-20 bg-gradient-to-r from-[#2C5F4F] to-[#A8C5B5] mb-6"></div>

                        <div className="space-y-4 text-gray-700">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Packaging</h3>
                                <p className="leading-relaxed">
                                    All products are carefully packed to ensure they reach you in perfect condition. We use eco-friendly packaging materials wherever possible.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Delivery Attempts</h3>
                                <p className="leading-relaxed">
                                    Our courier partners will make up to 3 delivery attempts. Please ensure someone is available to receive the package during business hours.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Undelivered Packages</h3>
                                <p className="leading-relaxed">
                                    If delivery is not successful after 3 attempts, the package will be returned to us. You may be charged for re-shipment. Please ensure your contact details and address are accurate.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Inspection on Delivery</h3>
                                <p className="leading-relaxed">
                                    We recommend inspecting your package upon delivery. If you notice any damage, please refuse the delivery and contact us immediately at our customer service number.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Section 6 */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-10">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Damaged or Lost Shipments</h2>
                        <div className="h-1 w-20 bg-gradient-to-r from-[#2C5F4F] to-[#A8C5B5] mb-6"></div>

                        <div className="space-y-4 text-gray-700">
                            <p className="leading-relaxed">
                                If your package arrives damaged or is lost in transit:
                            </p>
                            <ul className="list-disc list-inside space-y-2 pl-4">
                                <li>Contact us within 48 hours of delivery</li>
                                <li>Provide photos of the damaged package (if applicable)</li>
                                <li>Share your order number and tracking details</li>
                                <li>We will arrange for a replacement or full refund</li>
                            </ul>
                            <p className="leading-relaxed">
                                We work closely with our courier partners to ensure safe delivery, but in rare cases of damage or loss, we take full responsibility.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Contact Section */}
                <div className="mt-12 bg-gradient-to-br from-[#2C5F4F] to-[#3d7a67] rounded-2xl shadow-lg p-8 md:p-10 text-white">
                    <h2 className="text-2xl font-bold mb-4">Shipping Questions?</h2>
                    <div className="h-1 w-20 bg-white/50 mb-6"></div>

                    <p className="text-lg leading-relaxed mb-6">
                        Have questions about your delivery? Our customer service team is here to help!
                    </p>

                    <div className="space-y-3">
                        <p>
                            <span className="font-semibold">Email:</span>{' '}
                            <a href="mailto:thekaransinghvaidh@gmail.com" className="hover:underline">
                                thekaransinghvaidh@gmail.com
                            </a>
                        </p>
                        <p>
                            <span className="font-semibold">Phone:</span>{' '}
                            <a href="tel:8219658454" className="hover:underline">
                                82196 58454 | 80911 34027 | 88947 72187
                            </a>
                        </p>
                        <p className="text-sm opacity-90">Customer service hours: Monday - Saturday, 9:00 AM - 6:00 PM IST</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShippingPolicy;
