import { Router } from "express";
import {
  AuthenticatedUser,
  Login,
  Logout,
  Register,
} from "../controller/auth.controller";

const router = Router();

router.post("/register", Register);
router.post("/login", Login);
router.get("/me", AuthenticatedUser);
router.post("/logout", Logout);

export default router;