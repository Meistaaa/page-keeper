import { Router } from "express";
import authRoutes from "./auth.routes";
import bookRoutes from "./book.routes";

export const routes = (router: Router): void => {
  router.use("/api/auth", authRoutes);
  router.use("/api/books", bookRoutes);
};
