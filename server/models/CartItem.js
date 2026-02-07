import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    cart_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Cart",
    },
    item_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Item",
    },
    quantity: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true },
);

const CartItem = mongoose.model("CartItem", cartItemSchema);

export default CartItem;
