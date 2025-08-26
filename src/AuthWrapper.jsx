import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login, logout } from './features/user/userSlice';
import axios from 'axios';
import App from './App';
import Lottie from 'lottie-react';
import LoadingAnimation from './assets/Loading.json'

const AuthWrapper = () => {
    const [isAppLoading, setIsAppLoading] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Use a ref to ensure the effect only runs once
    const isMounted = useRef(false);

    useEffect(() => {
        // Only run this effect on the very first mount
        if (isMounted.current) {
            return;
        }
        isMounted.current = true;

        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const config = {
                        headers: {
                            'Authorization': token
                        }
                    };
                    const response = await axios.get('https://api.priyank.space/api/v1/admin/profile', config);
                    dispatch(login(response.data.user));
                } catch (error) {
                    console.error('Failed to fetch user data:', error);
                    dispatch(logout());
                    navigate('/');
                }
            } else {
                dispatch(logout());
                navigate('/');
            }
            setIsAppLoading(false);
        };

        fetchUserData();
    }, []);

    if (isAppLoading) {
        return (
            <div className="app-container auth-container">
                <Lottie
                    animationData={LoadingAnimation}
                    loop={true}
                    className="lottie-animation"
                />
                </div>
        )
    }

    return <App />;
};

export default AuthWrapper;