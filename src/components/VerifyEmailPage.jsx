// pages/VerifyEmailPage.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../features/user/userSlice';

const VerifyEmailPage = () => {
    const { token } = useParams(); // Get token from URL
    const navigate = useNavigate();
    const [message, setMessage] = useState('Verifying your email...');
    const [error, setError] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        const verifyUserEmail = async () => {
            if (!token) {
                setError(true);
                setMessage('Invalid verification link.');
                return;
            }

            const config = {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            };

            try {
                const response = await axios.post(`http://localhost:1008/api/v1/admin/verify-email`, { token }, config);
                const updatedUser = response.data.user;
                setMessage(response.data.msg);
                dispatch(login(updatedUser));
                setError(false);
                setTimeout(() => {
                    navigate('/dashboard');
                }, 1000);
            } catch (err) {
                setError(true);
                setMessage(err.response?.data?.msg || 'Verification failed. Please try again.');
            }
        };

        verifyUserEmail();
    }, [token, navigate]);

    return (
        <div>
            <h1>Email Verification</h1>
            <p style={{ color: error ? 'red' : 'green' }}>{message}</p>
        </div>
    );
};

export default VerifyEmailPage;