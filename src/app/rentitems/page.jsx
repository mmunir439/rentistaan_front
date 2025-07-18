"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import Link from "next/link";

export default function RentItemList() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);     //  loading state
    const [error, setError] = useState(null);         //  error message (e.g. "No items")

    useEffect(() => {
        async function fetchItems() {
            try {
                const res = await api.get("/rentitem");
                setItems(res.data.data);                   //  save items
                setError(null);                            // clear any previous error
            } catch (err) {
                console.error("Error fetching items:", err);

                if (err.response?.status === 404) {
                    setError("No rent items available.");    //  handle backend "404 no items"
                } else {
                    setError("Failed to load items. Please try again.");
                }
            } finally {
                setLoading(false);                         //  stop loading after request
            }
        }

        fetchItems();
    }, []);

    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">All Rent Items</h1>

            {/* Loading spinner or text */}
            {loading && <p>Loading items...</p>}

            {/* Error message */}
            {!loading && error && (
                <p className="text-red-600">{error}</p>
            )}

            {/* Items list */}
            {!loading && !error && (
                <ul className="space-y-4">
                    {items.map((item) => (
                        <li key={item._id} className="border p-4 rounded">
                            <h2 className="text-xl font-semibold">{item.title}</h2>
                            <p>{item.description}</p>
                            <p>Rs {item.pricePerHour}/hr</p>
                            <Link className="text-orange-500 hover:underline" href={`/rentitems/${item._id}`}>
                                View Details
                            </Link>

                        </li>
                    ))}
                </ul>
            )}
        </main>
    );
}
