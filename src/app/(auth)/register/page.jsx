"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
export default function RegisterPage() {
    const router = useRouter();
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        try {
            await axios.post("/user/register", form);
            alert("Registration successful!");
            router.push("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed.");
        }
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 rounded-lg border bg-white p-6 shadow">
                <h1 className="text-2xl font-bold text-center">Register</h1>

                <input
                    required
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500"
                />
                <input
                    required
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500"
                />
                <input
                    required
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500"
                />

                {error && <p className="text-sm text-red-600">{error}</p>}

                <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded font-medium">
                    Register
                </button>

                <p className="text-center text-sm">
                    Already have an account? <a href="/login" className="text-orange-600 hover:underline">Login</a>
                </p>
            </form>
        </main>
    );
}
