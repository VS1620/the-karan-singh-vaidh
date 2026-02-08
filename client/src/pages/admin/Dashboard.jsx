import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import {
    TrendingUp, ShoppingBag, ListOrdered, Users, ArrowUpRight,
    Calendar, Loader2, Package, ShieldCheck
} from 'lucide-react';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalOrders: 0,
        pendingOrders: 0,
        totalRevenue: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await api.get('/dashboard/stats');
                setStats(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching stats:', error);
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
            <Loader2 size={40} className="text-ayur-green animate-spin mb-4" />
            <p className="text-gray-400 font-medium">Calibrating analytics...</p>
        </div>
    );

    const cards = [
        {
            label: 'Total Revenue',
            value: `₹${stats.totalRevenue.toLocaleString('en-IN')}`,
            icon: TrendingUp,
            color: 'text-emerald-600',
            bg: 'bg-emerald-50',
            trend: '+12.5%',
            trendUp: true
        },
        {
            label: 'Active Orders',
            value: stats.totalOrders.toString(),
            icon: ListOrdered,
            color: 'text-blue-600',
            bg: 'bg-blue-50',
            trend: '+3 today',
            trendUp: true
        },
        {
            label: 'Pending Focus',
            value: stats.pendingOrders.toString(),
            icon: ShieldCheck,
            color: 'text-orange-600',
            bg: 'bg-orange-50',
            trend: 'Priority',
            trendUp: false
        },
        {
            label: 'Total Essence',
            value: stats.totalProducts.toString(),
            icon: Package,
            color: 'text-ayur-gold',
            bg: 'bg-ayur-gold/10',
            trend: 'In Stock',
            trendUp: true
        }
    ];

    return (
        <div className="space-y-8 pb-20">
            {/* Greeting Header */}
            <div>
                <h2 className="text-3xl font-serif font-bold text-ayur-green italic">Administrative Pulse</h2>
                <p className="text-gray-400 text-sm mt-1 font-medium">Real-time overview of your digital apothecary</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, i) => (
                    <div key={i} className="bg-white p-6 rounded-[2rem] shadow-xl shadow-gray-200/40 border border-gray-100 hover:shadow-2xl transition-all group overflow-hidden relative">
                        <div className="relative z-10">
                            <div className={`w-14 h-14 ${card.bg} ${card.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                <card.icon size={28} />
                            </div>
                            <h3 className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">{card.label}</h3>
                            <p className="text-3xl font-serif font-bold text-gray-900 italic">{card.value}</p>
                            <div className="mt-4 flex items-center gap-2">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${card.trendUp ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
                                    {card.trend}
                                </span>
                                <span className="text-[10px] text-gray-300 font-bold uppercase tracking-widest leading-none">Status</span>
                            </div>
                        </div>
                        <div className={`absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-150 transition-transform duration-1000 ${card.color}`}>
                            <card.icon size={120} />
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity Timeline */}
                <div className="lg:col-span-2 bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/40 border border-gray-100 p-8 md:p-10">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-xl font-serif font-bold text-ayur-green italic">Chronological Pulse</h3>
                            <p className="text-xs text-gray-400 font-medium">Monitoring the latest system events</p>
                        </div>
                        <button className="text-[10px] font-bold text-ayur-gold uppercase tracking-[0.2em] bg-ayur-gold/10 px-4 py-2 rounded-full hover:bg-ayur-gold/20 transition-all">
                            View All Events
                        </button>
                    </div>

                    <div className="space-y-8 relative before:absolute before:inset-y-0 before:left-5 before:w-px before:bg-gray-100 pb-4">
                        {[
                            { title: 'New Order Received', desc: 'Patient Karan Singh Vaidh purchased Asthma Pack A', time: 'Just now', type: 'order' },
                            { title: 'Inventory Depleted', desc: 'Respiratory Tonic stock falling below thresholds', time: '2 hours ago', type: 'warning' },
                            { title: 'Consultation Booked', desc: 'New health vision session scheduled for tomorrow', time: '5 hours ago', type: 'event' },
                            { title: 'System Pulse Verified', desc: 'All healing manifest servers optimal', time: '1 day ago', type: 'system' }
                        ].map((event, i) => (
                            <div key={i} className="relative pl-12 group">
                                <div className={`absolute left-2.5 top-0 w-5 h-5 -ml-px rounded-full border-4 border-white shadow-sm ring-1 group-hover:scale-125 transition-transform ${event.type === 'order' ? 'bg-ayur-green ring-ayur-green/20' :
                                        event.type === 'warning' ? 'bg-red-500 ring-red-100' :
                                            event.type === 'event' ? 'bg-ayur-gold ring-ayur-gold/20' :
                                                'bg-blue-500 ring-blue-100'
                                    }`}></div>
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                    <h4 className="text-sm font-bold text-gray-800">{event.title}</h4>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{event.time}</span>
                                </div>
                                <p className="text-xs text-gray-500 font-medium mt-1 leading-relaxed">{event.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Shortcuts */}
                <div className="space-y-6">
                    <div className="bg-ayur-green rounded-[2.5rem] shadow-xl shadow-ayur-green/20 p-10 text-white relative overflow-hidden group">
                        <div className="relative z-10">
                            <h3 className="text-2xl font-serif font-bold italic leading-tight mb-4">Command<br />Center</h3>
                            <p className="text-white/60 text-xs font-medium mb-8 leading-relaxed">
                                Efficiently navigate through your administration layers and optimize operations.
                            </p>
                            <div className="space-y-3">
                                <button className="w-full bg-white text-ayur-green font-bold text-[10px] uppercase tracking-[0.2em] py-3 rounded-2xl shadow-lg hover:translate-y-[-2px] transition-all">
                                    Generate Report
                                </button>
                                <button className="w-full bg-white/10 text-white font-bold text-[10px] uppercase tracking-[0.2em] py-3 rounded-2xl hover:bg-white/20 transition-all">
                                    Support Portal
                                </button>
                            </div>
                        </div>
                        <div className="absolute top-0 right-0 p-8 opacity-10 blur-sm group-hover:rotate-12 transition-transform duration-1000">
                            <LayoutDashboard size={140} />
                        </div>
                    </div>

                    <div className="bg-[#FAF9F6] rounded-[2.5rem] border border-ayur-beige/30 p-8 flex flex-col justify-between min-h-[200px]">
                        <div>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-3 block">Wellness Insight</span>
                            <p className="font-serif font-bold text-ayur-green text-lg leading-relaxed italic">
                                "The greatest medicine of all is teaching people how not to need it."
                            </p>
                        </div>
                        <div className="flex items-center gap-3 mt-6">
                            <div className="w-8 h-8 bg-ayur-gold rounded-xl flex items-center justify-center text-white shadow-md">
                                <Calendar size={14} />
                            </div>
                            <span className="text-[10px] font-bold text-ayur-gold uppercase tracking-[0.1em]">Daily Vision: {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long' })}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Placeholder icon if not available in imports
const LayoutDashboard = ({ size, className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <rect width="7" height="9" x="3" y="3" rx="1" />
        <rect width="7" height="5" x="14" y="3" rx="1" />
        <rect width="7" height="9" x="14" y="12" rx="1" />
        <rect width="7" height="5" x="3" y="16" rx="1" />
    </svg>
);

export default Dashboard;
