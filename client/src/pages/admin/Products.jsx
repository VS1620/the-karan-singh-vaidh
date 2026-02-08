import React, { useEffect, useState } from 'react';
import api, { getAssetUrl } from '../../api/api';
import { Link, useNavigate } from 'react-router-dom';
import {
    Plus, Edit, Trash2, Eye, Search,
    Filter, MoreVertical, Package, ShoppingBag,
    ArrowUpRight, AlertTriangle, Loader2, IndianRupee
} from 'lucide-react';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const { data } = await api.get('/products');
            setProducts(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const deleteHandler = async (id) => {
        if (window.confirm('Deleting this product will remove it from all records. Continue?')) {
            try {
                await api.delete(`/products/${id}`);
                setProducts(products.filter(p => p._id !== id));
            } catch (err) {
                alert(err.response?.data?.message || err.message);
            }
        }
    };

    const filteredProducts = Array.isArray(products) ? products.filter(product => {
        if (!product) return false;
        const productName = (product.name || '').toLowerCase();
        const search = searchTerm.toLowerCase();

        const matchesSearch = productName.includes(search);
        const matchesCategory = categoryFilter === 'All' || product.category?._id === categoryFilter || product.category?.name === categoryFilter;
        return matchesSearch && matchesCategory;
    }) : [];

    const categories = ['All', ...new Set(products.map(p => p.category?.name).filter(Boolean))];

    if (loading) return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
            <Loader2 size={40} className="text-ayur-green animate-spin mb-4" />
            <p className="text-gray-400 font-medium">Extracting essences...</p>
        </div>
    );

    return (
        <div className="space-y-8 pb-20">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-serif font-bold text-ayur-green italic">Essence Inventory</h2>
                    <p className="text-gray-400 text-sm mt-1 font-medium">Manage your apothecary's curative formulations</p>
                </div>
                <button
                    onClick={() => navigate('/admin/product/new')}
                    className="flex items-center gap-3 px-8 py-3 bg-ayur-green text-white rounded-2xl font-bold text-sm shadow-xl shadow-ayur-green/20 hover:bg-ayur-olive transition-all group"
                >
                    <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                    Forge New Essence
                </button>
            </div>

            {/* Filters and Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-12 flex flex-col md:flex-row gap-4">
                    <div className="flex-1 bg-white p-2 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-2">
                        <div className="relative flex-1 group">
                            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-ayur-green transition-colors" />
                            <input
                                type="text"
                                placeholder="Search by essence name..."
                                className="w-full bg-transparent border-none focus:ring-0 text-sm py-3 pl-12 pr-4 font-medium"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="h-8 w-px bg-gray-100 hidden md:block"></div>
                        <div className="flex items-center gap-2 px-4 whitespace-nowrap">
                            <Filter size={16} className="text-gray-400" />
                            <select
                                className="border-none focus:ring-0 text-sm font-bold text-gray-500 bg-transparent py-0 pr-8"
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 bg-ayur-beige/5 px-8 py-2 rounded-full border border-ayur-beige/20 shadow-inner">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Manifested:</span>
                        <span className="text-sm font-serif font-bold text-ayur-green italic">{filteredProducts.length} Items</span>
                    </div>
                </div>
            </div>

            {/* Products Table/Grid Container */}
            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/40 border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#FAF9F6] border-b border-gray-50 text-gray-400 text-[10px] uppercase font-bold tracking-[0.2em]">
                                <th className="px-8 py-6">Identity</th>
                                <th className="px-6 py-6">Affiliation</th>
                                <th className="px-6 py-6 text-center">Variants</th>
                                <th className="px-6 py-6 text-center">Manifest Value</th>
                                <th className="px-6 py-6 text-center">Status</th>
                                <th className="px-8 py-6 text-right">Alteration</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredProducts.map((product) => {
                                const defaultPack = product.packs && product.packs.length > 0
                                    ? (product.packs.find(p => p.isDefault) || product.packs[0])
                                    : null;

                                return (
                                    <tr key={product._id} className="hover:bg-gray-50/50 transition-all group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center overflow-hidden border border-gray-100 shadow-sm relative group-hover:shadow-md transition-shadow">
                                                    <img
                                                        src={getAssetUrl(product.image)}
                                                        alt={product.name}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                    />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-gray-800 leading-tight">{product.name}</span>
                                                    <span className="text-[10px] font-bold text-ayur-gold tracking-widest uppercase mt-1">Ref No: {product._id.substring(product._id.length - 6)}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6 font-medium">
                                            <span className="text-xs text-gray-500 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                                                {product.category ? product.category.name : 'Unknown Realm'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-6 text-center">
                                            <span className="text-xs font-bold text-gray-900 bg-ayur-beige/10 px-2 py-1 rounded-lg">
                                                {product.packs?.length || 0} Sets
                                            </span>
                                        </td>
                                        <td className="px-6 py-6 text-center">
                                            <div className="flex flex-col items-center">
                                                <span className="text-sm font-serif font-bold text-ayur-green italic">₹{defaultPack?.sellingPrice.toLocaleString() || '-'}</span>
                                                {defaultPack?.mrp > defaultPack?.sellingPrice && (
                                                    <span className="text-[10px] text-gray-300 line-through">₹{defaultPack.mrp}</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-6 text-center">
                                            <div className="flex items-center justify-center gap-1.5">
                                                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                                                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Observable</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-2 transition-opacity">
                                                <Link
                                                    to={`/admin/product/${product._id}/edit`}
                                                    className="p-2.5 bg-gray-50 text-gray-400 hover:text-ayur-green rounded-xl border border-gray-100 shadow-sm transition-all active:scale-95"
                                                    title="Edit Product"
                                                >
                                                    <Edit size={18} />
                                                </Link>
                                                <button
                                                    onClick={() => deleteHandler(product._id)}
                                                    className="p-2.5 bg-gray-50 text-gray-400 hover:text-red-500 rounded-xl border border-gray-100 shadow-sm transition-all active:scale-95"
                                                    title="Delete Product"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                {filteredProducts.length === 0 && (
                    <div className="py-20 text-center">
                        <div className="w-16 h-16 bg-gray-50 rounded-3xl flex items-center justify-center text-gray-300 mx-auto mb-4">
                            <ShoppingBag size={32} />
                        </div>
                        <h4 className="text-gray-900 font-bold">No essences found</h4>
                        <p className="text-gray-400 text-sm mt-1">Adjust your search or category filters.</p>
                    </div>
                )}
            </div>

            {/* Visual Tip */}
            <div className="bg-[#FAF9F6] p-10 rounded-[3rem] border border-ayur-beige/30 flex flex-col md:flex-row items-center gap-8">
                <div className="w-20 h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center text-ayur-gold flex-shrink-0 animate-pulse">
                    <AlertTriangle size={32} />
                </div>
                <div>
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">Inventory Stewardship</h4>
                    <p className="font-serif font-bold text-ayur-green text-lg leading-relaxed italic pr-12">
                        "Your products are the physical manifestation of healing wisdom. Maintain their records with clarity and reverence."
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Products;
