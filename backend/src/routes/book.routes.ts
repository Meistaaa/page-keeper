import { Router } from "express";
import {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
  getUserBooks,
  searchBooks,
} from "../controller/book.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post("/create", authMiddleware, createBook);
router.get("/get-all-books/:page", getAllBooks);
router.get("/get-user-books/:page", authMiddleware, getUserBooks);
router.get("/get-book-by-id/:id", getBookById);
router.put("/update-book/:id", authMiddleware, updateBook);
router.delete("/delete-book/:id", authMiddleware, deleteBook);
router.get("/search", searchBooks);

export default router;
