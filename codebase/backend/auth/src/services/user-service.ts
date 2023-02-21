import { IUser, IUserSearchOptions } from "../types";

const getUser = async (id: string) => {};

const getUsers = async (userSearchOptions: IUserSearchOptions) => {};

const editUser = async (editedUser: IUser) => {};

const deleteUser = async (id: string) => {};

export const UserService = { getUser, getUsers, editUser, deleteUser };
