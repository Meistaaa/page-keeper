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
  const page = parseInt(req.params.page || "1", 10); // Default to page 1 if not provided
  const limit = 10;
  const skip = (page - 1) * limit;

  const totalBooks = await BookModel.countDocuments();
  const books = await BookModel.find().skip(skip).limit(limit);

  const response = ApiResponse(
    200,
    {
      books,
      pagination: {
        totalBooks,
        currentPage: page,
        totalPages: Math.ceil(totalBooks / limit),
      },
    },
    "Books retrieved successfully"
  );
  res.status(response.statusCode).json(response);
});

// GET A SINGLE BOOK

export const getBookById = asyncHandler(async (req: Request, res: Response) => {
  const book = await BookModel.findById(req.params.id).populate("user");
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

  const book = await BookModel.findOneAndUpdate(
    { _id: req.params.id, user },
    body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!book) {
    throw new ApiError(404, "Book not found");
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
  const user = req["user"];
  const book = await BookModel.findOneAndDelete({
    _id: req.params.id,
    user,
  });
  if (!book) {
    throw new ApiError(404, "Book not found");
  }
  const response = ApiResponse(200, null, "Book deleted successfully");
  res.status(response.statusCode).json(response);
});