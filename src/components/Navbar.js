import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const Navbar = (props) => {
        return (
        <nav className='navbar bg-primary'>
        <h1>
            {props.title}
         </h1>
         <ul>
             <li>
                 <Link to='/'>Home</Link>
             </li>
             <li>
                 <Link to='/about'>About</Link>
             </li>
         </ul>
        </nav>
    )
}
Navbar.defaultProps = {
    title: 'Github Finder'
};
Navbar.propTypes = {
    title: PropTypes.string.isRequired
};
export default Navbar;
