"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { setToken } from "@/utils/token";
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter();
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [navLoading, setNavLoading] = useState(false); // 🔵 Navigation loading

    // 🔁 Navigation with loading (used for register/forgot)
    const handleNav = (url) => {
        setNavLoading(true);
        setTimeout(() => {
            router.push(url);
        }, 500); // small delay to show spinner
    };

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const res = await api.post("/user/login", form);
            const data = res.data;

            setToken(data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            router.push(data.user.role === "admin" ? "/admin" : "/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-orange-100 via-white to-orange-50 flex items-center justify-center px-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md rounded-2xl bg-white shadow-lg p-8 space-y-6 border border-orange-200"
            >
                <h1 className="text-3xl font-bold text-center text-orange-600">Welcome Back</h1>
                <p className="text-center text-gray-600 text-sm">
                    Log in to continue to <span className="font-medium text-orange-500">Rentistaan</span>
                </p>

                {/* Email Input */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                        required
                        type="email"
                        placeholder="Enter your email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        disabled={loading || navLoading}
                    />
                </div>

                {/* Password Input */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                    required
                    type="password"
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    disabled={loading || navLoading}
                />
                <div className="text-right mt-1 text-sm">
                    <button
                        type="button"
                        className="text-orange-600 hover:underline"
                        onClick={() => handleNav("/forgot-password")}
                        disabled={loading || navLoading}
                    >
                        {navLoading ? "Loading..." : "Forgot Password?"}
                    </button>
                </div>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-600 text-sm text-center">{error}</p>}

            {/* Submit Button */}
            <button
                type="submit"
                disabled={loading || navLoading}
                className="w-full bg-orange-500 hover:bg-orange-600 transition duration-200 text-white font-semibold py-3 rounded-md disabled:opacity-60"
            >
                {loading ? "Logging in..." : "Login"}
            </button>

            {/* Register Link */}
            <p className="text-center text-sm text-gray-600">
                Don’t have an account?{" "}
                <button
                    type="button"
                    onClick={() => handleNav("/register")}
                    disabled={loading || navLoading}
                    className="text-orange-600 hover:underline font-medium"
                >
                    {navLoading ? "Loading..." : "Register now"}
                </button>
            </p>
        </form >
        </main >
    );
}
