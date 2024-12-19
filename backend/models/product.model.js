import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
},
{
    timestamps: true,   //createdAt, updatedAt
}
);

const Product = mongoose.model("Product", productSchema);   //creates a collection called Product with scheme : productSchema

export default Product;

