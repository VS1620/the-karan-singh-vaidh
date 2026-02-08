import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { useNavigate, useParams } from 'react-router-dom';
import { Upload, X, Plus } from 'lucide-react';

const ProductForm = () => {
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    // Price removed
    const [image, setImage] = useState('');
    const [images, setImages] = useState([]);
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [countInStock, setCountInStock] = useState(100);
    const [shortDescription, setShortDescription] = useState('');
    const [fullDescription, setFullDescription] = useState('');
    const [discount, setDiscount] = useState(0);
    const [isBestSeller, setIsBestSeller] = useState(false);
    const [isWellness, setIsWellness] = useState(false);
    const [ingredients, setIngredients] = useState('');
    const [usage, setUsage] = useState('');
    const [benefits, setBenefits] = useState('');
    const [packs, setPacks] = useState([]); // [{name, price, isDefault}]
    const [uploading, setUploading] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        fetchCategories();
        if (id) {
            setIsEditMode(true);
            fetchProduct(id);
        }
    }, [id]);

    const fetchCategories = async () => {
        try {
            const { data } = await api.get('/categories');
            setCategories(data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchProduct = async (productId) => {
        try {
            const { data } = await api.get(`/products/${productId}`);
            setName(data.name);
            setSlug(data.slug || '');
            // setPrice(data.price); removed
            setImage(data.image);
            setImages(data.images || []);
            setCategory(data.category?._id || data.category);
            setCountInStock(data.countInStock);
            setShortDescription(String(data.shortDescription || ''));
            setFullDescription(String(data.fullDescription || ''));
            setIngredients(String(data.ingredients || ''));
            setUsage(String(data.usage || ''));
            setBenefits(String(data.benefits || ''));
            setDiscount(data.discount || 0);
            setIsBestSeller(!!data.isBestSeller);
            setIsWellness(!!data.isWellness);
            setPacks(Array.isArray(data.packs) ? data.packs : []);
        } catch (error) {
            console.error(error);
        }
    };

    const uploadFileHandler = async (e, multiple = false) => {
        const files = e.target.files;
        const formData = new FormData();

        if (multiple) {
            for (let i = 0; i < files.length; i++) {
                formData.append('images', files[i]);
            }
        } else {
            formData.append('image', files[0]);
        }

        setUploading(true);

        try {
            if (multiple) {
                const { data } = await api.post('/upload/multiple', formData);
                setImages([...images, ...data]);
            } else {
                const { data } = await api.post('/upload', formData);
                setImage(data);
            }

            setUploading(false);
        } catch (error) {
            console.error(error);
            setUploading(false);
            alert('Image upload failed: ' + (error.response?.data?.message || error.message));
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (packs.length === 0) {
            alert('Please add at least one pack with a valid selling price.');
            return;
        }

        const productData = {
            name,
            slug,
            // price removed
            image,
            images,
            category,
            countInStock,
            shortDescription,
            fullDescription,
            discount,
            isBestSeller,
            isWellness,
            ingredients,
            usage,
            benefits,
            packs
        };

        console.log('Submitting Product Data:', productData);

        try {
            if (isEditMode) {
                console.log(`Updating product ${id}...`);
                const { data } = await api.put(`/products/${id}`, productData);
                console.log('Update Success:', data);
            } else {
                console.log('Creating new product...');
                const { data } = await api.post('/products', productData);
                console.log('Create Success:', data);
            }
            navigate('/admin/products');
        } catch (error) {
            console.error('Submission Error:', error);
            alert(error.response?.data?.message || error.message);
        }
    };

    const addPack = () => {
        setPacks([...packs, { name: '', mrp: 0, sellingPrice: 0, medicines: [], isDefault: false }]);
    };

    const removePack = (index) => {
        const newPacks = [...packs];
        newPacks.splice(index, 1);
        setPacks(newPacks);
    };

    const updatePack = (index, field, value) => {
        const newPacks = [...packs];
        newPacks[index][field] = value;
        setPacks(newPacks);
    };

    const handleMedicineChange = (packIndex, medIndex, value) => {
        const newPacks = [...packs];
        newPacks[packIndex].medicines[medIndex] = value;
        setPacks(newPacks);
    };

    const addMedicine = (packIndex) => {
        const newPacks = [...packs];
        if (!newPacks[packIndex].medicines) newPacks[packIndex].medicines = [];
        newPacks[packIndex].medicines.push('');
        setPacks(newPacks);
    };

    const removeMedicine = (packIndex, medIndex) => {
        const newPacks = [...packs];
        newPacks[packIndex].medicines.splice(medIndex, 1);
        setPacks(newPacks);
    };

    return (
        <div className="max-w-4xl mx-auto pb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">{isEditMode ? 'Edit Product' : 'Create Product'}</h2>
            <form onSubmit={submitHandler} className="space-y-6 bg-white p-8 rounded-lg shadow-sm border border-gray-100">

                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Product Name</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">SEO Slug (Optional)</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50"
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                            placeholder="auto-generated-if-blank"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <select
                            className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map((cat) => (
                                <option key={cat._id} value={cat._id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Discount (%)</label>
                        <input
                            type="number"
                            className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                            value={discount}
                            onChange={(e) => setDiscount(e.target.value)}
                        />
                    </div>
                </div>

                {/* Images */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Main Image</label>
                    <div className="flex gap-4 items-center">
                        <input
                            type="text"
                            className="flex-1 px-4 py-2 border rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            placeholder="Image URL"
                        />
                        <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md flex items-center gap-2 text-gray-700 transition-colors">
                            <Upload size={18} />
                            Upload
                            <input type="file" className="hidden" onChange={(e) => uploadFileHandler(e)} />
                        </label>
                    </div>
                </div>

                {/* Gallery Images */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gallery Images</label>
                    <div className="flex flex-wrap gap-4 mb-2">
                        {Array.isArray(images) && images.map((img, idx) => (
                            <div key={idx} className="relative w-20 h-20 border rounded-md overflow-hidden shadow-sm">
                                <img src={img} alt="" className="w-full h-full object-cover" />
                                <button
                                    type="button"
                                    onClick={() => setImages(images.filter((_, i) => i !== idx))}
                                    className="absolute top-0 right-0 bg-red-500/80 hover:bg-red-600 text-white p-1 rounded-bl-md transition-colors shadow-sm"
                                >
                                    <X size={12} />
                                </button>
                            </div>
                        ))}
                    </div>
                    <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md inline-flex items-center gap-2 text-gray-700 transition-colors w-fit">
                        <Upload size={18} />
                        Upload Multiple
                        <input type="file" multiple className="hidden" onChange={(e) => uploadFileHandler(e, true)} />
                    </label>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Short Description</label>
                    <textarea
                        className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                        rows="2"
                        value={shortDescription}
                        onChange={(e) => setShortDescription(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Full Description</label>
                    <textarea
                        className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                        rows="4"
                        value={fullDescription}
                        onChange={(e) => setFullDescription(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Ingredients (Rich Formatted)</label>
                    <textarea
                        className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-emerald-500 focus:border-emerald-500 font-mono text-sm"
                        rows="4"
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                        placeholder="e.g. Ashwagandha: 100mg, Shatavari: 50mg"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Usage / Dosage</label>
                    <textarea
                        className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                        rows="3"
                        value={usage}
                        onChange={(e) => setUsage(e.target.value)}
                        placeholder="e.g. 1 capsule twice a day with warm milk"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Benefits</label>
                    <textarea
                        className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                        rows="4"
                        value={benefits}
                        onChange={(e) => setBenefits(e.target.value)}
                    />
                </div>

                {/* Packs */}
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                        <label className="block text-md font-bold text-gray-800">Packs / Sizes</label>
                        <button type="button" onClick={addPack} className="text-emerald-600 flex items-center gap-1 font-medium hover:text-emerald-700">
                            <Plus size={18} /> Add Pack
                        </button>
                    </div>
                    {packs.map((pack, index) => (
                        <div key={index} className="flex flex-col gap-4 mb-6 bg-white p-4 rounded-md shadow-sm border border-gray-100 relative">
                            <button type="button" onClick={() => removePack(index)} className="absolute top-2 right-2 text-red-500 hover:text-red-700">
                                <X size={18} />
                            </button>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs text-gray-500 font-bold mb-1">Pack Name</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Starter Pack (1 Month)"
                                        className="w-full px-3 py-2 border rounded-md text-sm"
                                        value={pack.name}
                                        onChange={(e) => updatePack(index, 'name', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-500 font-bold mb-1">MRP (Original)</label>
                                    <input
                                        type="number"
                                        className="w-full px-3 py-2 border rounded-md text-sm"
                                        value={pack.mrp}
                                        onChange={(e) => updatePack(index, 'mrp', Number(e.target.value))}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-500 font-bold mb-1">Selling Price</label>
                                    <input
                                        type="number"
                                        className="w-full px-3 py-2 border rounded-md text-sm border-emerald-200 bg-emerald-50"
                                        value={pack.sellingPrice}
                                        onChange={(e) => updatePack(index, 'sellingPrice', Number(e.target.value))}
                                    />
                                </div>
                            </div>

                            {/* Medicines List */}
                            <div className="bg-gray-50 p-3 rounded">
                                <div className="flex justify-between items-center mb-2">
                                    <label className="text-xs font-bold text-gray-600">Included Medicines / Items</label>
                                    <button type="button" onClick={() => addMedicine(index)} className="text-xs text-blue-600 hover:underline">+ Add Item</button>
                                </div>
                                {pack.medicines && pack.medicines.map((med, mIndex) => (
                                    <div key={mIndex} className="flex gap-2 mb-2">
                                        <input
                                            type="text"
                                            className="flex-1 px-2 py-1 text-sm border rounded"
                                            placeholder="Item Name (e.g. Vigor Oil)"
                                            value={med}
                                            onChange={(e) => handleMedicineChange(index, mIndex, e.target.value)}
                                        />
                                        <button type="button" onClick={() => removeMedicine(index, mIndex)} className="text-red-400 hover:text-red-600">
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                                {(!pack.medicines || pack.medicines.length === 0) && <p className="text-xs text-gray-400 italic">No items added yet.</p>}
                            </div>

                            <div className="flex items-center gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={pack.isDefault}
                                        onChange={(e) => updatePack(index, 'isDefault', e.target.checked)}
                                        className="rounded text-emerald-600"
                                    />
                                    <span className="text-xs font-bold text-gray-700">Set as Default Pack</span>
                                </label>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Toggles */}
                <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={isBestSeller}
                            onChange={(e) => setIsBestSeller(e.target.checked)}
                            className="rounded text-emerald-600 focus:ring-emerald-500 w-5 h-5 border-gray-300"
                        />
                        <span className="text-gray-700 font-medium">Best Seller</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={isWellness}
                            onChange={(e) => setIsWellness(e.target.checked)}
                            className="rounded text-emerald-600 focus:ring-emerald-500 w-5 h-5 border-gray-300"
                        />
                        <span className="text-gray-700 font-medium">Wellness Category</span>
                    </label>
                </div>

                <button
                    type="submit"
                    className="w-full py-3 text-lg font-bold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors shadow-md"
                >
                    {isEditMode ? 'Update Product' : 'Create Product'}
                </button>
            </form>
        </div>
    );
};

export default ProductForm;
