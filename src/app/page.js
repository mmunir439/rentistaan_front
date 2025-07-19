"use client";
// import React from "react";
import Homenavbar from "@/components/Homenavbar";
import ItemList from "@/components/ItemList";
import Footer from "@/components/Footer";
import { useState } from "react";
export default function Main() {
  const [inputValue, setInputValue] = useState("");
  return (
    <div>
      {/* Pass state and setter to Homenavbar */}
      <Homenavbar inputValue={inputValue} setInputValue={setInputValue} />

      {/* Pass inputValue to ItemList */}
      <ItemList inputValue={inputValue} />
      <Footer />
    </div>
  );
}
