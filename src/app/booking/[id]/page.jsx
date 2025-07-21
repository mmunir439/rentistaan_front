"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/axios";
import { getToken } from "@/utils/token";
import Navbar from "@/components/Navbar_2";
import Footer from "@/components/Footer";

export default function BookItemPage() {
    const { id } = useParams();
    const router = useRouter();

    const [form, setForm] = useState({ startTime: "", endTime: "" });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (!id) setError("Invalid item ID");
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setMessage("");
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        setError("");

        try {
            const token = getToken();
            if (!token) throw new Error("Please log in.");

            const res = await api.post(`/tookonRent/${id}`, {
                startTime: Number(form.startTime),
                endTime: Number(form.endTime),
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setMessage("✅ Booking requested successfully!");
            setTimeout(() => router.push("/dashboard"), 1500);
        } catch (err) {
            const msg = err.response?.data?.message || err.message || "Booking failed.";
            setError(msg);
            router.push("/");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#F5F5F5]">
            <Navbar />
            <section className="flex-grow flex items-center justify-center p-4">
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-md bg-white p-6 rounded-lg shadow-md space-y-6"
                >
                    <h2 className="text-2xl font-bold text-center text-[#FF5722]">
                        Book Item
                    </h2>

                    {error && (
                        <div className="text-[#D32F2F] bg-[#FFCDD2] p-3 rounded">
                            {error}
                        </div>
                    )}
                    {message && (
                        <div className="text-green-800 bg-green-100 p-3 rounded">
                            {message}
                        </div>
                    )}

                    {["Start Hour", "End Hour"].map((label, idx) => (
                        <div key={label}>
                            <label className="block mb-1 font-medium text-[#333333]">
                                {label}:
                            </label>
                            <select
                                name={idx === 0 ? "startTime" : "endTime"}
                                value={idx === 0 ? form.startTime : form.endTime}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#FF5722] transition"
                            >
                                <option value="">Select hour</option>
                                {[...Array(24).keys()].map((h) => (
                                    <option key={h} value={h}>
                                        {h}:00
                                    </option>
                                ))}
                            </select>
                        </div>
                    ))}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 font-semibold text-white rounded-lg transition ${loading
                            ? "bg-[#FFCCBC] cursor-not-allowed text-[#E64A19]"
                            : "bg-[#FF5722] hover:bg-[#E64A19]"
                            }`}
                    >
                        {loading ? "Booking..." : "Confirm Booking"}
                    </button>
                </form>
            </section>
            <Footer />
        </div>
    );
}
