import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import "../styles/AuthForm.css";

export default function Register() {

    const [form, setForm] = useState({
        username: "", email: "", password: ""
    });

    const [error, setError] = useState("");
    const nav = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        try {
            const response = await registerUser(form)
            console.log("Full Server Response:", response);
            alert(response.data.message || "Registered successfully")
            nav("/login")
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Registration failed")
            console.log(error)
        }
    }

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <h2>Register</h2>
            {error && <p className="error-message">{error}</p>}
            <input
                name="username"
                required
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
            />

            <input
                name="email"
                type="email"
                required
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
            />

            <input
                name="password"
                type="password"
                required
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
            />
            <button type="submit">
                Register
            </button>
        </form>
    );

}