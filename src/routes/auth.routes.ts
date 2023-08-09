import {
	checkDuplicateUsernameOrEmail,
	checkRolesExisted,
} from "../middlewares/verifySignUp";
import { signIn, signUp } from "../controllers/auth.controller";
import { Router } from "express";

const router: Router = Router();

router.post("/signin", signIn);

router.post(
	"/signup",
	[checkDuplicateUsernameOrEmail, checkRolesExisted],
	signUp,
);

export default router;
