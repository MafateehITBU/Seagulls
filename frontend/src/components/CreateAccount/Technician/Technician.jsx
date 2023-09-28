import React, { useState } from 'react';
import request from '../../../utils/request'
import axios from 'axios';
import { toast } from 'react-toastify'

export default function Technician() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [errors, setErrors] = useState({});

    const validatePassword = (password) => {
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        return passwordPattern.test(password);
    };

    const validatePhone = (phone) => {
        return /^\d{10}$/.test(phone);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Perform validation
        const newErrors = {};

        if (username === '') {
            newErrors.username = 'First name is required';
        }
        if (email === '') {
            newErrors.email = 'Email is required';
        }
        if (phone === '') {
            newErrors.phone = 'Phone is required';
        } else if (!validatePhone(phone)) {
            newErrors.phone = 'Phone must be exactly 10 digits';
        }
        if (password === '') {
            newErrors.password = 'Password is required';
        } else if (!validatePassword(password)) {
            newErrors.password = 'Password must contain at least 8 characters, including uppercase, lowercase, and numbers';
        }
        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            CreateAccountAdmin();

        }
    };

    const CreateAccountAdmin = async () => {
        try {
            const response = await axios.post(`${request.defaults.baseURL}authTe/register`, {
                username,
                email,
                phone,
                password,
            });

            toast.success('Created successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

            setUsername('');
            setEmail('');
            setPhone('');
            setPassword('');
            setConfirmPassword('');

        } catch (error) {
            // console.error('Authentication error:', error.response?.data?.message || 'Unknown error occurred');
            toast.error(error.response?.data?.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-7">
                    <div className="card shadow-lg border-0 rounded-lg mt-5">
                        <div className="card-header">
                            <h3 className="text-center font-weight-light my-4">Create Account Technician</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="row mb-3">
                                    <div className="col-md-12">
                                        <div className="form-floating mb-3 mb-md-0">
                                            <input
                                                className="form-control"
                                                id="inputUsername"
                                                type="text"
                                                placeholder="Enter your first name"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                            />
                                            <label htmlFor="inputUsername">Technician name</label>
                                        </div>
                                        {errors.username && <div className="text-danger">{errors.username}</div>}
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-12">
                                        <div className="form-floating mb-3">
                                            <input
                                                className="form-control"
                                                id="inputEmail"
                                                type="email"
                                                placeholder="name@example.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                            <label htmlFor="inputEmail">Email address</label>
                                        </div>
                                        {errors.email && <div className="text-danger">{errors.email}</div>}
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-floating mb-3">
                                            <input
                                                className="form-control"
                                                id="inputPhone"
                                                type="number"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                            />
                                            <label htmlFor="inputPhone">Phone</label>
                                        </div>
                                        {errors.phone && <div className="text-danger">{errors.phone}</div>}
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <div className="form-floating mb-3 mb-md-0">
                                            <input
                                                className="form-control"
                                                id="inputPassword"
                                                type="password"
                                                placeholder="Create a password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            <label htmlFor="inputPassword">Password</label>
                                        </div>
                                        {errors.password && <div className="text-danger">{errors.password}</div>}
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating mb-3 mb-md-0">
                                            <input
                                                className="form-control"
                                                id="inputPasswordConfirm"
                                                type="password"
                                                placeholder="Confirm password"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                            />
                                            <label htmlFor="inputPasswordConfirm">Confirm Password</label>
                                        </div>
                                        {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}
                                    </div>
                                </div>
                                <div className="mt-4 mb-0">
                                    <div className="d-grid">
                                        <button type="submit" className="btn btn-primary btn-block">Create Account</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
