import Router from "express";
import { getCurrentUser, getApplicationStats, updateUser } from "../controllers/userController.js";
import { updateCurrentUser } from "../middlewares/validationMiddleware.js";
import { adminMiddleware } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multerMiddleware.js";
const router = Router();


router.get('/current-user',getCurrentUser)
router.get('/admin/stats',adminMiddleware,getApplicationStats)
router.patch('/update-user',  upload.single('avatar'),updateCurrentUser,updateUser)
export default router;
