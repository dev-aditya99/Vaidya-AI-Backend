import mongoose from "mongoose";

const diseaseSchema = mongoose.Schema({
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
}, { timestamps: true })

const Disease = mongoose.model("Disease", diseaseSchema);

export default Disease;