// components/RentButton.jsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RentButton({ itemId }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleRentClick = async () => {
        setLoading(true);
        try {
            // Simulate delay or call API if needed
            await new Promise((resolve) => setTimeout(resolve, 1000));

            router.push(`/rentitems/${itemId}`);
        } catch (err) {
            console.error("Error during redirect:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleRentClick}
            disabled={loading}
            className={`px-4 py-1 text-white text-sm rounded-full hover:scale-105 transition ${loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-orange-400 to-red-400"
                }`}
        >
            {loading ? "Renting..." : "Rent Now"}
        </button>
    );
}
