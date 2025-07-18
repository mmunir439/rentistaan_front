"use client"; // ✅ This tells Next.js that this component runs on the client side

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios"; // ✅ Axios instance with baseURL setup

export default function RegisterPage() {
    const router = useRouter();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-white to-pink-100 px-4">
            <div className="w-full max-w-lg bg-white shadow-2xl rounded-xl p-8 sm:p-10 border border-orange-200">
                <h2 className="text-3xl font-extrabold text-center text-orange-600 mb-6 tracking-tight">
                    Create Your Account
                </h2>

                {error && (
                    <p className="text-red-600 bg-red-100 border border-red-200 rounded p-3 mb-4 text-sm text-center">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Full Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:outline-none transition"
                            placeholder="e.g. Muhammad Ali"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:outline-none transition"
                            placeholder="you@example.com"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:outline-none transition"
                            placeholder="••••••••"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-sm transition duration-200"
                    >
                        {loading ? "Registering..." : "Create Account"}
                    </button>
                </form>

                {/* Optional: already have account link */}
                <p className="text-sm text-center text-gray-600 mt-6">
                    Already have an account?{" "}
                    <a href="/login" className="text-orange-500 font-semibold hover:underline">
                        Log in
                    </a>
                </p>
            </div>
        </div>
    );
}
