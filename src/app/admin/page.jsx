"use client";
import useAuth from "@/lib/useAuth";

export default function AdminDashboard() {
    useAuth("admin");

    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p>Welcome, Admin! You have special access.</p>
        </main>
    );
}
