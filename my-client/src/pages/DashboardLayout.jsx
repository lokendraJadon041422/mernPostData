import React, { createContext, useContext } from 'react'
import { Outlet, redirect, useNavigate, useLoaderData } from 'react-router-dom'
import Wrapper from '../assets/wrappers/Dashboard'
import { Navbar, BigSidebar, SmallSidebar } from '../components'
import { useState } from 'react'
import createAxios from '../utils/createAxios'  
import showToast from '../utils/ShowToastContainer'
export const DashboardContext = createContext()
const checkTheme = () => {
  const theme = localStorage.getItem('theme')
  document.documentElement.className = theme || 'light-theme'
}
export const loader = async () => {
  try {
    const { data } = await createAxios.get('/users/current-user');
    // console.log(data,'data')
    return data?.user;
  } catch (error) {
    return redirect('/');
  }
}
const DashboardLayout = () => {
    const navigate = useNavigate()
    const currentUser = useLoaderData()
  // console.log(currentUser,'currentUser')
  const [showSidebar, setShowSidebar] = useState(false)
  const [isDarkTheme, setIsDarkTheme] = useState(checkTheme())
  const user = {
    name: "John Doe",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg"
  }
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }
  const toggleTheme = () => {
    console.log(isDarkTheme)
    setIsDarkTheme(!isDarkTheme)
    localStorage.setItem('theme', !isDarkTheme ? 'dark-theme' : 'light-theme')
    document.documentElement.className = !isDarkTheme ? 'dark-theme' : 'light-theme'
  }
  const logout = async () => {
    const response = await createAxios.get('/auth/logout');
    showToast(response?.data?.message,'success')
    return navigate('/');
  }
  return (
    <DashboardContext.Provider value={{ showSidebar, toggleSidebar, isDarkTheme, toggleTheme, logout, user,currentUser }}>
      <Wrapper>
        <main className='dashboard'>
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className='dashboard-page'>
              <Outlet />
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
