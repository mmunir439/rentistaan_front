// ✅ This tells Next.js that this component will run on the client side
"use client";

// ✅ React hook to manage state
import { useState } from "react";
// ✅ Next.js hook to navigate between pages (like redirect after registration)
import { useRouter } from "next/navigation";
// ✅ Custom Axios instance imported from lib/axios.js (configured with base URL)
import api from "@/lib/axios";
import Link from "next/link";

// ✅ This is the default export of the RegisterPage component
export default function RegisterPage() {
    // ✅ useRouter allows us to redirect the user to another page
    const router = useRouter();

    // ✅ useState to store form input values (name, email, password)
    const [form, setForm] = useState({ name: "", email: "", password: "", photo: null });
    // ✅ useState to show any error messages (like email already exists, etc.)
    const [error, setError] = useState("");

    // ✅ Function called when the form is submitted
    async function handleSubmit(e) {
        e.preventDefault(); // ❌ Prevents the page from reloading on form submit
        setError("");       // 🔁 Clear any old error messages

        try {
            // ✅ Log the form data for debugging
            console.log("Submitting form:", form);

            // ✅ Send POST request to backend /user/register with the form data
            const formData = new FormData();
            formData.append("name", form.name);
            formData.append("email", form.email);
            formData.append("password", form.password);
            if (form.photo) {
                formData.append("photo", form.photo);
            }

            await api.post("/user/register", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });


            // ✅ If successful, show success alert and redirect to login page
            alert("Registration successful!");
            router.push("/login");

        } catch (err) {
            // ❌ If there's an error (like email already used), show it
            console.error("Registration Error:", err);

            // ❌ Set the error message to display on screen
            // `err.response?.data?.message` safely accesses the backend error
            setError(err.response?.data?.message || "Registration failed.");
        }
    }
    async function testUserRoute() {
        try {
            const res = await api.get("/test");
            alert(res.data); // should show "User route working!"
        } catch (err) {
            console.error("Test route failed:", err);
            alert("Test failed");
        }
    }

    // ✅ Return JSX layout for the Register Page
    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            {/* ✅ Registration Form */}
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm space-y-4 rounded-lg border bg-white p-6 shadow"
            >
                {/* 🔤 Title of the form */}
                <h1 className="text-2xl font-bold text-center">Register</h1>

                {/* 🧑 Input for Name */}
                <input
                    required
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500"
                />

                {/* 📧 Input for Email */}
                <input
                    required
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500"
                />

                {/* 🔒 Input for Password */}
                <input
                    required
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500"
                />
                {/* 📷 Input for Photo */}
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setForm({ ...form, photo: e.target.files[0] })}
                    className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500"
                />


                {/* ❌ Display error if exists */}
                {error && <p className="text-sm text-red-600">{error}</p>}

                {/* ✅ Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded font-medium"
                >
                    Register
                </button>

                {/* 🔁 Link to Login Page */}
                <p className="text-center text-sm">
                    Already have an account?{" "}
                    <Link href="/login" className="text-orange-600 hover:underline">
                        Login
                    </Link>
                </p>
            </form>
            <button
                type="button"
                onClick={testUserRoute}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            >
                Test /test
            </button>

        </main>
    );
}
