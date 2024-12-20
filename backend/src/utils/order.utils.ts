import { IOrderItem } from "../interfaces/order.interface";
import BookModel from "../models/Book";

export const validateOrderItems = async (
  items: IOrderItem[]
): Promise<boolean> => {
  for (const item of items) {
    const book = await BookModel.findById(item.book);
    if (!book || book.quantity < item.quantity) {
      return false;
    }
  }
  return true;
};

export const calculateOrderTotal = (items: IOrderItem[]): number => {
  return items.reduce((total, item) => total + item.price, 0);
};

export const updateBookStock = async (items: IOrderItem[]): Promise<void> => {
  for (const item of items) {
    const book = await BookModel.findById(item.book);
    if (book) {
      book.quantity -= item.quantity;
      await book.save();
    }
  }
};
export const restoreBookStock = async (items: IOrderItem[]): Promise<void> => {
  for (const item of items) {
    const book = await BookModel.findById(item.book);
    if (book) {
      book.quantity += item.quantity;
      await book.save();
    }
  }
};
