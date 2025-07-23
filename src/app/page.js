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
      <Homenavbar inputValue={inputValue} setInputValue={setInputValue} />
      <ItemList inputValue={inputValue} />
      <Footer />
    </div>
  );
}
