import mongoose from "mongoose";
import { JOB_STATUS, JOB_TYPE, JOB_LOCATION } from "../utils/constant.js";    
const JobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide job title"],
        trim: true,
    },
    company: {
        type: String,
        required: [true, "Please provide company name"],
        trim: true,
    },
    location: String,
    status: {
        type: String,
        enum: Object.values(JOB_STATUS),
        default: JOB_STATUS.PENDING,
    },
    jobType:{
        type: String,
        enum: Object.values(JOB_TYPE),
        default: JOB_TYPE.FULL_TIME,
    },
    jobLocation: {
        type: String,
        default: JOB_LOCATION,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
},{timestamps:true});
export default mongoose.model("Job", JobSchema);   