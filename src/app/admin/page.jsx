"use client";
// ✅ Enables client-side interactivity in a Next.js 13+ app using the App Router.

// This is a functional component that renders the Admin Dashboard UI
export default function AdminDashboard() {
    return (
        // 🧱 Main wrapper with padding, background color, and full height
        <main className="p-4 sm:p-6 md:p-10 bg-[#f7f7f7] min-h-screen">
            {/* 🔒 Max-width container centered on the page */}
            <div className="max-w-5xl mx-auto">

                {/* 🔶 Dashboard Header */}
                <div className="bg-white p-6 rounded-xl shadow-md text-center sm:text-left">
                    {/* 📌 Main title for the Admin Dashboard */}
                    <h1 className="text-3xl sm:text-4xl font-bold text-[#f85606] mb-2">
                        Admin Dashboard
                    </h1>
                    {/* 📝 Description for the admin */}
                    <p className="text-[#333] text-base sm:text-lg">
                        Welcome, Admin! You have special access to manage the platform.
                    </p>
                </div>

                {/* 📦 Cards Section */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* ✅ This sets up a responsive grid with 1, 2, or 3 columns based on screen size */}

                    {/* 👤 Users Management Card */}
                    <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition border-t-4 border-[#f85606]">
                        {/* 🧍 Title for Users section */}
                        <h2 className="text-xl font-semibold text-[#db3700]">Users</h2>
                        {/* ✍️ Description */}
                        <p className="text-gray-600 mt-2">Manage registered users</p>
                    </div>

                    {/* 📦 Items Management Card */}
                    <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition border-t-4 border-[#f85606]">
                        {/* 🧳 Title for Items section */}
                        <h2 className="text-xl font-semibold text-[#db3700]">Items</h2>
                        {/* ✍️ Description */}
                        <p className="text-gray-600 mt-2">View and manage items for rent</p>
                    </div>

                    {/* 📅 Bookings Management Card */}
                    <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition border-t-4 border-[#f85606]">
                        {/* 📆 Title for Bookings section */}
                        <h2 className="text-xl font-semibold text-[#db3700]">Bookings</h2>
                        {/* ✍️ Description */}
                        <p className="text-gray-600 mt-2">Approve or reject user bookings</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
