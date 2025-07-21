"use client";
import React from "react";
import Navbar from "@/components/Navbar_2";
import Footer from "@/components/Footer";

export default function AboutUs() {
    return (
        <div>
            <Navbar />
            <section className="bg-gradient-to-b from-[#fefefe] to-[#f7f7f7] min-h-screen px-4 sm:px-6 lg:px-8 py-16">
                <div className="max-w-5xl mx-auto text-center mb-16">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-[#212121] mb-4 leading-tight">
                        About <span className="text-[#F85606]">Rentistaan</span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Revolutionizing rentals in Pakistan with cutting-edge technology and community-first values.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto text-left">
                    {/* Section 1 */}
                    <div className="bg-white rounded-2xl shadow-md p-8 transition hover:shadow-lg duration-300">
                        <h2 className="text-xl font-semibold text-[#F85606] mb-3">Who We Are</h2>
                        <p className="text-gray-700">
                            Rentistaan is a modern MERN stack platform where you can rent or list items like cameras,
                            tools, and vehicles. We connect people to help them earn or save money through secure,
                            tech-driven rentals.
                        </p>
                    </div>

                    {/* Section 2 */}
                    <div className="bg-white rounded-2xl shadow-md p-8 transition hover:shadow-lg duration-300">
                        <h2 className="text-xl font-semibold text-[#F85606] mb-3">Our Purpose</h2>
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                            <li>Empower people to earn by renting their items.</li>
                            <li>Help others save by avoiding unnecessary purchases.</li>
                            <li>Provide a seamless, safe, and user-friendly experience.</li>
                        </ul>
                    </div>

                    {/* Section 3 */}
                    <div className="bg-white rounded-2xl shadow-md p-8 transition hover:shadow-lg duration-300">
                        <h2 className="text-xl font-semibold text-[#F85606] mb-3">Key Features</h2>
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                            <li>User profiles with listing and booking history</li>
                            <li>Advanced search by category, price & location</li>
                            <li>Secure payments through Stripe</li>
                            <li>Rating system for trust and reliability</li>
                            <li>Real-time alerts and notifications</li>
                        </ul>
                    </div>

                    {/* Section 4 */}
                    <div className="bg-white rounded-2xl shadow-md p-8 transition hover:shadow-lg duration-300">
                        <h2 className="text-xl font-semibold text-[#F85606] mb-3">Admin Capabilities</h2>
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                            <li>Manage users, items, and transactions</li>
                            <li>View key analytics and performance</li>
                            <li>Approve or reject listings with ease</li>
                        </ul>
                    </div>

                    {/* Section 5 */}
                    <div className="md:col-span-2 bg-white rounded-2xl shadow-md p-8 transition hover:shadow-lg duration-300">
                        <h2 className="text-xl font-semibold text-[#F85606] mb-3">Why People Love Rentistaan</h2>
                        <p className="text-gray-700 mb-4">
                            With a mobile-first design, blazing-fast experience, and intuitive UX, Rentistaan
                            is more than a platform — it's a complete rental ecosystem.
                        </p>
                        <p className="text-gray-700">
                            Whether you’re a student, traveler, or business owner, Rentistaan gives you the power
                            to make the most of what you already own — easily, safely, and smartly.
                        </p>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}
