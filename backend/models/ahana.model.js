import mongoose from "mongoose";

const ahanaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    qualification: {
        type: String,
        required: true
    },
},
{
    timestamps: true,   //createdAt, updatedAt
}
);

const Ahana = mongoose.model("Ahana", ahanaSchema);   //creates a collection called Product with scheme : productSchema

export default Ahana;

