import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["instock", "outstock"],
      default: "instock",
    },
    price: {
      type: Number,
    },
  },
  { timestamps: true },
);

const Item = mongoose.model("Item", itemSchema);

export default Item;
