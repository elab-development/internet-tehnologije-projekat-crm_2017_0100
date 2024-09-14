import React, { useState } from 'react';
import { useAuth } from './AuthProvider';
import { useNavigate } from 'react-router-dom';

const Login = () => {
const [credentials, setCredentials] = useState({ email: '', password: '' });
const { login } = useAuth();
const navigate = useNavigate();


const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    await login(credentials);
    // Redirect to dashboard or show success message
    navigate('/leads')
    } catch (error) {
    console.log("Error occurred in handleSubmit in Login.js"+ error)
    }
};


return (
<form onSubmit={handleSubmit}>
    <input type="email" name="email" className='form-control-reg' value={credentials.email} onChange={handleChange} placeholder="Email" required />
    <input type="password" name="password" className='form-control-reg form-control' value={credentials.password} onChange={handleChange} placeholder="Password" required />
    <button type="submit" className='btn'>Login</button>
</form>
)
}

export default Login