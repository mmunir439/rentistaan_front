"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar_2";
import Footer from "@/components/Footer";
import useUser from "@/lib/useUser";
import api from "@/lib/axios";
import Link from "next/link";
export default function UserDashboard() {
    const user = useUser();
    const [bookings, setBookings] = useState([]);


    // ──────────────────────────────────────────
    // Fetch user bookings once we know the user
    // ──────────────────────────────────────────
    useEffect(() => {
        if (!user) return;

        (async () => {
            try {
                const { data } = await api.get("/bookings/my");
                setBookings(data.bookings);
            } catch (err) {
                console.error("Error fetching bookings:", err);
            }
        })();
    }, [user]);

    if (!user) {
        return (
            <p className="text-center mt-10 text-gray-500 text-lg font-medium">
                Loading...
            </p>
        );
    }

    return (
        <>
            <Navbar />

            {/* Header / Hero */}
            <header className="relative z-10 isolate overflow-hidden bg-gradient-to-r from-[#f85606]/90 to-orange-400/80 pb-32 pt-16">

                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-white drop-shadow-md">
                        Welcome back, {user.name}!
                    </h1>
                    <p className="mt-2 text-base sm:text-lg text-white/90">
                        Manage your profile and keep track of your rentals in one place.
                    </p>
                </div>
            </header>

            {/* Main content */}
            <main className="bg-slate-50 min-h-screen pb-16">
                <section className="relative z-20 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 -mt-24">

                    {/* Profile “card” */}
                    <div className="rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-black/5">

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            {/* Profile “card” */}
                            <div className="rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-black/5">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
                                        <p className="mt-1 text-gray-600">{user.email}</p>

                                        {/* Phone */}
                                        {user.phone && (
                                            <p className="mt-1 text-sm text-gray-500">
                                                📞 <span className="ml-1">{user.phone}</span>
                                            </p>
                                        )}

                                        {/* Address */}
                                        {user.address && (
                                            <p className="mt-1 text-sm text-gray-500">
                                                🏠 <span className="ml-1">{user.address}</span>
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex justify-center">
                                        <Link href="/dashboard/edit-profile">
                                            <button className="mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
                                                Edit Profile
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>



                        </div>
                    </div>

                    {/* Bookings grid */}
                    <h3 className="mt-[30px] mb-8 text-2xl font-semibold text-[#f85606]">
                        Your Bookings
                    </h3>

                    {bookings.length === 0 ? (
                        <p className="text-gray-600">You haven’t booked any items yet.</p>
                    ) : (
                        <ul
                            className="
                grid gap-6
                sm:grid-cols-2
                lg:grid-cols-3
              "
                        >
                            {bookings.map((booking) => {
                                const { _id, item, startTime, endTime, totalPrice, totalHours, status } = booking;

                                // Choose a badge colour
                                const statusColor =
                                    status === "approved"
                                        ? "bg-green-100 text-green-700"
                                        : status === "pending"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : "bg-red-100 text-red-700";

                                return (
                                    <li
                                        key={_id}
                                        className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-black/5 transition hover:shadow-lg"
                                    >
                                        {/* image */}
                                        <img
                                            src={item?.image?.[0]?.url || "/no-image.png"}
                                            alt={item?.title}
                                            className="h-40 w-full object-cover sm:h-44"
                                        />

                                        {/* details */}
                                        <div className="flex flex-1 flex-col p-4">
                                            <h4 className="truncate text-lg font-semibold text-gray-800">
                                                {item?.title}
                                            </h4>
                                            <p className="truncate text-sm text-gray-500">
                                                📍 {item?.location}
                                            </p>

                                            <div className="mt-3 text-sm text-gray-600">
                                                <p>
                                                    ⏰{" "}
                                                    {new Date(startTime).toLocaleString(undefined, {
                                                        dateStyle: "medium",
                                                        timeStyle: "short",
                                                    })}
                                                </p>
                                                <p>
                                                    ⏳{" "}
                                                    {new Date(endTime).toLocaleString(undefined, {
                                                        dateStyle: "medium",
                                                        timeStyle: "short",
                                                    })}
                                                </p>
                                            </div>

                                            <div className="mt-auto flex items-center justify-between pt-4">
                                                <p className="font-medium text-green-700">
                                                    ₨ {totalPrice}{" "}
                                                    <span className="text-xs text-gray-500">
                                                        ({totalHours} h)
                                                    </span>
                                                </p>
                                                <span
                                                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusColor}`}
                                                >
                                                    {status}
                                                </span>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </section>
            </main>

            <Footer />
        </>
    );
}
