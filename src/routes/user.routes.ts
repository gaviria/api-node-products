import { isAdmin, verifyToken } from "../middlewares/authJwt";
import { createUser } from "../controllers/user.controller";
import { Router } from "express";
import { checkRolesExisted } from "../middlewares/verifySignUp";

const router: Router = Router();

router.post("/", [verifyToken, isAdmin, checkRolesExisted], createUser);

export default router;