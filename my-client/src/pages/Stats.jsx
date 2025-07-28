import React, { useState } from 'react'
import createAxios from '../utils/createAxios';
import StatsContainer from '../components/StatsContainer';
import ChartsContainer from '../components/ChartsContainer';
import { useQuery } from '@tanstack/react-query';



const statsQuery = {
  queryKey: ['stats'],
  queryFn: async () => {
    const response = await createAxios.get('/jobs/stats'); 
    return response.data;
  },
};

export const loader =(queryClient) => async () => {
  const response = await queryClient.ensureQueryData(statsQuery);
  return response.data;
};
const Stats = () => {
  // const {monthlyApplications,defaultStats} = useLoaderData()
  const { data } = useQuery(statsQuery);
  const { defaultStats, monthlyApplications } = data;
  return (
    <>
    <StatsContainer defaultStats={defaultStats} />
    {monthlyApplications?.length > 0 && (
      <ChartsContainer data={monthlyApplications} />
    )}
  </>
  )
}

export default Stats
