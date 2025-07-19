"use client";
import { FaBoxOpen } from "react-icons/fa";
import Link from "next/link";
import { navigationLinks } from "@/lib/navigationLinks";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const router = useRouter();

    const handleNav = (href) => {
        router.push(href);
    };

    return (
        <nav className="bg-white shadow sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
                {/* Left side - Brand */}
                <Link
                    href="/"
                    className="text-[#f85606] font-bold text-2xl flex gap-1 items-center"
                >
                    <FaBoxOpen className="text-3xl" />
                    Rentistaan
                </Link>

                {/* Right side - Navigation Links */}
                <div className="flex items-center gap-3"> {/* 👈 Controlled gap here */}
                    {navigationLinks.map(({ href, label, Icon }) => (
                        <button
                            key={href}
                            onClick={() => handleNav(href)}
                            className="flex items-center gap-1 text-gray-700 text-sm font-medium hover:text-orange-500 transition-colors"
                        >
                            <Icon className="text-lg" />
                            {label}
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    );
}
