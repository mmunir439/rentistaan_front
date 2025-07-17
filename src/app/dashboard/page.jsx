"use client";

import useUser from "@/lib/useUser";

export default function UserDashboard() {
    const user = useUser();

    if (!user)
        return (
            <p className="text-center mt-10 text-gray-500 text-lg font-medium">
                Loading...
            </p>
        );

    return (
        <main className="max-w-6xl mx-auto p-4 sm:p-6 md:p-10 bg-[#f7f7f7] min-h-screen">
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-8 text-center text-[#f85606]">
                Welcome, {user.name}!
            </h1>

            <div className="bg-white shadow-xl rounded-xl p-6 flex flex-col items-center sm:items-start">
                {/* User Info */}
                <div className="text-center sm:text-left w-full">
                    <p className="text-2xl sm:text-3xl font-semibold text-gray-800">
                        {user.name}
                    </p>
                    <p className="text-gray-600 text-md sm:text-lg mt-1">{user.email}</p>

                    {/* Buttons */}
                    <div className="mt-6 flex flex-wrap justify-center sm:justify-start gap-4">
                        <button className="px-5 py-2.5 bg-[#f85606] hover:bg-[#db3700] text-white rounded-md shadow-sm transition duration-300">
                            Edit Profile
                        </button>
                        <button className="px-5 py-2.5 border border-[#f85606] text-[#f85606] hover:bg-[#fff2ec] rounded-md transition duration-300">
                            Settings
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
