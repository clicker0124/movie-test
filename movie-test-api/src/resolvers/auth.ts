import { LoginResponse, RegisterResponse, UserInfo, Context } from "../types";
import { User, UserModel } from "../models";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function register(_: void, args: any): Promise<RegisterResponse> {
  const { username, email, password } = args;
  const existingUser: number = await UserModel.countDocuments({
    $or: [{ username }, { email }],
  });
  if (existingUser > 0) {
    throw new Error("Username or email already used!");
  }
  const hashedPassword: string = await bcrypt.hash(password, 10);
  const user: User = new UserModel({
    username,
    email,
    password: hashedPassword,
  });
  await user.save();
  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    "secret"
  );
  return {
    id: user._id,
    username: user.username,
    email: user.email,
    token,
  };
}

export async function user(_: void, args: any): Promise<UserInfo> {
  const { userId } = args;

  const user: User | null = await UserModel.findById(userId);

  if (!user) {
    throw new Error("User not found by ID");
  }

  return {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
  };
}

export async function login(_: void, args: any): Promise<LoginResponse> {
  const { username, password } = args;
  const user: User | null = await UserModel.findOne({ username });
  if (!user) {
    throw new Error("Invalid login!");
  }
  const passwordValid = await bcrypt.compare(password, user.password);
  if (!passwordValid) {
    throw new Error("Invalid login!");
  }
  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    "secret"
  );
  return {
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  };
}

export async function currentUser(
  _: void,
  _args: any,
  ctx: Context
): Promise<UserInfo> {
  const { userInfo } = ctx;
  if (!userInfo) {
    throw new Error("Not authenticated!");
  }
  const user: User | null = await UserModel.findOne({ _id: userInfo.id });
  if (!user) {
    throw new Error("Not authenticated!");
  }
  return {
    id: user._id,
    username: user.username,
    email: user.email,
  };
}
