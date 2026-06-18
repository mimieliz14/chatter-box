import { HiDotsVertical } from "react-icons/hi";
import { FaComments, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/Header.css";


export default function Header() {
    const { user, logout } = useContext(AuthContext)
    const nav = useNavigate()
    const handleLogout = () => {
        logout()
        nav("/login")
    }

    return (
        <header className="header">
            <div className="header-logo">
                <FaComments className="logo-icon" />
                <div>
                    <h2>ChatterBox</h2>
                    <span>
                        Team Communication
                    </span>
                </div>
            </div>

            <div className="header-actions">
                {user && user.username ? (
                    <>
                    <span className="username"> 👤 {user?.username || "Member"}</span>
                    <button
                        className="logout-btn"
                        onClick={handleLogout} >
                        <FaSignOutAlt />
                        Logout
                    </button>
                </>

                ) : (
                    <>
                        <Link to="/login"> Login </Link>
                        <Link to="/register">Register</Link>
                    </>
                )
                }
                <button className="header-menu">
                    <HiDotsVertical />
                </button>
            </div>
        </header>
    )
}