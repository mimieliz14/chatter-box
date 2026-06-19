import React, { useState, useEffect } from "react";
import { createChannel, getPublicChannels } from "../services/authService";
import { useNavigate } from "react-router-dom";
import '../styles/Components.css';

export default function ChannelList({ activeChannel, onSelectChannel }) {
    const [channels, setChannels] = useState([]);
    const [form, setForm] = useState({ name: "", description: "" });
    const navigate = useNavigate();


    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.warn("No token found. Redirecting to /login...");
            navigate("/login");
            return;
        }
        const fetchChannels = async () => {
            try {
                const response = await getPublicChannels();
                setChannels(response.data?.data || response.data || []);
            } catch (error) {
                console.error("Error fetching public channels:", error)
                if (error.response?.status === 401) navigate("/login")
            }
        };

        fetchChannels()
    }, [navigate])

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };


    const handleCreateChannel = async (e) => {
        e.preventDefault();

        try {
            const response = await createChannel(form)
            const newChannel = response.data?.data || response.data;
            setChannels(prev => [newChannel, ...prev])
            setForm({ name: "", description: "" })
            alert("Channel created successfully!")

        } catch (error) {
            console.error("Failed to create channel:", error);
            alert(error.response?.data?.message || "Server error");
        }
    };

    return (
        <div className="channel-container">
            <h2 className="channel-title">Public Channels</h2>

            <form className="channel-form" onSubmit={handleCreateChannel}>
                <input
                    className="channel-form-input"
                    required
                    name="name"
                    placeholder="Channel name"
                    value={form.name}
                    onChange={handleChange}
                />
                <input
                    className="channel-form-input"
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                />
                <button className="channel-button" type="submit">Create</button>
            </form>

            <ul className="channel-list">
                {Array.isArray(channels) && channels.length > 0 ? (
                    channels.map(ch => (
                        <li
                            key={ch._id || ch.id}
                            className={`channel-item ${activeChannel?._id === ch._id ? 'active' : ''}`}
                            onClick={() => onSelectChannel?.(ch)}
                        >
                            # {ch.name}
                        </li>
                    ))
                ) : (
                    <li className="text-muted">No channels available.</li>
                )}
            </ul>
        </div>
    );
}