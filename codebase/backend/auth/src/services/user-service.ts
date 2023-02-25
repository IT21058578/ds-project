import { User } from "../models/user-model";
import { IUser, IUserSearchOptions, UserErrorMessage } from "../types";

const getUser = async (id: string) => {
	console.log("Finding user");
	const user = await User.findById(id).exec();

	if (user === null) {
		throw Error(UserErrorMessage.USER_NOT_FOUND);
	}

	// TODO: Create way to control information retrieved

	const {
		firstName,
		lastName,
		email,
		_id,
		mobile,
		isSubscribed,
		isAuthorized,
		createdAt,
	} = user;
	return {
		firstName,
		lastName,
		email,
		_id,
		mobile,
		isSubscribed,
		isAuthorized,
		createdAt,
	};
};

const getUsers = async (userSearchOptions: IUserSearchOptions) => {};

const editUser = async (editedUser: IUser) => {};

const deleteUser = async (id: string) => {};

export const UserService = { getUser, getUsers, editUser, deleteUser };
