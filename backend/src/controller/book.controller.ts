import { Request, Response } from "express";
import { ApiError } from "../utils/ApiError";

import { asyncHandler } from "../utils/asyncHanlder";
import { ApiResponse } from "../utils/ApiResponse";
import BookModel from "../models/Book";
import { BookValidation } from "../validation/book.validation";

// CREATE BOOK

export const createBook = asyncHandler(async (req: Request, res: Response) => {
  const body = req.body;
  const { error } = BookValidation.validate(body);
  const user = req["user"];

  if (error) {
    throw new ApiError(
      400,
      "Validation failed",
      error.details.map((detail) => detail.message)
    );
  }
  const {
    title,
    author,
    description,
    publicationDate,
    genre,
    publisher,
    inStock,
    price,
    quantity,
  } = body;
  const book = await BookModel.create({
    title,
    author,
    description,
    publicationDate,
    genre,
    publisher,
    inStock,
    price,
    quantity,
    user: user._id,
  });
  user.books = book;
  user.save();
  book.save();
  const response = ApiResponse(201, { book }, "Book created successfully");
  res.status(response.statusCode).json(response);
});

// GET ALL BOOKS

export const getAllBooks = asyncHandler(async (req: Request, res: Response) => {
  const books = await BookModel.find();
  const response = ApiResponse(200, { books }, "Books retrieved successfully");
  res.status(response.statusCode).json(response);
});

// GET A SINGLE BOOK

export const getBookById = asyncHandler(async (req: Request, res: Response) => {
  const book = await BookModel.findById(req.params.id);
  if (!book) {
    throw new ApiError(404, "Book not found");
  }
  const response = ApiResponse(200, { book }, "Book retrieved successfully");
  res.status(response.statusCode).json(response);
});

// UPDATE BOOK
export const updateBook = asyncHandler(async (req: Request, res: Response) => {
  const body = req.body;
  const { error } = BookValidation.validate(body);
  const user = req["user"];
  if (error) {
    throw new ApiError(
      400,
      "Validation failed",
      error.details.map((detail) => detail.message)
    );
  }

  const book = await BookModel.findByIdAndUpdate(req.params.id, body, {
    new: true,
    runValidators: true,
  });

  if (!book) {
    throw new ApiError(404, "Book not found");
  }
  if (!book.user.equals(user._id)) {
    throw new ApiError(401, "UnAuthorized");
  }
  const updatedBook = await book.save();
  const response = ApiResponse(
    200,
    { updatedBook },
    "Book updated successfully"
  );
  res.status(response.statusCode).json(response);
});

// DELETE BOOK
export const deleteBook = asyncHandler(async (req: Request, res: Response) => {
  const book = await BookModel.findByIdAndDelete(req.params.id);
  if (!book) {
    throw new ApiError(404, "Book not found");
  }
  const response = ApiResponse(200, null, "Book deleted successfully");
  res.status(response.statusCode).json(response);
});
