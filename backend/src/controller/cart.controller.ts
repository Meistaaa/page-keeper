import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHanlder";
import CartModel, { Cart } from "../models/Cart";
import { ApiError } from "../utils/ApiError";
import BookModel from "../models/Book";
import { ApiResponse } from "../utils/ApiResponse";
import { CartValidation } from "../validation/cart.validation";

// ... other imports

export const addToCart = asyncHandler(async (req: Request, res: Response) => {
  const user = req["user"];
  const bookId = req.params.id;
  console.log(bookId);
  const body = req.body;
  console.log(body);
  const { quantity } = body;
  const { error } = CartValidation.validate(body);
  if (error) {
    throw new ApiError(
      400,
      "Validation failed",
      error.details.map((detail) => detail.message)
    );
  }
  const book = await BookModel.findById(bookId);
  console.log(book);
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  if (book.quantity < quantity) {
    return res.status(400).json({ message: "Insufficient stock" });
  }

  let cart = await Cart.findOne({ user: user._id });

  if (!cart) {
    cart = new Cart({
      user: user._id,
      items: [],
      totalAmount: 0,
    });
  }

  const existingItem = cart.items.find(
    (item) => item.book.toString() === bookId
  );

  if (existingItem) {
    existingItem.quantity += quantity;
    existingItem.price = book.price * existingItem.quantity;
  } else {
    cart.items.push({
      book: book.id,
      quantity,
      price: book.price * quantity,
    });
  }
  user.cart.push(cart._id);
  await user.save();
  cart.totalAmount = cart.items.reduce((total, item) => total + item.price, 0);
  await cart.save();
  const response = ApiResponse(200, { cart }, "Added to cart successfully");
  res.status(response.statusCode).json(response);
});

export const removeFromCart = asyncHandler(
  async (req: Request, res: Response) => {
    const { bookId } = req.body;
    const user = req["user"];

    try {
      const cart = await CartModel.findOne({ user: user._id });

      if (!cart) {
        throw new ApiError(404, "Cart not found");
      }

      const bookIndex = cart.items.findIndex(
        (item) => item.book.toString() === bookId
      );

      if (bookIndex !== -1) {
        cart.items[bookIndex].quantity--;
        if (cart.items[bookIndex].quantity === 0) {
          cart.items.splice(bookIndex, 1);
        }
        await cart.save();
        res.status(200).json({ message: "Book removed from cart" });
      } else {
        throw new ApiError(404, "Book not found in cart");
      }
    } catch (error) {
      throw new ApiError(500, "Error removing book from cart");
    }
  }
);
export const updateCart = asyncHandler(
  async (req: Request, res: Response) => {}
);
export const getCart = asyncHandler(async (req: Request, res: Response) => {
  const user = req["user"];
  const cart = await Cart.findOne({ user: user._id }).populate("items.book");

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }
  const response = ApiResponse(200, { cart }, "Added to cart successfully");
  res.status(response.statusCode).json(response);
});
