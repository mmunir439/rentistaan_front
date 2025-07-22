import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
export default function RentedItemCard({ booking }) {
    if (!booking || !booking.item) return null;

    return (
        <div className="border border-gray-200 rounded-lg p-4 shadow-sm bg-gray-50">
            {/* <h3 className="text-lg font-bold text-gray-800 mb-2">
                🛠 {booking.item.title}
            </h3> */}
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                <div className="flex jsutify-end">
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
                    <div className="flex gap-3">
                        <FaEdit className="text-gray-600" />
                        <FaTrash />
                    </div>
                </div>
            </div>
        </div>
    );
}
