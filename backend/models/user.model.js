import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,   //createdAt, updatedAt
});
const User = mongoose.model("User", userSchema);   //creates a collection called User with scheme : userSchema
export default User;