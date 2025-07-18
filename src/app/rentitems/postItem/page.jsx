"use client";
// Ensures this component runs on the client side in Next.js (needed for state, localStorage, etc.)

import { useState } from "react";
// Import useState to manage form, image, and error states.

import { useRouter } from "next/navigation";
// Import useRouter to programmatically navigate after successful post.

import api from "@/lib/axios";
// Import pre-configured Axios instance for making API requests.

export default function PostItemPage() {
    // Functional component for the Post Item page.

    const router = useRouter();
    // Initialize router for redirecting.

    const [form, setForm] = useState({
        // Form state to hold input values.
        title: "",
        description: "",
        category: "",
        pricePerHour: "",
        location: "",
        features: "", // Will be sent as JSON string
    });

    const [image, setImage] = useState(null);
    // Store the uploaded image file.

    const [error, setError] = useState("");
    // Store and display error messages.

    function handleChange(e) {
        // Handle change for text inputs.
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleImageChange(e) {
        // Handle file input change (image).
        setImage(e.target.files[0]);
    }

    async function handleSubmit(e) {
        // Form submission handler.
        e.preventDefault(); // Prevent default page reload.
        setError(""); // Clear previous errors.

        const token = localStorage.getItem("token");
        // Get JWT token from local storage.

        if (!token) {
            // If no token, user is not logged in.
            setError("Please log in first.");
            return;
        }

        const formData = new FormData();
        // Create form data object to send multipart/form-data.

        Object.entries(form).forEach(([key, value]) => {
            // Append each form field to formData.
            formData.append(key, value);
        });

        if (image) formData.append("image", image);
        // If image is selected, append it to formData.

        try {
            const res = await api.post("/postItem", formData, {
                // Send POST request to backend.
                headers: {
                    "Authorization": `Bearer ${token}`, // Send token in header
                    "Content-Type": "multipart/form-data", // Tell backend it's multipart
                },
            });

            if (res.data.success) {
                // If backend returns success
                router.push("/rentitems");
                // Redirect to rent items listing page.
            } else {
                setError(res.data.message || "Something went wrong");
                // Show error if not successful.
            }
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Error uploading item");
            // Show server-side error if present.
        }
    }

    return (
        <main className="p-6 max-w-xl mx-auto">
            {/* Page container with padding and centered max width */}
            <h1 className="text-2xl font-bold mb-4">Post New Rent Item</h1>

            {error && <p className="text-red-500 mb-2">{error}</p>}
            {/* Display error message if any */}

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Form with vertical spacing */}
                <input name="title" placeholder="Title" onChange={handleChange} required className="w-full p-2 border" />
                {/* Title input */}

                <textarea name="description" placeholder="Description" onChange={handleChange} required className="w-full p-2 border" />
                {/* Description textarea */}

                <input name="category" placeholder="Category" onChange={handleChange} required className="w-full p-2 border" />
                {/* Category input */}

                <input name="pricePerHour" placeholder="Price Per Hour" type="number" onChange={handleChange} required className="w-full p-2 border" />
                {/* Price per hour input */}

                <input name="location" placeholder="Location" onChange={handleChange} required className="w-full p-2 border" />
                {/* Location input */}

                <input name="features" placeholder='Features (e.g. {"color":"Red"})' onChange={handleChange} className="w-full p-2 border" />
                {/* Features input as JSON string */}

                <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-2 border" />
                {/* Image upload input */}

                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
                {/* Submit button */}
            </form>
        </main>
    );
}
