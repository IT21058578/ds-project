import { NextFunction, Response, Request } from "express";

export const getUser = (req: Request, res: Response, next: NextFunction) => {
	//Has to be validated beforehand. Only retrieve non-sensitive information
};

export const deleteUser = () => {};

export const getUsers = () => {};

export const editUser = () => {};
