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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // assumes your user model is named "User"
    required: true
  }
}, {
  timestamps: true // adds createdAt and updatedAt
});

const Product = mongoose.model("Product", productSchema);

export default Product;

// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     price: {
//         type: Number,
//         required: true
//     },
//     image: {
//         type: String,
//         required: true
//     },
// },
// {
//     timestamps: true,   //createdAt, updatedAt
// }
// );

// const Product = mongoose.model("Product", productSchema);   //creates a collection called Product with scheme : productSchema

// export default Product;

