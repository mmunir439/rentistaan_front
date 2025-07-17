"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios"; // Axios instance with baseURL

export default function RegisterPage() {
    const router = useRouter();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Handle input change
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            // Send JSON directly — no FormData needed
            await api.post("/user/register", form);
            router.push("/login");
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Registration failed. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white rounded-lg shadow-md w-full max-w-md px-8 py-10">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Create Your Account
                </h2>

                {error && (
                    <p className="mb-4 text-red-600 font-medium text-center">{error}</p>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name */}
                    <div>
                        <label className="block mb-1 text-sm font-semibold text-gray-700">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your full name"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block mb-1 text-sm font-semibold text-gray-700">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block mb-1 text-sm font-semibold text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition duration-200"
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>
            </div>
        </div>
    );
}
