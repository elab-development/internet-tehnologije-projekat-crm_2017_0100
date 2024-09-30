import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                try {
                    const response = await axios.get('http://localhost:8000/api/user');
                    setUser(response.data);
                } catch (error) {
                    console.error('Fetch user error', error);
                    
                    localStorage.removeItem('token');
                    delete axios.defaults.headers.common['Authorization'];
                }
            }
        };
        checkUser();
    }, []);

const register = async (userData) => {
try {
    const response = await axios.post('http://localhost:8000/api/register', userData);
    console.log(response.data.message);
    return response.data;
} catch (error) {
    console.error('Registration error', error.response.data);
    throw error;
}
};

const login = async (credentials) => {
try {
    const response = await axios.post('http://localhost:8000/api/login', credentials);

    setUser(response.data.user);
    
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    console.log(response.data.user)
    
    return response.data;
} catch (error) {
    console.error('Login error', error.response.data);
    throw error;
}
};

const logout = async () => {
try {
    await axios.post('http://localhost:8000/api/logout');
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user')
    delete axios.defaults.headers.common['Authorization'];
    alert("Logged out successfully")
} catch (error) {
    console.error('Logout error', error);
}
};


    // const fetchUser = async () => {
    // try {
    //     const response = await axios.get('http://localhost:8000/api/user', {
    //     headers: { Authorization: `Bearer ${token}` }
    //     });
    //     setUser(response.data);
    // } catch (error) {
    //     console.error('Fetch user error', error);
    // }
    // };
return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
        {children}
    </AuthContext.Provider>
)
}

export const useAuth = () => useContext(AuthContext);