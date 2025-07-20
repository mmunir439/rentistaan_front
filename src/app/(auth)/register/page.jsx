"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import Footer from "@/components/Footer";
export default function RegisterPage() {
    const router = useRouter();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name.toLowerCase()]: e.target.value,
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
        <div>
            <section className="min-h-screen bg-gradient-to-br from-orange-100 via-white to-pink-100 flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-orange-200">
                    <h2 className="text-2xl font-bold text-center text-orange-600 mb-6">
                        Sign Up
                    </h2>

                    {error && (
                        <div className="bg-red-100 text-red-700 border border-red-300 p-2 rounded text-center text-sm mb-4">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {[
                            { label: "Full Name", name: "name", type: "text", placeholder: "Muhammad Munir" },
                            { label: "Email", name: "email", type: "email", placeholder: "you@example.com" },
                            { label: "Password", name: "password", type: "password", placeholder: "••••••••" },
                            { label: "Phone", name: "phone", type: "text", placeholder: "+923001234567" },
                            { label: "Address", name: "address", type: "text", placeholder: "Your address" },
                        ].map((input) => (
                            <div key={input.name}>
                                <label htmlFor={input.name} className="block text-sm text-gray-700 mb-1">
                                    {input.label}
                                </label>
                                <input
                                    type={input.type}
                                    name={input.name}
                                    value={form[input.name]}
                                    onChange={handleChange}
                                    required
                                    placeholder={input.placeholder}
                                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                                />
                            </div>
                        ))}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2 text-sm bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition duration-200"
                        >
                            {loading ? "Registering..." : "Create Account"}
                        </button>
                    </form>

                    <p className="text-xs text-center text-gray-600 mt-5">
                        Already have an account?{" "}
                        <a href="/login" className="text-orange-500 font-medium hover:underline">
                            Log in
                        </a>
                    </p>
                </div>
            </section>
            <Footer />
        </div>
    );
}
