"use client";
// ✅ Required for using hooks like useState, useEffect, useParams in Next.js App Router.

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
// ✅ `useParams` gets the dynamic route parameter (like [id]) from the URL.

import api from "@/lib/axios";
// ✅ Pre-configured Axios instance (with baseURL set) for making HTTP requests to your backend.

// 📦 This component fetches and displays details of a single rent item
export default function RentItemDetails() {
    const { id } = useParams();
    // ✅ Extracts the `id` from the URL (e.g. /rent-items/123 → id = 123)

    const [item, setItem] = useState(null);
    // ✅ Local state to store the rent item fetched from the server

    // 📡 Fetch the item details when the component loads or when `id` changes
    useEffect(() => {
        async function fetchItem() {
            try {
                const res = await api.get(`/${id}`);
                // ✅ Makes a GET request to `/your-api-url/:id`
                // Make sure this route exists on your backend.

                setItem(res.data.data);
                // ✅ Sets the response data to `item` state
            } catch (err) {
                console.error("Error fetching item:", err);
                // 🛑 If any error occurs (e.g., network, 404), it logs it
            }
        }

        fetchItem();
        // 🔁 Immediately call the function on mount
    }, [id]);
    // ✅ Re-run if the ID changes (e.g., user navigates to a different item)

    // ⏳ Show loading text until the item data is available
    if (!item) return <p>Loading...</p>;

    // ✅ Once item is loaded, render the details
    return (
        <main className="p-6">
            {/* 📛 Title of the item */}
            <h1 className="text-2xl font-bold">{item.title}</h1>

            {/* 📝 Description */}
            <p>{item.description}</p>

            {/* 📂 Category */}
            <p>Category: {item.category}</p>

            {/* 📍 Location of item */}
            <p>Location: {item.location}</p>

            {/* 💰 Price per hour */}
            <p>Rs {item.pricePerHour}/hr</p>

            {/* 🖼️ Show first image if available */}
            {item.images?.[0]?.url && (
                <img src={item.images[0].url} alt="item" width={200} />
            )}
        </main>
    );
}
