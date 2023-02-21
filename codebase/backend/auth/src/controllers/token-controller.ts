import { Request, Response } from "express";

const generateAccessToken = async (req: Request, res: Response) => {};

const generateRefreshToken = async (req: Request, res: Response) => {};

const decodeAccessToken = async (req: Request, res: Response) => {};

const decodeRefreshToken = async (req: Request, res: Response) => {};

export const TokenController = {
	generateAccessToken,
	generateRefreshToken,
	decodeAccessToken,
	decodeRefreshToken,
};
