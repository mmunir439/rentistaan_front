"use client";
import { useState } from "react";
import Faqnavbar from "@/components/Faqnavbaar";
import Footer from "@/components/Footer";
const faqs = [
    {
        question: "How can I rent an item on Rentistaan?",
        answer:
            "Simply search for the item, select your desired rental dates, and proceed with payment. You'll get a confirmation once your booking is approved.",
    },
    {
        question: "Can I list my own items for rent?",
        answer:
            "Yes! After logging in, go to 'My Listings' and add your item details, images, and pricing. Once approved by the admin, your listing will be live.",
    },
    {
        question: "How do I make payments?",
        answer:
            "We support secure online payments through credit/debit cards using Stripe. You'll receive an email receipt for every transaction.",
    },
    {
        question: "Is there a security deposit?",
        answer:
            "Some items may require a refundable security deposit, which is clearly mentioned on the listing before booking.",
    },
    {
        question: "What happens if my booking gets cancelled?",
        answer:
            "If a booking is cancelled, you will be notified via email and refunded if payment has already been made.",
    },
    {
        question: "Can I contact the item owner?",
        answer:
            "Yes, after booking, you’ll be able to contact the owner via the internal messaging system for pickup or delivery details.",
    },
    {
        question: "How are ratings & reviews handled?",
        answer:
            "After a completed rental, renters can leave a star rating and review. These help keep the community trustworthy.",
    },
    {
        question: "How do I reset my password?",
        answer:
            "Go to the login page and click on 'Forgot Password'. Enter your email and follow the instructions sent to you.",
    },
];

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (index) => {
        setOpenIndex(index === openIndex ? null : index);
    };

    return (
        <div>
            <Faqnavbar />
            <section className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-16 px-4 sm:px-6 lg:px-20">
                <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">Frequently Asked Questions</h1>
                <div className="max-w-4xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border border-gray-200 rounded-xl shadow-sm bg-white transition-all duration-300"
                        >
                            <button
                                onClick={() => toggle(index)}
                                className="w-full text-left px-6 py-5 flex justify-between items-center text-gray-800 font-medium focus:outline-none"
                            >
                                <span>{faq.question}</span>
                                <svg
                                    className={`w-5 h-5 transform transition-transform ${openIndex === index ? "rotate-180" : ""
                                        }`}
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {openIndex === index && (
                                <div className="px-6 pb-5 text-gray-600">{faq.answer}</div>
                            )}
                        </div>
                    ))}
                </div>
            </section>
            <Footer />
        </div>
    );
}
