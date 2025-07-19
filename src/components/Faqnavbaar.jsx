"use client";

import Link from "next/link";
import useUser from "@/lib/useUser"; // ✅ Correct import path
import { navigationLinks } from "@/lib/navigationLinks"; // ✅ Correct import path

export default function Faqnavbar() {
    const user = useUser();

    return (
        <nav className="bg-white shadow sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
                <div className="text-[#f85606] font-bold text-2xl">Rentistaan</div>
                <div className="flex items-center gap-4">
                    <Link href="/" className="text-gray-700 hover:text-[#f85606] transition">
                        Home
                    </Link>

                    {user &&
                        navigationLinks.map(({ href, label }) => (
                            <Link
                                key={href}
                                href={href}
                                className="text-gray-700 hover:text-[#f85606] transition"
                            >
                                {label}
                            </Link>
                        ))}

                    {!user && (
                        <>
                            <Link href="/login" className="text-gray-700 hover:text-[#f85606] transition">
                                Login
                            </Link>
                            <Link href="/register" className="text-gray-700 hover:text-[#f85606] transition">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
