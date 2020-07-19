import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    const activeStyle = { color: '#F15B2A'}
    return (
        <nav>
            <NavLink to='/' activeStyle={activeStyle} exact>Home</NavLink>{" | "}
            <NavLink to='/courses' activeStyle={activeStyle}>Courses</NavLink>{" | "}
            <NavLink to='/about' activeStyle={activeStyle}>About</NavLink>{" | "}
            <NavLink to='/chat' activeStyle={activeStyle}>Chat link</NavLink>
        </nav>
    )
}

export default Header;