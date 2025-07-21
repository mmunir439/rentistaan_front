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
    const [item, setItem] = useState(null);
    const [form, setForm] = useState({ startTime: "", endTime: "" });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [totalHours, setTotalHours] = useState(0);
    const [user, setUser] = useState(null); // 👈 user data state

    useEffect(() => {
        async function fetchItem() {
            try {
                const res = await api.get(`/rentitem/${id}`);
                setItem(res.data.data);
            } catch (err) {
                console.error("Error fetching item details:", err);
                setError("Failed to load item.");
            }
        }

        async function fetchUser() {
            try {
                const token = getToken();
                if (!token) throw new Error("User not logged in");

                const user = JSON.parse(localStorage.getItem("user"));
            } catch (err) {
                console.error("Error fetching user:", err);
                setError("Unauthorized access.");
            }
        }

        if (id) {
            fetchItem();
            fetchUser();
        }
    }, [id]);

    useEffect(() => {
        const start = Number(form.startTime);
        const end = Number(form.endTime);

        if (!isNaN(start) && !isNaN(end) && end > start) {
            setTotalHours(end - start);
        } else {
            setTotalHours(0);
        }
    }, [form.startTime, form.endTime]);

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

            const res = await api.post(
                `/tookonRent/${id}`,
                {
                    startTime: Number(form.startTime),
                    endTime: Number(form.endTime),
                    totalHours,
                    totalPrice: totalHours * item.pricePerHour,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

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
                <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md space-y-6">
                    <h2 className="text-2xl font-bold text-center text-[#FF5722]">Book Item</h2>

                    {error && <div className="text-[#D32F2F] bg-[#FFCDD2] p-3 rounded">{error}</div>}
                    {message && <div className="text-green-800 bg-green-100 p-3 rounded">{message}</div>}

                    {/* 👇 Prevent Admins from Booking */}
                    {user?.role === "admin" ? (
                        <div className="text-red-700 bg-red-100 p-4 rounded text-center font-semibold">
                            🚫 Admins are not allowed to book items.
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {["Start Hour", "End Hour"].map((label, idx) => (
                                <div key={label}>
                                    <label className="block mb-1 font-medium text-[#333333]">{label}:</label>
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
                                    {idx === 1 &&
                                        form.startTime &&
                                        form.endTime &&
                                        Number(form.endTime) <= Number(form.startTime) && (
                                            <p className="text-sm text-red-600 mt-1">
                                                ⚠️ End time must be greater than start time.
                                            </p>
                                        )}
                                </div>
                            ))}

                            {item && totalHours > 0 && (
                                <div className="bg-[#FFF3E0] p-4 rounded transition-all duration-300 ease-in-out">
                                    <p className="text-[#FF5722] font-semibold text-center sm:text-left">
                                        ⏱ Total Hours: <span className="font-bold">{totalHours}</span>
                                    </p>
                                    <p className="text-[#E64A19] font-semibold text-center sm:text-left">
                                        💰 Total Rent:{" "}
                                        <span className="font-bold">Rs {totalHours * item.pricePerHour}</span>
                                    </p>
                                </div>
                            )}

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
                    )}
                </div>
            </section>
            <Footer />
        </div>
    );
}
