import express from "express";
import upload from "../middleware/multer.middleware.js";
import cloudinary from "../config/cloudinary.js"; 

const router = express.Router();

router.post("/image", upload.array("images", 4), async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ success: false, error: "No files uploaded" });
        }

        const uploadToCloudinary = (fileBuffer) => {
            return new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    { folder: "eluxo-products" },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                ).end(fileBuffer);
            });
        };

        const uploadedImages = await Promise.all(
            req.files.map((file) => uploadToCloudinary(file.buffer))
        );

        const finalImages = uploadedImages.map((img, index) => ({
            url: img.secure_url,
            public_id: img.public_id,
            originalName: req.files[index].originalname,
        }));

        res.status(200).json({
            success: true,
            images: finalImages,
        });

    } catch (error) {
        console.error("Upload Error:", error);
        res.status(500).json({
            success: false,
            error: "Upload failed",
            details: error.message,
        });
    }
});

export default router;
