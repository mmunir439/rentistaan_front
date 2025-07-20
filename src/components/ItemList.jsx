"use client";
import api from "@/lib/axios";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import RentButton from "@/components/RentButton";
export default function ItemList({ inputValue }) {
    const [items, setItems] = useState([]);
    const [visibleCount, setVisibleCount] = useState(8); // Initial visible count

    useEffect(() => {
        getItems();
    }, []);

    async function getItems() {
        try {
            const res = await api.get("/rentitem");
            setItems(res.data.data); // Full item list fetched once
        } catch (err) {
            console.error("Error fetching items:", err);
        }
    }

    // Filter items by title based on inputValue (case-insensitive)
    const filteredItems = inputValue
        ? items.filter(item =>
            item.title.toLowerCase().includes(inputValue.toLowerCase())
        )
        : items;

    // Only show visibleCount items (for pagination / "Load More")
    const displayedItems = filteredItems.slice(0, visibleCount);

    const handleLoadMore = () => {
        setVisibleCount((prev) => Math.min(prev + 8, filteredItems.length));
    };

    return (
        <section className="w-full max-w-[1300px] mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Popular Items</h1>

            {filteredItems.length === 0 ? (
                <div className="text-center text-gray-600 mt-20">
                    <p className="text-xl">No items found for "<span className="font-semibold">{inputValue}</span>"</p>
                </div>
            ) : (
                <>
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

                                    <div className="mt-2">
                                        <RentButton itemId={item._id} />
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Load More Button (only if more results to show) */}
                    {filteredItems.length > visibleCount && (
                        <div className="flex justify-center mt-10">
                            <button
                                onClick={handleLoadMore}
                                className="px-6 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-all shadow-lg"
                            >
                                Load More
                            </button>
                        </div>
                    )}
                </>
            )}
        </section>
    );
}
