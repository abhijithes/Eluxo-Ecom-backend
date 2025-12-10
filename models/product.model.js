import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
        title: { type: String, required: true },
        brand: { type: String, required: true },
        stock: { type: Number, required: true },
        price: { type: Number, required: true },
        originalPrice: { type: Number, required: true },
        images: [{
                url: { type: String, required: true },
                public_id: { type: String, required: true },
                originalName: { type: String, required: true },
        }],
        category: { type: String, required: true },
        shortDescription: { type: String, required: true },
        detailedDescription: { type: String, required: true },
        gender: { type: String, default: "unisex" },
        features: {
            type: [String],
            default: [],
        },
    },
    { timestamps: true }
);

export default mongoose.model("Product", productSchema);