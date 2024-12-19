import express from 'express';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import productRouter from './routes/product.router.js';


dotenv.config(); 
const app = express();

app.use(express.json());

app.use('/api/products', productRouter);

// console.log(process.env.MONGO_URI);
app.listen(5001, () => {
    connectDB();
    console.log('Server started at http://localhost:5001');
})
;