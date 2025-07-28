import { Router } from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/authController.js";
import { validateUserRegisterInput, validateUserLoginInput } from "../middlewares/validationMiddleware.js";
import expressRateLimit from "express-rate-limit";
const router = Router();

const authRateLimit = expressRateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: "Too many requests from this IP, please try again after 15 minutes",
});
router.route('/register').post(authRateLimit,validateUserRegisterInput, registerUser);
router.route('/login').post(authRateLimit,validateUserLoginInput, loginUser);
router.get('/logout', logoutUser);

export default router;
