export const ProductBox = ({ product }) => {
    const imageUrl = product?.images?.[0]?.url || "https://placehold.co/300x300?text=No+Image";

    return (
        <div className="bg-white shadow-md rounded-2xl p-4 border hover:shadow-lg transition">
            {/* Product Image */}
            <div className="w-full h-48 overflow-hidden rounded-xl mb-4">
                <img src={imageUrl} alt={product.title} className="w-full h-full object-cover" />
            </div>

            {/* Title + Brand */}
            <h2 className="text-lg font-semibold line-clamp-1">{product.title}</h2>
            <p className="text-sm text-gray-500">{product.brand}</p>

            {/* Price */}
            <div className="mt-2 flex items-center gap-2">
                <span className="text-xl font-bold">₹{product.price}</span>
                <span className="text-sm line-through text-gray-400">₹{product.originalPrice}</span>
            </div>

            {/* Category & Stock */}
            <div className="mt-2 text-sm text-gray-600">
                <p>
                    Category: <span className="font-medium">{product.category}</span>
                </p>
                <p>
                    Stock: <span className="font-medium">{product.stock}</span>
                </p>
            </div>

            {/* Features */}
            {product.features && product.features.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                    {product.features.map((f, idx) => (
                        <span key={idx} className="text-xs bg-gray-200 px-2 py-1 rounded-full">
                            {f}
                        </span>
                    ))}
                </div>
            )}

            {/* Button */}
            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition">
                Edit Product
            </button>
        </div>
    );
};
