"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import Link from "next/link";

export default function RegisterPage() {
    const router = useRouter();

    const [form, setForm] = useState({ name: "", email: "", password: "", photo: null });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); // ✅ Loading state

    async function handleSubmit(e) {
        e.preventDefault(); // ❌ Prevents the page from reloading on form submit
        setError("");       // 🔁 Clear any old error messages
        setLoading(true);   // ✅ Start loading

        try {
            // ✅ Log the form data for debugging
            console.log("Submitting form:", form);

            // ✅ Send POST request to backend /user/register with the form data
            const formData = new FormData();
            formData.append("name", form.name);
            formData.append("email", form.email);
            formData.append("password", form.password);
            if (form.photo) {
                formData.append("photo", form.photo);
            }

            await api.post("/user/register", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            // ✅ If successful, show success alert and redirect to login page
            alert("Registration successful!");
            router.push("/login");

        } catch (err) {
            // ❌ If there's an error (like email already used), show it
            console.error("Registration Error:", err);
            setError(err.response?.data?.message || "Registration failed.");
        } finally {
            setLoading(false); // ✅ Stop loading
        }
    }
    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            {/* ✅ Registration Form */}
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm space-y-4 rounded-lg border bg-white p-6 shadow"
            >
                {/* 🔤 Title of the form */}
                <h1 className="text-2xl font-bold text-center">Register</h1>

                {/* 🧑 Input for Name */}
                <input
                    required
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500"
                    disabled={loading}
                />

                {/* 📧 Input for Email */}
                <input
                    required
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500"
                    disabled={loading}
                />

                {/* 🔒 Input for Password */}
                <input
                    required
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500"
                    disabled={loading}
                />

                {/* 📷 Input for Photo */}
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setForm({ ...form, photo: e.target.files[0] })}
                    className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500"
                    disabled={loading}
                />

                {/* ❌ Display error if exists */}
                {error && <p className="text-sm text-red-600">{error}</p>}

                {/* ✅ Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded font-medium disabled:opacity-60"
                >
                    {loading ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    fill="none"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                                />
                            </svg>
                            Registering...
                        </span>
                    ) : (
                        "Register"
                    )}
                </button>

                {/* 🔁 Link to Login Page */}
                <p className="text-center text-sm">
                    Already have an account?{" "}
                    <Link href="/login" className="text-orange-600 hover:underline">
                        Login
                    </Link>
                </p>
            </form>
        </main>
    );
}
