import { body, param, validationResult } from "express-validator";
import { BadRequestError, NotFoundError } from "../errors/customError.js";
import { JOB_STATUS, JOB_TYPE } from "../utils/constant.js";
import mongoose from "mongoose";
import JobModel from "../models/JobModel.js";
import UserModel from "../models/UserModel.js";

export const withValidationErrors = (validateValues) => {
    return [
        validateValues,
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const errorMessages = errors.array().map((error) => error.msg);
                if (errorMessages[0].startsWith('no job')) {
                    throw new NotFoundError(errorMessages);
                }
                if (errorMessages[0].startsWith('not authorized')) {
                    throw new UnauthorizedError('not authorized to access this route');
                  }
                throw new BadRequestError(errorMessages);
            }
            next();
        },
    ];
};

export const validateJobInput = withValidationErrors([
    body('title').notEmpty().withMessage('title is required'),
    body('company').notEmpty().withMessage('company is required'),
    body('jobLocation').notEmpty().withMessage('job location is required'),
    body('jobStatus')
        .isIn(Object.values(JOB_STATUS))
        .withMessage('invalid status value'),
    body('jobType').isIn(Object.values(JOB_TYPE)).withMessage('invalid job type'),
]);

export const validateId = withValidationErrors([
    param('id').custom(async (value,{req}) => {
        const isValidId = mongoose.Types.ObjectId.isValid(value);
        if (!isValidId) throw new BadRequestError(`invalid ${value} id`);
        const job = await JobModel.findById(value);
        console.log(job);
        if (!job) throw new NotFoundError(`no job with id : ${value}`);
        const isAdmin = req.user.role === 'admin';
        const isOwner = req.user.userId === job.createdBy.toString();
        if (!isAdmin && !isOwner)
          throw UnauthorizedError('not authorized to access this route');
    }),
]);

export const validateUserRegisterInput = withValidationErrors([
    body('name').notEmpty().trim().withMessage('name is required'),
    body('lastName').notEmpty().trim().withMessage('last name is required'),
    body('email')
        .notEmpty().trim().isEmail().withMessage('email is required')
        .bail()
        .custom(async (value) => {
            const user = await UserModel.findOne({ email: value });
            if (user) throw new BadRequestError('email already exists');
        }),
    body('password')
        .notEmpty().trim()
        .isLength({ min: 6, max: 12 }).withMessage('password must be between 6 and 12 characters'),
        // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        // .withMessage('password must contain at least one uppercase letter, one lowercase letter, one number and one special character'),
    body('location')
        .notEmpty().trim().withMessage('location is required'),
]);
export const validateUserLoginInput = withValidationErrors([
    body('email')
        .notEmpty().trim().isEmail().withMessage('email is required')
        .bail()
        .custom(async (value) => {
            const user = await UserModel.findOne({ email: value });
            if (!user) throw new BadRequestError('email does not exist');
        }),
    body('password')
        .notEmpty().trim()
        .isLength({ min: 6, max: 12 }).withMessage('password must be between 6 and 12 characters')
        // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        // .withMessage('password must contain at least one uppercase letter, one lowercase letter, one number and one special character'),
]);

export const updateCurrentUser = withValidationErrors([
    body('name').notEmpty().trim().withMessage('name is required'),
    body('lastName').notEmpty().trim().withMessage('last name is required'),
    body('email')
        .notEmpty().trim().isEmail().withMessage('email is required')
        .bail(),
        // .custom(async (value,{req}) => {
        //     const user = await UserModel.findOne({ email: value });
        //     if (user && user._id.toString() !== req.user.userId) throw new BadRequestError('email already exists');
        // }),
    body('location')
        .notEmpty().trim().withMessage('location is required'),
]);