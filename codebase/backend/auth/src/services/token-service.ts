import { readFile } from "fs/promises";
import jwt from "jsonwebtoken";
import { Role } from "../types";

const generateAccessToken = async (roles: Role[], id: string) => {
	const privateKey = await readFile("../../assets/access-private.key");
	const accessToken = jwt.sign({ roles, id }, privateKey, {
		expiresIn: "2h",
		subject: id,
	});
	console.log(accessToken);
	return accessToken;
};

const generateRefreshToken = async (id: string) => {
	const privateKey = await readFile("../../assets/refresh-private.key");
	const refreshToken = jwt.sign({ id }, privateKey, {
		expiresIn: "24h",
		subject: id,
	});
	console.log(refreshToken);
	return refreshToken;
};

const decodeAccessToken = async (token: string) => {
	const publicKey = await readFile("../../assets/access-public.key");
	const payload = jwt.verify(token, publicKey);
	console.log(payload);
	return payload;
};

const decodeRefreshToken = async (token: string) => {
	const publicKey = await readFile("../../assets/refresh-public.key");
	const payload = jwt.verify(token, publicKey);
	console.log(payload);
	return payload;
};

export const TokenService = {
	generateAccessToken,
	generateRefreshToken,
	decodeAccessToken,
	decodeRefreshToken,
};
