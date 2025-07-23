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

    const [fieldErrors, setFieldErrors] = useState({});
    const [generalError, setGeneralError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name.toLowerCase()]: e.target.value,
        });

        // Clear field-specific error when typing
        setFieldErrors((prev) => ({
            ...prev,
            [e.target.name]: "",
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setGeneralError("");
        setFieldErrors({});
        setLoading(true);

        try {
            await api.post("/user/register", form);
            router.push("/login");
        } catch (err) {
            console.error(err);

            // If error has field-specific errors
            if (err.response?.data?.errors) {
                setFieldErrors(err.response.data.errors);
            } else if (err.response?.data?.message) {
                // Generic single error (like duplicate phone)
                const message = err.response.data.message;

                // Try to auto-detect the field from message
                if (message.toLowerCase().includes("phone")) {
                    setFieldErrors({ phone: message });
                } else if (message.toLowerCase().includes("email")) {
                    setFieldErrors({ email: message });
                } else {
                    setGeneralError(message);
                }
            } else {
                setGeneralError("Registration failed. Try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {/* <section className="min-h-screen bg-gradient-to-br from-orange-100 via-white to-pink-100 flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-orange-200">
                    <h2 className="text-2xl font-bold text-center text-orange-600 mb-6">
                        Sign Up
                    </h2>

                    {generalError && (
                        <div className="bg-red-100 text-red-700 border border-red-300 p-2 rounded text-center text-sm mb-4">
                            {generalError}
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
                                    className={`w-full px-3 py-2 text-sm rounded-lg border ${fieldErrors[input.name] ? "border-red-400" : "border-gray-300"
                                        } focus:ring-2 focus:ring-orange-400 focus:outline-none`}
                                />
                                {fieldErrors[input.name] && (
                                    <p className="text-red-600 text-xs mt-1">{fieldErrors[input.name]}</p>
                                )}
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
            </section> */}
            <section className="min-h-screen bg-gradient-to-br from-yellow-100 via-white to-pink-100 flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-yellow-300">
                    <h2 className="text-3xl font-extrabold text-center text-yellow-600 mb-8">
                        Sign Up
                    </h2>

                    {/* generalError div stays the same */}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {[
                            { label: "Full Name", name: "name", type: "text", placeholder: "Muhammad Munir" },
                            { label: "Email", name: "email", type: "email", placeholder: "you@example.com" },
                            { label: "Password", name: "password", type: "password", placeholder: "••••••••" },
                            { label: "Phone", name: "phone", type: "text", placeholder: "+923001234567" },
                            { label: "Address", name: "address", type: "text", placeholder: "Your address" },
                        ].map((input) => (
                            <div key={input.name}>
                                <label htmlFor={input.name} className="block text-sm font-semibold text-yellow-700 mb-1">
                                    {input.label}
                                </label>
                                <input
                                    type={input.type}
                                    name={input.name}
                                    value={form[input.name]}
                                    onChange={handleChange}
                                    required
                                    placeholder={input.placeholder}
                                    className={`w-full px-4 py-3 text-base rounded-xl border transition duration-300
              ${fieldErrors[input.name]
                                            ? "border-red-500 bg-red-50 placeholder-red-400"
                                            : "border-yellow-300 bg-yellow-50 placeholder-yellow-400 focus:border-yellow-500 focus:bg-yellow-100 focus:ring-2 focus:ring-yellow-300"}
              focus:outline-none`}
                                />
                                {fieldErrors[input.name] && (
                                    <p className="text-red-600 text-xs mt-1">{fieldErrors[input.name]}</p>
                                )}
                            </div>
                        ))}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 text-base bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-xl transition duration-300"
                        >
                            {loading ? "Registering..." : "Create Account"}
                        </button>
                    </form>

                    <p className="text-xs text-center text-yellow-700 mt-6">
                        Already have an account?{" "}
                        <a href="/login" className="text-yellow-600 font-semibold hover:underline">
                            Log in
                        </a>
                    </p>
                </div>
            </section>

            <Footer />
        </div>
    );
}
