import { Request, Response } from "express";

import { HttpStatusCode } from "axios";

import { TokenService } from "../services/token-service";

import { Role } from "../types";

import initializeLogger from "../logger";

const log = initializeLogger(__filename.split("\\").pop() || "");

const generateAccessToken = async (req: Request, res: Response) => {
	try {
		log.info("Attempting to generate access token");
		const { id }: { id: string } = req.body;
		const accessToken = await TokenService.generateAccessToken(id, []); // FIXME: Just a temporary fix here
		log.info("Successfully generated token");
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
		log.info("Attempting to generate refresh token");
		const { id }: { id: string } = req.body;
		const refreshToken = await TokenService.generateRefreshToken(id, []); // FIXME: Just a temporary fix here
		log.info("Successfully generated token");
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
		log.info("Attempting to decode access token");
		const { accessToken }: { accessToken: string } = req.body;
		const payload = await TokenService.decodeAccessToken(accessToken);
		log.info("Successfully decoded token");
		return res.status(HttpStatusCode.Ok).send(payload);
	} catch (err) {
		console.error("Failed to decode access token", err);
		if (err instanceof Error) {
			return res.status(HttpStatusCode.InternalServerError).send();
		}
	}
};

const decodeRefreshToken = async (req: Request, res: Response) => {
	try {
		log.info("Attempting to decode refresh token");
		const { refreshToken }: { refreshToken: string } = req.body;
		const payload = await TokenService.decodeRefreshToken(refreshToken);
		log.info("Successfully decoded token");
		return res.status(HttpStatusCode.Ok).send(payload);
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
