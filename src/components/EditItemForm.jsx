"use client";
import { useState } from "react";
import api from "@/lib/axios";
// import EditItemForm from "@/components/EditItemForm"; // ✅ Import it
export default function EditItemForm({ item, onClose, onUpdated }) {
    // const [form, setForm] = useState({
    //     title: item.item?.title || "",
    //     description: item.item?.description || "",
    //     category: item.item?.category || "",
    //     pricePerHour: item.item?.pricePerHour || "",
    //     location: item.item?.location || "",
    //     features: item.item?.features || "",
    // });
    const [form, setForm] = useState({
        title: item?.title || "",
        description: item?.description || "",
        category: item?.category || "",
        pricePerHour: item?.pricePerHour || "",
        location: item?.location || "",
        features: item?.features || "",
    });


    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const token = localStorage.getItem("token");

        try {
            // const res = await api.put(`/rentitem/updateItem/${item.item._id}`, form, {
            //     headers: {
            //         Authorization: `Bearer ${token}`,
            //     },
            // });
            const res = await api.put(`/rentitem/updateItem/${item._id}`, form, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });


            if (res.data.success) {
                onUpdated(res.data.data);
                onClose();
            }
        } catch (err) {
            console.error("Update failed:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {["title", "description", "category", "pricePerHour", "location", "features"].map((field) => (
                <input
                    key={field}
                    name={field}
                    value={form[field]}
                    onChange={handleChange}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            ))}

            <button
                type="submit"
                disabled={loading}
                className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
            >
                {loading ? "Updating..." : "Update"}
            </button>
        </form>
    );
}
