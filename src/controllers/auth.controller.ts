import { Request, Response } from "express";
import User, { IUser } from "../models/User";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import Role from "../models/Role";

export const signUp = async (req: Request, res: Response) => {
	const { username, email, password, roles } = req.body;
	//const isUserExist = User.find({email})
	const newUser: IUser = new User({
		username,
		email,
		password,
	});

	newUser.password = await newUser.encryptPassword(newUser.password);

	if (roles) {
		const foundRole = await Role.find({ name: { $in: roles } });
		newUser.roles = foundRole.map((role) => role._id);
	} else {
		const role: any = (await Role.findOne({ name: "user" })) || "";
		newUser.roles = [role._id];
	}

	const savedUser = await newUser.save();
	const token: string = jwt.sign(
		{ id: savedUser._id },
		process.env.SECRET_JWT!,
		{
			expiresIn: 86400, //24 hours
		},
	);
	res.header("auth-token", token).json(savedUser);
};

/**
 * Login Controller
 * @param req Request
 * @param res Response
 */
export const signIn = async (req: Request, res: Response) => {
	//Populate roles from user roles property.
	const userFound = await User.findOne({ email: req.body.email }).populate(
		"roles",
	);

	if (!userFound) {
		return res.status(400).json({ message: "Invalid Credentials" });
	}

	const matchPassword: boolean = await userFound.comparePassword(
		req.body.password,
		userFound.password,
	);

	if (!matchPassword) {
		return res.status(400).json({ message: "Invalid Credentials" });
	}

	/**
	 * Token
	 * exp: 23h
	 */
	const token: string = jwt.sign(
		{ id: userFound._id },
		process.env.SECRET_JWT!,
		{
			expiresIn: "23h",
		},
	);

	/**
	 * token serialized in cookie
	 * exp: 24h
	 */
	const serialized = serialize("myTokenProduct", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict",
		maxAge: 86400,
		path: "/",
	});

	res.setHeader("Set-Cookie", serialized).json({
		message: "Login successful",
		data: userFound,
	});

	// res.header("auth-token", token).json({
	// 	message: "Login successful",
	// 	data: userFound,
	// });
};
