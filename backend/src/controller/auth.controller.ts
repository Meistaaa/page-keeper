import { Request, Response } from "express";
import { RegisterValidation } from "../validation/register.validation";
import UserModel from "../models/User";
import { ApiError } from "../utils/ApiError";
import bcrypt from "bcryptjs";
import { LoginValidation } from "../validation/login.validation";
import { sign } from "jsonwebtoken";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHanlder";

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

  const hashedPassword = bcrypt.hash(password, salt, (err, hash) => {
    if (err) {
      throw new ApiError(500, "Internal Server Error");
    }
    console.log("Hashed password:", hash);
  });
  const user = await UserModel.create({
    username,
    email,
    password,
  });
  user.save();

  const createdUser = await UserModel.findById(user._id).select("-password");
  return res
    .status(201)
    .json(ApiResponse(200, createdUser, "User registered Successfully"));
});

// login
export const Login = async (req: Request, res: Response) => {
  try {
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

    bcrypt.compare(password, foundUser.password, (err, hash) => {
      if (err) {
        throw new ApiError(400, "Invalid credentials");
      }
      console.log("Hashed password:", hash);
    });

    const payload = {
      id: foundUser.id,
    };

    const token = sign(payload, "secret");
    return ApiResponse(200, token, "Login Successful", true);
  } catch (error) {
    throw new ApiError(500, "Internal Server Error");
  }
};
