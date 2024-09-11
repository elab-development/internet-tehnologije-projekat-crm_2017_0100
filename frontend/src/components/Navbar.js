import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div class="navbar">
    {/* <a href="#" class="nav-item">Item 1</a> */}
    <Link to='/' class="nav-item">Contacts</Link>
    <Link to='/leads' class="nav-item">Leads</Link>   
    <Link to='/about' class="nav-item">About</Link>
    </div>

    )
}

export default Navbar