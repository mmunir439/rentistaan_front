"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { setToken, getToken, clearToken } from "@/utils/token";
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter();
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); // 🔵 Loading state

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true); // 🔵 Start loading

        try {
            const res = await api.post("/user/login", form);
            const data = res.data;

            setToken(data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            if (data.user.role === "admin") {
                router.push("/admin");
            } else {
                router.push("/dashboard");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Login failed.");
        } finally {
            setLoading(false); // 🔵 Stop loading
        }
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 rounded-lg border bg-white p-6 shadow">
                <h1 className="text-2xl font-bold text-center">Login</h1>

                <input
                    required
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500"
                    disabled={loading}
                />
                <input
                    required
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500"
                    disabled={loading}
                />

                <p className="text-right text-sm">
                    <Link href="/forgot-password" className="text-blue-600 hover:underline">Forgot Password?</Link>
                </p>

                {error && <p className="text-sm text-red-600">{error}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded font-medium disabled:opacity-60"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                <p className="text-center text-sm">
                    If you don't have an account,{" "}
                    <Link href="/register" className="text-orange-600 hover:underline">Create one</Link>
                </p>
            </form>
        </main>
    );
}
