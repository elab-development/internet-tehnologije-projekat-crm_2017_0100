import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthProvider';

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { user } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmNewPassword) {
            setError('New passwords do not match');
            return;
        }

        try {
            const response = await axios.patch(
                'http://localhost:8000/api/user/password',
                {
                    current_password: currentPassword,
                    new_password: newPassword,
                    new_password_confirmation: confirmNewPassword,
                }
            );
            setSuccess(response.data.message);
            setError('');
        } catch (err) {
            setError(err.response.data.message || 'An error occurred');
            setSuccess('');
        }
    };
return (
<div>
        <h2>Change Password</h2>
        <form onSubmit={handleSubmit} className='form-group'>
            <div>
                <label htmlFor="current-password">Current Password</label>
                <input
                    type="password"
                    id="current-password"
                    value={currentPassword}
                    className='form-control-reg'
                    onChange={(e) => setCurrentPassword(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="new-password">New Password</label>
                <input
                    type="password"
                    id="new-password"
                    className='form-control-reg'
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="confirm-new-password">Confirm New Password</label>
                <input
                className='form-control-reg'
                    type="password"
                    id="confirm-new-password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
            </div>
            <button type="submit" className='btn'>Change Password</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
);

}

export default ChangePassword