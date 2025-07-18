"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import api from "@/lib/axios";

export default function RentItemDetails() {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchItem() {
            try {
                const res = await api.get(`/rentitem/${id}`);
                const data = res.data.data;

                if (Array.isArray(data) && data.length > 0) {
                    setItem(data[0]);
                } else {
                    setError("Item not found.");
                }
            } catch (err) {
                console.error("Error fetching item:", err);
                setError("Failed to load item details.");
            }
        }

        fetchItem();
    }, [id]);

    if (error) return <p className="text-red-600 p-6">{error}</p>;
    if (!item) return <p className="p-6">Loading...</p>;

    return (
        <div className="min-h-screen bg-orange-50 text-gray-800">
            {/* 🚀 Navbar */}
            <nav className="bg-orange-500 text-white p-4 shadow-md">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Rentistaaaan</h1>
                    <div className="flex space-x-6">
                        <Link href="/" className="hover:underline">Home</Link>
                        <Link href="#" className="hover:underline">Explore</Link>
                        <Link href="#" className="hover:underline">About</Link>
                    </div>
                </div>
            </nav>

            {/* 🎯 Main Content */}
            <main className="p-4 md:p-6 max-w-3xl mx-auto bg-white shadow rounded-lg mt-6">
                {/* 🖼️ Image */}
                {item.image?.length > 0 && (
                    <div className="flex justify-center mb-4">
                        <img
                            src={
                                item.image[0].url.startsWith("http")
                                    ? item.image[0].url
                                    : `/uploads/${item.image[0].url}`
                            }
                            alt={item.title}
                            className="w-full max-w-[500px] h-[250px] object-cover rounded-lg shadow-md"
                        />
                    </div>
                )}

                {/* 📛 Title */}
                <h1 className="text-2xl md:text-3xl font-bold text-orange-600 mb-2">{item.title}</h1>

                {/* 📝 Description */}
                <p className="text-gray-700 mb-4">{item.description}</p>

                {/* 📂 Category */}
                <p className="mb-2 text-sm text-gray-800">
                    <strong className="text-orange-600">Category:</strong> {item.category}
                </p>

                {/* 📍 Location */}
                <p className="mb-2 text-sm text-gray-800">
                    <strong className="text-orange-600">Location:</strong> {item.location}
                </p>

                {/* 💰 Price */}
                <p className="mb-2 text-sm text-gray-800">
                    <strong className="text-orange-600">Price Per Hour:</strong> Rs {item.pricePerHour}
                </p>

                {/* ⚙️ Features */}
                {item.features && typeof item.features === "object" && (
                    <div className="mt-4">
                        <h2 className="font-semibold text-orange-600 mb-1">Features:</h2>
                        <ul className="list-disc pl-5 text-gray-700 text-sm">
                            {Object.entries(item.features).map(([key, value]) => (
                                <li key={key}>
                                    <strong>{key}:</strong> {value}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </main>
        </div>
    );
}
