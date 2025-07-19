"use client";
import api from "@/lib/axios";
import React, { useState, useEffect } from "react";
import Link from "next/link";
export default function ItemList() {
    const [items, setItems] = useState([]);
    const [visibleCount, setVisibleCount] = useState(8); // Always show 8 initially

    useEffect(() => {
        getItems();
    }, []);

    async function getItems() {
        try {
            const res = await api.get("/rentitem");
            setItems(res.data.data);
        } catch (err) {
            console.error("Error fetching items:", err);
        }
    }

    const handleLoadMore = () => {
        setVisibleCount((prev) => Math.min(prev + 8, items.length));
    };

    // Always show at least 8, even if there are fewer items
    const displayedItems = items.slice(0, visibleCount);

    return (
        <section className="w-full max-w-[1300px] mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Popular Items</h1>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {displayedItems.map((item, index) => (
                    <div
                        key={index}
                        className="group bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-2xl shadow-md border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                    >
                        <div className="overflow-hidden rounded-t-2xl">
                            <img
                                src={item.image?.[0]?.url}
                                alt={item.title}
                                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>
                        <div className="p-4 bg-white rounded-b-2xl space-y-2">
                            <h2 className="text-lg font-semibold text-gray-900">{item.title}</h2>
                            <p className="text-sm text-gray-600">{item.location}</p>
                            <p className="text-md text-red-500 font-bold">Rs {item.pricePerHour} / hour</p>

                            <Link href={`/rent/${item._id}`} className="mt-2 px-4 py-1 bg-gradient-to-r from-orange-400 to-red-400 text-white text-sm rounded-full hover:scale-105 transition">
                                <button>Rent Now</button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Show Load More Button Only If More Items Exist */}
            {items.length > visibleCount && (
                <div className="flex justify-center mt-10">
                    <button
                        onClick={handleLoadMore}
                        className="px-6 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-all shadow-lg"
                    >
                        Load More
                    </button>
                </div>
            )}
        </section>
    );
}
