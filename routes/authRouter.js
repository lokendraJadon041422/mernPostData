import { Router } from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/authController.js";
import { validateUserRegisterInput, validateUserLoginInput } from "../middlewares/validationMiddleware.js";
const router = Router();

router.route('/register').post(validateUserRegisterInput, registerUser);
router.route('/login').post(validateUserLoginInput, loginUser);
router.get('/logout', logoutUser);
// router.get('/me', getMe);
// router.get('/refresh', refreshUser);
// router.get('/stats', getStats);

export default router;
