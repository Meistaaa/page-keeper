import { Request, Response } from "express";
import { Order } from "../models/Order";
import { Cart } from "../models/Cart";
import {
  validateOrderItems,
  calculateOrderTotal,
  updateBookStock,
  restoreBookStock,
} from "../utils/order.utils";
import { asyncHandler } from "../utils/asyncHanlder";
import { ShippingAddressValidation } from "../validation/order.validation";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";

// Create order from cart
export const createOrder = asyncHandler(async (req: Request, res: Response) => {
  const { shippingAddress } = req.body;
  const { error } = ShippingAddressValidation.validate(shippingAddress);
  if (error) {
    throw new ApiError(
      400,
      "Validation failed",
      error.details.map((detail) => detail.message)
    );
  }
  const user = req["user"];
  const cart = await Cart.findOne({ user: user._id }).populate("items.book");
  if (!cart || cart.items.length === 0) {
    throw new ApiError(400, "Cart is empty");
  }

  // Validate stock availability
  const isValid = await validateOrderItems(cart.items);
  if (!isValid) {
    throw new ApiError(400, "Some item are out of stock");
  }

  // Create order
  const order = new Order({
    user: user._id,
    items: cart.items,
    totalAmount: cart.totalAmount,
    shippingAddress,
    status: "pending",
    paymentStatus: "pending",
  });

  // Update book stock
  await updateBookStock(cart.items);

  // Clear cart
  cart.items = [];
  cart.totalAmount = 0;
  if (!user.orders.includes(order._id)) {
    user.orders.push(order._id);
  }
  await Promise.all([order.save(), cart.save(), user.save()]);
  const response = ApiResponse(200, { order }, "Order created successfully ");
  res.status(response.statusCode).json(response);
});

// Get user's orders
export const getUserOrders = asyncHandler(
  async (req: Request, res: Response) => {
    console.log("object");
    const user = req["user"];
    console.log("object1");
    const orders = await Order.find({ user: user._id })
      .populate("items.book")
      .sort({ createdAt: -1 });
    console.log("object2");

    const response = ApiResponse(
      200,
      { orders },
      "Retrieved Orders successfully "
    );
    console.log("object2");
    res.status(response.statusCode).json(response);
  }
);

// Get order by ID
export const getOrderById = asyncHandler(
  async (req: Request, res: Response) => {
    const user = req["user"];
    const order = await Order.findOne({
      _id: req.params.id,
      user: user._id,
    }).populate("items.book");

    if (!order) {
      throw new ApiError(400, "Order Not Found");
    }
    const response = ApiResponse(
      200,
      { order },
      "Retrieved Order successfully "
    );
    res.status(response.statusCode).json(response);
  }
);

// Update order status (Admin only)
export const updateOrderStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      throw new ApiError(400, "Order Not Found");
    }

    order.status = status;
    await order.save();

    const response = ApiResponse(200, { order }, "Updated Order successfully ");
    res.status(response.statusCode).json(response);
  }
);

// Update payment status (Admin only)
export const updatePaymentStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const { paymentStatus } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      throw new ApiError(400, "Order Not Found");
    }

    order.paymentStatus = paymentStatus;
    await order.save();

    const response = ApiResponse(
      200,
      { order },
      "Updated Order Payment  successfully "
    );
    res.status(response.statusCode).json(response);
  }
);

// remove order
export const removeOrder = asyncHandler(async (req: Request, res: Response) => {
  const user = req["user"];
  const order = await Order.findOne({
    _id: req.params.id,
    $or: [
      { user: user._id },
      { user: user.isAdmin ? { $exists: true } : user._id },
    ],
  });

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  // Only allow cancellation of pending or processing orders
  if (!["pending", "processing"].includes(order.status)) {
    throw new ApiError(
      400,
      "Cannot remove orders that are shipped, delivered, or cancelled"
    );
  }

  // Restore book stock
  await restoreBookStock(order.items);

  // Remove the order
  await order.deleteOne();

  const response = ApiResponse(200, "Removed Order successfully ");
  res.status(response.statusCode).json(response);
});
