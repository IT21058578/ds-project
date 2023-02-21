import { Request, Response } from "express";

import { HttpStatusCode } from "axios";
import { validationResult } from "express-validator";

import { TokenService } from "../services/token-service";

import { Role } from "../types";

const generateAccessToken = async (req: Request, res: Response) => {
	const errors = validationResult(req);
	if (!errors.isEmpty) {
		return res
			.json({ errors: errors.array() })
			.status(HttpStatusCode.BadRequest)
			.send();
	}

	try {
		const { roles, id }: { roles: Role[]; id: string } = req.body;
		await TokenService.generateAccessToken(roles, id);
		return res.status(HttpStatusCode.Ok).send();
	} catch (err) {
		if (err instanceof Error) {
			return res.status(HttpStatusCode.InternalServerError).send();
		}
	}
};

const generateRefreshToken = async (req: Request, res: Response) => {
	const errors = validationResult(req);
	if (!errors.isEmpty) {
		return res
			.json({ errors: errors.array() })
			.status(HttpStatusCode.BadRequest)
			.send();
	}

	try {
		const { id }: { id: string } = req.body;
		await TokenService.generateRefreshToken(id);
		return res.status(HttpStatusCode.Ok).send();
	} catch (err) {
		if (err instanceof Error) {
			return res.status(HttpStatusCode.InternalServerError).send();
		}
	}
};

const decodeAccessToken = async (req: Request, res: Response) => {
	const errors = validationResult(req);
	if (!errors.isEmpty) {
		return res
			.json({ errors: errors.array() })
			.status(HttpStatusCode.BadRequest)
			.send();
	}

	try {
		const { accessToken }: { accessToken: string } = req.body;
		const payload = await TokenService.decodeAccessToken(accessToken);
		return res.status(HttpStatusCode.Ok).send({ payload });
	} catch (err) {
		if (err instanceof Error) {
			return res.status(HttpStatusCode.InternalServerError).send();
		}
	}
};

const decodeRefreshToken = async (req: Request, res: Response) => {
	const errors = validationResult(req);
	if (!errors.isEmpty) {
		return res
			.json({ errors: errors.array() })
			.status(HttpStatusCode.BadRequest)
			.send();
	}

	try {
		const { refreshToken }: { refreshToken: string } = req.body;
		const payload = await TokenService.decodeAccessToken(refreshToken);
		return res.status(HttpStatusCode.Ok).send({ payload });
	} catch (err) {
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
