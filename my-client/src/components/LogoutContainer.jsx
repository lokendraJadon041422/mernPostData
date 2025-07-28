import React, { useState } from 'react'
import { useDashboardContext } from '../pages/DashboardLayout'
import Wrapper from '../assets/wrappers/LogoutContainer'
import { FaUserCircle, FaCaretDown } from 'react-icons/fa'
const LogoutContainer = () => {
    const [showLogout, setShowLogout] = useState(false);
    const { logout, currentUser } = useDashboardContext();
  // console.log(currentUser,'currentUser')
    return (
      <Wrapper  onClick={() => setShowLogout(!showLogout)}>
        <button
          type='button'
          className='btn logout-btn'
         
        >
          {currentUser?.avatar ? (
            <img src={currentUser?.avatar} alt='avatar' className='img' />
          ) : (
            <FaUserCircle />
          )}
  
          {currentUser?.name}
          <FaCaretDown />
        </button>
        <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
          <button type='button' className='dropdown-btn' onClick={logout}>
            logout
          </button>
        </div>
      </Wrapper>
    );
}
export default LogoutContainer