import React from 'react'
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Job';
import JobInfo from './JobInfo';
import { Form } from 'react-router-dom';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
day.extend(advancedFormat);
const JobCard = ({ company, createdAt, jobLocation, jobType, location, status, title, updatedAt, _id }) => {
    const date = day(createdAt).format('MMM Do, YYYY');
    return (
        <Wrapper>
            <header>
                <div className='main-icon'>{title?.charAt(0)}</div>
                <div className='info'>
                    <h5>{title}</h5>
                    <p>{company}</p>
                </div>
            </header>
            <div className='content'>
                <div className='content-center'>
                    <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
                    <JobInfo icon={<FaCalendarAlt />} text={date} />
                    <JobInfo icon={<FaBriefcase />} text={jobType} />
                    <div className={`status ${status}`}>{status}</div>
                </div>

                <footer className='actions'>
                    <Link to={`../edit-job/${_id}`} className='btn edit-btn'>
                        Edit
                    </Link>
                    <Form>
                        <button type='submit' className='btn delete-btn'>
                            Delete
                        </button>
                    </Form>
                </footer>
            </div>
        </Wrapper>
    )
}

export default JobCard
