import React from 'react'
import  Links  from '../utils/Links'
import { NavLink } from 'react-router-dom'
import { useDashboardContext } from '../pages/DashboardLayout'
const NavLinks = ({isBigSidebar=false}) => {
    const { toggleSidebar,currentUser } = useDashboardContext();

  return (
    <>
     {Links.map((link) => {
            const { text, path, icon } = link;
            const {role} = currentUser;
            if(role !== 'admin' && path === 'admin') return;

            return (
              <NavLink
                to={path}
                key={text}
                className='nav-link'
                onClick={!isBigSidebar ? toggleSidebar : null}
                end
              
              >
                <span className='icon'>{icon}</span>
                {text}
              </NavLink>
            );
          })}
    </>
  )
}

export default NavLinks
