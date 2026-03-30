import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api, { getAssetUrl } from '../api/api';
import { CheckCircle, Truck, CreditCard, Headphones, Download, ChevronRight } from 'lucide-react';

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

    if (loading) return (
        <div className="flex flex-col justify-center items-center min-h-[60vh] gap-4">
            <div className="w-12 h-12 border-4 border-ayur-green/20 border-t-ayur-green rounded-full animate-spin"></div>
            <p className="text-gray-500 font-medium font-serif">Retreiving your order details...</p>
        </div>
    );
    
    if (error) return <div className="text-center p-20 text-red-500 font-serif">Error: {error}</div>;
    if (!order) return <div className="text-center p-20 font-serif">Order not found.</div>;

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    // Calculate estimated delivery date (7 days after order)
    const getEstimatedDeliveryDate = (dateString) => {
        const date = new Date(dateString);
        date.setDate(date.getDate() + 7);
        return date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const shortOrderId = order._id.substring(order._id.length - 8).toUpperCase();

    return (
        <div className="min-h-screen bg-gray-50/50 pb-20 font-sans">
            {/* Breadcrumb */}
            <div className="bg-white border-b py-4">
                <div className="container mx-auto px-4 max-w-5xl flex items-center gap-2 text-sm text-gray-500">
                    <Link to="/" className="hover:text-ayur-green transition-colors">Home</Link>
                    <ChevronRight size={14} />
                    <span className="text-gray-900 font-medium">Order Completed</span>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-5xl pt-12">
                {/* Success Message Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-[#ffc107]/10 rounded-full mb-6">
                        <CheckCircle size={48} className="text-[#ffc107] fill-[#ffc107]/10" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-3">Your order is completed!</h1>
                    <p className="text-gray-500 text-lg">Thank you. Your order has been received.</p>
                </div>

                {/* Info Highlight Banner */}
                <div className="bg-[#ffc107] rounded-xl md:rounded-2xl p-6 md:p-8 mb-8 shadow-lg shadow-yellow-500/10">
                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 items-center">
                        <div>
                            <p className="text-yellow-900/60 text-[10px] md:text-xs uppercase font-bold tracking-widest mb-1">Order ID</p>
                            <p className="font-bold text-gray-900">#KSV{shortOrderId}</p>
                        </div>
                        <div>
                            <p className="text-yellow-900/60 text-[10px] md:text-xs uppercase font-bold tracking-widest mb-1">Payment Method</p>
                            <p className="font-bold text-gray-900">{order.paymentMethod === 'COD' ? 'Cash on Delivery' : 'Online Payment'}</p>
                        </div>
                        <div>
                            <p className="text-yellow-900/60 text-[10px] md:text-xs uppercase font-bold tracking-widest mb-1">Transaction ID</p>
                            <p className="font-bold text-gray-900 italic opacity-80">{order.razorpay_payment_id || `ORD-${shortOrderId}`}</p>
                        </div>
                        <div>
                            <p className="text-yellow-900/60 text-[10px] md:text-xs uppercase font-bold tracking-widest mb-1">Estimated Delivery</p>
                            <p className="font-bold text-gray-900">{getEstimatedDeliveryDate(order.createdAt)}</p>
                        </div>
                        <div className="col-span-2 lg:col-span-1 text-right">
                            <button 
                                onClick={() => window.print()}
                                className="w-full lg:w-auto bg-[#1b5e20] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-xl shadow-green-900/20 hover:bg-[#154618] transition-all flex items-center justify-center gap-2"
                            >
                                <Download size={16} />
                                Download Invoice
                            </button>
                        </div>
                    </div>
                </div>

                {/* Order Details Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-12">
                    <div className="p-8">
                        <h2 className="text-xl font-serif font-bold text-gray-800 mb-8">Order Details</h2>
                        
                        {/* Products List Header */}
                        <div className="flex justify-between items-center pb-4 border-b border-gray-100 text-xs uppercase font-bold tracking-widest text-gray-400 mb-6">
                            <span>Products</span>
                            <span>Sub Total</span>
                        </div>

                        {/* Items */}
                        <div className="space-y-6 mb-8">
                            {order.orderItems.map((item, index) => (
                                <div key={index} className="flex items-center gap-4 group">
                                    <div className="relative h-16 w-16 md:h-20 md:w-20 flex-shrink-0 bg-gray-50 rounded-xl overflow-hidden border border-gray-100 group-hover:border-ayur-green transition-colors">
                                        <img
                                            src={getAssetUrl(item.image)}
                                            alt={item.name}
                                            className="w-full h-full object-cover p-2"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-gray-900 group-hover:text-ayur-green transition-colors">{item.name}</h3>
                                        <p className="text-sm text-gray-500 font-medium">
                                            {item.qty} × {item.pack?.name || 'Standard Pack'}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-gray-900">₹{(item.price * item.qty).toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Breakdown */}
                        <div className="border-t border-gray-100 pt-8 space-y-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500 font-medium">Shipping</span>
                                <span className="text-gray-900 font-bold">₹{order.shippingPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500 font-medium">Taxes</span>
                                <span className="text-gray-900 font-bold">₹{order.taxPrice.toFixed(2)}</span>
                            </div>
                            {order.couponDiscount > 0 && (
                                <div className="flex justify-between text-sm text-green-600">
                                    <span className="font-medium font-serif">Coupon Discount</span>
                                    <span className="font-bold">-₹{order.couponDiscount.toFixed(2)}</span>
                                </div>
                            )}
                            <div className="flex justify-between items-center pt-6 border-t border-gray-100 mt-6">
                                <span className="text-xl font-serif font-bold text-gray-900">Total Amount</span>
                                <span className="text-2xl font-serif font-black text-ayur-green">₹{order.totalPrice.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Trust Badges */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="flex items-start gap-4 p-4 hover:bg-white hover:rounded-2xl hover:shadow-sm transition-all">
                        <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0 text-orange-600">
                            <Truck size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 mb-1">Free Shipping</h4>
                            <p className="text-sm text-gray-500 leading-relaxed font-medium">Free shipping for orders over ₹499</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 hover:bg-white hover:rounded-2xl hover:shadow-sm transition-all">
                        <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0 text-green-600">
                            <CreditCard size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 mb-1">Flexible Payment</h4>
                            <p className="text-sm text-gray-500 leading-relaxed font-medium">Multiple secure payment options</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 hover:bg-white hover:rounded-2xl hover:shadow-sm transition-all">
                        <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600">
                            <Headphones size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 mb-1">24×7 Support</h4>
                            <p className="text-sm text-gray-500 leading-relaxed font-medium">We support online all days</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;
