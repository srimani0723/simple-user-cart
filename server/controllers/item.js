import Item from "../models/Item.js";

export const getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items ?? []);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createItem = async (req, res) => {
  try {
    const { name, status = "instock", price } = req.body;
    const item = await Item.create({ name, status, price });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
