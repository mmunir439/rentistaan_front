"use client";

import Navbar from "@/components/NavBar";
import useUser from "@/lib/useUser";

export default function EditProfile() {
    const user = useUser();

    if (!user)
        return (
            <p className="text-center mt-10 text-gray-500 text-lg font-medium">
                Loading...
            </p>
        );

    return (
        <>
            <Navbar />
            <main className="max-w-4xl mx-auto p-4 sm:p-6 md:p-10 bg-white rounded-lg shadow-md min-h-screen">
                <h1 className="text-3xl font-bold mb-6 text-[#f85606]">Edit Profile</h1>

                <form className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">Name</label>
                        <input
                            type="text"
                            defaultValue={user.name}
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">Email</label>
                        <input
                            type="email"
                            defaultValue={user.email}
                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                            disabled
                        />
                    </div>

                    <button
                        type="submit"
                        className="px-6 py-2 bg-[#f85606] text-white rounded-md hover:bg-[#db3700] transition"
                    >
                        Save Changes
                    </button>
                </form>
            </main>
        </>
    );
}
