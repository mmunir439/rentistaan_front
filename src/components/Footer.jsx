"use client";
import React from "react";
import { Facebook, Twitter, Linkedin, Youtube, Mail, MapPin } from "lucide-react";
import Link from "next/link";
export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-10 px-4 sm:px-8 md:px-16">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {/* Brand */}
                <div>
                    <h2 className="text-2xl font-bold text-teal-400">Rentistaan</h2>
                    <p className="mt-2 text-sm text-gray-400">
                        Pakistan’s #1 platform to rent or post items easily and safely.
                    </p>
                </div>

                {/* Navigation */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Explore</h3>
                    <ul className="space-y-2 text-sm text-gray-300">
                        <li><Link href="/rentitems" className="hover:text-teal-400">Browse Items</Link></li>
                        <li><Link href="/rentitems/postItem" className="hover:text-teal-400">Post Your Item</Link></li>
                        <li><Link href="/about" className="hover:text-teal-400">About Us</Link></li>
                        <li><Link href="/faqs" className="hover:text-orange-600">FAQs</Link>
                        </li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Contact</h3>
                    <ul className="space-y-2 text-sm text-gray-300">
                        <Link
                            href="https://mail.google.com/mail/?view=cm&fs=1&to=hrcoder3@gmail.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-teal-400"
                        >
                            hrcoder3@gmail.com
                        </Link>

                        <li className="flex items-center gap-2">
                            <Link
                                href="https://www.google.com/maps/place/33.719227,73.035078"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-teal-600 hover:text-teal-800"
                            >
                                <MapPin className="w-4 h-4" />
                                Islamabad , Pakistan
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Social */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
                    <div className="flex space-x-4">
                        <Link href="https://www.facebook.com/profile.php?id=100085467492304" target="_blank" className="text-gray-400 hover:text-white">
                            <Facebook />
                        </Link>
                        <Link href="https://x.com/Muhamad_munir76" target="_blank" className="text-gray-400 hover:text-white">
                            <Twitter />
                        </Link>
                        <Link href="https://www.linkedin.com/in/muhammad-munir-928573353/?trk=opento_sprofile_details" target="_blank" className="text-gray-400 hover:text-white">
                            <Linkedin />
                        </Link>
                        <Link href="https://www.youtube.com/@MuhammadMunir-cs6ec" target="_blank" className="text-gray-400 hover:text-white">
                            <Youtube />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Bottom Line */}
            <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
                &copy; {new Date().getFullYear()} Rentistaan Pakistan. All rights reserved.
            </div>
        </footer>
    );
}
