import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../../utils/axios";
import { ProductBox } from "../../components/productBox";
import { endpoints } from "../../constants";
import { useState } from "react";

export const Products = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);

    const { data, isLoading, isError } = useQuery({
        queryKey: ["products", page],
        queryFn: async () => {
            const res = await api.get(endpoints.getAllProducts(page, 10));
            return res.data;
        },
        keepPreviousData: true,
    });

    return (
        <div className="">
            {/* Top Header */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-white text-2xl font-semibold">Products</h1>

                <button className="flex gap-2 glass-btn" onClick={() => navigate("/add-product")}>
                    <PlusCircle /> Add Products
                </button>
            </div>

            {/* Loading state */}
            {isLoading && <div className="text-white text-center py-20">Loading products…</div>}

            {/* Error state */}
            {isError && <div className="text-red-400 text-center py-20">Failed to load products.</div>}

            {/* Product Grid */}
            {data && (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {data.data.length > 0 ? (
                            data.data.map((product) => <ProductBox key={product._id} product={product} />)
                        ) : (
                            <div className="col-span-full text-center text-gray-400">No products found.</div>
                        )}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center items-center gap-4 mt-10">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage((p) => p - 1)}
                            className="px-4 py-2 rounded-lg bg-gray-800 text-white disabled:bg-gray-600"
                        >
                            Prev
                        </button>

                        <span className="text-white">
                            Page {data.page} / {data.totalPages}
                        </span>

                        <button
                            disabled={page >= data.totalPages}
                            onClick={() => setPage((p) => p + 1)}
                            className="px-4 py-2 rounded-lg bg-gray-800 text-white disabled:bg-gray-600"
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};
