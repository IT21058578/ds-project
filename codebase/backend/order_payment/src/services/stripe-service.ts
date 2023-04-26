import Stripe from "stripe";

const key = process.env.STRIPE_SECRET_KEY || "";

const stripe = new Stripe(key, {
	apiVersion: "2022-11-15",
});

const doStripePayment = async (
	userId: string,
	email: string,
	amount: number
) => {
	const idempotencyKey = userId;
	const createdCustomer = await stripe.customers.create({
		email,
	});

	const result = await stripe.charges.create(
		{
			amount: amount * 100,
			currency: "usd",
			customer: createdCustomer.id,
			receipt_email: email,
		},
		{ idempotencyKey }
	);

	return result;
};

const doStripeMobilePayment = async (amount: number) => {
	const paymentIntent = await stripe.paymentIntents.create({
		amount: amount * 100, //lowest denomination of particular currency
		currency: "usd",
		payment_method_types: ["card"], //by default
	});
	return paymentIntent.client_secret;
};

export const StripeService = {
	doStripeMobilePayment,
	doStripePayment,
};
