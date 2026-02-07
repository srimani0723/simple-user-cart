import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    cart_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Cart",
    },
    itemsList: {
      type: Array,
      items: [
        {
          item_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Item",
          },
          quantity: {
            type: Number,
            required: true,
          },
        },
      ],
    },
  },
  { timestamps: true },
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
