"use client";

import { useState } from "react";
import api from "@/lib/axios";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); // 🔸 Loading state

    // 🔸 Handle form submission
    async function handleSubmit(e) {
        e.preventDefault();
        setMessage("");
        setError("");
        setLoading(true); // Start loading

        try {
            const res = await api.post("/user/forgotPassword", { email });
            setMessage("If the email exists, a reset link has been sent.");
        } catch (err) {
            setError("Failed to send reset link. Try again.");
        } finally {
            setLoading(false); // Stop loading
        }
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm space-y-4 rounded-lg border bg-white p-6 shadow"
            >
                <h1 className="text-2xl font-bold text-center">Forgot Password</h1>

                <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500"
                />

                {/* ✅ Feedback messages */}
                {message && <p className="text-green-600 text-sm">{message}</p>}
                {error && <p className="text-red-600 text-sm">{error}</p>}

                {/* ✅ Submit button with loading UI */}
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 rounded text-white ${loading ? "bg-orange-300 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"
                        }`}
                >
                    {loading ? "Sending Reset Link..." : "Send Reset Link"}
                </button>
            </form>
        </main>
    );
}
