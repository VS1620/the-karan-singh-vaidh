import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { ArrowRight, Lock, Loader2, CreditCard, Banknote } from 'lucide-react';

const CheckoutPage = () => {
    const { cartItems, getCartTotal, clearCart } = useContext(CartContext);
    const { userInfo, authLoading } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('COD'); // 'COD' or 'RAZORPAY'

    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        country: 'India',
    });

    useEffect(() => {
        if (!authLoading && !userInfo) {
            navigate('/login?redirect=checkout');
        } else if (userInfo) {
            setForm(prev => ({
                ...prev,
                name: userInfo.name || '',
                email: userInfo.email || '',
            }));
        }
    }, [userInfo, authLoading, navigate]);

    // Load Razorpay Script
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const total = getCartTotal();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRazorpayPayment = async (orderData) => {
        try {
            // 1. Create Razorpay Order on server
            const { data: razorpayOrder } = await api.post('/payment/order', {
                amount: total
            });

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_live_SDApTPGDY3ioLj',
                amount: razorpayOrder.amount,
                currency: razorpayOrder.currency,
                name: 'The Karan Singh Vaidh',
                description: 'Payment for your order',
                order_id: razorpayOrder.id,
                handler: async function (response) {
                    try {
                        // 2. Verify Payment on server
                        const { data: verifyData } = await api.post('/payment/verify', {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        });

                        if (verifyData.success) {
                            // 3. Place Order with isPaid: true
                            await api.post('/orders', {
                                ...orderData,
                                paymentMethod: 'Online Payment (Razorpay)',
                                isPaid: true,
                                paidAt: new Date(),
                                paymentResult: {
                                    id: response.razorpay_payment_id,
                                    status: 'success',
                                    update_time: new Date().toISOString(),
                                    email_address: form.email
                                }
                            });

                            clearCart();
                            alert('Order Placed and Paid Successfully!');
                            navigate('/my-account');
                        }
                    } catch (err) {
                        console.error('Verification Error:', err);
                        alert('Payment verification failed. Please contact support.');
                    }
                },
                prefill: {
                    name: form.name,
                    email: form.email,
                    contact: form.phone
                },
                theme: {
                    color: '#065f46' // emerald-800
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error('Razorpay Error:', error);
            const errorMessage = error.response?.data?.message || error.message || 'Error initiating Razorpay payment. Please try again.';
            alert(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const placeOrderHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        const orderData = {
            orderItems: cartItems.map(item => ({
                product: item.product,
                name: item.name,
                image: item.image,
                price: item.price,
                qty: item.qty,
                pack: {
                    name: item.pack?.name || 'Standard Pack',
                    medicines: item.pack?.medicines || [],
                }
            })),
            shippingAddress: {
                address: form.address,
                city: form.city,
                postalCode: form.postalCode,
                country: form.country,
                phone: form.phone,
                email: form.email,
                name: form.name
            },
            paymentMethod: paymentMethod === 'COD' ? 'COD' : 'Online Payment (Razorpay)',
            itemsPrice: total,
            taxPrice: 0,
            shippingPrice: 0,
            totalPrice: total,
        };

        if (paymentMethod === 'RAZORPAY') {
            await handleRazorpayPayment(orderData);
        } else {
            try {
                await api.post('/orders', orderData);
                clearCart();
                alert('Order Placed Successfully!');
                navigate('/my-account');
            } catch (error) {
                console.error(error);
                alert('Error placing order. Please try again.');
                setLoading(false);
            }
        }
    };

    if (cartItems.length === 0) {
        navigate('/cart');
        return null;
    }

    return (
        <div className="bg-gray-50 min-h-screen py-10">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 font-serif">Checkout</h1>

                <div className="flex flex-col md:flex-row gap-8">

                    {/* Address Form */}
                    <div className="flex-1 bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Shipping Details</h2>
                        <form id="checkout-form" onSubmit={placeOrderHandler} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                    <input required type="text" name="name" value={form.name} onChange={handleChange} className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-emerald-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                                    <input required type="tel" name="phone" value={form.phone} onChange={handleChange} className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-emerald-500" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                <input required type="email" name="email" value={form.email} onChange={handleChange} className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-emerald-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Full Address (House No, Street, Area)</label>
                                <textarea required name="address" rows="2" value={form.address} onChange={handleChange} className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-emerald-500"></textarea>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">City</label>
                                    <input required type="text" name="city" value={form.city} onChange={handleChange} className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-emerald-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Pincode</label>
                                    <input required type="text" name="postalCode" value={form.postalCode} onChange={handleChange} className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-emerald-500" />
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="md:w-80">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
                            <h3 className="font-bold text-gray-800 mb-4 text-lg">Your Order</h3>

                            <div className="space-y-3 mb-6 max-h-64 overflow-y-auto pr-2">
                                {cartItems.map((item, i) => (
                                    <div key={i} className="flex gap-3 text-sm">
                                        <div className="relative w-12 h-12 flex-shrink-0">
                                            <img src={item.image} alt="" className="w-full h-full object-cover rounded" />
                                            <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">{item.qty}</span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-medium text-gray-800 line-clamp-1">{item.name}</div>
                                            <div className="text-gray-500 text-xs">{item.pack?.name || 'Standard Pack'}</div>
                                        </div>
                                        <div className="font-medium text-gray-900">₹{item.price * item.qty}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gray-100 pt-4 mb-6 text-sm space-y-2">
                                <div className="flex justify-between font-bold text-lg text-gray-900 border-t pt-2 mt-2">
                                    <span>Total Amount</span>
                                    <span>₹{total}</span>
                                </div>
                            </div>

                            {/* Payment Method Selection */}
                            <div className="mb-6">
                                <h4 className="font-bold text-gray-800 text-sm mb-3">Select Payment Method</h4>
                                <div className="space-y-2">
                                    <label
                                        className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition ${paymentMethod === 'RAZORPAY' ? 'bg-emerald-50 border-emerald-500 ring-1 ring-emerald-500' : 'bg-gray-50 border-gray-200'}`}
                                        onClick={() => setPaymentMethod('RAZORPAY')}
                                    >
                                        <input type="radio" name="payment" checked={paymentMethod === 'RAZORPAY'} readOnly className="hidden" />
                                        <CreditCard size={18} className={paymentMethod === 'RAZORPAY' ? 'text-emerald-600' : 'text-gray-400'} />
                                        <div>
                                            <p className={`text-sm font-bold ${paymentMethod === 'RAZORPAY' ? 'text-emerald-900' : 'text-gray-700'}`}>Online Payment</p>
                                            <p className="text-[10px] text-gray-500">Pay via Razorpay / Cards / UPI</p>
                                        </div>
                                    </label>

                                    <label
                                        className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition ${paymentMethod === 'COD' ? 'bg-emerald-50 border-emerald-500 ring-1 ring-emerald-500' : 'bg-gray-50 border-gray-200'}`}
                                        onClick={() => setPaymentMethod('COD')}
                                    >
                                        <input type="radio" name="payment" checked={paymentMethod === 'COD'} readOnly className="hidden" />
                                        <Banknote size={18} className={paymentMethod === 'COD' ? 'text-emerald-600' : 'text-gray-400'} />
                                        <div>
                                            <p className={`text-sm font-bold ${paymentMethod === 'COD' ? 'text-emerald-900' : 'text-gray-700'}`}>Cash on Delivery</p>
                                            <p className="text-[10px] text-gray-500">Pay when you receive</p>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <button
                                type="submit"
                                form="checkout-form"
                                disabled={loading || authLoading}
                                className={`w-full bg-emerald-800 text-white py-4 rounded-lg font-bold hover:bg-emerald-900 transition flex items-center justify-center gap-2 ${loading || authLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 size={20} className="animate-spin" /> Processing...
                                    </>
                                ) : (paymentMethod === 'COD' ? 'Place Order' : 'Pay & Place Order')} <Lock size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
