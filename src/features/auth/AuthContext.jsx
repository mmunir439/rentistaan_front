// src/features/auth/AuthContext.jsx
"use client";
import { createContext, useContext, useState, useEffect } from "react";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const stored = localStorage.getItem("user");
        if (stored) setUser(JSON.parse(stored));
    }, []);

    async function login(email, password) {
        const { data } = await api.post("/user/login", { email, password });
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        router.push(data.user.role === "admin" ? "/admin" : "/dashboard");
    }

    function logout() {
        localStorage.clear();
        setUser(null);
        router.push("/login");
    }

    return (
        <AuthCtx.Provider value={{ user, isAuth: !!user, login, logout }}>
            {children}
        </AuthCtx.Provider>
    );
}

export const useAuth = () => useContext(AuthCtx);
