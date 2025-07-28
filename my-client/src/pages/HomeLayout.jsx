import React from 'react'
import { Outlet } from 'react-router-dom'
import Landing from './Landing'

const HomeLayout = () => {
  return (
    <>
      <Outlet />
    </>
  )
}

export default HomeLayout