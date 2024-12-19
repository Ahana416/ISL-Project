import express from 'express';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import Product from './models/product.model.js';
import Ahana from './models/ahana.model.js';


dotenv.config(); 
const app = express();

app.use(express.json());

app.post('/api/products',async (req, res) => {
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
});

app.delete('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

app.put('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

app.post('/api/ahanas', async (req, res) => {
    const ahana = req.body;
    if(!ahana.name || !ahana.age || !ahana.qualification) {
        return res.status(400).json({success:false, message: 'All fields are required' });
    }
    const newAhana = new Ahana(ahana);
    try {
        await newAhana.save();
        res.status(200).json({success:true, data:newAhana});
    } catch (error) {
        res.status(500).json({success: false, message: 'Server error' });
    }
});
// console.log(process.env.MONGO_URI);
app.listen(5000, () => {
    connectDB();
    console.log('Server started at http://localhost:5000');
});
