"use client";
import useAuth from "@/lib/useAuth";

export default function UserDashboard() {
    useAuth();

    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold">User Dashboard</h1>
            <p>Welcome! Here you will see your rented and listed items.</p>
        </main>
    );
}
