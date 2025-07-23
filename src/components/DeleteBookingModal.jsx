"use client";
import React from "react";
import { Dialog } from "@headlessui/react";
import api from "@/lib/axios";

export default function DeleteBookingModal({ isOpen, onClose, bookingId, onDeleted }) {
    const handleDelete = async () => {
        try {
            await api.delete(`/tookonRent/${bookingId}`);
            onDeleted();
            onClose();
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };

    return (
        <Dialog open={isOpen} onClose={onClose} className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
                <Dialog.Panel className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm">
                    <Dialog.Title className="text-lg font-semibold mb-4">Confirm Delete</Dialog.Title>
                    <p>Are you sure you want to delete this booking?</p>

                    <div className="mt-6 flex justify-end gap-4">
                        <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Cancel</button>
                        <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Delete</button>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
}