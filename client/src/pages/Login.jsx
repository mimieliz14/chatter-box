import React, { useState, useContext, useEffect } from "react";
import { loginUser } from "../services/authService"
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import "../styles/AuthForm.css";
import { FaUser, FaLock, FaSignInAlt, FaComments } from "react-icons/fa";


export default function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('')
    const nav = useNavigate();
    const { login } = useContext(AuthContext)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            nav('/', { replace: true });
        }
    }, [nav])

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await loginUser(form);
            console.log("Login Server:", response.data);
            const token = response.data?.data?.token;
            const userData = {
                id: response.data?.data?.userId,
                username: response.data?.data?.username,
                email: response.data?.data?.email
            }
            if (!token) {
                throw new Error("No token received from server");
            }
            login(token, userData);
            nav('/');

        } catch (error) {
            console.error("Error en login component:", error);
            setError(
                error.response?.data?.message ||
                'Login failed'
            );
        }
    }



    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <div className="login-title">

                <div className="login-brand">

                    <FaComments className="login-icon" />

                    <h1>ChatterBox</h1>

                </div>

                <h3>Login</h3>

            </div>

            {error && <div className="error-message">{error}</div>}
            <div className="input-container">

                <FaUser className="icono" />
                <input
                    name="email"
                    type="email"
                    required
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                />
            </div>

            <div className="input-container">

                <FaLock className="icono" />
                <input
                    name="password"
                    type="password"
                    required
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">
                <FaSignInAlt />
                Login</button>
        </form>
    )
}
