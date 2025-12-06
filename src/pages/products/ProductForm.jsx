import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import api from "../../utils/axios";
import { endpoints } from "../../constants";
import { useMutation } from "@tanstack/react-query";

const createProduct = async (productData) => {
    try {
        const response = await api.post(endpoints.createProduct, productData);
        return response.data;
    } catch (error) {
        throw new Error("Failed to create product");
    }
};

export const ProductForm = (initialData = {}) => {
    const [features, setFeatures] = useState([""]);
    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [isImageUploading, setIsImageUploading] = useState(false);
    const [productData, setProductData] = useState({
        title: initialData.title || "",
        brand: initialData.brand || "",
        stock: initialData.stock || 0,
        price: initialData.price || 0,
        originalPrice: initialData.originalPrice || 0,
        images: [],
        category: initialData.category || "",
        shortDescription: initialData.shortDescription || "",
        detailedDescription: initialData.detailedDescription || "",
    });

    const addFeature = () => setFeatures([...features, ""]);
    const removeFeature = (index) => setFeatures(features.filter((_, i) => i !== index));

    const updateFeature = (index, value) => {
        const updated = [...features];
        updated[index] = value;
        setFeatures(updated);
    };

    const createProductMuttion = useMutation({
        mutationKey: ["createProduct"],
        mutationFn: createProduct,
        onSuccess: (data) => {
            alert("Product created successfully!");
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleimageChange = async (e) => {
        const files = Array.from(e.target.files);
        const formData = new FormData();
        files.forEach((file) => {
            formData.append("images", file);
        });

        if (files.length + images.length > 4) {
            alert("You can upload a maximum of 4 images.");
            e.target.value = "";
            return;
        }
        const previews = files.map((file) => URL.createObjectURL(file));
        setImagePreviews((prev) => [...prev, ...previews]);
        setImages((prev) => [...prev, ...files]);

        try {
            setIsImageUploading(true);
            const imageUrls = await api.post(endpoints.UploadImages, formData);
            setProductData((prevData) => ({
                ...prevData,
                images: [...prevData.images, ...imageUrls.data.images],
            }));
        } catch (error) {
            alert("Image upload failed. Please try again.");
            return;
        } finally {
            setIsImageUploading(false);
        }
    };
    const removeimage = (index) => {
        const prevImages = imagePreviews.filter((_, i) => i !== index);
        setImagePreviews(prevImages);
        const Uimages = images.filter((_, i) => i !== index);
        setImages(Uimages);
        setProductData((prevData) => ({
            ...prevData,
            images: prevData.images.filter((_, i) => i !== index),
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting product:", { ...productData, features });
        createProductMuttion.mutate({ ...productData, features });
    };

    return (
        <div className="p-6 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl text-white max-w-full mx-auto">
            <h2 className="text-2xl font-semibold mb-6">Add New Product</h2>

            {/* FORM */}
            <form className="space-y-5" onSubmit={(e) => handleSubmit(e)}>
                {/* Title */}

                <div>
                    <label className="block text-sm mb-1">Title</label>
                    <input
                        type="text"
                        name="title"
                        required
                        className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white"
                        placeholder="Classic Denim Jacket"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm mb-1">Brand</label>
                        <input
                            type="text"
                            required
                            name="brand"
                            className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10"
                            placeholder="Levi's"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Stock</label>
                        <input
                            required
                            name="stock"
                            type="number"
                            className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10"
                            placeholder="12"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                </div>

                {/* Price / Original Price */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm mb-1">Price</label>
                        <input
                            type="number"
                            required
                            name="price"
                            className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10"
                            placeholder="59.99"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Original Price</label>
                        <input
                            type="number"
                            required
                            name="originalPrice"
                            className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10"
                            placeholder="79.99"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                </div>

                {/* Category */}
                <div>
                    <label className="block text-sm mb-1">Category</label>
                    <input
                        type="text"
                        required
                        name="category"
                        className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10"
                        placeholder="Jackets"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                {/* image previews */}
                <div>
                    {imagePreviews.length > 0 && (
                        <>
                            <div className="flex gap-4 mb-4">
                                {imagePreviews.map((src, index) => (
                                    <div
                                        key={index}
                                        className="relative w-20 h-20  rounded-lg border border-white/10 group"
                                    >
                                        <img
                                            src={src}
                                            alt={`Preview ${index + 1}`}
                                            className="object-cover w-full h-full"
                                        />
                                        <button
                                            className="hidden group-hover:grid bg-black/60 w-full h-full absolute top-0 left-0 place-items-center"
                                            type="button"
                                        >
                                            <Trash2 color="red" onClick={() => removeimage(index)} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            {isImageUploading && (
                                <div className="flex items-center">
                                    <span className="text-white text-sm">Uploading</span>
                                    <DotLoader />
                                </div>
                            )}
                        </>
                    )}
                </div>
                {/* Image */}
                <div>
                    <label className="block text-sm mb-1">Image</label>
                    <input
                        type="file"
                        name="images"
                        required
                        multiple
                        accept="image/*"
                        className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10"
                        onChange={(e) => handleimageChange(e)}
                    />
                </div>

                {/* Short Description */}
                <div>
                    <label className="block text-sm mb-1">Short Description</label>
                    <textarea
                        rows="2"
                        required
                        name="shortDescription"
                        className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10"
                        placeholder="Timeless denim jacket with a relaxed fit..."
                        onChange={(e) => handleChange(e)}
                    ></textarea>
                </div>

                {/* Detailed Description */}
                <div>
                    <label className="block text-sm mb-1">Detailed Description</label>
                    <textarea
                        rows="4"
                        required
                        name="detailedDescription"
                        className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10"
                        placeholder="Crafted from premium 12-ounce denim..."
                        onChange={(e) => handleChange(e)}
                    ></textarea>
                </div>

                {/* Features List */}
                <div>
                    <label className="block text-sm mb-3">Features</label>

                    <div className="space-y-3">
                        {features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <input
                                    type="text"
                                    value={feature}
                                    required
                                    onChange={(e) => updateFeature(index, e.target.value)}
                                    className="flex-1 px-4 py-2 rounded-xl bg-white/5 border border-white/10"
                                    placeholder="Metal button closures"
                                />
                                {features.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeFeature(index)}
                                        className="text-red-400 hover:text-red-300"
                                    >
                                        <Trash2 />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={addFeature}
                        className="mt-3 flex items-center gap-2 text-indigo-400 hover:text-indigo-300"
                    >
                        <Plus className="w-4 h-4" /> Add Feature
                    </button>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-indigo-500 hover:bg-indigo-400 text-white py-3 rounded-xl mt-6 font-medium shadow-lg transition"
                    disabled={isImageUploading ? true : false}
                >
                    Add Product
                </button>
            </form>
        </div>
    );
};
const DotLoader = () => {
    const [dots, setDots] = useState(".");

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => {
                if (prev === "....") return ".";
                return prev + ".";
            });
        }, 300);

        return () => clearInterval(interval);
    }, []);

    return <span className="text-white whitespace-pre">{dots}</span>;
};
