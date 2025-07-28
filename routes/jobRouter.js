import { Router } from "express";
import { getAllJobs, getJob, getStats, createJob, updateJob, deleteJob } from "../controllers/jobController.js";
import { validateJobInput } from "../middlewares/validationMiddleware.js";  
import { validateId } from "../middlewares/validationMiddleware.js";
import { checkForTestUser } from "../middlewares/authMiddleware.js";
const router = Router();

router.route('/').get(getAllJobs).post(validateJobInput,checkForTestUser,createJob);
router.route('/stats').get(getStats);
router.route('/:id').get(validateId,getJob).patch(validateId,checkForTestUser,validateJobInput,updateJob).delete(validateId,checkForTestUser,deleteJob);

export default router;
