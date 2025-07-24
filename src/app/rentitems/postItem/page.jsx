"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar_2";
import Footer from "@/components/Footer";
import api from "@/lib/axios";
import { useEffect } from "react";
export default function PostItemPage() {
    const router = useRouter();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            const currentPath = "/postitem"; // or use router.pathname if needed
            localStorage.setItem("redirectAfterLogin", currentPath);
            router.push("/login");
        }
    }, []);


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
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const token = localStorage.getItem("token");
        if (!token) {
            setError("Please log in first.");
            setLoading(false);
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
                setLoading(false);
            }
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Upload failed");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#F5F5F5]">
            <Navbar />
            <main className="flex-grow p-6 max-w-xl mx-auto bg-white shadow-lg rounded-md">
                <h1 className="text-3xl font-bold mb-6 text-[#FF5722] text-center">Post New Rent Item</h1>

                {error && (
                    <div className="mb-6 text-center text-[#E64A19] font-semibold bg-[#FFCCBC] p-3 rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 px-2 py-4 max-w-md mx-auto">
                    <input
                        name="title"
                        placeholder="Title"
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF5722] transition"
                    />

                    <textarea
                        name="description"
                        placeholder="Description"
                        onChange={handleChange}
                        required
                        rows={3}
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#FF5722] transition"
                    />

                    <div>
                        <input
                            name="category"
                            list="categories"
                            placeholder="Select a category"
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF5722] transition"
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
                        min={0}
                        step={0.01}
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF5722] transition"
                    />

                    <input
                        name="location"
                        placeholder="Location"
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF5722] transition"
                    />

                    <textarea
                        name="features"
                        placeholder="Enter features"
                        onChange={handleChange}
                        maxLength={3000}
                        rows={5}
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF5722] transition resize-none"
                    />

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF5722] transition"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 rounded-md font-semibold text-white transition duration-300 ${loading
                            ? "bg-[#FFCCBC] cursor-not-allowed text-[#E64A19]"
                            : "bg-[#FF5722] hover:bg-[#E64A19]"
                            }`}
                    >
                        {loading ? "Posting item..." : "Submit"}
                    </button>
                </form>

            </main>
            <Footer />
        </div>
    );
}
