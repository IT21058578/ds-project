import { Request, Response } from "express";

/**
 * Fetch PayPal client ID to use for payments
 * @route GET /api/config/paypal
 * @access Private
 */
const fetchPaypalClientId = (_req: Request, res: Response) => {
	res.send(process.env.PAYPAL_CLIENT_ID);
};

export { fetchPaypalClientId };
