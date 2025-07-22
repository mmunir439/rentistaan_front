
// "use client";
// import React, { useState, useEffect } from "react";
// import { useParams } from "next/navigation";
// import api from "@/lib/axios";
// import Footer from "@/components/Footer";
// import Navbar from "@/components/Navbar_2";

// export default function Itembyid() {
//     const [itemvalue, setItemvlaue] = useState({});
//     const [durationDetails, setDurationDetails] = useState(null);
//     const { id } = useParams();

//     async function getbyid() {
//         try {
//             const response = await api.get(`/rentitem/${id}`);
//             setItemvlaue(response.data.data);

//             const { startTime, endTime, pricePerHour } = response.data.data;
//             if (startTime && endTime) {
//                 const start = new Date(startTime);
//                 const end = new Date(endTime);
//                 const totalHours = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60)));
//                 const totalPrice = totalHours * pricePerHour;

//                 setDurationDetails({ totalHours, totalPrice });
//             } else {
//                 setDurationDetails(null);
//             }
//         } catch (err) {
//             console.error("Error fetching item:", err);
//         }
//     }

//     async function handleToggleStatus() {
//         try {
//             const res = await api.put(`/rentitem/${itemvalue._id}/toggle-status`);
//             setItemvlaue(res.data.data); // Refresh status
//             setDurationDetails(null); // Reset rental info
//         } catch (err) {
//             console.error("Error toggling status:", err);
//         }
//     }

//     useEffect(() => {
//         getbyid();
//     }, []);

//     return (
//         <div className="min-h-screen bg-slate-100">
//             <Navbar />

//             <main className="max-w-4xl mx-auto px-4 py-10">
//                 <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
//                     <div className="sm:flex">
//                         {/* Image Section */}
//                         <div className="sm:w-1/2 h-72 sm:h-auto overflow-hidden">
//                             <img
//                                 src={itemvalue.image?.[0]?.url || "/no-image.png"}
//                                 alt={itemvalue.title}
//                                 className="object-cover w-full h-full"
//                             />
//                         </div>

//                         {/* Details Section */}
//                         <div className="sm:w-1/2 p-6 flex flex-col justify-between space-y-4">
//                             <div>
//                                 <h2 className="text-2xl font-bold text-gray-800 mb-2">
//                                     {itemvalue.title}
//                                 </h2>
//                                 <p className="text-sm text-gray-500">📂 {itemvalue.category}</p>
//                                 <p className="text-lg font-semibold text-orange-600 mt-2">
//                                     ₨ {itemvalue.pricePerHour} / hour
//                                 </p>
//                                 <p className="text-sm text-gray-500 mt-1">📍 {itemvalue.location}</p>

//                                 <p className="mt-3">
//                                     <span className="font-semibold">Status: </span>
//                                     <span
//                                         className={`font-semibold ${itemvalue.isRented ? "text-red-600" : "text-green-600"
//                                             }`}
//                                     >
//                                         {itemvalue.isRented ? "Already Rented" : "Available"}
//                                     </span>
//                                 </p>

//                                 {durationDetails && (
//                                     <div className="mt-4 space-y-1 text-sm text-gray-700">
//                                         <p>
//                                             ⏰ <span className="font-semibold">Total Hours:</span>{" "}
//                                             {durationDetails.totalHours} hours
//                                         </p>
//                                         <p>
//                                             💵 <span className="font-semibold">Total Price:</span>{" "}
//                                             ₨ {durationDetails.totalPrice}
//                                         </p>
//                                     </div>
//                                 )}

//                                 <p className="text-sm text-gray-700 mt-4 leading-relaxed">
//                                     {itemvalue.description || `No description provided.`}
//                                 </p>
//                             </div>

//                             {/* CTA */}
//                             {!itemvalue.isRented ? (
//                                 <button
//                                     onClick={() => window.location.href = `/booking/${itemvalue._id}`}
//                                     className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-xl transition-all"
//                                 >
//                                     Rent Now
//                                 </button>
//                             ) : (
//                                 <>
//                                     <button
//                                         disabled
//                                         className="w-full bg-gray-300 text-gray-600 font-semibold py-2 px-4 rounded-xl cursor-not-allowed"
//                                     >
//                                         Already Rented
//                                     </button>
//                                     <button
//                                         onClick={handleToggleStatus}
//                                         className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-xl transition-all mt-2"
//                                     >
//                                         Give Back (Make Available)
//                                     </button>
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </main>

//             <Footer />
//         </div>
//     );
// }
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

    // // ✅ Fetch item details on mount
    // useEffect(() => {
    //     if (!id) return;

    //     async function fetchItem() {
    //         try {
    //             const res = await api.get(`/rentitem/${id}`);
    //             setItem(res.data.data);
    //         } catch (err) {
    //             console.error("Failed to load item:", err);
    //             setError("Could not load item details.");
    //         }
    //     }

    //     fetchItem();
    // }, [id]);

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
