import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        enum: ["male", "female"]
    },
    DOB: {
        type: String,
        default: ""
    },
    age: {
        type: Number,
        default: ""
    },
    profile_pic: {
        type: String,
        default: ""
    },
}, { timestamps: true })

const User = mongoose.model("User", userSchema);

export default User;