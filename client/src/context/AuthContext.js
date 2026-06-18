import React, { createContext, useState, useEffect } from "react";
export const AuthContext = createContext()
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token)
            setUser({ token })
        }
        else {
            localStorage.removeItem("token")
            setUser(null)
        }
        setLoading(false)
    }, [token])

    const login = (jwtToken,userData) => {
        setToken(jwtToken)
        setUser(userData)
    }

    const logout = () => {
        setToken(null)
        localStorage.removeItem("token")

    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    )

}
