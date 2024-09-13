import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className="navbar">
    {/* <a href="#" class="nav-item">Item 1</a> */}
    <Link to='/' className="nav-item">Contacts</Link>
    <Link to='/leads' className="nav-item">Leads</Link>   
    <Link to='/about' className="nav-item">About</Link>
    </div>

    )
}

export default Navbar