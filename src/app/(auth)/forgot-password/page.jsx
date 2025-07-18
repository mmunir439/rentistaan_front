"use client"; // Enables Client-side rendering in Next.js App Router

import { useState } from "react"; // React hook to manage state
import api from "@/lib/axios"; // ✅ Axios instance with pre-configured baseURL
import axios from "axios";

export default function ForgotPasswordPage() {
    // 🔹 Local state for managing form input and response messages
    const [email, setEmail] = useState(""); // Stores email input value
    const [message, setMessage] = useState(""); // Stores success message
    const [error, setError] = useState(""); // Stores error message
    // 🔹 Handle form submission
    async function handleSubmit(e) {
        e.preventDefault(); // Prevent form reload
        setMessage(""); // Clear old success message
        setError(""); // Clear old error message
        try {
            // 🔸 Send POST request to backend API with email
            const res = await api.post("/user/forgotPassword", { email });

            // ✅ Show success message (regardless of whether the email exists)
            setMessage("If the email exists, a reset link has been sent.");
        } catch (err) {
            // ❌ Show a generic error message
            setError("Failed to send reset link. Try again.");
        }
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            {/* 🔸 Centered form UI */}
            <button onClick={() => test()}></button>
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm space-y-4 rounded-lg border bg-white p-6 shadow"
            >
                {/* 🔸 Page title */}
                <h1 className="text-2xl font-bold text-center">Forgot Password</h1>

                {/* 🔸 Email input field */}
                <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500"
                />

                {/* 🔸 Display success or error messages */}
                {message && <p className="text-green-600 text-sm">{message}</p>}
                {error && <p className="text-red-600 text-sm">{error}</p>}

                {/* 🔸 Submit button */}
                <button
                    type="submit"
                    className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
                >
                    Send Reset Link
                </button>
            </form>
        </main>
    );
}
