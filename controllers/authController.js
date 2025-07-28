import {StatusCodes} from "http-status-codes";
import UserModel from "../models/UserModel.js";
import { USER_ROLE } from "../utils/constant.js";   
import { hashPassword } from "../utils/hashPassword.js";
import { comparePassword } from "../utils/hashPassword.js";
import { BadRequestError } from "../errors/customError.js";
import { createJWT } from "../utils/jwt.js";
export const registerUser = async (req, res) => {
    const isFirstAccount = (await UserModel.countDocuments({})) === 0;
    req.body.role = isFirstAccount ? USER_ROLE.ADMIN : USER_ROLE.USER;
    const hashedPassword = await hashPassword(req.body.password);
    req.body.password = hashedPassword;
    const user = await UserModel.create(req.body);
    res.status(StatusCodes.CREATED).json({
        message: "User created successfully",
        user
    });
}
export const loginUser = async (req, res) => {
    const {email, password} = req.body;
    const user = await UserModel.findOne({email});
    if(!user) throw new BadRequestError('email does not exist');
    const isPasswordMatch = await comparePassword(password, user.password);
    if(!isPasswordMatch) throw new BadRequestError('passwords do not match');
    const token = createJWT({userId: user._id, role: user.role});
    const oneDay = 1000 * 60 * 60 * 24;
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        expires: new Date(Date.now() + oneDay),
    });
    res.status(StatusCodes.OK).json({
        message: "User logged in successfully",
        user,
        token
    });
}   

export const logoutUser = async (req, res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now()),
    });
    res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
}