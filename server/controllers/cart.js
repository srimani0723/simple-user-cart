import Cart from "../models/Cart.js";
import CartItem from "../models/CartItem.js";

export const createCart = async (req, res) => {
  try {
    const { name, status = "open", item } = req.body;

    //check if cart exists with the user id
    const cart = await Cart.findOne({ user_id: req.user.id });

    if (cart) {
      const itemExist = await CartItem.findOne({
        cart_id: cart._id,
        item_id: item,
      });

      if (itemExist) {
        await CartItem.updateOne(
          { _id: itemExist._id },
          { $set: { quantity: itemExist.quantity + 1 } },
        );
      } else {
        await CartItem.create({
          cart_id: cart._id,
          item_id: item,
        });
      }
    } else {
      const newCart = await Cart.create({ user_id: req.user.id, name, status });

      const cartItem = await CartItem.create({
        cart_id: newCart._id,
        item_id: item,
      });
    }

    res.status(201).json({
      message: "Successfully added item to cart",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user_id: req.user.id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const cartItems = await CartItem.find({ cart_id: cart._id });

    res.status(200).json({ cartItems });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
