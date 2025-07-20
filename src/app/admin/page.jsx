// "use client";
// import { useEffect, useState } from "react";
// import React from "react";
// import Footer from "@/components/Footer";
// import api from "@/lib/axios";
// export default function AdminDashboard() {
//     const [backendMessage, setBackendMessage] = useState("Checking backend...");
//     const [users, setUser] = useState([]);

//     async function userlist() {
//         try {
//             const response = await api.get("/admin/getalluser");
//             setUser(response.data.data);
//         } catch (error) {
//             console.error(error);
//         }
//     }

//     useEffect(() => {
//         userlist();
//     }, []);

//     return (
//         <div>
//             <main className="p-4 sm:p-6 md:p-10 bg-[#f7f7f7] min-h-screen">
//                 <div className="max-w-6xl mx-auto">
//                     <div className="bg-white p-6 rounded-xl shadow-md text-center sm:text-left">
//                         <h1 className="text-3xl sm:text-4xl font-bold text-[#f85606] mb-2">
//                             Admin Dashboard
//                         </h1>
//                         <p className="text-[#333] text-base sm:text-lg">
//                             Welcome, Admin! You have special access to manage the platform.
//                         </p>
//                         <p className="text-sm text-gray-600 mt-2">
//                             Backend Status: <span className="font-medium">{backendMessage}</span>
//                         </p>
//                     </div>

//                     <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                         {/* Users Box */}
//                         <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition border-t-4 border-[#f85606] overflow-auto max-h-[400px]">
//                             <h2 className="text-xl font-semibold text-[#db3700] mb-4">Users</h2>
//                             {users.length === 0 ? (
//                                 <p className="text-gray-600">No users found.</p>
//                             ) : (
//                                 <div className="space-y-4">
//                                     {users.map((user, index) => (
//                                         <div key={user._id || index} className="border-b pb-2">
//                                             <p className="text-gray-800 font-medium">👤 {user.name}</p>
//                                             <p className="text-gray-600 text-sm">📧 {user.email}</p>
//                                             <p className="text-gray-600 text-sm">📱 {user.phone}</p>
//                                             <p className="text-gray-600 text-sm">🏠 {user.address}</p>
//                                         </div>
//                                     ))}
//                                 </div>
//                             )}
//                         </div>

//                         {/* Placeholder Boxes for Items and Bookings */}
//                         <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition border-t-4 border-[#f85606]">
//                             <h2 className="text-xl font-semibold text-[#db3700]">Items</h2>
//                             <p className="text-gray-600 mt-2">View and manage items for rent</p>
//                         </div>
//                         <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition border-t-4 border-[#f85606]">
//                             <h2 className="text-xl font-semibold text-[#db3700]">Bookings</h2>
//                             <p className="text-gray-600 mt-2">Approve or reject user bookings</p>
//                         </div>
//                     </div>
//                 </div>
//             </main>
//             <Footer />
//         </div>
//     );
// }

"use client";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import api from "@/lib/axios";

export default function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [backendMessage, setBackendMessage] = useState("Checking backend...");
    const [error, setError] = useState("");

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

    return (
        <div>
            <main className="p-4 sm:p-6 md:p-10 bg-[#f7f7f7] min-h-screen">
                <div className="max-w-6xl mx-auto">
                    <div className="bg-white p-6 rounded-xl shadow-md text-center sm:text-left">
                        <h1 className="text-3xl sm:text-4xl font-bold text-[#f85606] mb-2">
                            Admin Dashboard
                        </h1>
                        <p className="text-[#333] text-base sm:text-lg">
                            Welcome, Admin! You have special access to manage the platform.
                        </p>
                        <p className="text-sm text-gray-600 mt-2">
                            Backend Status: <span className="font-medium">{backendMessage}</span>
                        </p>
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
                        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition border-t-4 border-[#f85606]">
                            <h2 className="text-xl font-semibold text-[#db3700]">Items</h2>
                            <p className="text-gray-600 mt-2">View and manage items for rent</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition border-t-4 border-[#f85606]">
                            <h2 className="text-xl font-semibold text-[#db3700]">Bookings</h2>
                            <p className="text-gray-600 mt-2">Approve or reject user bookings</p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
