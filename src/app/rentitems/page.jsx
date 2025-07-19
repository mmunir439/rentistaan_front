"use client";
import ItemList from "@/components/ItemList";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar_2"
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import Link from "next/link";
export default function RentItemList() {
    return (
        <div>

            <Navbar />
            <ItemList />
            <Footer />
        </div>
    );
}
