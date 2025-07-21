
"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/axios";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar_2";

export default function Itembyid() {
    const [itemvalue, setItemvlaue] = useState({});
    const [durationDetails, setDurationDetails] = useState(null);
    const { id } = useParams();

    async function getbyid() {
        try {
            const response = await api.get(`/rentitem/${id}`);
            setItemvlaue(response.data.data);

            const { startTime, endTime, pricePerHour } = response.data.data;
            if (startTime && endTime) {
                const start = new Date(startTime);
                const end = new Date(endTime);
                const totalHours = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60)));
                const totalPrice = totalHours * pricePerHour;

                setDurationDetails({ totalHours, totalPrice });
            } else {
                setDurationDetails(null);
            }
        } catch (err) {
            console.error("Error fetching item:", err);
        }
    }

    async function handleToggleStatus() {
        try {
            const res = await api.put(`/rentitem/${itemvalue._id}/toggle-status`);
            setItemvlaue(res.data.data); // Refresh status
            setDurationDetails(null); // Reset rental info
        } catch (err) {
            console.error("Error toggling status:", err);
        }
    }

    useEffect(() => {
        getbyid();
    }, []);

    return (
        <div className="min-h-screen bg-slate-100">
            <Navbar />

            <main className="max-w-4xl mx-auto px-4 py-10">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="sm:flex">
                        {/* Image Section */}
                        <div className="sm:w-1/2 h-72 sm:h-auto overflow-hidden">
                            <img
                                src={itemvalue.image?.[0]?.url || "/no-image.png"}
                                alt={itemvalue.title}
                                className="object-cover w-full h-full"
                            />
                        </div>

                        {/* Details Section */}
                        <div className="sm:w-1/2 p-6 flex flex-col justify-between space-y-4">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                    {itemvalue.title}
                                </h2>
                                <p className="text-sm text-gray-500">📂 {itemvalue.category}</p>
                                <p className="text-lg font-semibold text-orange-600 mt-2">
                                    ₨ {itemvalue.pricePerHour} / hour
                                </p>
                                <p className="text-sm text-gray-500 mt-1">📍 {itemvalue.location}</p>

                                <p className="mt-3">
                                    <span className="font-semibold">Status: </span>
                                    <span
                                        className={`font-semibold ${itemvalue.isRented ? "text-red-600" : "text-green-600"
                                            }`}
                                    >
                                        {itemvalue.isRented ? "Already Rented" : "Available"}
                                    </span>
                                </p>

                                {durationDetails && (
                                    <div className="mt-4 space-y-1 text-sm text-gray-700">
                                        <p>
                                            ⏰ <span className="font-semibold">Total Hours:</span>{" "}
                                            {durationDetails.totalHours} hours
                                        </p>
                                        <p>
                                            💵 <span className="font-semibold">Total Price:</span>{" "}
                                            ₨ {durationDetails.totalPrice}
                                        </p>
                                    </div>
                                )}

                                <p className="text-sm text-gray-700 mt-4 leading-relaxed">
                                    {itemvalue.description || `No description provided.`}
                                </p>
                            </div>

                            {/* CTA */}
                            {!itemvalue.isRented ? (
                                <button
                                    onClick={() => window.location.href = `/booking/${itemvalue._id}`}
                                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-xl transition-all"
                                >
                                    Rent Now
                                </button>
                            ) : (
                                <>
                                    <button
                                        disabled
                                        className="w-full bg-gray-300 text-gray-600 font-semibold py-2 px-4 rounded-xl cursor-not-allowed"
                                    >
                                        Already Rented
                                    </button>
                                    <button
                                        onClick={handleToggleStatus}
                                        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-xl transition-all mt-2"
                                    >
                                        Give Back (Make Available)
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
