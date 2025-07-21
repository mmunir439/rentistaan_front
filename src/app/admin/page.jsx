
"use client";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import api from "@/lib/axios";
import ItemList from "@/components/ItemList";
export default function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [backendMessage, setBackendMessage] = useState("Checking backend...");
    const [error, setError] = useState("");
    const [approve, setApproved] = useState(false);
    const [bookings, setBookings] = useState([]);
    const [items, setItems] = useState([]);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await api.get("/admin/getalluser");
                setUsers(res.data.users || []);
                setBackendMessage("Backend connected ✅");
            } catch (err) {
                console.error("Failed to fetch users:", err);
                setError("Failed to fetch users.");
                setBackendMessage("Backend error ❌");
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);
    useEffect(() => {
        async function fetchBookings() {
            try {
                const res = await api.get("/admin/tookallrented");
                setBookings(res.data.bookings);
            } catch (err) {
                console.error("Error fetching bookings:", err);
            }
        }

        fetchBookings();
    }, []);
    async function updateBookingStatus(id, currentStatus) {
        try {
            const newStatus = currentStatus === "pending" ? "delivered" : "pending"; // Toggle

            await api.put(`/admin/updateBookingStatus/${id}`, {
                status: newStatus,
            });

            // Refresh the booking list
            const res = await api.get("/admin/tookallrented");
            setBookings(res.data.bookings);
        } catch (error) {
            console.error("Error updating booking status:", error);
        }
    }

    async function getItems() {
        try {
            const res = await api.get("/rentitem");
            setItems(res.data.data); // Full item list fetched once
        } catch (err) {
            console.error("Error fetching items:", err);
        }
    }
    useEffect(() => {
        getItems();
    }, [])
    async function toggleStatus(id, currentStatus) {
        try {
            const newStatus = currentStatus === "approved" ? "pending" : "approved";

            const response = await api.put(`/admin/approveItem/${id}`, {
                status: newStatus, // ✅ Send new status to backend
            });

            getItems(); // ⬅ Make sure this function exists and works
        } catch (error) {
            console.error("Error toggling item status:", error);
        }
    }


    return (
        <div>
            <main className="p-4 sm:p-6 md:p-10 bg-[#f7f7f7] min-h-screen">
                <div className="max-w-6xl mx-auto">
                    <div className="bg-white p-8 rounded-2xl shadow-xl text-center sm:text-left space-y-4">
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#f85606]">
                            Admin Dashboard
                        </h1>
                        <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                            Welcome, <span className="font-semibold text-black">Admin</span>!<br />
                            You have full control to approve items, manage rentals, and oversee all user activities on the platform.
                        </p>
                        <div className="flex items-center justify-center sm:justify-start text-sm text-gray-600 gap-2">
                            <span
                                className={`h-3 w-3 rounded-full ${backendMessage === "Connected to Backend" ? "bg-green-500" : "bg-red-500"
                                    }`}
                            ></span>
                            <span>
                                <span className="font-medium">System Status:</span> {backendMessage}
                            </span>
                        </div>
                    </div>



                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Users Box */}
                        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition border-t-4 border-[#f85606] overflow-auto max-h-[400px]">
                            <h2 className="text-xl font-semibold text-[#db3700] mb-4">Users</h2>
                            {loading ? (
                                <p className="text-gray-600">Loading users...</p>
                            ) : error ? (
                                <p className="text-red-500">{error}</p>
                            ) : users.length === 0 ? (
                                <p className="text-gray-600">No users found.</p>
                            ) : (
                                <div className="space-y-4">
                                    {users.map((user) => (
                                        <div key={user._id} className="border-b pb-2">
                                            <p className="text-gray-800 font-medium">👤 {user.name}</p>
                                            <p className="text-gray-600 text-sm">📧 {user.email}</p>
                                            <p className="text-gray-600 text-sm">📱 {user.phone}</p>
                                            <p className="text-gray-600 text-sm">🏠 {user.address}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Placeholder Boxes for Items and Bookings */}
                        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition border-t-4 border-[#f85606] overflow-auto max-h-[400px]">
                            <h2 className="text-xl font-semibold text-[#db3700] mb-4">Items</h2>
                            <p className="text-gray-600 mb-4">View and manage items for rent</p>

                            {items.length === 0 ? (
                                <p className="text-gray-500">No items available.</p>
                            ) : (
                                <div className="space-y-4">
                                    {items.map((item, index) => (
                                        <div
                                            key={index}
                                            className="border border-gray-200 rounded-lg p-4 shadow-sm bg-[#FAFAFA]"
                                        >
                                            <p className="text-lg font-semibold text-[#333]">
                                                🧾 Item Name: <span className="text-[#f85606]">{item.title}</span>
                                            </p>

                                            <div className="flex items-center justify-between mt-2">
                                                <p className="text-sm text-gray-700">
                                                    📌 Status:{" "}
                                                    <span
                                                        className={`px-2 py-1 rounded text-white text-xs font-semibold ${item.status === "approved"
                                                            ? "bg-green-500"
                                                            : item.status === "pending"
                                                                ? "bg-yellow-500"
                                                                : "bg-red-500"
                                                            }`}
                                                    >
                                                        {item.status}
                                                    </span>
                                                </p>

                                                {/* Toggle Button */}
                                                <button
                                                    onClick={() => toggleStatus(item._id, item.status)}
                                                    className={`text-xs font-semibold px-4 py-1 rounded-full shadow-sm transition ${item.status === "approved"
                                                        ? "bg-yellow-500 text-white hover:bg-yellow-600"
                                                        : "bg-green-500 text-white hover:bg-green-600"
                                                        }`}
                                                >
                                                    {item.status === "approved" ? "Set Pending" : "Approve"}
                                                </button>
                                            </div>
                                        </div>
                                    ))}

                                </div>
                            )}
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition border-t-4 border-[#f85606] overflow-auto max-h-[400px]">
                            <h2 className="text-xl font-semibold text-[#db3700] mb-2">Bookings</h2>
                            <p className="text-gray-600 mb-4">Review all item bookings</p>

                            {bookings.length === 0 ? (
                                <p className="text-gray-500">No bookings available.</p>
                            ) : (
                                <div className="space-y-4">
                                    {bookings.map((booking) => (
                                        <div
                                            key={booking._id}
                                            className="border border-gray-200 rounded-lg p-4 shadow-sm bg-[#FAFAFA]"
                                        >
                                            <div className="flex justify-between items-start">
                                                <div className="flex flex-col">
                                                    <p className="text-sm text-gray-600">
                                                        📦 <span className="font-semibold text-[#333]">Item:</span>{" "}
                                                        <span className="text-[#f85606]">{booking.item.title}</span>
                                                    </p>
                                                    <p className="text-sm text-gray-600 mt-1">
                                                        👤 <span className="font-semibold text-[#333]">Renter:</span>{" "}
                                                        {booking.renter.name} ({booking.renter.email})
                                                    </p>
                                                    <p className="text-sm text-gray-600 mt-1">
                                                        ⏱ <span className="font-semibold text-[#333]">Time:</span> {booking.startTime}:00 to {booking.endTime}:00
                                                    </p>
                                                    <p className="text-sm text-gray-600 mt-1">
                                                        💵 <span className="font-semibold text-[#333]">Price:</span> ₨{booking.totalPrice.toLocaleString("en-PK")}

                                                    </p>
                                                    <button
                                                        onClick={() => updateBookingStatus(booking._id, booking.status)}
                                                        className={`text-xs font-semibold mt-2 px-3 py-1 rounded-full shadow-sm transition 
        ${booking.status === "pending" ? "bg-green-500 hover:bg-green-600" : "bg-yellow-500 hover:bg-yellow-600"} text-white`}
                                                    >
                                                        {booking.status === "pending" ? "Mark Delivered" : "Set Pending"}
                                                    </button>

                                                </div>
                                                <div className="flex flex-col items-end">
                                                    <span
                                                        className={`text-xs font-semibold px-3 py-1 rounded-full text-white ${booking.status === "approved"
                                                            ? "bg-green-500"
                                                            : booking.status === "pending"
                                                                ? "bg-yellow-500"
                                                                : "bg-red-500"
                                                            }`}
                                                    >
                                                        {booking.status}
                                                    </span>
                                                    <p className="text-xs text-gray-400 mt-2">
                                                        {new Date(booking.createdAt).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
