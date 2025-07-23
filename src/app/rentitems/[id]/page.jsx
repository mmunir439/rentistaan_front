
"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { getToken } from "@/utils/token";
import Navbar from "@/components/Navbar_2";
import Footer from "@/components/Footer";

export default function BookingPage() {
    const { id } = useParams();
    const router = useRouter();

    const [item, setItem] = useState(null);
    const [form, setForm] = useState({ startTime: "", endTime: "" });
    const [bookingDate, setBookingDate] = useState(() => new Date().toISOString().split("T")[0]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    // ✅ Form change handler
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
        setMessage("");
    };

    // ✅ Submit booking
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setMessage("");

        try {
            const token = getToken();
            if (!token) throw new Error("Please login first.");

            const startHour = String(form.startTime).padStart(2, "0");
            const endHour = String(form.endTime).padStart(2, "0");

            if (parseInt(form.endTime) <= parseInt(form.startTime)) {
                setError("⚠️ End time must be after start time.");
                setLoading(false);
                return;
            }

            const startTimeISO = new Date(`${bookingDate}T${startHour}:00:00Z`).toISOString();
            const endTimeISO = new Date(`${bookingDate}T${endHour}:00:00Z`).toISOString();

            await api.post(
                `/tookonRent/${id}`,
                { startTime: startTimeISO, endTime: endTimeISO },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setMessage("✅ Booking request submitted successfully!");
            setTimeout(() => router.push("/dashboard"), 3000);
        } catch (err) {
            const msg = err?.response?.data?.message || err.message || "Booking failed.";
            setError(`❌ ${msg}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#f5f5f5]">
            <Navbar />

            <main className="flex-grow px-4 py-10 max-w-md mx-auto">
                <div className="bg-white shadow-md rounded-xl p-6 space-y-6">
                    <h2 className="text-2xl font-bold text-center text-orange-600">Book Item</h2>

                    {item && (
                        <p className="text-center text-gray-600">
                            You're booking: <span className="font-semibold">{item.title}</span>
                        </p>
                    )}

                    {error && <p className="text-red-600 bg-red-100 p-3 rounded">{error}</p>}
                    {message && <p className="text-green-600 bg-green-100 p-3 rounded">{message}</p>}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block font-medium mb-1">Booking Date</label>
                            <input
                                type="date"
                                value={bookingDate}
                                min={new Date().toISOString().split("T")[0]}
                                onChange={(e) => setBookingDate(e.target.value)}
                                required
                                className="w-full border p-2 rounded"
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-1">Start Hour (0–23)</label>
                            <input
                                type="number"
                                name="startTime"
                                value={form.startTime}
                                min="0"
                                max="23"
                                onChange={handleChange}
                                required
                                className="w-full border p-2 rounded"
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-1">End Hour (1–24)</label>
                            <input
                                type="number"
                                name="endTime"
                                value={form.endTime}
                                min="1"
                                max="24"
                                onChange={handleChange}
                                required
                                className="w-full border p-2 rounded"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-2 font-semibold text-white rounded ${loading ? "bg-orange-300 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"
                                }`}
                        >
                            {loading ? "Booking..." : "Confirm Booking"}
                        </button>
                    </form>
                </div>
            </main>

            <Footer />
        </div>
    );
}
