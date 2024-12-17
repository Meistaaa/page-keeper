import { Request, Response } from "express";
import { RegisterValidation } from "../validation/register.validation";
import UserModel from "../models/User";
import { ApiError } from "../utils/ApiError";
import bcrypt from "bcryptjs";
import { LoginValidation } from "../validation/login.validation";
import { sign } from "jsonwebtoken";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHanlder";
import jwt from "jsonwebtoken";
const salt = 10;
export interface RegisterResponse {
  status: number;
  data: any;
}
export const Register = asyncHandler(async (req: Request, res: Response) => {
  const body = req.body;
  const { error } = RegisterValidation.validate(body);
  console.log(body);
  if (error) {
    throw new ApiError(
      400,
      "Validation failed",
      error.details.map((detail) => detail.message)
    );
  }
  console.log(1);
  const { username, email, password, passwordConfirm } = body;

  if (password !== passwordConfirm) {
    throw new ApiError(400, "Passwords doesn't match");
  }

  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "User with this email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await UserModel.create({
    username,
    email,
    password: hashedPassword,
  });
  user.save();

  const createdUser = await UserModel.findById(user._id).select("-password");
  return res
    .status(201)
    .json(ApiResponse(200, createdUser, "User registered Successfully"));
});

// login
export const Login = asyncHandler(async (req: Request, res: Response) => {
  const body = req.body;
  const { error } = LoginValidation.validate(body);
  if (error) {
    res.status(400).send({ message: error.details });
    return;
  }
  const { email, password } = body;
  const foundUser = await UserModel.findOne({ email });
  if (!foundUser) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordCorrect = await bcrypt.compare(password, foundUser.password);
  console.log(isPasswordCorrect);
  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid credentials");
  }

  const payload = {
    id: foundUser.id,
  };
  const options = {
    httpOnly: true,
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  };
  const token = sign(payload, process.env.JWT_SECRET);

  res.cookie("jwt", token, options);
  return res.status(201).json(ApiResponse(200, "User logged in Successfully"));
});

export const AuthenticatedUser = asyncHandler(
  async (req: Request, res: Response) => {
    const token = req.cookies.jwt;
    if (!token) {
      throw new ApiError(401, "Not authenticated");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
    };
    if (!decoded) {
      throw new ApiError(401, "Unauthenticated User");
    }
    const user = await UserModel.findById(decoded.id).select("-password");

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const response = ApiResponse(
      200,
      { user },
      "User authenticated successfully"
    );
    return res.status(response.statusCode).json(response);
  }
);

export const Logout = asyncHandler(async (req: Request, res: Response) => {
  res.cookie("jwt", {
    httpOnly: true,
    secure: true,
    maxAge: 0,
  });

  const response = ApiResponse(200, null, "User logged out successfully");
  return res.status(response.statusCode).json(response);
});
