import React, { createContext, useState, useEffect } from "react";
export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (token && token !== "undefined") {
            localStorage.setItem("token", token);
            if (savedUser && savedUser !== "undefined") {
                try {
                    setUser(JSON.parse(savedUser));
                } catch (e) {
                    console.error("Error parsing corrupt user from localStorage:", e);
                    localStorage.removeItem("user");
                    setUser({ token });
                }
            } else {
                setUser({ token });
            }
        } else {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setUser(null);
        }
        setLoading(false);
    }, [token]);

    const login = (jwtToken, userData) => {
        setToken(jwtToken)
        setUser(userData);
        localStorage.setItem("token", jwtToken)
        localStorage.setItem("user", JSON.stringify(userData))
    }

    const logout = () => {
        setToken(null)
        setUser(null);
        localStorage.removeItem("token")
        localStorage.removeItem("user");
    }


    return (
        <AuthContext.Provider value={{ user, token, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    )

}
