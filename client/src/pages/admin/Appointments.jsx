import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import {
    Eye, Trash2, CheckCircle, Clock, XCircle, Search,
    Filter, Download, Phone, Mail, User as UserIcon,
    AlertCircle, Calendar, MessageSquare, Loader2, X, Send
} from 'lucide-react';

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeStatusTab, setActiveStatusTab] = useState('All');
    const [actionLoading, setActionLoading] = useState(false);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            setLoading(true);
            const { data } = await api.get('/appointments');
            setAppointments(Array.isArray(data) ? data : []);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            setActionLoading(true);
            await api.put(`/appointments/${id}`, { status: newStatus });
            setAppointments(appointments.map(a => a._id === id ? { ...a, status: newStatus } : a));
            if (selectedAppointment?._id === id) {
                setSelectedAppointment({ ...selectedAppointment, status: newStatus });
            }
            setActionLoading(false);
        } catch (err) {
            alert('Failed to update status');
            setActionLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this appointment?')) return;

        try {
            setActionLoading(true);
            await api.delete(`/appointments/${id}`);
            setAppointments(appointments.filter(a => a._id !== id));
            if (selectedAppointment?._id === id) setShowModal(false);
            setActionLoading(false);
        } catch (err) {
            alert('Failed to delete appointment');
            setActionLoading(false);
        }
    };

    const viewDetails = (appointment) => {
        setSelectedAppointment(appointment);
        setShowModal(true);
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Confirmed': return 'bg-green-50 text-green-600 border-green-100';
            case 'Pending': return 'bg-orange-50 text-orange-600 border-orange-100';
            case 'Completed': return 'bg-blue-50 text-blue-600 border-blue-100';
            case 'Cancelled': return 'bg-red-50 text-red-600 border-red-100';
            default: return 'bg-gray-50 text-gray-600 border-gray-100';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Confirmed': return <CheckCircle size={14} />;
            case 'Pending': return <Clock size={14} />;
            case 'Completed': return <Calendar size={14} />;
            case 'Cancelled': return <XCircle size={14} />;
            default: return null;
        }
    };

    const filteredAppointments = appointments.filter(a => {
        const search = searchTerm.toLowerCase();
        const matchesSearch =
            (a.name || '').toLowerCase().includes(search) ||
            (a.phone || '').includes(searchTerm) ||
            (a.concern || '').toLowerCase().includes(search);

        const matchesStatus = activeStatusTab === 'All' || a.status === activeStatusTab;
        return matchesSearch && matchesStatus;
    });

    const statusCounts = {
        All: appointments.length,
        Pending: appointments.filter(a => a.status === 'Pending').length,
        Confirmed: appointments.filter(a => a.status === 'Confirmed').length,
        Completed: appointments.filter(a => a.status === 'Completed').length,
        Cancelled: appointments.filter(a => a.status === 'Cancelled').length,
    };

    return (
        <div className="space-y-8 pb-20">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-serif font-bold text-ayur-green italic">Expert Consultations</h2>
                    <p className="text-gray-400 text-sm mt-1 font-medium">Manage health inquiries and medical appointments</p>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={fetchAppointments} className="bg-white p-2.5 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors shadow-sm">
                        <Download size={20} className="text-gray-500" />
                    </button>
                    <div className="h-10 w-px bg-gray-200 mx-1"></div>
                    <button className="bg-ayur-green text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-xl shadow-ayur-green/20 hover:bg-ayur-olive transition-all">
                        Export Consultations
                    </button>
                </div>
            </div>

            {/* Status Tabs */}
            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-2 overflow-hidden">
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar p-1">
                    {['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'].map((status) => {
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
            <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="flex-1 relative group">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-ayur-green transition-colors" />
                    <input
                        type="text"
                        placeholder="Search by patient name, phone or concern..."
                        className="w-full bg-transparent border-none focus:ring-0 text-sm py-3 pl-12 pr-4 font-medium"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2 px-4 text-xs font-bold text-gray-400 uppercase tracking-widest border-l border-gray-100">
                    {filteredAppointments.length} Bookings
                </div>
            </div>

            {/* Table */}
            {loading ? (
                <div className="min-h-[400px] flex flex-col items-center justify-center bg-white rounded-[2rem] border border-gray-100 shadow-sm">
                    <Loader2 size={40} className="text-ayur-green animate-spin mb-4" />
                    <p className="text-gray-400 font-medium">Reading pulse manifests...</p>
                </div>
            ) : error ? (
                <div className="p-8 bg-red-50 rounded-[2rem] border border-red-100 text-center">
                    <AlertCircle size={40} className="text-red-500 mx-auto mb-4" />
                    <h3 className="text-red-800 font-bold mb-1">Manifest sync failed</h3>
                    <p className="text-red-600 text-sm font-medium">{error}</p>
                    <button onClick={fetchAppointments} className="mt-4 bg-white px-6 py-2 rounded-xl border border-red-200 text-red-600 font-bold text-xs hover:bg-red-50">Reconnect</button>
                </div>
            ) : filteredAppointments.length === 0 ? (
                <div className="min-h-[400px] flex flex-col items-center justify-center bg-white rounded-[2rem] border border-gray-100 shadow-sm text-center px-4">
                    <Calendar size={40} className="text-gray-200 mb-6" />
                    <h3 className="text-gray-900 font-bold text-lg">No consultation manifests found</h3>
                    <p className="text-gray-400 text-sm mt-1 max-w-xs font-medium">Adjust your search parameters.</p>
                </div>
            ) : (
                <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/40 border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#FAF9F6] border-b border-gray-100 text-gray-400 text-[10px] uppercase font-bold tracking-[0.2em]">
                                    <th className="px-8 py-5">Patient Manifest</th>
                                    <th className="px-6 py-5">Concern Essence</th>
                                    <th className="px-6 py-5 text-center">Schedule</th>
                                    <th className="px-6 py-5 text-center">Status</th>
                                    <th className="px-8 py-5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filteredAppointments.map((app) => (
                                    <tr
                                        key={app._id}
                                        className="hover:bg-gray-50/50 transition-all cursor-pointer group"
                                        onClick={() => viewDetails(app)}
                                    >
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-ayur-beige/20 rounded-xl flex items-center justify-center text-ayur-green font-bold text-xs">
                                                    {app.name?.charAt(0)}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-gray-800">{app.name}</span>
                                                    <span className="text-[11px] text-gray-400 font-medium">{app.phone}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <p className="text-xs text-gray-500 font-medium line-clamp-1 max-w-xs">{app.concern}</p>
                                        </td>
                                        <td className="px-6 py-6 text-center">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-gray-700">{app.preferredDate ? new Date(app.preferredDate).toLocaleDateString() : 'ASAP'}</span>
                                                <span className="text-[10px] text-gray-400 font-medium">{app.preferredTime}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6 text-center">
                                            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-widest shadow-sm ${getStatusStyle(app.status)}`}>
                                                {getStatusIcon(app.status)}
                                                {app.status}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); viewDetails(app); }}
                                                    className="p-2.5 bg-gray-50 text-gray-400 hover:text-ayur-green rounded-xl border border-gray-100 shadow-sm transition-all"
                                                >
                                                    <Eye size={18} />
                                                </button>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); handleDelete(app._id); }}
                                                    className="p-2.5 bg-gray-50 text-gray-400 hover:text-red-500 rounded-xl border border-gray-100 shadow-sm transition-all"
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

            {/* Details Modal */}
            {showModal && selectedAppointment && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col animate-in slide-in-from-bottom-5 duration-500">
                        {/* Header */}
                        <div className="bg-ayur-green p-8 text-white relative">
                            <h3 className="text-2xl font-serif font-bold italic">Consultation Manifest</h3>
                            <button onClick={() => setShowModal(false)} className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-8 space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">Patient Name</span>
                                    <p className="font-bold text-gray-800 flex items-center gap-2"><UserIcon size={14} className="text-ayur-gold" /> {selectedAppointment.name}</p>
                                </div>
                                <div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">Phone Connection</span>
                                    <p className="font-bold text-gray-800 flex items-center gap-2"><Phone size={14} className="text-ayur-gold" /> {selectedAppointment.phone}</p>
                                </div>
                                <div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">Preferred Date</span>
                                    <p className="font-bold text-gray-800">{selectedAppointment.preferredDate ? new Date(selectedAppointment.preferredDate).toLocaleDateString() : 'ASAP'}</p>
                                </div>
                                <div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">Communication Time</span>
                                    <p className="font-bold text-gray-800">{selectedAppointment.preferredTime}</p>
                                </div>
                            </div>

                            <div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-1">Manifest Essence (Concern)</span>
                                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-sm text-gray-600 leading-relaxed font-medium">
                                    {selectedAppointment.concern}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-wrap gap-2 pt-4">
                                {['Confirmed', 'Completed', 'Cancelled'].map(status => (
                                    status !== selectedAppointment.status && (
                                        <button
                                            key={status}
                                            onClick={() => handleStatusUpdate(selectedAppointment._id, status)}
                                            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${status === 'Confirmed' ? 'text-green-600 border-green-100 hover:bg-green-50' :
                                                    status === 'Completed' ? 'text-blue-600 border-blue-100 hover:bg-blue-50' :
                                                        'text-red-500 border-red-100 hover:bg-red-50'
                                                }`}
                                        >
                                            Mark as {status}
                                        </button>
                                    )
                                ))}
                            </div>

                            <div className="pt-4 flex gap-4">
                                <a
                                    href={`https://wa.me/${selectedAppointment.phone.replace(/\D/g, '')}`}
                                    className="flex-1 bg-emerald-500 text-white py-3 rounded-2xl font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 hover:scale-[1.02] transition-transform"
                                >
                                    <MessageSquare size={16} /> Contact Patient
                                </a>
                                <button
                                    onClick={() => handleStatusUpdate(selectedAppointment._id, 'Completed')}
                                    className="flex-1 bg-ayur-green text-white py-3 rounded-2xl font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-ayur-green/20 hover:scale-[1.02] transition-transform"
                                >
                                    <Send size={16} /> Patient Handled
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Appointments;
