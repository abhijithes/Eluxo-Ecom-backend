import Product from "../models/product.model.js";

export const createProduct = async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                error: "No product data received",
            });
        }

        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: product,
        });

    } catch (error) {
        console.error("Create Product Error:", error);
        res.status(500).json({
            success: false,
            error: "Failed to create product",
            details: error.message,
        });
    }
};

export const getPagenatedProduct = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const products = await Product.find().skip(skip).limit(limit);
        const total = await Product.countDocuments();

        res.status(200).json({
            success: true,
            page,
            limit,
            total,
            totalPages : Math.ceil(total / limit),
            data: products,
        });

    } catch (error) {
        console.error("Get Products Error:", error);
        res.status(500).json({
            success: false,
            error: "Failed to retrieve products",
            details: error.message,
        });
    }
};
        
export const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const updateData = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            {$set: updateData},
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                error: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: updatedProduct,
        });

    } catch (error) {
        console.error("Update Product Error:", error);
        res.status(500).json({
            success: false,
            error: "Failed to update product",
            details: error.message,
        });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({
                success: false,
                error: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            data: deletedProduct,
        });

    } catch (error) {
        console.error("Delete Product Error:", error);
        res.status(500).json({
            success: false,
            error: "Failed to delete product",
            details: error.message,
        });
    }
};