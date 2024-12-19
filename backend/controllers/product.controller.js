import Product from "../models/product.model.js";

export const getProduct = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

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
    const product = req.body;
    if (!product.name || !product.price ||  !product.image) {
        return res.status(400).json({success:false, message: 'All fields are required' });
    }
    const newProduct = new Product(product)
    try {
        await newProduct.save();
        res.status(200).json({success:true, data:newProduct});
    } catch (error) {
        res.status(500).json({success: false, message: 'Server error' });
    }
}