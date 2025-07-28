import { readFile } from 'fs/promises';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import JobModel from '../models/JobModel.js';
import UserModel from '../models/UserModel.js';

async function populateJobs() {
    const url = 'mongodb+srv://lokendrajadon:HelMx53ctLDgg5Bz@cluster1.cgpmham.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1'
    console.log('Populating jobs...',url);
  if (!url) {
    console.error('MONGO_URL is not defined in your .env file.');
    process.exit(1);
  }

  try {
    await mongoose.connect(url);

    // const user = await UserModel.findOne({ email: 'lokendra.jadon@calsoftinc.com' });
    const user = await UserModel.findOne({ email: 'test@test.com' });

    if (!user) {
      throw new Error('User not found: test@test.com');
    }

    const jsonJobs = JSON.parse(
      await readFile(new URL('./mockData.json', import.meta.url))
    );
    const jobs = jsonJobs.map((job) => ({
      ...job,
      createdBy: user._id,
    }));

    await JobModel.deleteMany({ createdBy: user._id });
    await JobModel.create(jobs);

    console.log('Success!!!');
  } catch (error) {
    console.error('Error populating jobs:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

populateJobs();