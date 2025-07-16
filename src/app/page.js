"use client";
import Link from "next/link";
import React, { useState } from "react";
import {
  FaBoxOpen,
  FaSearch,
  FaShoppingBag,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigationLinks = [
    { href: "/postItem", label: "Post Item", Icon: IoIosAddCircle },
    { href: "/rentItem", label: "Rent Item", Icon: FaShoppingBag },
  ];

  return (
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

        {/* ── Mobile Hamburger ── */}
        <button
          className="md:hidden text-2xl text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* ── Search Bar (Desktop only) ── */}
        <div className="hidden md:flex flex-grow basis-0 max-w-xl mx-4">
          <div className="flex flex-grow rounded-full border border-gray-300 shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-orange-400 bg-white">
            <input
              type="text"
              placeholder="Search items for rent…"
              className="w-full px-4 py-2 text-sm outline-none"
            />
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 flex items-center justify-center">
              <FaSearch />
            </button>
          </div>
        </div>

        {/* ── Desktop Navigation Links ── */}
        <div className="hidden md:flex items-center gap-4">
          {navigationLinks.map(({ href, label, Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-1 text-gray-700 text-sm font-medium hover:text-orange-500 transition-colors"
            >
              <Icon className="text-lg" />
              {label}
            </Link>
          ))}

          {/* ── Login/Register Desktop ── */}
          <div className="flex items-center gap-2 ml-4">
            <Link
              href="/login"
              className="text-sm text-gray-700 hover:text-orange-500 transition-colors"
            >
              Login
            </Link>
            <span className="text-gray-400">|</span>
            <Link
              href="/register"
              className="text-sm text-gray-700 hover:text-orange-500 transition-colors"
            >
              Register
            </Link>
          </div>
        </div>
      </div>

      {/* ── Mobile Navigation Menu ── */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 bg-white shadow-sm">
          <div className="flex flex-col gap-2">
            {navigationLinks.map(({ href, label, Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-2 text-gray-700 hover:text-orange-500"
              >
                <Icon className="text-lg" />
                {label}
              </Link>
            ))}
            <hr />
            <Link
              href="/login"
              className="text-sm text-gray-700 hover:text-orange-500"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="text-sm text-gray-700 hover:text-orange-500"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
