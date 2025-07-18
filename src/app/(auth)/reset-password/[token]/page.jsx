"use client";
// 🔸 This tells Next.js that this file should be rendered on the client side.

import { useState } from "react"; // 🔹 React hook to manage local component state
import { useRouter, useParams } from "next/navigation"; // 🔹 Hooks to navigate and get route parameters
import api from "@/lib/axios"; // 🔹 Axios instance with base URL configured

export default function ResetPasswordPage() {
    const router = useRouter(); // 🔸 For redirecting user after password reset
    const params = useParams(); // 🔸 To get dynamic route params like token
    const token = params.token; // 🔸 Extract token from the route (reset-password/[token])

    const [password, setPassword] = useState(""); // 🔹 State to hold new password input
    const [message, setMessage] = useState(""); // 🔹 State to show success/error messages

    // 🔸 Function to handle form submission
    async function handleReset(e) {
        e.preventDefault(); // ❌ Prevents default form submission (page reload)

        try {
            // 🔹 Send POST request to backend with token and new password
            const res = await api.post(`/user/resetPassword/${token}`, { password });

            // ✅ If successful, show message and redirect after 2 seconds
            setMessage("Password reset successfully. Redirecting to login...");
            setTimeout(() => router.push("/login"), 2000); // ⏱️ Redirect to login page after 2 seconds
        } catch (err) {
            // ❌ If error, show the backend error message or a default message
            setMessage(err.response?.data?.message || "Reset failed.");
        }
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            {/* 🔹 Centered form container */}
            <form
                onSubmit={handleReset}
                className="w-full max-w-sm space-y-4 rounded-lg border bg-white p-6 shadow"
            >
                {/* 🔸 Page Heading */}
                <h1 className="text-2xl font-bold text-center">Reset Password</h1>

                {/* 🔸 Password input field */}
                <input
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // 🔹 Update password state on change
                    className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500"
                    required // ✅ Makes the field required before submission
                />

                {/* 🔹 Display message (success or error) */}
                {message && (
                    <p className="text-sm text-center text-red-600">{message}</p>
                )}

                {/* 🔸 Submit button */}
                <button
                    type="submit"
                    className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
                >
                    Reset Password
                </button>
            </form>
        </main>
    );
}
