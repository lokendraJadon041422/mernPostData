import "express-async-errors"
import express from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
import cloudinary from "cloudinary";
dotenv.config();
const app = express();

// file imports
import jobRouter from "./routes/jobRouter.js";
import authRouter from "./routes/authRouter.js";
import { errorHandlerMiddleware } from "./middlewares/errorMiddleware.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";
import { checkForTestUser } from "./middlewares/authMiddleware.js";
import userRouter from "./routes/userRoutes.js";
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, './public')));
app.use(express.static(path.resolve(__dirname, './my-client/dist')));
app.use(express.json());
app.use(cookieParser());

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
})
const PORT = process.env.PORT || 3000;
app.get("/api/v1/test", (req, res) => {
    res.json({ message: "Test" });
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users",authMiddleware,userRouter)
app.use("/api/v1/jobs",authMiddleware,jobRouter);
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './my-client/dist', 'index.html'));
});
app.use('*', (req, res) => {
    res.status(400).json({
        message: "Page not found",
    });
});

app.use(errorHandlerMiddleware);

const startServer = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        console.error(error.stack); // For detailed stack trace
        process.exit(1);
    }
}
startServer();
