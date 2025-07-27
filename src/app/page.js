"use client";
import React, { useState } from "react";
import Homenavbar from "@/components/Homenavbar";
import ItemList from "@/components/ItemList";
import Footer from "@/components/Footer";

// Simple carousel images (replace with your own or fetch from API)
const carouselImages = [
  {
    url: "/globe.svg",
    title: "Rent Anything, Anytime",
    desc: "Find the best items to rent in your city.",
  },
  {
    url: "/window.svg",
    title: "Post Your Item",
    desc: "Earn money by renting out your unused items.",
  },
  {
    url: "/vercel.svg",
    title: "Safe & Secure",
    desc: "Trusted by thousands across Pakistan.",
  },
];

function Carousel() {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 3 seconds
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto mt-6 mb-10 rounded-3xl overflow-hidden shadow-lg relative bg-gradient-to-r from-orange-100 via-teal-100 to-orange-50">
      <div className="flex items-center justify-center h-64 sm:h-80 relative">
        <img
          src={carouselImages[current].url}
          alt={carouselImages[current].title}
          className="object-contain h-40 sm:h-56 transition-all duration-700 mx-auto"
        />
        <div className="absolute left-0 top-0 w-full h-full flex flex-col items-center justify-center bg-black/10">
          <h2 className="text-2xl sm:text-4xl font-bold text-orange-600 drop-shadow mb-2">
            {carouselImages[current].title}
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 font-medium">
            {carouselImages[current].desc}
          </p>
        </div>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {carouselImages.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full ${current === idx ? "bg-orange-500" : "bg-gray-300"} transition-all`}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Main() {
  const [inputValue, setInputValue] = useState("");
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-teal-50 to-orange-100">
      <Homenavbar inputValue={inputValue} setInputValue={setInputValue} />
      <Carousel />
      <ItemList inputValue={inputValue} />
      <Footer />
    </div>
  );
}