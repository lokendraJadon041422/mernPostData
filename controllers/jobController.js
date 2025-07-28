
import JobModel from "../models/JobModel.js";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import day from 'dayjs';

export const getAllJobs = async (req, res) => {
    console.log(req.query, 'aaaa')
    const { search, title, company, status, jobType, jobLocation, sort } = req.query;
    const queryObject = { createdBy: req.user.userId }
    if (search) {
        queryObject.$or = [
            { title: { $regex: search, $options: 'i' } },
            { company: { $regex: search, $options: 'i' } },
        ];
    }
    if (status && status !== 'all') {
        queryObject.status = status;
    }
    if (jobType && jobType !== 'all') {
        queryObject.jobType = jobType;
    }

    const sortOptions = {
        newest: '-createdAt',
        oldest: 'createdAt',
        'a-z': 'title',
        'z-a': '-title',
    };


    // setup pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    console.log(skip, 'skip')

    const sortKey = sortOptions[sort] || sortOptions.newest;
    const jobs = await JobModel.find(queryObject).sort(sortKey).skip(skip).limit(limit);


    console.log(jobs, 'jobs')
    const totalCount = await JobModel.countDocuments(queryObject);
    const numOfPages = Math.ceil(totalCount / limit);
    console.log(numOfPages, 'numOfPages')
    res.status(StatusCodes.OK).json({
        message: "Jobs fetched successfully",
        jobs,
        totalCount,
        numOfPages,
        currentPage: page,
    });
}

export const getJob = async (req, res) => {
    console.log('params.id');
    const job = await JobModel.findById(req.params.id);
    console.log(job);
    res.status(StatusCodes.OK).json({
        message: "Job fetched successfully",
        job,
    });
}

export const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const updatedJob = req.body;

    const newJob = await JobModel.create(updatedJob);
    res.status(StatusCodes.CREATED).json({
        message: "Job created successfully",
        job: newJob,
    });
}

export const updateJob = async (req, res) => {
    const updatedJob = req.body;
    const job = await JobModel.findById(req.params.id);
    job.title = updatedJob.title || job.title;
    job.company = updatedJob.company || job.company;
    job.location = updatedJob.location || job.location;
    job.status = updatedJob.jobStatus || job.status;
    job.jobType = updatedJob.jobType || job.jobType;
    job.jobLocation = updatedJob.jobLocation || job.jobLocation;
    await job.save();
    res.status(StatusCodes.OK).json({
        message: "Job updated successfully",
        job,
    });
}

export const deleteJob = async (req, res) => {
    const removedJob = await JobModel.findByIdAndDelete(req.params.id);
    res.status(StatusCodes.OK).json({
        message: "Job deleted successfully",
        job: removedJob,
    })
}
export const getStats = async (req, res) => {
    const stats = await JobModel.aggregate([
        {
            $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) },
        },
        {
            $group: {
                _id: '$status',
                count: { $sum: 1 },
            },
        },
    ]);
    const jobTypeStats = stats.reduce((acc, curr) => {
        const { _id: jobStatus, count } = curr;
        acc[jobStatus] = count;
        return acc;
    }, {});
    console.log(jobTypeStats)
    const defaultStats = {
        pending: jobTypeStats.pending || 0,
        interview: jobTypeStats.interview || 0,
        declined: jobTypeStats.declined || 0,
    };
    let monthlyApplications = await JobModel.aggregate([
        { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
        {
            $group: {
                _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
                count: { $sum: 1 },
            },
        },
        { $sort: { '_id.year': -1, '_id.month': -1 } },
        { $limit: 6 },
    ]);
    monthlyApplications = monthlyApplications
        .map((item) => {
            const {
                _id: { year, month },
                count,
            } = item;

            const date = day()
                .month(month - 1)
                .year(year)
                .format('MMM YY');
            return { date, count };
        })
        .reverse();

    console.log(monthlyApplications)
    res.status(StatusCodes.OK).json({ message: "Stats fetched successfully", monthlyApplications, defaultStats });
};