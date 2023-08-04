import { createProduct, deleteProductById, getProductById, getProducts, updateProductById } from "../controllers/products.controller";
import { Request, Response, Router } from "express";

const router: Router = Router();

router.post("/", createProduct);
router.get("/", getProducts);
router.get("/:productId", getProductById);
router.put("/:productId", updateProductById);
router.delete("/:productId", deleteProductById);

export default router;