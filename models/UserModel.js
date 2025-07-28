import mongoose from "mongoose";
import { USER_ROLE } from "../utils/constant.js";
const User = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        default: "",
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
    location: {
        type: String,
        default: "my city",
    },
    role: {
        type: String,
        enum: Object.values(USER_ROLE),
        default: USER_ROLE.USER,
    },
    avatar: String,
    avatarPublicId: String,
},{timestamps:true});
export default mongoose.model("User", User);
    