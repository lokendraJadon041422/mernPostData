import React, { createContext, useContext } from 'react'
import { Outlet, redirect, useNavigate, useLoaderData, useNavigation } from 'react-router-dom'
import Wrapper from '../assets/wrappers/Dashboard'
import { Navbar, BigSidebar, SmallSidebar } from '../components'
import { useState } from 'react'
import createAxios from '../utils/createAxios'
import showToast from '../utils/ShowToastContainer'
import LoadingComponent from '../components/LoadingComponent'
import { useQuery } from '@tanstack/react-query';
export const DashboardContext = createContext()
const checkTheme = () => {
  const theme = localStorage.getItem('theme')
  document.documentElement.className = theme || 'light-theme'
}
const currentUserQuery = {
  queryKey: ['currentUser'],
  queryFn: async () => {
    const response = await createAxios.get('/users/current-user');
    return response.data;
  },
}
export const loader = (queryClient) => async () => {
  try {
    return await queryClient.ensureQueryData(currentUserQuery);
  } catch (error) {
    return redirect('/');
  }
}
const DashboardLayout = ({queryClient}) => {
  const navigate = useNavigate()
  // const currentUser = useLoaderData()
  const user = useQuery(currentUserQuery);
  const currentUser = user?.data?.user;
  const navigation = useNavigation()
  const isLoading = navigation.state === 'loading'
  const [showSidebar, setShowSidebar] = useState(false)
  const [isDarkTheme, setIsDarkTheme] = useState(checkTheme())

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme)
    localStorage.setItem('theme', !isDarkTheme ? 'dark-theme' : 'light-theme')
    document.documentElement.className = !isDarkTheme ? 'dark-theme' : 'light-theme'
  }
  const logout = async () => {
    const response = await createAxios.get('/auth/logout');
    queryClient.invalidateQueries();
    showToast(response?.data?.message, 'success')
    return navigate('/');
  }
  return (
    <DashboardContext.Provider value={{ showSidebar, toggleSidebar, isDarkTheme, toggleTheme, logout, currentUser }}>
      <Wrapper>
        <main className='dashboard'>
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className='dashboard-page'>
              {isLoading ? <LoadingComponent /> : <Outlet />}
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  )
}
export const useDashboardContext = () => {
  return useContext(DashboardContext)
}

export default DashboardLayout
