import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import {
    Eye, Trash2, CheckCircle, Clock, Truck, XCircle, Search,
    Filter, Download, MapPin, Phone, Mail, Package, User as UserIcon,
    ArrowRight, X, Loader2, AlertCircle, ListOrdered, MessageSquare
} from 'lucide-react';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [activeStatusTab, setActiveStatusTab] = useState('All');
    const [actionLoading, setActionLoading] = useState(false);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const { data } = await api.get('/orders');
            setOrders(Array.isArray(data) ? data : []);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            setActionLoading(true);
            await api.put(`/orders/${id}/status`, { status: newStatus });
            setOrders(orders.map(o => o._id === id ? { ...o, status: newStatus } : o));
            if (selectedOrder?._id === id) {
                setSelectedOrder({ ...selectedOrder, status: newStatus });
            }
            setActionLoading(false);
        } catch (err) {
            alert('Failed to update status');
            setActionLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this order? This action cannot be undone.')) return;

        try {
            setActionLoading(true);
            await api.delete(`/orders/${id}`);
            setOrders(orders.filter(o => o._id !== id));
            if (selectedOrder?._id === id) setShowModal(false);
            setActionLoading(false);
        } catch (err) {
            alert('Failed to delete order');
            setActionLoading(false);
        }
    };

    const viewOrderDetails = (order) => {
        setSelectedOrder(order);
        setShowModal(true);
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Completed': return 'bg-green-50 text-green-600 border-green-100';
            case 'Processing': return 'bg-blue-50 text-blue-600 border-blue-100';
            case 'Pending': return 'bg-orange-50 text-orange-600 border-orange-100';
            case 'Cancelled': return 'bg-red-50 text-red-600 border-red-100';
            default: return 'bg-gray-50 text-gray-600 border-gray-100';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'All': return <ListOrdered size={14} />;
            case 'Completed': return <CheckCircle size={14} />;
            case 'Processing': return <Truck size={14} />;
            case 'Pending': return <Clock size={14} />;
            case 'Cancelled': return <XCircle size={14} />;
            default: return null;
        }
    };

    const filteredOrders = Array.isArray(orders) ? orders.filter(order => {
        if (!order) return false;

        const orderId = (order._id || '').toLowerCase();
        const shippingName = (order.shippingAddress?.name || '').toLowerCase();
        const shippingPhone = (order.shippingAddress?.phone || '');
        const search = searchTerm.toLowerCase();

        const matchesSearch =
            orderId.includes(search) ||
            shippingName.includes(search) ||
            shippingPhone.includes(searchTerm);

        const matchesStatus = activeStatusTab === 'All' || order.status === activeStatusTab;

        return matchesSearch && matchesStatus;
    }) : [];

    // Calculate counts for each status
    const statusCounts = {
        All: orders.length,
        Pending: orders.filter(o => o.status === 'Pending').length,
        Processing: orders.filter(o => o.status === 'Processing').length,
        Completed: orders.filter(o => o.status === 'Completed').length,
        Cancelled: orders.filter(o => o.status === 'Cancelled').length,
    };

    return (
        <div className="space-y-8 pb-20">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-serif font-bold text-ayur-green italic">Inventory Commands</h2>
                    <p className="text-gray-400 text-sm mt-1 font-medium">Coordinate logistics and track transformations</p>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={fetchOrders} className="bg-white p-2.5 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors shadow-sm">
                        <Download size={20} className="text-gray-500" />
                    </button>
                    <div className="h-10 w-px bg-gray-200 mx-1"></div>
                    <button className="bg-ayur-green text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-xl shadow-ayur-green/20 hover:bg-ayur-olive transition-all">
                        Bulk Export
                    </button>
                </div>
            </div>

            {/* Status Tabs */}
            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-2">
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                    {['All', 'Pending', 'Processing', 'Completed', 'Cancelled'].map((status) => {
                        const isActive = activeStatusTab === status;
                        const count = statusCounts[status] || 0;

                        return (
                            <button
                                key={status}
                                onClick={() => setActiveStatusTab(status)}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${isActive
                                    ? 'bg-ayur-green text-white shadow-lg shadow-ayur-green/20'
                                    : 'text-gray-500 hover:bg-gray-50'
                                    }`}
                            >
                                {getStatusIcon(status)}
                                <span>{status}</span>
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${isActive
                                    ? 'bg-white/20 text-white'
                                    : 'bg-gray-100 text-gray-600'
                                    }`}>
                                    {count}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Filters and Search */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                <div className="lg:col-span-8 bg-white p-2 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="flex-1 relative group">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-ayur-green transition-colors" />
                        <input
                            type="text"
                            placeholder="Search by ID, name or phone number..."
                            className="w-full bg-transparent border-none focus:ring-0 text-sm py-3 pl-12 pr-4 font-medium"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="h-8 w-px bg-gray-100"></div>
                    <div className="flex items-center gap-2 px-4 whitespace-nowrap">
                        <Filter size={16} className="text-gray-400" />
                        <select
                            className="border-none focus:ring-0 text-sm font-bold text-gray-500 bg-transparent py-0 pr-8"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="All">All Status</option>
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>
                </div>
                <div className="lg:col-span-4 flex items-center gap-2 justify-end">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{filteredOrders.length} Results</span>
                </div>
            </div>

            {/* Orders Table */}
            {loading ? (
                <div className="min-h-[400px] flex flex-col items-center justify-center bg-white rounded-[2rem] border border-gray-100 shadow-sm">
                    <Loader2 size={40} className="text-ayur-green animate-spin mb-4" />
                    <p className="text-gray-400 font-medium">Synchronizing pulse...</p>
                </div>
            ) : error ? (
                <div className="p-8 bg-red-50 rounded-[2rem] border border-red-100 text-center">
                    <AlertCircle size={40} className="text-red-500 mx-auto mb-4" />
                    <h3 className="text-red-800 font-bold mb-1">Failed to connect</h3>
                    <p className="text-red-600 text-sm font-medium">{error}</p>
                    <button onClick={fetchOrders} className="mt-4 bg-white px-6 py-2 rounded-xl border border-red-200 text-red-600 font-bold text-xs hover:bg-red-50">Retry Connection</button>
                </div>
            ) : filteredOrders.length === 0 ? (
                <div className="min-h-[400px] flex flex-col items-center justify-center bg-white rounded-[2rem] border border-gray-100 shadow-sm text-center px-4">
                    <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center text-gray-300 mb-6">
                        <Package size={40} />
                    </div>
                    <h3 className="text-gray-900 font-bold text-lg">No orders matched your search</h3>
                    <p className="text-gray-400 text-sm mt-1 max-w-xs font-medium">Adjust your parameters or clear filters to see more results.</p>
                </div>
            ) : (
                <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/40 border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#FAF9F6] border-b border-gray-100 text-gray-400 text-[10px] uppercase font-bold tracking-[0.2em]">
                                    <th className="px-8 py-5">Pulse ID</th>
                                    <th className="px-6 py-5">User Manifest</th>
                                    <th className="px-6 py-5 text-center">Date Manifest</th>
                                    <th className="px-6 py-5 text-right">Magnitude</th>
                                    <th className="px-6 py-5 text-center">Manifest Status</th>
                                    <th className="px-8 py-5 text-right">Management</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filteredOrders.map((order) => (
                                    <tr
                                        key={order._id}
                                        onClick={() => viewOrderDetails(order)}
                                        className="hover:bg-gray-50/50 transition-all cursor-pointer group"
                                    >
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-mono font-bold text-gray-400">#{order._id?.substring(order._id.length - 8) || 'N/A'}</span>
                                                <span className="text-[10px] font-bold text-ayur-gold tracking-widest uppercase mt-1">Manual Entry</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-ayur-beige/20 rounded-xl flex items-center justify-center text-ayur-green font-bold text-xs">
                                                    {(order.user?.name || order.shippingAddress?.name || 'G')?.charAt(0)}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-gray-800">{order.user?.name || order.shippingAddress?.name || 'Guest'}</span>
                                                    <span className="text-[11px] text-gray-400 font-medium">{order.shippingAddress?.phone || 'No Phone'}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6 text-center">
                                            <span className="text-xs font-bold text-gray-500">{order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-GB') : '-'}</span>
                                        </td>
                                        <td className="px-6 py-6 text-right">
                                            <span className="text-sm font-bold text-ayur-green font-serif italic">₹{(order.totalPrice || 0).toLocaleString()}</span>
                                        </td>
                                        <td className="px-6 py-6 text-center">
                                            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-widest shadow-sm ${getStatusStyle(order.status)}`}>
                                                {getStatusIcon(order.status)}
                                                {order.status}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-2 transition-opacity">
                                                <button
                                                    className="p-2.5 bg-gray-50 text-gray-400 hover:text-ayur-green rounded-xl border border-gray-100 shadow-sm transition-all active:scale-95"
                                                    onClick={(e) => { e.stopPropagation(); viewOrderDetails(order); }}
                                                    title="View Details"
                                                >
                                                    <Eye size={18} />
                                                </button>
                                                <button
                                                    className="p-2.5 bg-gray-50 text-gray-400 hover:text-red-500 rounded-xl border border-gray-100 shadow-sm transition-all active:scale-95"
                                                    onClick={(e) => { e.stopPropagation(); handleDelete(order._id); }}
                                                    title="Delete Manifest"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Order Details Modal with Slide-over effect */}
            {showModal && selectedOrder && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
                    <div
                        className="w-full h-full sm:h-[90vh] sm:max-h-[900px] sm:max-w-2xl bg-[#FDFCFB] sm:rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col border border-white/20 animate-in slide-in-from-right duration-500"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="bg-ayur-green p-8 text-white relative">
                            <div className="absolute top-0 right-0 p-8 opacity-10 blur-sm pointer-events-none">
                                <ListOrdered size={160} />
                            </div>
                            <div className="flex flex-col gap-1 relative z-10">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60">Pulse Manifest Details</span>
                                    <button onClick={() => setShowModal(false)} className="bg-white/10 p-2 rounded-xl hover:bg-white/20 transition-colors">
                                        <X size={20} />
                                    </button>
                                </div>
                                <h3 className="text-3xl font-serif font-bold italic mt-2">Order Manifest #{selectedOrder._id?.substring(selectedOrder._id.length - 8) || 'N/A'}</h3>
                                <div className="flex items-center gap-4 mt-1">
                                    <span className="text-xs font-medium text-white/80">{selectedOrder.createdAt ? new Date(selectedOrder.createdAt).toLocaleString('en-GB') : '-'}</span>
                                    <div className="w-1 h-1 bg-white/30 rounded-full"></div>
                                    <span className="text-xs font-bold text-ayur-gold uppercase tracking-widest">{selectedOrder.paymentMethod || 'COD'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Modal Content - Scrollable Area */}
                        <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-8">
                            {/* Actions Bar */}
                            <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Current Pulse</span>
                                    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-widest ${getStatusStyle(selectedOrder.status)}`}>
                                        {getStatusIcon(selectedOrder.status)}
                                        {selectedOrder.status}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {['Processing', 'Completed', 'Cancelled'].map(status => (
                                        status !== selectedOrder.status && (
                                            <button
                                                key={status}
                                                disabled={actionLoading}
                                                onClick={() => handleStatusUpdate(selectedOrder._id, status)}
                                                className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all active:scale-95 ${status === 'Cancelled' ? 'text-red-500 border-red-100 hover:bg-red-50' :
                                                    status === 'Completed' ? 'text-green-600 border-green-100 hover:bg-green-50' :
                                                        'text-blue-600 border-blue-100 hover:bg-blue-50'
                                                    } ${actionLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            >
                                                Mark as {status}
                                            </button>
                                        )
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* User Manifest Information */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 border-b border-gray-100 pb-2">
                                        <UserIcon size={18} className="text-ayur-green" />
                                        <h4 className="font-serif font-bold text-gray-900 italic">User Identification</h4>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-gray-50 flex items-center justify-center text-ayur-green flex-shrink-0">
                                                <UserIcon size={24} />
                                            </div>
                                            <div>
                                                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Full Entity Name</div>
                                                <div className="text-sm font-bold text-gray-800">{selectedOrder.shippingAddress?.name || 'Guest'}</div>
                                                {selectedOrder.user && <div className="text-[9px] font-bold text-ayur-green uppercase tracking-tighter mt-1 bg-ayur-green/5 px-1.5 py-0.5 rounded-md inline-block">Registered Member</div>}
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-gray-50 flex items-center justify-center text-ayur-gold flex-shrink-0">
                                                <Phone size={24} />
                                            </div>
                                            <div>
                                                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Communications</div>
                                                <div className="text-sm font-bold text-gray-800">{selectedOrder.shippingAddress?.phone || 'N/A'}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-gray-50 flex items-center justify-center text-blue-500 flex-shrink-0">
                                                <Mail size={24} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Electronic Mail</div>
                                                <div className="text-sm font-bold text-gray-800 break-all">{selectedOrder.shippingAddress?.email || 'N/A'}</div>
                                            </div>
                                        </div>

                                        {/* Messaging Actions */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                            <a
                                                href={`https://wa.me/${selectedOrder.shippingAddress?.phone?.replace(/\s+/g, '')}?text=Hello ${selectedOrder.shippingAddress?.name}, this is regarding your order #${selectedOrder._id?.substring(selectedOrder._id.length - 8)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center gap-2 px-4 py-3 bg-emerald-500 text-white rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
                                            >
                                                <MessageSquare size={16} /> WhatsApp
                                            </a>
                                            <a
                                                href={`mailto:${selectedOrder.shippingAddress?.email}?subject=Regarding Order %23${selectedOrder._id?.substring(selectedOrder._id.length - 8)}&body=Hello ${selectedOrder.shippingAddress?.name},`}
                                                className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
                                            >
                                                <Mail size={16} /> Email Buyer
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* Logistic Nexus (Address) */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 border-b border-gray-100 pb-2">
                                        <MapPin size={18} className="text-ayur-olive" />
                                        <h4 className="font-serif font-bold text-gray-900 italic">Logistic Nexus</h4>
                                    </div>
                                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:scale-110 transition-transform duration-700 pointer-events-none">
                                            <MapPin size={80} />
                                        </div>
                                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-3">Delivery Destination</div>
                                        <p className="text-sm leading-relaxed text-gray-700 font-medium">
                                            {selectedOrder.shippingAddress?.address || 'No Address'}<br />
                                            {selectedOrder.shippingAddress?.city || ''}, {selectedOrder.shippingAddress?.postalCode || ''}<br />
                                            {selectedOrder.shippingAddress?.country || ''}
                                        </p>
                                        <div className="mt-6 flex items-center gap-2 text-[10px] font-bold text-ayur-green uppercase tracking-[0.2em] decoration-ayur-gold decoration-2 underline underline-offset-4 cursor-pointer">
                                            View on Geolocation manifest <ArrowRight size={12} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Manifest Payload (Products) */}
                            <div className="space-y-6 pt-4">
                                <div className="flex items-center gap-3 border-b border-gray-100 pb-2">
                                    <Package size={18} className="text-ayur-gold" />
                                    <h4 className="font-serif font-bold text-gray-900 italic">Manifest Payload</h4>
                                    <span className="ml-auto text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">{(selectedOrder.orderItems || []).length} Entities</span>
                                </div>
                                <div className="space-y-3">
                                    {(selectedOrder.orderItems || []).map((item, i) => (
                                        <div key={i} className="flex gap-4 p-4 bg-white rounded-3xl border border-gray-50 group hover:shadow-md transition-shadow">
                                            <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center overflow-hidden border border-gray-100">
                                                <img src={item.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                            </div>
                                            <div className="flex-1 flex flex-col justify-center">
                                                <div className="text-[10px] font-bold text-ayur-gold uppercase tracking-[0.2em] mb-1">{item.pack?.name || 'Standard'}</div>
                                                <h5 className="font-bold text-gray-800 leading-tight mb-1">{item.name}</h5>
                                                <div className="flex items-center gap-4">
                                                    <span className="text-xs text-gray-400 font-bold tracking-widest">UNIT: ₹{item.price}</span>
                                                    <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
                                                    <span className="text-xs font-bold text-ayur-green uppercase tracking-widest">QTY: {item.qty}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center pr-4">
                                                <span className="text-lg font-serif font-bold text-gray-900 italic">₹{item.price * item.qty}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Magnitude Finalization */}
                            <div className="bg-ayur-green p-6 md:p-8 rounded-[2.5rem] md:rounded-[3rem] text-white relative flex flex-col items-center justify-center text-center overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
                                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 mb-3">Manifest Magnitude Finalization</span>
                                <div className="flex flex-col sm:flex-row items-center gap-2">
                                    <span className="text-4xl md:text-5xl font-serif font-bold italic tracking-tighter">₹{(selectedOrder.totalPrice || 0).toLocaleString()}</span>
                                    <div className="flex flex-row sm:flex-col items-center sm:items-start leading-none opacity-60 gap-2 sm:gap-0">
                                        <span className="text-[10px] uppercase font-bold tracking-widest border-b border-white/20 pb-0.5 sm:pb-1 mb-0 sm:mb-1">INR</span>
                                        <span className="text-[10px] uppercase font-bold tracking-widest">Total</span>
                                    </div>
                                </div>
                                <div className="mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-2 opacity-60 text-[10px] uppercase font-bold tracking-widest">
                                    <div className="sm:text-right">Base Essence: <span className="font-mono ml-2">₹{selectedOrder.itemsPrice || 0}</span></div>
                                    <div className="sm:text-left">Logistic Pulse: <span className="font-mono ml-2">₹{selectedOrder.shippingPrice || 0}</span></div>
                                </div>
                            </div>

                            {/* Modal Footer Actions */}
                            <div className="p-6 bg-white border-t border-gray-100 flex items-center justify-between gap-4 sticky bottom-0 z-20">
                                <button
                                    onClick={() => handleDelete(selectedOrder._id)}
                                    className="flex items-center gap-2 px-6 py-3 text-red-500 font-bold text-sm rounded-2xl hover:bg-red-50 transition-colors"
                                >
                                    <Trash2 size={18} /> Delete Manifest
                                </button>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="bg-ayur-green text-white px-10 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-ayur-green/20 hover:bg-ayur-olive transition-all"
                                >
                                    Close Manifest
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Orders;
