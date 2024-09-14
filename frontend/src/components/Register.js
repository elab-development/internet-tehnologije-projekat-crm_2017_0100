import React, { useState } from 'react';
import { useAuth } from './AuthProvider';


const Register = () => {
const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    tip: ''
    });
    const { register } = useAuth();

    const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await register({
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.password,
        tip: formData.tip
        });
        // Redirect or show success message
    } catch (error) {
        // Handle error
    }
    };
return (
<div className="container-form">
<h1 className="title">
    Register new User
</h1>

<form id="book-form" onSubmit={handleSubmit}>
    <div className="form-group">
    <label htmlFor="first-name">First Name</label>
    <input
        type="text"
        id="firstName"
        className="form-control-reg"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
    />
    </div>
    <div className="form-group">
    <label htmlFor="lastName">Last Name</label>
    <input
        type="text"
        id="lastName"
        className="form-control-reg"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
    />
    </div>
    <div className="form-group">
    <label htmlFor="email">Email</label>
    <input
        type="text"
        id="email"
        className="form-control-reg"
        name="email"
        value={formData.email}
        onChange={handleChange}
    />
    </div>
    <div className="form-group">
    <label htmlFor="password">Password</label>
    <input
        type="text"
        id="password"
        className="form-control-reg"
        name="password"
        value={formData.password}
        onChange={handleChange}
    />
    </div>
    <div className="form-group">
    <label htmlFor="checkbox">Select one:</label>
    <div className="dropdown">
        <select
        name="tip"
        className="dropdown-select"
        value={formData.tip}
        onChange={handleChange}
        >
        <option value="" className="dropdown-option">None</option>
        <option value="Administrator" className="dropdown-option">Administrator</option>
        <option value="Autentifikovan korisnik" className="dropdown-option">Autentifikovan korisnik</option>
        <option value="Običan korisnik" className="dropdown-option">Običan korisnik</option>
        </select>
    </div>
    </div>
    <input type="submit" className="btn" value="Register" />
</form>
<div>
    <a href="/login">Already have an account?</a>
</div>
</div>
  )
}

export default Register