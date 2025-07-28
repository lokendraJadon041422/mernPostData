import React from 'react'
import { useAllJobsContext } from '../pages/AllJobs';
import Wrapper from '../assets/wrappers/JobsContainer';
import JobCard from './JobCard';
import PageBtnContainer from './PageBtnContainer';

const JobContainer = () => {
  const { jobs, numOfPages,currentPage,totalCount } = useAllJobsContext();
  
  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {totalCount} job{totalCount > 1 && 's'} found
      </h5>
      <div className='jobs'>
        {jobs.map((job) => {
          return <JobCard key={job._id} {...job} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer numOfPages={numOfPages} page={currentPage} totalCount={totalCount}/>}
    </Wrapper>
  );
}

export default JobContainer
