import React, { useState } from 'react'
import { useLoaderData } from 'react-router-dom';
import createAxios from '../utils/createAxios';
import StatsContainer from '../components/StatsContainer';
import ChartsContainer from '../components/ChartsContainer';
export const loader = async () => {
    try {
      const response = await createAxios.get('/jobs/stats');
      return response.data;
    } catch (error) {
      return error;
    }
  };
const Stats = () => {
  const {monthlyApplications,defaultStats} = useLoaderData()
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
