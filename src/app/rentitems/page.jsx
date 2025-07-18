"use client";
// Enables client-side interactivity in Next.js App Router

import { useEffect, useState } from "react"; // React hooks
import api from "@/lib/axios";               // Custom axios instance for backend API calls
import Link from "next/link";               // Next.js routing for internal navigation

export default function RentItemList() {
    // State to store the list of rent items
    const [items, setItems] = useState([]);

    // Fetch rent items from the backend API when the component mounts
    useEffect(() => {
        async function fetchItems() {
            try {
                // GET request to backend (assumes "/" returns all rent items)
                const res = await api.get("/");
                // Save the fetched items to state
                setItems(res.data.data);
            } catch (err) {
                // Log error if the API call fails
                console.error("Error fetching items:", err);
            }
        }
        fetchItems(); // Call the fetch function
    }, []); // Empty dependency array = run only on first render

    return (
        <main className="p-6">
            {/* Page title */}
            <h1 className="text-2xl font-bold mb-4">All Rent Items</h1>

            {/* List of all rent items with spacing between them */}
            <ul className="space-y-4">
                {/* Map through items and render each */}
                {items.map((item) => (
                    <li key={item._id} className="border p-4 rounded">
                        {/* Item title */}
                        <h2 className="text-xl font-semibold">{item.title}</h2>

                        {/* Item description */}
                        <p>{item.description}</p>

                        {/* Price per hour */}
                        <p>Rs {item.pricePerHour}/hr</p>

                        {/* Link to the item's detail page */}
                        <Link href={`/rentitems/${item._id}`}>View Details</Link>
                    </li>
                ))}
            </ul>
        </main>
    );
}
