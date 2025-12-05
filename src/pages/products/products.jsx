import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
export const Products = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-white text-2xl font-semibold">Products</h1>
                <div>
                    <button className="flex gap-2 glass-btn" onClick={() => navigate("/add-product")}>
                        <PlusCircle /> Add Products
                    </button>
                </div>
            </div>
        </div>
    );
};
