import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Login from "../components/Login.jsx";

export const LoginPage = () => {
    const user = useSelector(state => state.user);
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (user && Object.keys(user).length > 0) {
    //         toast.error('You are already logged in and cannot access this page.');
    //         navigate('/'); // Redirect to home page or any other page
    //     }
    // }, [user, navigate]);

    return (
        <>
            <div className={`h-screen bg-gray-50`}>
                <Login />
            </div>
        </>
    );
};