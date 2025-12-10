import express from "express";
import { createProduct, getPagenatedProduct , updateProduct, deleteProduct } from "../controller/product.controller.js";
const router = express.Router();

router.post("/create", createProduct);
router.get("/all-products", getPagenatedProduct);
router.patch("/:id",updateProduct )
router.delete("/:id", deleteProduct )

export default router;
