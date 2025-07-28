import React from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'
import Wrapper from '../assets/wrappers/ThemeToggle'
import { useDashboardContext } from '../pages/DashboardLayout'
const ThemeToggle = () => {
    const { toggleTheme, isDarkTheme } = useDashboardContext();
    return (
        <Wrapper onClick={toggleTheme} >
            {!isDarkTheme ? <FaMoon className='toggle-icon' /> : <FaSun className='toggle-icon' />}
        </Wrapper>
    )
}

export default ThemeToggle
