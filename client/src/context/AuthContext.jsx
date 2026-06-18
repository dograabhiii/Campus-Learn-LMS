// import { set } from "mongoose";
import { createContext, useContext, useEffect, useState } from "react";
import API from "../services/api";

//create context
const AuthContext = createContext();
//custom hook
export const useAuth = () => useContext(AuthContext);


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem("user");

            if (storedUser && token) {
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.error("Invalid user data");
        }
        setLoading(false);
    }, [token]);


    //REGISTER

    const register = async (formData) => {
        try {
            const { data } = await API.post('/auth/register', formData);
            return { success: true, data };
        } catch (err) {
            return {
                success: false,
                message: err.response?.data.message || "Registration failed",
            };
        }
    };

    //LOGIN

    const login = async (email, password) => {
        try {
            const { data } = await API.post('/auth/login', { email, password });
            setUser(data.user);
            setToken(data.token);

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            return { success: true ,
                message: "Login successful",
            };
        }
        catch (err) {
            return {
                success: false,
                message: err.response?.data.message || "Login failed",
            };
        }
        
    };

    // LOGOUT
    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    }

    const value = {
        user,
        token,
        login,
        logout,
        register,
        isAuthenticated: !!token,
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

