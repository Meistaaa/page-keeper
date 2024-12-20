import { Router } from "express";

import { authMiddleware } from "../middleware/auth.middleware";
import {
  addToCart,
  getCart,
  removeFromCart,
  updateCart,
} from "../controller/cart.controller";

const router = Router();

router.post("/add-to-cart/:id", authMiddleware, addToCart);
router.get("/get-cart", authMiddleware, getCart);
router.delete("/delete/:id", authMiddleware, removeFromCart);
router.put("/update-cart/:id", authMiddleware, updateCart);

export default router;
