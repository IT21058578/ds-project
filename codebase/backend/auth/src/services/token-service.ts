import { readFile } from "fs/promises";
import jwt from "jsonwebtoken";
import { Role } from "../types";

const generateAccessToken = async (roles: Role[], id: string) => {
	const privateKey = await readFile("assets/access-private.key");
	const accessToken = jwt.sign({ roles, id }, privateKey, {
		expiresIn: "2h",
		algorithm: "RS256",
	});
	return accessToken;
};

const generateRefreshToken = async (id: string) => {
	const privateKey = await readFile("assets/refresh-private.key");
	const refreshToken = jwt.sign({ id }, privateKey, {
		expiresIn: "24h",
		algorithm: "RS256",
	});
	return refreshToken;
};

const decodeAccessToken = async (token: string) => {
	const publicKey = await readFile("assets/access-public.key");
	const payload = jwt.verify(token, publicKey);
	return payload;
};

// FIXME: This is not working
const decodeRefreshToken = async (token: string) => {
	const publicKey = await readFile("assets/refresh-public.key");
	const payload = jwt.verify(token, publicKey);
	return payload;
};

export const TokenService = {
	generateAccessToken,
	generateRefreshToken,
	decodeAccessToken,
	decodeRefreshToken,
};
