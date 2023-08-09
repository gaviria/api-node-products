import { NextFunction, Request, Response } from "express";
import { ROLES } from "../models/Role";
import User from "../models/User";

export const checkDuplicateUsernameOrEmail = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const user = await User.findOne({ username: req.body.username });
	if (user)
		return res.status(400).json({ message: "The user already exist" });

	const userByEmail = await User.findOne({ email: req.body.email });
	if (userByEmail)
		return res.status(400).json({ message: "The email already exist" });

	next();
};

export const checkRolesExisted = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const roles = req.body.roles;
	if (roles) {
		for (let i = 0; i < roles.length; i++) {
			if (!ROLES.includes(roles[i])) {
				return res.status(400).json({ message: "Role does not exist" });
			}
		}
	}

	next();
};

//Solve error: Cannot set headers after they are sent to the client
/*export const checkRolesExisted = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const roles = req.body.roles;
	roles.some((role: string) => {
		if (!ROLES.includes(role)) {
			return res.status(400).json({ message: "Role does not exist" });
		}
	});

	next();
};*/
