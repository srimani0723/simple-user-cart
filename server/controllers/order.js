import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import CartItem from "../models/CartItem.js";

export const createOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user_id: req.user.id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const cartItems = await CartItem.find({ cart_id: cart._id });

    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const list = cartItems.map((item) => {
      return {
        item_id: item.item_id,
        quantity: item.quantity,
      };
    });

    await Order.create({
      user_id: req.user.id,
      cart_id: cart._id,
      itemsList: list,
    });

    await CartItem.deleteMany({ cart_id: cart._id });

    res.status(201).json({ message: "Order created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user_id: req.user.id });

    if (!orders) {
      return res.status(404).json({ message: "Orders not found with user" });
    }

    if (orders.length === 0) {
      return res.status(200).json({
        message: "Orders not placed at",
      });
    }

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
