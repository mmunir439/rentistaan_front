"use client";
import React from "react";
import Navbar from "@/components/Navbar_2";
import Footer from "@/components/Footer";
export default function AboutUs() {
    return (
        <div>
            <Navbar />
            <section className="bg-[#F5F5F5] min-h-screen px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-[#212121] mb-4">
                        About <span className="text-[#F85606]">Rentistaan</span>
                    </h1>
                    <p className="text-lg text-gray-600">
                        Revolutionizing rentals in Pakistan through technology.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-10 text-[#212121]">
                    <div>
                        <h2 className="text-2xl font-bold text-[#F85606] mb-4">Who We Are</h2>
                        <p className="mb-4 text-gray-700">
                            Rentistaan is a full-featured MERN stack online rental marketplace where users can rent or
                            list items like cameras, tools, and vehicles. The platform makes it easy to earn or save
                            money through rentals — all while enjoying a smooth, secure, and modern digital experience.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-[#F85606] mb-4">Our Purpose</h2>
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                            <li>Empower users to earn money by renting out their items.</li>
                            <li>Help others save money by renting instead of buying.</li>
                            <li>Ensure a safe, secure, and enjoyable online renting experience.</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-[#F85606] mb-4">Key Features</h2>
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                            <li>User profiles with listings and booking history.</li>
                            <li>Powerful search & filter functionality by category, price, and location.</li>
                            <li>Secure online payments using Stripe.</li>
                            <li>Review and rating system for renter feedback.</li>
                            <li>Email notifications and real-time updates.</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-[#F85606] mb-4">Admin Capabilities</h2>
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                            <li>Manage users, item listings, and transactions.</li>
                            <li>View platform analytics (bookings, revenue, etc.).</li>
                            <li>Approve or reject listings and handle user reports.</li>
                        </ul>
                    </div>

                    <div className="md:col-span-2">
                        <h2 className="text-2xl font-bold text-[#F85606] mb-4">Why People Love Rentistaan</h2>
                        <p className="mb-4 text-gray-700">
                            With its clean, mobile-friendly design and easy navigation, Rentistaan is more than just a rental app — it's a complete rental ecosystem. Built with the latest technologies (MongoDB, Express.js, React, Node.js), it’s secure, fast, and fully responsive.
                        </p>
                        <p className="text-gray-700">
                            Whether you’re a student, traveler, or entrepreneur — Rentistaan is here to simplify your life and help you get the most out of what you already own.
                        </p>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}
