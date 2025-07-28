
import JobModel from "../models/JobModel.js";
import UserModel from "../models/UserModel.js";
import { StatusCodes } from "http-status-codes";
import cloudinary from "cloudinary";
import { promises as fs } from 'fs';

export const getCurrentUser = async (req, res) => {
    const user = await UserModel.findById(req.user.userId)
    res.status(StatusCodes.OK).json({ user });
};

export const getApplicationStats = async (req, res) => {
    const jobStats = await JobModel.countDocuments({})
    const userStats = await UserModel.countDocuments({})
    res.status(StatusCodes.OK).json({ jobStats, userStats });
};

export const updateUser = async (req, res) => {

    const newUser = { ...req.body,avatar:req?.file };
    delete newUser.password;
    if (req.file) {
      const response = await cloudinary.v2.uploader.upload(req.file.path);
      await fs.unlink(req.file.path);
      newUser.avatar = response.secure_url;
      newUser.avatarPublicId = response.public_id;
    }
    const updatedUser = await UserModel.findByIdAndUpdate(req.user.userId, newUser,{new:true});
  
    // if (req.file && updatedUser.avatarPublicId) {
    //   await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
    // }
    res.status(StatusCodes.OK).json({ msg: 'update user' });
    // console.log(req.file,'aaaaaa')
    // const obj = {...req.body,avatar:req.file?.filename};
    // delete obj.updateUser
    // console.log(obj,'obj')
    // const updatedUser = await UserModel.findByIdAndUpdate(req.user.userId, obj, { new: true });
    // res.status(StatusCodes.OK).json({ msg: 'User updated successfully', updatedUser });
};