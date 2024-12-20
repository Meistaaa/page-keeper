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

// Create order from cart
export const createOrder = asyncHandler(async (req: Request, res: Response) => {
  const { shippingAddress } = req.body;
  const user = req["user"];
  const cart = await Cart.findOne({ user: user._id }).populate("items.book");
  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  // Validate stock availability
  const isValid = await validateOrderItems(cart.items);
  if (!isValid) {
    return res.status(400).json({ message: "Some items are out of stock" });
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

  res.status(201).json(order);
});

// Get user's orders
export const getUserOrders = asyncHandler(
  async (req: Request, res: Response) => {
    const user = req["user"];
    const orders = await Order.find({ user: user._id })
      .populate("items.book")
      .sort({ createdAt: -1 });

    res.json(orders);
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
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  }
);

// Update order status (Admin only)
export const updateOrderStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.json(order);
  }
);

// Update payment status (Admin only)
export const updatePaymentStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const { paymentStatus } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.paymentStatus = paymentStatus;
    await order.save();

    res.json(order);
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
    return res.status(400).json({
      message: "Cannot remove orders that are shipped, delivered, or cancelled",
    });
  }

  // Restore book stock
  await restoreBookStock(order.items);

  // Remove the order
  await order.deleteOne();

  res.json({ message: "Order removed successfully" });
});
