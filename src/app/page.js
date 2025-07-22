"use client";
import React from "react";
import Homenavbar from "@/components/Homenavbar";
import ItemList from "@/components/ItemList";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Imprima } from "next/font/google";
export default function Main() {
  const [inputValue, setInputValue] = useState("");
  return (
    <div>
      {/* <h1>{process.env.NEXT_PUBLIC_BACKEND_URL}</h1> */}
      {/* Pass state and setter to Homenavbar */}
      <Homenavbar inputValue={inputValue} setInputValue={setInputValue} />
      {/* Pass inputValue to ItemList */}
      <ItemList inputValue={inputValue} />
      <Footer />
    </div>
  );
}
