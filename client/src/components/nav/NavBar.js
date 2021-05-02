import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { GiBookCover } from 'react-icons/gi';


export const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">

            <Link to="/" className="navbar-brand"> <GiBookCover/> OER World</Link>

            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <NavLink exact activeClassName="active" to="/" className="nav-item nav-link"> Home </NavLink>
                    <NavLink exact activeClassName="active" to="/about" className="nav-item nav-link"> About </NavLink>
                    <a href="https://github.com/krarrobo1/oer-management" className="nav-item nav-link">Github</a>

                </div>
            </div>
        </nav>
    )
}
