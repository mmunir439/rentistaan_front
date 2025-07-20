"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/axios";
import { getToken } from "@/utils/token"; // If using JWT in frontend
import Navbar from "@/components/Navbar_2";
import Footer from "@/components/Footer";

export default function BookItemPage() {
    const { id } = useParams(); // rentitemId from URL
    const router = useRouter();

    const [form, setForm] = useState({
        startTime: "",
        endTime: "",
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const token = getToken(); // ✅ Get token from localStorage
            const res = await api.post(
                `/tookonRent/${id}`,
                form,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // ✅ Send it here
                    },
                }
            );

            setMessage("Booking requested successfully ✅");
            router.push("/dashboard");
        } catch (err) {
            console.log(err.response?.data); // ✅ See actual backend error
            setMessage(err?.response?.data?.msg || "Booking failed ❌");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <section className="min-h-screen flex justify-center items-center bg-gray-100 py-10">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
                >
                    <h2 className="text-2xl font-semibold mb-4 text-center">Book Item</h2>

                    <label className="block mb-2">Start Time:</label>
                    <input
                        type="datetime-local"
                        name="startTime"
                        value={form.startTime}
                        onChange={handleChange}
                        required
                        className="w-full mb-4 px-3 py-2 border rounded"
                    />

                    <label className="block mb-2">End Time:</label>
                    <input
                        type="datetime-local"
                        name="endTime"
                        value={form.endTime}
                        onChange={handleChange}
                        required
                        className="w-full mb-4 px-3 py-2 border rounded"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        {loading ? "Booking..." : "Confirm Booking"}
                    </button>

                    {message && (
                        <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
                    )}
                </form>
            </section>
            <Footer />
        </>
    );
}
