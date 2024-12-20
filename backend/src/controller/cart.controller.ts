import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHanlder";
import CartModel, { Cart } from "../models/Cart";
import { ApiError } from "../utils/ApiError";
import BookModel from "../models/Book";
import { ApiResponse } from "../utils/ApiResponse";
import { CartValidation } from "../validation/cart.validation";

// ADD TO CART
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

  book.quantity -= quantity;
  if (!user.cart.includes(cart._id)) {
    user.cart.push(cart._id);
  }
  await user.save();
  cart.totalAmount = cart.items.reduce((total, item) => total + item.price, 0);
  await cart.save();
  await book.save();
  const response = ApiResponse(200, { cart }, "Added to cart successfully");
  res.status(response.statusCode).json(response);
});

// REMOVE BOOKS FROM CART
export const removeFromCart = asyncHandler(
  async (req: Request, res: Response) => {
    const bookId = req.params.id;
    const user = req["user"];

    const cart = await Cart.findOne({ user: user._id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const cartItem = cart.items.find((item) => item.book.toString() === bookId);

    if (cartItem) {
      // Restore book stock
      const book = await BookModel.findById(bookId);
      if (book) {
        book.quantity += cartItem.quantity;
        await book.save();
      }
    }

    cart.items = cart.items.filter((item) => item.book.toString() !== bookId);

    cart.totalAmount = cart.items.reduce(
      (total, item) => total + item.price,
      0
    );
    await cart.save();
    res.status(200).json({ message: "Book removed from cart" });
  }
);

// UPDATE CARTS
export const updateCart = asyncHandler(async (req: Request, res: Response) => {
  const bookId = req.params.id;
  const { quantity } = req.body;
  const user = req["user"];
  const book = await BookModel.findById(bookId);
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  if (book.quantity < quantity) {
    return res.status(400).json({ message: "Insufficient stock" });
  }
  const cart = await Cart.findOne({ user: user._id });
  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  const cartItem = cart.items.find((item) => item.book.toString() === bookId);

  if (!cartItem) {
    return res.status(404).json({ message: "Item not found in cart" });
  }
  const quantityDifference = quantity - cartItem.quantity;

  // Check if we have enough stock for an increase in quantity
  if (quantityDifference > 0 && book.quantity < quantityDifference) {
    return res.status(400).json({ message: "Insufficient stock" });
  }

  // Update book stock
  book.quantity -= quantityDifference; // Will add stock if quantityDifference is negative
  await book.save();

  // Update cart item
  cartItem.quantity = quantity;
  cartItem.price = book.price * quantity;
  cart.totalAmount = cart.items.reduce((total, item) => total + item.price, 0);

  await cart.save();
  res.json(cart);
});

// GET CART
export const getCart = asyncHandler(async (req: Request, res: Response) => {
  const user = req["user"];
  const cart = await Cart.findOne({ user: user._id }).populate("items.book");

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }
  const response = ApiResponse(200, { cart }, "Added to cart successfully");
  res.status(response.statusCode).json(response);
});
export const clearCart = asyncHandler(async (req: Request, res: Response) => {
  const user = req["user"];
  const cart = await Cart.findOne({ user: user._id });
  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  // Restore stock for all items
  for (const item of cart.items) {
    const book = await BookModel.findById(item.book);
    if (book) {
      book.quantity += item.quantity;
      await book.save();
    }
  }

  cart.items = [];
  cart.totalAmount = 0;
  await cart.save();
  const response = ApiResponse(200, "Cleared Cart successfully");
  res.status(response.statusCode).json(response);
});
