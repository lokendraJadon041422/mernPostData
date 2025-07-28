import React from 'react'
import createAxios from '../utils/createAxios';
import showToast from '../utils/ShowToastContainer';
import { redirect } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom';
import StatItem from '../components/StatItem';
import Wrapper from '../assets/wrappers/StatItem';
import { FaCalendarCheck, FaSuitcaseRolling } from 'react-icons/fa';
export const loader = async () => {
  try {
    const response = await createAxios.get('/users/admin/stats');
    return response.data;
  } catch (error) {
    showToast('You are not authorized to view this page', 'error');
    return redirect('/dashboard');
  }
};
const Admin = () => {
  const { jobStats, userStats } = useLoaderData()
  return (
    <div>
      <Wrapper>
        <StatItem
          title='current users'
          count={userStats}
          color='#e9b949'
          bcg='#fcefc7'
          icon={<FaSuitcaseRolling />}
        />
        <StatItem
          title='total jobs'
          count={jobStats}
          color='#647acb'
          bcg='#e0e8f9'
          icon={<FaCalendarCheck />}
        />
      </Wrapper>
    </div>
  )
}

export default Admin
