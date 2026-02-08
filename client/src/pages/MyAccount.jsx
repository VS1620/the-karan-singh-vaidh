import React, { useContext, useEffect, useState } from 'react';
import { User, Package, LogOut, ChevronRight, ShieldCheck, Heart, Activity, Calendar, ArrowUpRight, Zap, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';
import { AuthContext } from '../context/AuthContext';

const MyAccount = () => {
    const { userInfo, logout, loading } = useContext(AuthContext);
    const navigate = useNavigate();
    const [greeting, setGreeting] = useState('');
    const [orders, setOrders] = useState([]);
    const [ordersLoading, setOrdersLoading] = useState(true);

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Good Morning');
        else if (hour < 17) setGreeting('Good Afternoon');
        else setGreeting('Good Evening');

        if (!loading && !userInfo) {
            navigate('/login');
        }

        if (userInfo) {
            fetchOrders();
        }
    }, [userInfo, loading, navigate]);

    const fetchOrders = async () => {
        try {
            setOrdersLoading(true);
            const { data } = await api.get('/orders/myorders');
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setOrdersLoading(false);
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center min-h-[60vh] bg-[#FDFCFB]">
            <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-ayur-green"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <Zap size={20} className="text-ayur-gold animate-pulse" />
                </div>
            </div>
        </div>
    );

    if (!userInfo) return null;

    const stats = [
        { label: 'Total Orders', value: orders.length.toString(), icon: Package, color: 'text-blue-500', bg: 'bg-blue-50' },
        { label: 'Wellness Level', value: orders.length > 5 ? 'Master' : orders.length > 2 ? 'Seeker' : 'Starter', icon: Activity, color: 'text-ayur-green', bg: 'bg-ayur-green/10' },
        { label: 'Consultations', value: '0', icon: Heart, color: 'text-red-500', bg: 'bg-red-50' },
        { label: 'Days Journey', value: '1', icon: Calendar, color: 'text-ayur-gold', bg: 'bg-ayur-gold/10' },
    ];

    return (
        <div className="min-h-screen bg-[#FDFCFB] pt-28 pb-20 px-4 md:px-8">
            <div className="container mx-auto max-w-6xl">
                {/* Header Section with Glassmorphism */}
                <div className="relative mb-12 p-8 md:p-12 rounded-[3rem] overflow-hidden bg-white shadow-2xl shadow-gray-200/50 border border-white/20">
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-ayur-beige/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-60 h-60 bg-ayur-green/5 rounded-full blur-3xl"></div>

                    <div className="relative flex flex-col md:flex-row items-center gap-8">
                        <div className="relative group">
                            <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-ayur-green to-ayur-olive rounded-full flex items-center justify-center text-white shadow-xl shadow-ayur-green/20 group-hover:scale-105 transition-transform duration-500">
                                <User size={48} strokeWidth={1} />
                            </div>
                            <div className="absolute bottom-1 right-1 w-8 h-8 bg-ayur-gold rounded-full border-4 border-white flex items-center justify-center text-ayur-green shadow-sm">
                                <Zap size={14} fill="currentColor" />
                            </div>
                        </div>

                        <div className="text-center md:text-left">
                            <h2 className="text-ayur-gold text-xs font-bold uppercase tracking-[0.3em] mb-2">{greeting}, Namaste</h2>
                            <h1 className="text-4xl md:text-5xl font-serif text-ayur-green font-bold mb-3">{userInfo.name}</h1>
                            <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                <span className="flex items-center gap-2 text-sm text-gray-400 bg-gray-50 px-4 py-1.5 rounded-full border border-gray-100 italic">
                                    {userInfo.email}
                                </span>
                                <span className="flex items-center gap-2 text-sm text-ayur-green font-bold bg-ayur-green/5 px-4 py-1.5 rounded-full border border-ayur-green/10">
                                    Member since Jan 2026
                                </span>
                            </div>
                        </div>

                        <div className="md:ml-auto flex gap-3">
                            <button onClick={logout} className="flex items-center gap-2 px-6 py-3 bg-red-50 text-red-500 rounded-2xl font-bold text-sm hover:bg-red-100 transition-colors">
                                <LogOut size={18} /> Logout
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Navigation Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        <nav className="bg-white rounded-[2rem] p-4 shadow-xl shadow-gray-200/40 border border-gray-100 sticky top-32">
                            <div className="space-y-2">
                                <button className="w-full flex items-center justify-between px-5 py-4 bg-ayur-green text-white rounded-2xl font-bold text-sm shadow-lg shadow-ayur-green/30 transition-all active:scale-95">
                                    <div className="flex items-center gap-3">
                                        <User size={20} /> Dashboard
                                    </div>
                                    <ChevronRight size={16} />
                                </button>
                                <button className="w-full flex items-center justify-between px-5 py-4 text-gray-500 hover:bg-gray-50 rounded-2xl font-bold text-sm transition-all group active:scale-95">
                                    <div className="flex items-center gap-3">
                                        <Package size={20} /> My Orders
                                    </div>
                                    <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                </button>
                                <button className="w-full flex items-center justify-between px-5 py-4 text-gray-500 hover:bg-gray-50 rounded-2xl font-bold text-sm transition-all group active:scale-95">
                                    <div className="flex items-center gap-3">
                                        <ShieldCheck size={20} /> Health Profile
                                    </div>
                                    <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                </button>
                                <div className="h-px bg-gray-50 mx-4 my-4"></div>
                                <button className="w-full flex items-center justify-between px-5 py-4 text-ayur-olive hover:bg-ayur-olive/5 rounded-2xl font-bold text-sm transition-all active:scale-95">
                                    <div className="flex items-center gap-3">
                                        <Heart size={20} /> Support
                                    </div>
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </nav>
                    </div>

                    {/* Main Growth Content */}
                    <div className="lg:col-span-3 space-y-8">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {stats.map((stat, i) => (
                                <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                    <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-4`}>
                                        <stat.icon size={24} />
                                    </div>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none mb-1">{stat.label}</p>
                                    <h4 className="text-xl font-bold text-gray-900">{stat.value}</h4>
                                </div>
                            ))}
                        </div>

                        {/* Recent Activity Card */}
                        <section className="bg-white p-8 md:p-10 rounded-[3rem] shadow-xl shadow-gray-200/40 border border-gray-100">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
                                <div>
                                    <h3 className="text-2xl font-serif text-ayur-green font-bold">Health Journey</h3>
                                    <p className="text-sm text-gray-400 font-medium">Your recent wellness activity at a glance</p>
                                </div>
                                <Link to="/shop" className="bg-ayur-beige/20 text-ayur-green px-6 py-2.5 rounded-full text-xs font-bold hover:bg-ayur-beige/40 transition-all flex items-center gap-2">
                                    Browse Solutions <ArrowUpRight size={14} />
                                </Link>
                            </div>

                            <div className="relative p-8 md:p-12 rounded-[2.5rem] bg-gradient-to-br from-[#FAFAFA] to-white border-2 border-dashed border-ayur-beige/30 flex flex-col items-center text-center group">
                                {ordersLoading ? (
                                    <div className="py-10">
                                        <Loader2 size={40} className="animate-spin text-ayur-green mx-auto mb-4" />
                                        <p className="text-gray-400 font-medium">Retrieving your journey...</p>
                                    </div>
                                ) : orders.length > 0 ? (
                                    <div className="w-full space-y-4 text-left">
                                        {orders.map((order) => (
                                            <div key={order._id} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-ayur-green border border-gray-100 overflow-hidden">
                                                        {order.orderItems[0]?.image ? (
                                                            <img src={order.orderItems[0].image} alt="" className="w-full h-full object-cover" />
                                                        ) : (
                                                            <Package size={24} />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <div className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Order #{order._id.substring(order._id.length - 6)}</div>
                                                        <h5 className="font-bold text-gray-800 line-clamp-1">{order.orderItems.map(i => i.name).join(', ')}</h5>
                                                        <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString()} • ₹{order.totalPrice}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-3 md:pt-0">
                                                    <div className="flex flex-col items-end">
                                                        <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${order.status === 'Completed' ? 'bg-green-50 text-green-600' :
                                                            order.status === 'Cancelled' ? 'bg-red-50 text-red-600' :
                                                                'bg-ayur-gold/10 text-ayur-gold'
                                                            }`}>
                                                            {order.status}
                                                        </span>
                                                    </div>
                                                    <ChevronRight size={18} className="text-gray-300" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <>
                                        <div className="absolute inset-0 bg-ayur-green/0 group-hover:bg-ayur-green/[0.01] transition-colors rounded-[2.5rem]" />
                                        <div className="w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center mb-8 relative">
                                            <Package size={40} className="text-ayur-beige/40" />
                                            <div className="absolute -top-4 -right-4 w-12 h-12 bg-ayur-gold/10 rounded-full blur-lg animate-pulse"></div>
                                        </div>
                                        <h4 className="text-2xl font-serif text-gray-800 font-bold mb-3">Begin Your Healing Path</h4>
                                        <p className="text-gray-400 text-sm max-w-sm mx-auto leading-relaxed font-medium mb-10">
                                            You haven't placed any orders yet. Discover our time-tested Ayurvedic formulations to start your transformation.
                                        </p>
                                        <Link
                                            to="/shop"
                                            className="relative group bg-ayur-green text-white px-12 py-4 rounded-2xl font-bold text-sm lg:text-base hover:bg-ayur-olive transition-all shadow-2xl shadow-ayur-green/20"
                                        >
                                            Start Your First Order
                                            <div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </Link>
                                    </>
                                )}
                            </div>
                        </section>

                        {/* Bottom Feature Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-ayur-green p-10 rounded-[3rem] text-white overflow-hidden relative group">
                                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 group-hover:rotate-12 transition-all duration-700">
                                    <ShieldCheck size={180} />
                                </div>
                                <div className="relative z-10">
                                    <div className="bg-ayur-gold/20 p-2 w-fit rounded-lg mb-6">
                                        <Zap size={20} className="text-ayur-gold" fill="currentColor" />
                                    </div>
                                    <h4 className="text-ayur-gold text-xs font-bold uppercase tracking-[0.2em] mb-4 font-mono">Wellness Insight</h4>
                                    <p className="text-2xl font-serif leading-relaxed italic mb-8">
                                        "Nature does not hurry, yet everything is accomplished. Healing takes time and dedication."
                                    </p>
                                    <div className="flex items-center gap-3 text-sm font-bold opacity-80 decoration-ayur-gold decoration-2 underline-offset-4 cursor-help">
                                        Read More Wisdom
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[#FAF9F6] p-10 rounded-[3rem] border border-ayur-beige/30 flex flex-col justify-between">
                                <div>
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Dedicated Support</h4>
                                    <h3 className="text-2xl font-serif text-ayur-green font-bold mb-2 leading-tight">Expert Consultation</h3>
                                    <p className="text-gray-500 font-medium mb-8">Have a specific health concern? Our Ayurvedic specialists are here to guide you.</p>
                                </div>
                                <Link
                                    to="/consult"
                                    className="w-fit flex items-center gap-3 text-ayur-green font-bold text-sm bg-white px-8 py-3 rounded-2xl shadow-sm border border-ayur-beige/20 hover:shadow-md hover:border-ayur-gold/30 transition-all"
                                >
                                    Book a Free Consultation <ChevronRight size={16} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyAccount;
