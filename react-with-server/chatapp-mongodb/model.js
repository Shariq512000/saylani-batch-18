import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdOn: { type: Date, default: Date.now }
});


export const userModel = mongoose.model('Users', userSchema);

const messageSchema = new mongoose.Schema({
    from: { type: mongoose.Schema.ObjectId, ref: 'Users', required: true }, // kisne send kia hai
    to: { type: mongoose.Schema.ObjectId, ref: 'Users', required: true }, // kisko send kia hai
    message: { type: String, required: true },
    file: { type: String },
    createdOn: { type: Date, default: Date.now }
});


export const messageModel = mongoose.model('Messages', messageSchema);