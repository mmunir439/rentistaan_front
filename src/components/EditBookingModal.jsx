"use client";
import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import api from "@/lib/axios";

export default function EditBookingModal({ isOpen, onClose, booking, onUpdated }) {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (booking) {
      const formatForInput = (dateStr) => {
        const date = new Date(dateStr);
        return date.toISOString().slice(0, 16); // Format: YYYY-MM-DDTHH:MM
      };

      setStartTime(formatForInput(booking.startTime));
      setEndTime(formatForInput(booking.endTime));
    }
  }, [booking]);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await api.put(`/tookonRent/${booking._id}`, { startTime, endTime });
      onUpdated();
      onClose();
    } catch (err) {
      console.error("Update failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl transition-all">
          <Dialog.Title className="text-xl font-bold text-gray-800 mb-4 text-center">
            Edit Booking
          </Dialog.Title>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
              <input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
              <input
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                disabled={loading}
                className={`px-4 py-2 rounded-lg text-white transition ${loading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                  }`}
              >
                {loading ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
