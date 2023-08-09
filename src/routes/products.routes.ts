import { createProduct, deleteProductById, getProductById, getProducts, updateProductById } from "../controllers/products.controller";
import { Router } from "express";
import {verifyToken, isAdmin, isModerator} from '../middlewares/authJwt'

const router: Router = Router();

router.post("/", [verifyToken, isModerator], createProduct);
router.get("/", getProducts);
router.get("/:productId", getProductById);
router.put("/:productId", [verifyToken, isAdmin], updateProductById);
router.delete("/:productId", [verifyToken, isAdmin], deleteProductById);

export default router;