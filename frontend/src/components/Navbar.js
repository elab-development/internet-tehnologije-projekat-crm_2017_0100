import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from './AuthProvider'

const Navbar = () => {
    const { user } = useAuth()
    return (
        <div className="navbar">
    {/* <a href="#" class="nav-item">Item 1</a> */}
    <Link to='/' className="nav-item">Contacts</Link>
    <Link to='/leads' className="nav-item">Leads</Link>   
    <Link to='/about' className="nav-item">About</Link>
    {user ? user.email : <Link to='/register' className="nav-item">Register</Link>} 
    {user && <Link to='/user/password' className="nav-item">Change Password</Link>}
    
    </div>

    )
}

export default Navbar