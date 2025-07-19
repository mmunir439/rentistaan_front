// app/user/profile/page.jsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/utils/token";
import Navbar from "@/components/Navbar_2";
import Footer from "@/components/Footer";
import api from "@/lib/axios";

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = getToken();

        if (!token) {
            router.push("/login");
            return;
        }

        async function fetchUser() {
            try {
                const res = await api.get("/user/me");
                setUser(res.data.user);
            } catch (error) {
                console.error("Failed to fetch user profile", error);
            }
        }

        fetchUser();
    }, [router]);

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <p className="text-gray-500 text-lg">Loading profile...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-slate-50">
            <Navbar />

            <main className="flex-grow w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <h1 className="text-2xl sm:text-3xl font-bold text-[#f85606] mb-8 text-center">
                    My Profile
                </h1>

                <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <p className="text-gray-600 text-sm sm:text-base">
                                <span className="font-semibold text-gray-800">Name:</span> {user.name}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-600 text-sm sm:text-base">
                                <span className="font-semibold text-gray-800">Email:</span> {user.email}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-600 text-sm sm:text-base">
                                <span className="font-semibold text-gray-800">Role:</span> {user.role}
                            </p>
                        </div>
                        {/* Optional: Add more fields like joined date, contact, etc. */}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
