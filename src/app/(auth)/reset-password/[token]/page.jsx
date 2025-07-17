"use client";
const { token } = useParams();

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import api from "@/lib/axios";

export default function ResetPasswordPage() {
    const router = useRouter();
    const { token } = useParams();
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    async function handleReset(e) {
        e.preventDefault();
        try {
            const res = await api.post(`/user/resetPassword/${token}`, { password });
            setMessage("Password reset successfully. Please login.");
            setTimeout(() => {
                router.push("/login");
            }, 2000);
        } catch (err) {
            setMessage(err.response?.data?.message || "Reset failed.");
        }
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <form onSubmit={handleReset} className="w-full max-w-sm space-y-4 rounded-lg border bg-white p-6 shadow">
                <h1 className="text-2xl font-bold text-center">Reset Password</h1>
                <input
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500"
                    required
                />
                {message && <p className="text-sm text-center text-red-600">{message}</p>}
                <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600">
                    Reset Password
                </button>
            </form>
        </main>
    );
}
