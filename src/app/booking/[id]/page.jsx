
"use client";

import { useState } from "react";
import api from "@/lib/axios";
import { useRouter, useParams } from "next/navigation";
import { getToken } from "@/utils/token"; // your auth helper if any

export default function BookingForm() {
    const router = useRouter();
    const params = useParams();         // 👈 get dynamic route
    const { id } = useParams();
    // const id = params.id;
    // const id = params?.id;
    console.log(`id is ${id}`)
    const [form, setForm] = useState({ startTime: "", endTime: "" });
    const [bookingDate, setBookingDate] = useState(() =>
        new Date().toISOString().split("T")[0]
    );

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        setError("");

        try {
            const token = getToken();
            if (!token) throw new Error("Please login first.");

            const startHour = String(form.startTime).padStart(2, "0");
            const endHour = String(form.endTime).padStart(2, "0");

            const startTimeISO = new Date(`${bookingDate}T${startHour}:00:00Z`).toISOString();
            const endTimeISO = new Date(`${bookingDate}T${endHour}:00:00Z`).toISOString();

            if (parseInt(form.endTime) <= parseInt(form.startTime)) {
                setError("⚠️ End time must be after start time.");
                setLoading(false);
                return;
            }

            // ✅ Just send start and end time
            await api.post(
                `/tookonRent/${id}`,
                { startTime: startTimeISO, endTime: endTimeISO },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setMessage("✅ Booking request submitted successfully!");
            setTimeout(() => router.push("/dashboard"), 3000);
        } catch (err) {
            const msg = err?.response?.data?.message || err.message || "Booking failed.";
            setError(msg);
        } finally {
            setLoading(false);
        }
    };


    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-4">
            <h2 className="text-2xl font-bold text-center text-[#f85606]">Book This Item</h2>

            <div>
                <label className="block font-medium mb-1 text-gray-700">Booking Date</label>
                <input
                    type="date"
                    value={bookingDate}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setBookingDate(e.target.value)}
                    required
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
            </div>

            <div>
                <label className="block font-medium mb-1 text-gray-700">Start Time (Hour 0–23)</label>
                <input
                    type="number"
                    name="startTime"
                    value={form.startTime}
                    min="0"
                    max="23"
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
            </div>

            <div>
                <label className="block font-medium mb-1 text-gray-700">End Time (Hour 1–24)</label>
                <input
                    type="number"
                    name="endTime"
                    value={form.endTime}
                    min="1"
                    max="24"
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
            >
                {loading ? "Booking..." : "Book Now"}
            </button>

            {message && <p className="text-green-600 text-center mt-2">{message}</p>}
            {error && <p className="text-red-600 text-center mt-2">{error}</p>}
        </form>
    );
}
