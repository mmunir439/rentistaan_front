// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import api from "@/lib/axios";
// import { getToken } from "@/utils/token";
// import Navbar from "@/components/Navbar_2";
// import Footer from "@/components/Footer";

// export default function BookItemPage() {

//     const router = useRouter();
//     const [item, setItem] = useState(null);
//     const [form, setForm] = useState({ startTime: "", endTime: "" });
//     const [loading, setLoading] = useState(false);
//     const [message, setMessage] = useState("");
//     const [error, setError] = useState("");
//     const [totalHours, setTotalHours] = useState(0);
//     const [user, setUser] = useState(null); // 👈 user data state

//     useEffect(() => {
//         async function fetchItem() {
//             try {
//                 const res = await api.get(`/rentitem/${id}`);
//                 setItem(res.data.data);
//             } catch (err) {
//                 console.error("Error fetching item details:", err);
//                 setError("Failed to load item.");
//             }
//         }

//         async function fetchUser() {
//             try {
//                 const token = getToken();
//                 if (!token) throw new Error("User not logged in");

//                 const user = JSON.parse(localStorage.getItem("user"));
//             } catch (err) {
//                 console.error("Error fetching user:", err);
//                 setError("Unauthorized access.");
//             }
//         }

//         if (id) {
//             fetchItem();
//             fetchUser();
//         }
//     }, [id]);

//     useEffect(() => {
//         const start = Number(form.startTime);
//         const end = Number(form.endTime);

//         if (!isNaN(start) && !isNaN(end) && end > start) {
//             setTotalHours(end - start);
//         } else {
//             setTotalHours(0);
//         }
//     }, [form.startTime, form.endTime]);

//     const handleChange = (e) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//         setMessage("");
//         setError("");
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setMessage("");
//         setError("");

//         try {
//             const token = getToken();
//             if (!token) throw new Error("Please log in.");

//             const res = await api.post(
//                 `/tookonRent/${id}`,
//                 {
//                     startTime: Number(form.startTime),
//                     endTime: Number(form.endTime),
//                     totalHours,
//                     totalPrice: totalHours * item.pricePerHour,
//                 },
//                 {
//                     headers: { Authorization: `Bearer ${token}` },
//                 }
//             );

//             setMessage("✅ Booking requested successfully!");
//             setTimeout(() => router.push("/dashboard"), 4000);
//         } catch (err) {
//             const msg = err.response?.data?.message || err.message || "Booking failed.";
//             setError(msg);
//             setTimeout(() => router.push("/"), 5000);
//             // router.push("/");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen flex flex-col bg-[#F5F5F5]">
//             <Navbar />
//             <section className="flex-grow flex items-center justify-center p-4">
//                 <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md space-y-6">
//                     <h2 className="text-2xl font-bold text-center text-[#FF5722]">Book Item</h2>

//                     {error && <div className="text-[#D32F2F] bg-[#FFCDD2] p-3 rounded">{error}</div>}
//                     {message && <div className="text-green-800 bg-green-100 p-3 rounded">{message}</div>}

//                     {/* 👇 Prevent Admins from Booking */}
//                     {user?.role === "admin" ? (
//                         <div className="text-red-700 bg-red-100 p-4 rounded text-center font-semibold">
//                             🚫 Admins are not allowed to book items.
//                         </div>
//                     ) : (
//                         <form onSubmit={handleSubmit} className="space-y-6">
//                             {["Start Hour", "End Hour"].map((label, idx) => (
//                                 <div key={label}>
//                                     <label className="block mb-1 font-medium text-[#333333]">{label}:</label>
//                                     <select
//                                         name={idx === 0 ? "startTime" : "endTime"}
//                                         value={idx === 0 ? form.startTime : form.endTime}
//                                         onChange={handleChange}
//                                         required
//                                         className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#FF5722] transition"
//                                     >
//                                         <option value="">Select hour</option>
//                                         {[...Array(24).keys()].map((h) => (
//                                             <option key={h} value={h}>
//                                                 {h}:00
//                                             </option>
//                                         ))}
//                                     </select>
//                                     {idx === 1 &&
//                                         form.startTime &&
//                                         form.endTime &&
//                                         Number(form.endTime) <= Number(form.startTime) && (
//                                             <p className="text-sm text-red-600 mt-1">
//                                                 ⚠️ End time must be greater than start time.
//                                             </p>
//                                         )}
//                                 </div>
//                             ))}

//                             {item && totalHours > 0 && (
//                                 <div className="bg-[#FFF3E0] p-4 rounded transition-all duration-300 ease-in-out">
//                                     <p className="text-[#FF5722] font-semibold text-center sm:text-left">
//                                         ⏱ Total Hours: <span className="font-bold">{totalHours}</span>
//                                     </p>
//                                     <p className="text-[#E64A19] font-semibold text-center sm:text-left">
//                                         💰 Total Rent:{" "}
//                                         <span className="font-bold">Rs {totalHours * item.pricePerHour}</span>
//                                     </p>
//                                 </div>
//                             )}

//                             <button
//                                 type="submit"
//                                 disabled={loading}
//                                 className={`w-full py-3 font-semibold text-white rounded-lg transition ${loading
//                                     ? "bg-[#FFCCBC] cursor-not-allowed text-[#E64A19]"
//                                     : "bg-[#FF5722] hover:bg-[#E64A19]"
//                                     }`}
//                             >
//                                 {loading ? "Booking..." : "Confirm Booking"}
//                             </button>
//                         </form>
//                     )}
//                 </div>
//             </section>
//             <Footer />
//         </div>
//     );
// }

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
