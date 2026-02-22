import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api, { getAssetUrl } from '../api/api';

const OrderSuccess = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const { data } = await api.get(`/orders/${id}`);
                setOrder(data);
            } catch (err) {
                setError(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [id]);

    if (loading) return <div className="flex justify-center items-center min-h-screen">Loading your order details...</div>;
    if (error) return <div className="text-center p-10 text-red-500">{error}</div>;
    if (!order) return <div className="text-center p-10">Order not found.</div>;

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-[#F0F7F4] py-8 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                        <Link to="/" className="text-gray-600 hover:text-black">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </Link>
                        <div>
                            <h1 className="text-xl md:text-2xl font-semibold">Order #{order._id.substring(order._id.length - 8).toUpperCase()}</h1>
                            <p className="text-sm text-gray-500 italic">Confirmed {formatDate(order.createdAt)}</p>
                        </div>
                    </div>
                    <Link to="/shop" className="bg-white border rounded px-4 py-2 text-sm font-medium hover:bg-gray-50 transition-colors">
                        Buy again
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column: Order Info */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Status Bar */}
                        <div className="bg-white rounded-lg p-6 flex items-center gap-4 shadow-sm">
                            <div className="bg-green-100 p-2 rounded-full text-green-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="font-semibold text-gray-800">Confirmed</h2>
                                <p className="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
                            </div>
                        </div>

                        {/* Address Info */}
                        <div className="bg-white rounded-lg p-8 shadow-sm">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                {/* Contact & Shipping */}
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Contact information</h3>
                                        <p className="text-gray-800">{order.shippingAddress.email}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Shipping address</h3>
                                        <div className="text-gray-800 leading-relaxed">
                                            <p>{order.shippingAddress.name}</p>
                                            <p>{order.shippingAddress.address}</p>
                                            <p>{order.shippingAddress.city} {order.shippingAddress.postalCode}</p>
                                            <p>{order.shippingAddress.country}</p>
                                            <p>{order.shippingAddress.phone}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Shipping method</h3>
                                        <p className="text-gray-800">Free Shipping and {order.paymentMethod === 'COD' ? 'COD Charges' : 'Secure Online Payment'}</p>
                                    </div>
                                </div>

                                {/* Billing Address */}
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Billing address</h3>
                                    <div className="text-gray-800 leading-relaxed">
                                        <p>{order.shippingAddress.name}</p>
                                        <p>{order.shippingAddress.address}</p>
                                        <p>{order.shippingAddress.city} {order.shippingAddress.postalCode}</p>
                                        <p>{order.shippingAddress.country}</p>
                                        <p>{order.shippingAddress.phone}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="space-y-6">
                        {/* Total Highlight */}
                        <div className="bg-white rounded-lg p-6 shadow-sm flex justify-between items-center text-xl font-semibold">
                            <span>₹{order.totalPrice.toFixed(2)} INR</span>
                        </div>

                        {/* Items & Breakdown */}
                        <div className="bg-white rounded-lg p-6 shadow-sm">
                            <div className="space-y-6 mb-6">
                                {order.orderItems.map((item, index) => (
                                    <div key={index} className="flex gap-4">
                                        <div className="relative">
                                            <img
                                                src={getAssetUrl(item.image)}
                                                alt={item.name}
                                                className="w-16 h-16 object-cover rounded border"
                                            />
                                            <span className="absolute -top-2 -right-2 bg-gray-800 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                                                {item.qty}
                                            </span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between font-medium text-sm">
                                                <span>{item.name} {item.pack?.name ? `- ${item.pack.name}` : ''}</span>
                                                <span>₹{item.price.toFixed(2)}</span>
                                            </div>
                                            {item.pack?.variant && <p className="text-xs text-gray-400 mt-1">{item.pack.variant}</p>}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t pt-4 space-y-3">
                                <div className="flex justify-between text-sm text-gray-500">
                                    <span>Subtotal</span>
                                    <span>₹{order.itemsPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-500">
                                    <span>Shipping</span>
                                    <span>₹{order.shippingPrice === 0 ? '49.00' : order.shippingPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold border-t pt-3">
                                    <div className="flex flex-col">
                                        <span>Total</span>
                                        <span className="text-[10px] text-gray-400 font-normal italic">Including ₹{order.taxPrice.toFixed(2)} in taxes</span>
                                    </div>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-xs text-gray-400 font-normal">INR</span>
                                        <span>₹{order.totalPrice.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;
