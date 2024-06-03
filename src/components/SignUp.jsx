import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";
import axios from "axios";
import { server } from "../server";
import {toast} from "react-toastify";
import { useDispatch } from 'react-redux';
import { userSignup } from '../redux/actions/userActions';

export const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState('');
    const [visible, setVisible] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch(); // use the useDispatch hook to get the dispatch function

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            return;
        }

        const newForm = new FormData();

        // newForm.append("file", image);
        newForm.append("name", name);
        newForm.append("password", password);
        newForm.append("email", email);

        try {
            const response = await axios.post(`${server}/register`, newForm);
            if (response.data.success) {
                // Handle successful registration
                toast.success("Registration successful!")
                dispatch(userSignup(response.data.user)); // Dispatch the userSignup action with the user's data
                navigate('/activation');
            } else {
                // Handle registration error
                toast.error("Registration failed!")
            }
        } catch (error) {
            // Handle request error
            console.error(error);
            toast.error("An error occurred while registering. Please try again.")
        }
    };

    const checkPasswordMatch = () => {
        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
        }
    };

    return (
        <>
            <div className="flex min-h-full flex-1">
                <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                    <div className="mx-auto w-full max-w-sm lg:w-96">
                        <div>
                            <img
                                className="h-10 w-auto"
                                src="https://afreebmart.com/backend/images/logo/afreemart-logo.png"
                                alt="Afreebmart Logo"
                            />
                            <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                Sign Up to Afreebmart
                            </h2>
                            <p className="mt-2 text-sm leading-6 text-gray-500">
                                Already have an account?{' '}
                                <Link to="/login" className="font-semibold text-primary hover:text-secondary">
                                    Login
                                </Link>
                            </p>
                        </div>

                        <div className="mt-10">
                            <div>
                                <form onSubmit={handleSubmit} method="POST" className="space-y-6">
                                    <div>
                                        <label htmlFor="email"
                                               className="block text-sm font-medium leading-6 text-gray-900">
                                            Full Name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="name"
                                                name="text"
                                                type="text"
                                                autoComplete="name"
                                                value={name}
                                                onChange={e => setName(e.target.value)}
                                                required
                                                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="email"
                                               className="block text-sm font-medium leading-6 text-gray-900">
                                            Email Address
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                autoComplete="email"
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                                required
                                                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="password"
                                               className="block text-sm font-medium leading-6 text-gray-900">
                                            Password
                                        </label>
                                        <div className="mt-2 relative">
                                            <input
                                                id="password"
                                                name="password"
                                                type={visible ? 'text' : 'password'}
                                                autoComplete="current-password"
                                                required
                                                value={password}
                                                onChange={e => setPassword(e.target.value)}
                                                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                            />
                                            {
                                                visible ? (
                                                    <AiOutlineEye
                                                        className="absolute right-2 top-2 text-gray-400 cursor-pointer"
                                                        size={25}
                                                        onClick={() => setVisible(false)}
                                                    />
                                                ) : (
                                                    <AiOutlineEyeInvisible
                                                        className="absolute right-2 top-2 text-gray-400 cursor-pointer"
                                                        size={25}
                                                        onClick={() => setVisible(true)}
                                                    />
                                                )
                                            }
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="confirm-password"
                                               className="block text-sm font-medium leading-6 text-gray-900">
                                            Confirm Password
                                        </label>
                                        <div className="mt-2 relative">
                                            <input
                                                id="confirm-password"
                                                name="confirm-password"
                                                type={visible ? 'text' : 'password'}
                                                required
                                                value={confirmPassword}
                                                onChange={e => setConfirmPassword(e.target.value)}
                                                onBlur={checkPasswordMatch}
                                                className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                            />
                                            {
                                                visible ? (
                                                    <AiOutlineEye
                                                        className="absolute right-2 top-2 text-gray-400 cursor-pointer"
                                                        size={25}
                                                        onClick={() => setVisible(false)}
                                                    />
                                                ) : (
                                                    <AiOutlineEyeInvisible
                                                        className="absolute right-2 top-2 text-gray-400 cursor-pointer"
                                                        size={25}
                                                        onClick={() => setVisible(true)}
                                                    />
                                                )
                                            }
                                        </div>
                                    </div>

                                    {/*<div>*/}
                                    {/*    <label htmlFor="image">*/}
                                    {/*        <img*/}
                                    {/*            style={{display: 'none'}}*/}
                                    {/*            src="https://example.com/path-to-default-image.png"*/}
                                    {/*            alt="User image"*/}
                                    {/*            onClick={() => document.getElementById('image').click()}*/}
                                    {/*        />*/}
                                    {/*    </label>*/}
                                    {/*    <input*/}
                                    {/*        id="image"*/}
                                    {/*        name="image"*/}
                                    {/*        type="file"*/}
                                    {/*        onChange={e => setImage(e.target.files[0])}*/}
                                    {/*        style={{display: 'none'}}*/}
                                    {/*    />*/}
                                    {/*</div>*/}


                                    <div>
                                        <button
                                            type="submit"
                                            className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                                        >
                                            Sign Up
                                        </button>
                                    </div>
                                </form>
                            </div>

                            <div className="mt-10">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                        <div className="w-full border-t border-gray-200"/>
                                    </div>
                                    <div className="relative flex justify-center text-sm font-medium leading-6">
                                        <span className="bg-white px-6 text-gray-900">Or sign up with</span>
                                    </div>
                                </div>

                                <div className="mt-6 grid grid-cols-2 gap-4">
                                    <button
                                        className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md max-w-xs px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                        <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg"
                                             xmlnsXlink="http://www.w3.org/1999/xlink"
                                             viewBox="-0.5 0 48 48" version="1.1">

                                            <g id="Icons" stroke="none" strokeWidth="1" fill="none"
                                               fillRule="evenodd">
                                                <g id="Color-" transform="translate(-401.000000, -860.000000)">
                                                    <g id="Google" transform="translate(401.000000, 860.000000)">
                                                        <path
                                                            d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                                                            id="Fill-1" fill="#FBBC05"></path>
                                                        <path
                                                            d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                                                            id="Fill-2" fill="#EB4335"></path>
                                                        <path
                                                            d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                                                            id="Fill-3" fill="#34A853"></path>
                                                        <path
                                                            d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                                                            id="Fill-4" fill="#4285F4"></path>
                                                    </g>
                                                </g>
                                            </g>
                                        </svg>
                                        <span className="text-sm font-semibold leading-6">Google</span>
                                    </button>

                                    <button
                                        className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md max-w-xs px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                        <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg"
                                             xmlnsXlink="http://www.w3.org/1999/xlink"
                                             viewBox="0 0 48 48" version="1.1">
                                            <g id="Icons" stroke="none" strokeWidth="1" fill="none"
                                               fillRule="evenodd">
                                                <g id="Color-" transform="translate(-200.000000, -160.000000)"
                                                   fill="#4460A0">
                                                    <path
                                                        d="M225.638355,208 L202.649232,208 C201.185673,208 200,206.813592 200,205.350603 L200,162.649211 C200,161.18585 201.185859,160 202.649232,160 L245.350955,160 C246.813955,160 248,161.18585 248,162.649211 L248,205.350603 C248,206.813778 246.813769,208 245.350955,208 L233.119305,208 L233.119305,189.411755 L239.358521,189.411755 L240.292755,182.167586 L233.119305,182.167586 L233.119305,177.542641 C233.119305,175.445287 233.701712,174.01601 236.70929,174.01601 L240.545311,174.014333 L240.545311,167.535091 C239.881886,167.446808 237.604784,167.24957 234.955552,167.24957 C229.424834,167.24957 225.638355,170.625526 225.638355,176.825209 L225.638355,182.167586 L219.383122,182.167586 L219.383122,189.411755 L225.638355,189.411755 L225.638355,208 L225.638355,208 Z"
                                                        id="Facebook">

                                                    </path>
                                                </g>
                                            </g>
                                        </svg>

                                        <span className="text-sm font-semibold leading-6 text-center">Facebook</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative hidden w-0 flex-1 lg:block">
                    <img
                        className="absolute inset-0 h-full w-full object-cover"
                        src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
                        alt=""
                    />
                </div>
            </div>
        </>
    )
};

export default SignUp;