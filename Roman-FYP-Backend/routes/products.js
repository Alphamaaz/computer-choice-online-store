const express = require("express");
const multer = require("multer");
const Product = require("../models/Product");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

// =======================
// Multer setup for images
// =======================
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // ensure "uploads" folder exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// =======================
// CRUD Routes
// =======================

// @desc    Get all products
// @route   GET /api/products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ status: "success", data: products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Server error" });
  }
});

// @desc    Get single product
// @route   GET /api/products/:id
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ status: "error", message: "Product not found" });
    }
    res.json({ status: "success", data: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Server error" });
  }
});

// @desc    Create product (Admin only)
// @route   POST /api/products
router.post(
  "/",
  protect,
  authorize("admin"),
  upload.single("productImage"),
  async (req, res) => {
    try {
      const productData = {
        ...req.body,
        productImage: req.file ? `/uploads/${req.file.filename}` : null,
      };

      const product = new Product(productData);
      await product.save();

      res.status(201).json({
        status: "success",
        message: "Product created successfully",
        data: product,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "error", message: "Server error" });
    }
  }
);

// @desc    Update product (Admin only)
// @route   PUT /api/products/:id
router.put(
  "/:id",
  protect,
  authorize("admin"),
  upload.single("productImage"),
  async (req, res) => {
    try {
      let updateData = { ...req.body };

      if (req.file) {
        updateData.productImage = `/uploads/${req.file.filename}`;
      }

      const product = await Product.findByIdAndUpdate(
        req.params.id,
        updateData,
        {
          new: true,
          runValidators: true,
        }
      );

      if (!product) {
        return res
          .status(404)
          .json({ status: "error", message: "Product not found" });
      }

      res.json({
        status: "success",
        message: "Product updated successfully",
        data: product,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "error", message: "Server error" });
    }
  }
);

// @desc    Delete product (Admin only)
// @route   DELETE /api/products/:id
router.delete("/:id", protect, authorize("admin"), async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res
        .status(404)
        .json({ status: "error", message: "Product not found" });
    }

    res.json({ status: "success", message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Server error" });
  }
});

module.exports = router;
