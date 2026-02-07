import express from "express";
import { createCart, getCart } from "../controllers/cart.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, createCart);
router.get("/", auth, getCart);

export default router;
