import mongoose from "mongoose";

enum UserRole {
  ADMIN = "admin",
  CLIENT = "client",
}

export interface User extends mongoose.Document {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: string;
}

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.CLIENT,
    },
  },
  {
    versionKey: false,
  }
);

export const UserModel = mongoose.model<User>("User", UserSchema, "Users");
