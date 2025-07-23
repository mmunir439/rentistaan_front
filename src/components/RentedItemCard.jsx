"use client";
import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import EditBookingModal from "@/components/EditBookingModal";
import DeleteBookingModal from "@/components/DeleteBookingModal";

export default function RentedItemCard({ booking }) {
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    return (
        <div className="border border-gray-200 rounded-lg p-4 shadow-sm bg-gray-50">
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                <div className="flex justify-between w-full">
                    <div>
                        <p><strong>Total Hours:</strong> {booking.totalHours.toFixed(2)}</p>
                        <p><strong>Total Price:</strong> ${booking.totalPrice.toFixed(2)}</p>
                        <p><strong>End Time:</strong> {new Date(booking.endTime).toLocaleString()}</p>
                        <p>
                            <strong>Status:</strong>
                            <span className={`ml-1 px-2 py-1 rounded text-white text-xs ${booking.status === "pending"
                                ? "bg-yellow-500"
                                : booking.status === "approved"
                                    ? "bg-green-500"
                                    : "bg-red-500"
                                }`}>
                                {booking.status}
                            </span>
                        </p>
                    </div>
                    <div className="flex gap-3 items-start">
                        <FaEdit className="text-gray-600 cursor-pointer" onClick={() => setEditOpen(true)} />
                        <FaTrash className="text-red-600 cursor-pointer" onClick={() => setDeleteOpen(true)} />
                    </div>
                </div>
            </div>

            <EditBookingModal
                isOpen={editOpen}
                onClose={() => setEditOpen(false)}
                booking={booking}
                onUpdated={() => window.location.reload()} // or pass a refetch method
            />

            <DeleteBookingModal
                isOpen={deleteOpen}
                onClose={() => setDeleteOpen(false)}
                bookingId={booking._id}
                onDeleted={() => window.location.reload()} // or pass a refetch method
            />
        </div>
    );
}
