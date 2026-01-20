import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import { Plus, Trash2, Edit } from 'lucide-react';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const { data } = await api.get('/api/categories');
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
            await api.post('/api/categories', { name, description });
            setName('');
            setDescription('');
            fetchCategories();
        } catch (err) {
            alert(err.response?.data?.message || err.message);
        }
    };

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
                await api.delete(`/api/categories/${id}`);
                fetchCategories();
            } catch (err) {
                alert(err.response?.data?.message || err.message);
            }
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Categories</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Form */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-fit">
                    <h3 className="text-lg font-bold text-emerald-800 mb-4">Add New Category</h3>
                    <form onSubmit={submitHandler} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
                        >
                            <Plus size={18} />
                            Add Category
                        </button>
                    </form>
                </div>

                {/* List */}
                <div className="md:col-span-2 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                    {loading ? (
                        <p className="p-4">Loading...</p>
                    ) : (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm uppercase tracking-wider">
                                    <th className="p-4 font-medium">Name</th>
                                    <th className="p-4 font-medium">Description</th>
                                    <th className="p-4 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {categories.map((category) => (
                                    <tr key={category._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4 font-medium text-gray-800">{category.name}</td>
                                        <td className="p-4 text-gray-500">{category.description}</td>
                                        <td className="p-4 text-right">
                                            <button
                                                onClick={() => deleteHandler(category._id)}
                                                className="text-red-500 hover:text-red-700 transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Categories;
