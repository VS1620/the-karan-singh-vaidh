import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import {
    Plus, Trash2, Edit, FolderTree,
    Layers, Search, Loader2, Info, ArrowUpRight
} from 'lucide-react';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);
    const [actionLoading, setActionLoading] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const { data } = await api.get('/categories');
            setCategories(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setActionLoading(true);
            await api.post('/categories', { name, description });
            setName('');
            setDescription('');
            fetchCategories();
            setActionLoading(false);
        } catch (err) {
            alert(err.response?.data?.message || err.message);
            setActionLoading(false);
        }
    };

    const deleteHandler = async (id) => {
        if (window.confirm('Dissolving this category may affect linked essences. Proceed?')) {
            try {
                setActionLoading(true);
                await api.delete(`/categories/${id}`);
                setCategories(categories.filter(c => c._id !== id));
                setActionLoading(false);
            } catch (err) {
                alert(err.response?.data?.message || err.message);
                setActionLoading(false);
            }
        }
    };

    if (loading) return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
            <Loader2 size={40} className="text-ayur-green animate-spin mb-4" />
            <p className="text-gray-400 font-medium">Mapping organizational structures...</p>
        </div>
    );

    return (
        <div className="space-y-8 pb-20">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-serif font-bold text-ayur-green italic">Categorical Domains</h2>
                    <p className="text-gray-400 text-sm mt-1 font-medium">Define the realms of healing within your digital apothecary</p>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                {/* Form - Forge New Category */}
                <div className="xl:col-span-4 space-y-6">
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-200/40 border border-gray-100 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-125 transition-transform duration-1000">
                            <Plus size={160} />
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 bg-ayur-green/10 text-ayur-green rounded-xl flex items-center justify-center">
                                    <FolderTree size={20} />
                                </div>
                                <h3 className="text-lg font-serif font-bold text-ayur-green italic">Forge Category</h3>
                            </div>

                            <form onSubmit={submitHandler} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Identity Name</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Respiratory, Immunity..."
                                        className="w-full px-5 py-3.5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-ayur-green/20 text-sm font-medium transition-all"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Core Description</label>
                                    <textarea
                                        placeholder="Define the scope of this healing domain..."
                                        rows="4"
                                        className="w-full px-5 py-3.5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-ayur-green/20 text-sm font-medium transition-all"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={actionLoading}
                                    className="w-full py-4 text-white bg-ayur-green rounded-[1.25rem] font-bold text-sm shadow-xl shadow-ayur-green/20 hover:bg-ayur-olive transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                                >
                                    {actionLoading ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" />}
                                    Establish Category
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="bg-ayur-gold/10 p-8 rounded-[2.5rem] border border-ayur-gold/20 flex flex-col md:flex-row items-center gap-6">
                        <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-ayur-gold flex-shrink-0">
                            <Info size={24} />
                        </div>
                        <p className="text-[11px] text-ayur-gold font-bold uppercase tracking-widest leading-relaxed">
                            Organizing products into realms improves patient discovery and therapeutic focus.
                        </p>
                    </div>
                </div>

                {/* List - Active domains */}
                <div className="xl:col-span-8">
                    <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/40 border border-gray-100 overflow-hidden min-h-[400px]">
                        <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Layers className="text-ayur-gold" size={20} />
                                <h3 className="text-xl font-serif font-bold text-gray-900 italic">Established Domains</h3>
                            </div>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 py-1.5 bg-gray-50 rounded-full">{categories.length} Realms</span>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-[#FAF9F6] border-b border-gray-100 text-gray-400 text-[10px] uppercase font-bold tracking-[0.2em]">
                                        <th className="px-8 py-5">Identity</th>
                                        <th className="px-6 py-5">Manifest Description</th>
                                        <th className="px-8 py-5 text-right">Dissolution</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50 font-medium">
                                    {(Array.isArray(categories) ? categories : []).map((category) => (
                                        <tr key={category._id} className="hover:bg-gray-50/50 transition-all group">
                                            <td className="px-8 py-6">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-gray-800">{category.name || 'Unnamed Category'}</span>
                                                    <span className="text-[10px] font-bold text-ayur-gold tracking-widest uppercase mt-1">ID: {category._id?.substring(category._id.length - 6) || 'N/A'}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-6">
                                                <p className="text-xs text-gray-500 max-w-sm line-clamp-2 leading-relaxed">
                                                    {category.description || 'No descriptive essence provided for this domain.'}
                                                </p>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => deleteHandler(category._id)}
                                                        className="p-3 bg-white text-gray-400 hover:text-red-500 rounded-2xl border border-gray-100 shadow-sm transition-all active:scale-95"
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
                        {categories.length === 0 && (
                            <div className="p-20 text-center">
                                <div className="w-16 h-16 bg-gray-50 rounded-3xl flex items-center justify-center text-gray-300 mx-auto mb-4">
                                    <FolderTree size={32} />
                                </div>
                                <h4 className="text-gray-900 font-bold">No categorical domains exist</h4>
                                <p className="text-gray-400 text-sm mt-1">Establish your first realm to begin organization.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Categories;
