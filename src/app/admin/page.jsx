"use client";

export default function AdminDashboard() {
    return (
        <main className="p-4 sm:p-6 md:p-10 bg-[#f7f7f7] min-h-screen">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="bg-white p-6 rounded-xl shadow-md text-center sm:text-left">
                    <h1 className="text-3xl sm:text-4xl font-bold text-[#f85606] mb-2">
                        Admin Dashboard
                    </h1>
                    <p className="text-[#333] text-base sm:text-lg">
                        Welcome, Admin! You have special access to manage the platform.
                    </p>
                </div>

                {/* Cards */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Users Card */}
                    <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition border-t-4 border-[#f85606]">
                        <h2 className="text-xl font-semibold text-[#db3700]">Users</h2>
                        <p className="text-gray-600 mt-2">Manage registered users</p>
                    </div>

                    {/* Items Card */}
                    <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition border-t-4 border-[#f85606]">
                        <h2 className="text-xl font-semibold text-[#db3700]">Items</h2>
                        <p className="text-gray-600 mt-2">View and manage items for rent</p>
                    </div>

                    {/* Bookings Card */}
                    <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition border-t-4 border-[#f85606]">
                        <h2 className="text-xl font-semibold text-[#db3700]">Bookings</h2>
                        <p className="text-gray-600 mt-2">Approve or reject user bookings</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
