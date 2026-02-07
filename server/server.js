import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import userRoutes from "./routes/userRoute.js";
import cartRoutes from "./routes/cartRoute.js";
import itemRoutes from "./routes/itemRoute.js";
import orderRoutes from "./routes/orderRoute.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("Connected to the shopping user cart system");
});

app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`Server is running on port ${process.env.PORT}`);
});
