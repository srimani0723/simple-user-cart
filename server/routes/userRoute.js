import express from "express";
import { auth } from "../middleware/auth.js";
import { registerUser, loginUser, logoutUser } from "../controllers/user.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/login", loginUser);
router.post("/logout", auth, logoutUser);

export default router;
