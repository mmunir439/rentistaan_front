
"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/axios";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar_2";

export default function Itembyid() {
    const [itemvalue, setItemvlaue] = useState({});
    const { id } = useParams();
    async function getbyid() {
        try {
            const response = await api.get(`/rentitem/${id}`);
            setItemvlaue(response.data.data);
        } catch (err) {
            console.error("Error fetching item:", err);
        }
    }

    useEffect(() => {
        getbyid();
    }, []);

    return (
        <div>
            <Navbar />
            <section className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
                    <div className="md:flex">
                        {/* Image Section */}
                        <div className="md:w-1/2">
                            {itemvalue.image && itemvalue.image[0] ? (
                                <img
                                    src={itemvalue.image[0].url}
                                    alt={itemvalue.title}
                                    className="w-full h-80 object-cover"
                                />
                            ) : (
                                <div className="w-full h-80 bg-gray-200 flex items-center justify-center text-gray-500">
                                    No Image
                                </div>
                            )}
                        </div>

                        {/* Details Section */}
                        <div className="md:w-1/2 p-6 space-y-4">
                            <h2 className="text-2xl font-bold text-gray-800">{itemvalue.title}</h2>
                            <p className="text-sm text-gray-600">catagory:{itemvalue.category}</p>
                            <p className="text-lg font-semibold text-green-700">₨ {itemvalue.pricePerHour} / hour</p>
                            <p className="text-sm text-gray-500">📍 Location: {itemvalue.location}</p>

                            <p>
                                <span className="font-semibold">Status: </span>
                                <span className={itemvalue.isRented ? "text-red-600 font-semibold" : "text-green-600 font-semibold"}>
                                    {itemvalue.isRented ? "Already Rented" : "Available to Rent"}
                                </span>
                            </p>

                            <div className="text-gray-700 text-sm leading-relaxed">
                                <p>
                                    {itemvalue.title} is available for rent and offers exceptional reliability, quality, and performance.
                                    Whether you're looking for convenience, functionality, or simply a cost-effective option, this product
                                    is well-suited to meet your needs. It is regularly inspected and maintained to ensure the best experience.
                                    Ideal for short-term use, events, work tasks, or personal needs — rent it today and enjoy flexibility
                                    without the hassle of ownership.
                                </p>
                            </div>
                            {!itemvalue.isRented ? (
                                <button
                                    className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-xl transition-all"
                                    onClick={() => {
                                        // navigate to booking page (update URL as per your routing)
                                        window.location.href = `/rent/${itemvalue._id}`;
                                    }}
                                >
                                    Rent Now
                                </button>
                            ) : (
                                <button
                                    className="mt-4 w-full bg-gray-300 text-gray-600 font-semibold py-2 px-4 rounded-xl cursor-not-allowed"
                                    disabled
                                >
                                    Already Rented
                                </button>
                            )}

                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}
