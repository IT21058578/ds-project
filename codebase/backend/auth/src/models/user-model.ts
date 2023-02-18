import mongoose, { model, Schema } from "mongoose";

import { IUser } from "../types";

const userSchema = new Schema<IUser>({});

const User = model<IUser>("User", userSchema);

export { User };
