import jwt from "jsonwebtoken";
import { Role } from "../types";

const generateAccessToken = (roles: Role[], id: string): string => {
	const accessToken = jwt.sign({ roles, id }, "", { expiresIn: "2h" });
	return accessToken;
};

const generateRefreshToken = (id: string): string => {
	//TODO: Implement function
	return "";
};

const decodeAccessToken = (): jwt.JwtPayload => {
	//TODO: Implement function
	return {};
};

export const TokenService = { generateAccessToken, generateRefreshToken };
