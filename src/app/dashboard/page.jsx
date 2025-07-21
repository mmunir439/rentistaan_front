// "use client";
// import React, { useEffect, useState } from "react";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import api from "@/lib/axios";
// import useUser from "@/lib/useUser";

// export default function UserDashboard() {
//     const user = useUser();
//     const [bookings, setBookings] = useState([]);

//     useEffect(() => {
//         async function fetchBookings() {
//             try {
//                 const response = await api.get("/tookonRent/my");
//                 setBookings(response.data.bookings);
//             } catch (error) {
//                 console.error("Error fetching bookings:", error);
//             }
//         }

//         fetchBookings();
//     }, []);
//     async function getallposteditem() {
//         try{
//           const response=await api.get("")
//         }
//         catch(error){

//         }
//     }

//     return (
//         <>
//             <Navbar />
//             <div className="min-h-screen bg-gray-50 py-10 px-6">
//                 <div className="max-w-7xl mx-auto">
//                     <h1 className="text-3xl font-bold text-center text-[#f85606] mb-10">
//                         👋 Welcome to your Dashboard, {user?.name || "User"}
//                     </h1>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         {/* Left Column - Empty for now */}
//                         <div className="bg-white rounded-xl shadow-md p-6 min-h-[300px]">
//                             <h2 className="text-xl font-semibold text-gray-700 mb-2">📦 Coming Soon</h2>
//                             <p className="text-gray-500">More dashboard features will appear here!</p>
//                         </div>

//                         {/* Right Column - My Rented Items */}
//                         <div className="bg-white rounded-xl shadow-md p-6">
//                             <h2 className="text-xl font-semibold text-[#f85606] mb-4">📄 My Rented Items</h2>
//                             {bookings.length === 0 ? (
//                                 <p className="text-gray-500">No rented items yet.</p>
//                             ) : (
//                                 <div className="space-y-4">
//                                     {bookings.map((booking) => (
//                                         <div key={booking._id} className="border border-gray-200 rounded-lg p-4 shadow-sm bg-gray-50">
//                                             <h3 className="text-lg font-bold text-gray-800 mb-2">
//                                                 🛠 {booking.item.title}
//                                             </h3>
//                                             <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
//                                                 <p><strong>Total Hours:</strong> {booking.totalHours.toFixed(2)}</p>
//                                                 <p><strong>Total Price:</strong> ${booking.totalPrice.toFixed(2)}</p>
//                                                 <p><strong>End Time:</strong> {booking.endTime}</p>
//                                                 <p><strong>Status:</strong>
//                                                     <span className={`ml-1 px-2 py-1 rounded text-white text-xs ${booking.status === "pending"
//                                                             ? "bg-yellow-500"
//                                                             : booking.status === "approved"
//                                                                 ? "bg-green-500"
//                                                                 : "bg-red-500"
//                                                         }`}>
//                                                         {booking.status}
//                                                     </span>
//                                                 </p>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <Footer />
//         </>
//     );
// }
"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import api from "@/lib/axios";
import useUser from "@/lib/useUser";

export default function UserDashboard() {
    const user = useUser();
    const [bookings, setBookings] = useState([]);
    const [postedItems, setPostedItems] = useState([]);

    useEffect(() => {
        async function fetchBookings() {
            try {
                const response = await api.get("/tookonRent/my");
                setBookings(response.data.bookings);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        }

        async function fetchPostedItems() {
            try {
                const response = await api.get("rentitem/myposteditem");
                setPostedItems(response.data.data);
            } catch (error) {
                console.error("Error fetching posted items:", error);
            }
        }

        fetchBookings();
        fetchPostedItems();
    }, []);

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 py-10 px-6">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-center text-[#f85606] mb-10">
                        👋 Welcome to your Dashboard, {user?.name || "User"}
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Column - My Posted Items */}
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h2 className="text-xl font-semibold text-[#f85606] mb-4">📤 My Posted Items</h2>
                            {postedItems.length === 0 ? (
                                <p className="text-gray-500">You haven't posted any items yet.</p>
                            ) : (
                                <div className="space-y-4">
                                    {postedItems.map((item) => (
                                        <div key={item._id} className="border border-gray-200 rounded-lg p-4 shadow-sm bg-gray-50 flex flex-col md:flex-row gap-4">
                                            <img
                                                src={item.image[0]?.url}
                                                alt={item.title}
                                                className="w-full md:w-32 h-32 object-cover rounded-md"
                                            />
                                            <div className="flex-1">
                                                <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
                                                <p className="text-sm text-gray-600 mb-1">{item.description}</p>
                                                <p className="text-sm text-gray-600"><strong>Category:</strong> {item.category}</p>
                                                <p className="text-sm text-gray-600"><strong>Price/Hour:</strong> ${item.pricePerHour}</p>
                                                <p className="text-sm text-gray-600"><strong>Location:</strong> {item.location}</p>
                                                <p className="text-sm text-gray-600">
                                                    <strong>Status:</strong>
                                                    <span className={`ml-2 px-2 py-1 rounded text-white text-xs ${item.isRented ? "bg-red-500" : "bg-green-500"}`}>
                                                        {item.isRented ? "Rented" : "Available"}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Right Column - My Rented Items */}
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h2 className="text-xl font-semibold text-[#f85606] mb-4">📄 My Rented Items</h2>
                            {bookings.length === 0 ? (
                                <p className="text-gray-500">No rented items yet.</p>
                            ) : (
                                <div className="space-y-4">
                                    {bookings.map((booking) => (
                                        <div key={booking._id} className="border border-gray-200 rounded-lg p-4 shadow-sm bg-gray-50">
                                            <h3 className="text-lg font-bold text-gray-800 mb-2">
                                                🛠 {booking.item.title}
                                            </h3>
                                            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                                                <p><strong>Total Hours:</strong> {booking.totalHours.toFixed(2)}</p>
                                                <p><strong>Total Price:</strong> ${booking.totalPrice.toFixed(2)}</p>
                                                <p><strong>End Time:</strong> {booking.endTime}</p>
                                                <p><strong>Status:</strong>
                                                    <span className={`ml-1 px-2 py-1 rounded text-white text-xs ${booking.status === "pending"
                                                        ? "bg-yellow-500"
                                                        : booking.status === "approved"
                                                            ? "bg-green-500"
                                                            : "bg-red-500"
                                                        }`}>
                                                        {booking.status}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
