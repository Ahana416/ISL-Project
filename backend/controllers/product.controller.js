import Product from "../models/product.model.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
export const getProduct = async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1]; // Get token from Authorization header
    if (!token) return res.status(403).json({ success: false, message: 'Authorization required' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id; // userId from token

        const products = await Product.find({ user: userId }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// export const getProduct = async (req, res) => {
//     try {
//         const products = await Product.find().sort({ createdAt: -1 });
//         res.status(200).json({ success: true, data: products });
//     } catch (error) {
//         res.status(500).json({ success: false, message: 'Server error' });
//     }
// };

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const createProduct = async (req, res) => {
    const { name, price, image } = req.body;

    if (!name || !price || !image) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Extract userId from the token
    const token = req.headers.authorization?.split(" ")[1]; // Get token from Authorization header
    if (!token) return res.status(403).json({ success: false, message: 'Authorization required' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id; // userId from token

        const newProduct = new Product({
            name,
            price,
            image,
            user: userId // associate product with the logged-in user
        });

        await newProduct.save();
        res.status(200).json({ success: true, data: newProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
// export const createProduct = async (req, res) => {
//     const product = req.body;
//     if (!product.name || !product.price ||  !product.image) {
//         return res.status(400).json({success:false, message: 'All fields are required' });
//     }
//     const newProduct = new Product(product)
//     try {
//         await newProduct.save();
//         res.status(200).json({success:true, data:newProduct});
//     } catch (error) {
//         res.status(500).json({success: false, message: 'Server error' });
//     }
// }