import { Request, Response } from "express";

import { HttpStatusCode } from "axios";

import { TokenService } from "../services/token-service";

import { Role } from "../types";

const generateAccessToken = async (req: Request, res: Response) => {
	try {
		console.log("Attempting to generate access token");
		const { roles, id }: { roles: Role[]; id: string } = req.body;
		const accessToken = await TokenService.generateAccessToken(roles, id);
		console.log("Successfully generated token");
		return res.status(HttpStatusCode.Ok).send({ accessToken });
	} catch (err) {
		console.error("Failed to generate access token", err);
		if (err instanceof Error) {
			return res.status(HttpStatusCode.InternalServerError).send();
		}
	}
};

const generateRefreshToken = async (req: Request, res: Response) => {
	try {
		console.log("Attempting to generate refresh token");
		const { id }: { id: string } = req.body;
		const refreshToken = await TokenService.generateRefreshToken(id);
		console.log("Successfully generated token");
		return res.status(HttpStatusCode.Ok).send({ refreshToken });
	} catch (err) {
		console.error("Failed to generate refresh token", err);
		if (err instanceof Error) {
			return res.status(HttpStatusCode.InternalServerError).send();
		}
	}
};

const decodeAccessToken = async (req: Request, res: Response) => {
	try {
		console.log("Attempting to decode access token");
		const { accessToken }: { accessToken: string } = req.body;
		const payload = await TokenService.decodeAccessToken(accessToken);
		console.log("Successfully generated token");
		return res.status(HttpStatusCode.Ok).send({ payload });
	} catch (err) {
		console.error("Failed to decode access token", err);
		if (err instanceof Error) {
			return res.status(HttpStatusCode.InternalServerError).send();
		}
	}
};

const decodeRefreshToken = async (req: Request, res: Response) => {
	try {
		console.log("Attempting to decode refresh token");
		const { refreshToken }: { refreshToken: string } = req.body;
		const payload = await TokenService.decodeAccessToken(refreshToken);
		console.log("Successfully generated token");
		return res.status(HttpStatusCode.Ok).send({ payload });
	} catch (err) {
		console.error("Failed to decode refresh token", err);
		if (err instanceof Error) {
			return res.status(HttpStatusCode.InternalServerError).send();
		}
	}
};

export const TokenController = {
	generateAccessToken,
	generateRefreshToken,
	decodeAccessToken,
	decodeRefreshToken,
};
