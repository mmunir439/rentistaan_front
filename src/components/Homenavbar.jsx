
"use client";
import { logoutUser } from "@/utils/token";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
    FaBoxOpen,
    FaSearch,
    FaShoppingBag,
    FaBars,
    FaTimes,
} from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import { navigationLinks } from "@/lib/navigationLinks";

export default function Homenavbar({ inputValue, setInputValue }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserrole] = useState(null);
    const router = useRouter();
    const pathname = usePathname();
    const dropdownRef = useRef(null);

    // useEffect(() => {
    //     const token = localStorage.getItem("token");
    //     const useData = localStorage.getItem("user");
    //     const role = JSON.parse(useData).role;
    //     setUserrole(role);
    //     setIsLoggedIn(!!token);
    // }, []);
    useEffect(() => {
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");

        if (userData) {
            try {
                const user = JSON.parse(userData);
                if (user?.role) {
                    setUserrole(user.role);
                }
            } catch (err) {
                console.error("Error parsing user data:", err);
            }
        }

        setIsLoggedIn(!!token);
    }, []);


    useEffect(() => {
        setLoading(false);
    }, [pathname]);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleNav = async (href) => {
        if (href === pathname) return;
        setLoading(true);
        try {
            await router.push(href);
            if (href === "/") router.refresh();
        } catch (err) {
            console.error("Navigation error:", err);
            setLoading(false);
        }
    };

    return (
        <div>
            <nav className="w-full bg-white shadow-md sticky top-0 z-50">
                <div className="mx-auto flex items-center justify-between px-4 py-3 max-w-7xl">
                    {/* ── Logo ── */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-2xl font-bold text-orange-500"
                    >
                        <FaBoxOpen className="text-3xl" />
                        Rentistaan
                    </Link>

                    {/* ── Hamburger ── */}
                    <button
                        className="md:hidden text-2xl text-gray-700"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? <FaTimes /> : <FaBars />}
                    </button>

                    {/* ── Search Bar (Desktop) ── */}
                    <div className="hidden md:flex flex-grow basis-0 max-w-xl mx-4">
                        <div className="flex flex-grow rounded-full border border-gray-300 shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-orange-400 bg-white">
                            <input
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                type="text"
                                placeholder="Search items for rent…"
                                className="w-full px-4 py-2 text-sm outline-none"
                            />
                            <button
                                onClick={() => setInputValue("")}
                                className="bg-orange-500 hover:bg-orange-600 text-white px-4 flex items-center justify-center"
                            >
                                <FaSearch />
                            </button>
                        </div>
                    </div>

                    {/* ── Desktop Menu ── */}
                    <div className="hidden md:flex items-center gap-4">
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

                        <div className="flex items-center gap-3 ml-4">
                            {isLoggedIn ? (
                                <div className="relative group" ref={dropdownRef}>
                                    <MdAccountCircle
                                        className="text-2xl text-orange-500 hover:text-orange-600 cursor-pointer"
                                        onClick={() => setShowDropdown(!showDropdown)}
                                    />
                                    {showDropdown && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-md z-50">
                                            <Link
                                                href={userRole === "admin" ? "/admin" : "/dashboard"}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50"
                                            >
                                                Dashboard
                                            </Link>
                                            <Link
                                                href="/edit-profile"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50"
                                            >
                                                Edit Profile
                                            </Link>
                                            <button
                                                onClick={() => logoutUser(router)}
                                                className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                                            >
                                                Logout
                                            </button>

                                        </div>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <button
                                        onClick={() => handleNav("/login")}
                                        className="text-sm text-gray-700 hover:text-orange-500 transition-colors"
                                    >
                                        Login
                                    </button>
                                    <span className="text-gray-400">|</span>
                                    <button
                                        onClick={() => handleNav("/register")}
                                        className="text-sm text-gray-700 hover:text-orange-500 transition-colors"
                                    >
                                        Register
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* ── Mobile Menu ── */}
                {menuOpen && (
                    <div className="md:hidden px-4 pb-4 space-y-3 bg-white shadow-sm">
                        <div className="flex flex-col gap-2">
                            {navigationLinks.map(({ href, label, Icon }) => (
                                <button
                                    key={href}
                                    onClick={() => {
                                        handleNav(href);
                                        setMenuOpen(false);
                                    }}
                                    className="flex items-center gap-2 text-gray-700 hover:text-orange-500"
                                >
                                    <Icon className="text-lg" />
                                    {label}
                                </button>
                            ))}
                            <hr />
                            {isLoggedIn ? (
                                <>
                                    <Link
                                        href={userRole === "admin" ? "/admin" : "/dashboard"}
                                        className="flex items-center gap-2 text-orange-500 hover:text-orange-600"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        <MdAccountCircle className="text-lg" />
                                        Dashboard
                                    </Link>
                                    <Link
                                        href="/edit-profile"
                                        className="flex items-center gap-2 text-orange-500 hover:text-orange-600"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        edit-profile
                                    </Link>
                                    <button
                                        onClick={() => {
                                            logoutUser(router);
                                            setMenuOpen(false); // Close mobile dropdown
                                        }}
                                        className="text-left text-sm text-red-500 hover:text-red-600"
                                    >
                                        Logout
                                    </button>

                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={() => {
                                            handleNav("/login");
                                            setMenuOpen(false);
                                        }}
                                        className="text-sm text-gray-700 hover:text-orange-500"
                                    >
                                        Login
                                    </button>
                                    <button
                                        onClick={() => {
                                            handleNav("/register");
                                            setMenuOpen(false);
                                        }}
                                        className="text-sm text-gray-700 hover:text-orange-500"
                                    >
                                        Register
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                )}

                {/* ── Loading Overlay ── */}
                {loading && (
                    <div className="fixed inset-0 z-[999] bg-black bg-opacity-20 flex items-center justify-center">
                        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}
            </nav>
        </div>
    );
}
