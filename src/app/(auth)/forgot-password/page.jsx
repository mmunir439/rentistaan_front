"use client";

import { useState } from "react";
import api from "@/lib/axios";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        setMessage("");
        setError("");

        try {
            const res = await api.post("/user/forgotPassword", { email });
            setMessage("If the email exists, a reset link has been sent.");
        } catch (err) {
            setError("Failed to send reset link. Try again.");
        }
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 rounded-lg border bg-white p-6 shadow">
                <h1 className="text-2xl font-bold text-center">Forgot Password</h1>

                <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500"
                />

                {message && <p className="text-green-600 text-sm">{message}</p>}
                {error && <p className="text-red-600 text-sm">{error}</p>}

                <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600">
                    Send Reset Link
                </button>
            </form>
        </main>
    );
}
