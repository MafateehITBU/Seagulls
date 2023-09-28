import React, { useState, useContext } from 'react'
import request from '../../utils/request'
import axios from 'axios';
import { toast } from 'react-toastify'
import { TechnicianInfoContext } from '../../context/TechnicianInfoContext'

export default function Login() {
    const { technicianInfo, setTechnicianInfo } = useContext(TechnicianInfoContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (email.trim() === '') {
            setEmailError('Email required');
            return;
        }

        if (password.trim() === '') {
            setPasswordError('Password is required');
            return;
        }

        try {
            const response = await axios.post(`${request.defaults.baseURL}authTe/login`, {
                email,
                password,
            });

            localStorage.setItem('technicianInfo', JSON.stringify(response.data));
            setTechnicianInfo(response.data)

        } catch (error) {
            console.error('Authentication error:', error.response?.data?.message || 'Unknown error occurred');
            setPasswordError('Invalid email or password');
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-5">
                    <div className="card shadow-lg border-0 rounded-lg mt-5">
                        <div className="card-header"><h3 className="text-center font-weight-light my-4">Login</h3></div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-floating mb-3">
                                    <input
                                        className="form-control"
                                        id="inputEmail"
                                        type="email"
                                        placeholder="name@example.com"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                    />
                                    <label htmlFor="inputEmail">Email address</label>
                                    {emailError && <div className="text-danger">{emailError}</div>}
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        className="form-control"
                                        id="inputPassword"
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                    />
                                    <label htmlFor="inputPassword">Password</label>
                                    {passwordError && <div className="text-danger">{passwordError}</div>}
                                </div>
                                <div className="d-flex align-items-center justify-content-end mb-0">
                                    <button type="submit" className="btn btn-primary">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
