const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = 4000;

// Replace with your actual MongoDB Atlas connection string
const MONGO_URI = process.env.MONGO_URI;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Product Schema
const productSchema = new mongoose.Schema({
  name: String,
  brand: String,
  category: String,
  price: Number,
  oldPrice: Number,
  image: String,
  badge: String,
  isNew: Boolean,
});

const Product = mongoose.model("Product", productSchema);

// Cart Schema
const cartSchema = new mongoose.Schema({
  userId: String, // or sessionId if not using auth
  items: [
    {
      productId: String,
      quantity: Number,
    },
  ],
});
const Cart = mongoose.model("Cart", cartSchema);

// Helper: Filtering, Sorting, Pagination
function buildQuery(query) {
  const filter = {};
  if (query.brand) filter.brand = query.brand;
  if (query.category) filter.category = query.category;
  if (query.minPrice)
    filter.price = { ...filter.price, $gte: Number(query.minPrice) };
  if (query.maxPrice)
    filter.price = { ...filter.price, $lte: Number(query.maxPrice) };
  return filter;
}

// GET products (with filter, sort, pagination)
app.get("/products", async (req, res) => {
  const filter = buildQuery(req.query);
  const sort = {};
  if (req.query.sortBy) {
    sort[req.query.sortBy] = req.query.order === "desc" ? -1 : 1;
  }
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 16;
  const skip = (page - 1) * limit;

  const [products, total] = await Promise.all([
    Product.find(filter).sort(sort).skip(skip).limit(limit),
    Product.countDocuments(filter),
  ]);
  res.json({ products, total });
});

// POST add product
app.post("/products", async (req, res) => {
  const product = new Product({
    ...req.body,
    image: req.body.image || "https://via.placeholder.com/200x200?text=Product",
  });
  await product.save();
  res.status(201).json(product);
});

// PUT update product
app.put("/products/:id", async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!product) return res.status(404).json({ error: "Not found" });
  res.json(product);
});

// DELETE product
app.delete("/products/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

// Optionally, add endpoints for brands/categories
app.get("/brands", async (req, res) => {
  const brands = await Product.distinct("brand");
  res.json(brands);
});
app.get("/categories", async (req, res) => {
  const categories = await Product.distinct("category");
  res.json(categories);
});

// Add to cart
app.post("/cart/add", async (req, res) => {
  const { userId, productId, quantity = 1 } = req.body;
  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = new Cart({ userId, items: [] });
  }
  const item = cart.items.find((i) => i.productId === productId);
  if (item) {
    item.quantity += quantity;
  } else {
    cart.items.push({ productId, quantity });
  }
  await cart.save();
  res.json(cart);
});

// Get cart
app.get("/cart", async (req, res) => {
  const { userId } = req.query;
  const cart = await Cart.findOne({ userId });
  res.json(cart || { userId, items: [] });
});

app.get("/", (req, res) => {
  res.send("API is running. Use /products for product data.");
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
