"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar_2";

export default function EditProfilePage() {
    const router = useRouter();
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        password: "",
    });

    const [fieldErrors, setFieldErrors] = useState({});
    const [generalError, setGeneralError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await api.get("/user/me");
                const { name, email, phone, address } = res.data.user;
                setForm({ name, email, phone, address, password: "" });
            } catch (err) {
                console.error(err);
                router.push("/login");
            }
        }

        fetchUser();
    }, [router]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });

        // Clear field-specific error when user types
        setFieldErrors((prev) => ({
            ...prev,
            [e.target.name]: "",
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        setGeneralError("");
        setFieldErrors({});

        try {
            const res = await api.put("/user/update-profile", form);
            setMessage("✅ Profile updated successfully. Redirecting...");

            const userRes = await api.get("/user/me");
            const role = userRes.data.user.role;

            setTimeout(() => {
                role === "user" ? router.push("/dashboard") : router.push("/admin");
            }, 3000);
        } catch (err) {
            console.error(err);

            if (err.response?.data?.errors) {
                setFieldErrors(err.response.data.errors);
            } else if (err.response?.data?.message) {
                const message = err.response.data.message;

                // Auto-map error to specific field if possible
                if (message.toLowerCase().includes("phone")) {
                    setFieldErrors({ phone: message });
                } else if (message.toLowerCase().includes("email")) {
                    setFieldErrors({ email: message });
                } else {
                    setGeneralError(message);
                }
            } else {
                setGeneralError("Update failed. Try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />
            <section className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-orange-100 via-white to-pink-100">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-orange-200">
                    <h2 className="text-2xl font-bold text-center text-orange-600 mb-6">Edit Profile</h2>

                    {message && (
                        <div className="bg-green-100 text-green-700 border border-green-300 p-2 rounded text-center text-sm mb-4">
                            {message}
                        </div>
                    )}

                    {generalError && (
                        <div className="bg-red-100 text-red-700 border border-red-300 p-2 rounded text-center text-sm mb-4">
                            {generalError}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {[
                            { label: "Full Name", name: "name", type: "text", placeholder: "Muhammad Munir" },
                            { label: "Email", name: "email", type: "email", placeholder: "you@example.com" },
                            { label: "Phone", name: "phone", type: "text", placeholder: "+923001234567" },
                            { label: "Address", name: "address", type: "text", placeholder: "Your address" },
                            { label: "New Password", name: "password", type: "password", placeholder: "Leave empty to keep current" },
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
                            {loading ? "Saving..." : "Update Profile"}
                        </button>
                    </form>
                </div>
            </section>
            <Footer />
        </div>
    );
}
