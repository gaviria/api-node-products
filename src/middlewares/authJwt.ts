import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/User";
import Role from "../models/Role";
import cookie from "cookie";

export const verifyToken = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		//const token = req.header("auth-token");
		//const token: any = req.headers["auth-token"];
		const cookies = cookie.parse(req.headers.cookie || "");
		const token: string = cookies.myTokenProduct;

		if (!token)
			return res.status(403).json({ message: "No token provided" });

		const decoded = jwt.verify(
			token,
			process.env.SECRET_JWT!,
		) as JwtPayload;
		req.userId = decoded.id;
		const user = await User.findById(req.userId, { password: 0 });

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		next();
	} catch (error) {
		return res.status(401).json({ message: "Unauthorized" });
	}
};

export const isModerator = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const user = await User.findById(req.userId);
	const roles = await Role.find({ _id: { $in: user?.roles } });
	const isModerator: boolean = roles.some(
		(role) => role.name === "moderator",
	);

	if (!isModerator) return res.status(403).json({ message: "Access Denied" });

	next();
};

export const isAdmin = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const user = await User.findById(req.userId);
	const roles = await Role.find({ _id: { $in: user?.roles } });
	const isAdmin: boolean = roles.some((role) => role.name === "admin");

	if (!isAdmin) return res.status(403).json({ message: "Access Denied" });

	next();
};
