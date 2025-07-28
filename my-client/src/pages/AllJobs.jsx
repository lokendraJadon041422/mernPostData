import React, { createContext } from 'react'
import SearchContainer from '../components/SearchContainer'
import JobContainer from '../components/JobContainer'
import { useContext } from 'react'
import { useLoaderData } from 'react-router-dom'
import createAxios from '../utils/createAxios'


export const allJobsContext = createContext();
export const loader = async ({request}) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  console.log(params,request.url);
  try{
    const {data} = await createAxios.get('/jobs',{params});
    console.log(data,'data');
    return data;
  }catch(error){
    return error;
  }
}
const AllJobs = () => {
  const { jobs ,numOfPages,totalCount,currentPage } = useLoaderData();

  return (
    <div>
      <allJobsContext.Provider value={{ jobs,numOfPages,totalCount,currentPage }}>
        <SearchContainer />
        <JobContainer />
      </allJobsContext.Provider>
    </div>
  )
}
export const useAllJobsContext = () => useContext(allJobsContext);
export default AllJobs
