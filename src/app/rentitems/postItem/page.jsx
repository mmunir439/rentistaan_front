"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

export default function PostItemPage() {
    const router = useRouter();

    const [form, setForm] = useState({
        title: "",
        description: "",
        category: "",
        pricePerHour: "",
        location: "",
        features: "",
    });

    const [image, setImage] = useState(null);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const token = localStorage.getItem("token");
        if (!token) {
            setError("Please log in first.");
            return;
        }

        const formData = new FormData();
        Object.entries(form).forEach(([key, value]) => {
            formData.append(key, value);
        });

        if (image) {
            formData.append("image", image);
        }

        try {
            const res = await api.post("/rentitem/additem", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            if (res.data.success) {
                router.push("/rentitems");
            } else {
                setError(res.data.message || "Something went wrong");
            }
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Upload failed");
        }
    };

    return (
        <main className="p-6 max-w-xl mx-auto bg-white shadow-lg rounded-md">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Post New Rent Item</h1>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    name="title"
                    placeholder="Title"
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                />

                {/* ✅ Category using datalist */}
                <div>
                    <input
                        name="category"
                        list="categories"
                        placeholder="Select a category"
                        onChange={handleChange}
                        required
                        className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <datalist id="categories">
                        <option value="Vehicles" />
                        <option value="House" />
                        <option value="Electronics" />
                        <option value="Tools" />
                        <option value="Furniture" />
                        <option value="Clothing" />
                        <option value="Sports" />
                        <option value="Other" />
                    </datalist>
                </div>

                <input
                    name="pricePerHour"
                    placeholder="Price Per Hour"
                    type="number"
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                    name="location"
                    placeholder="Location"
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                    name="features"
                    placeholder='Features (e.g. {"battery":"Extra Battery"})'
                    onChange={handleChange}
                    className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                    className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition duration-200"
                >
                    Submit
                </button>
            </form>
        </main>
    );
}
