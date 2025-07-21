"use client";
import React from "react";

export default function DeleteItemModal({ item, onClose, onConfirm }) {
    return (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Delete Item</h3>
                <p className="text-sm text-gray-600 mb-6">
                    Are you sure you want to delete{" "}
                    <strong className="text-red-500">{item?.title}</strong>? This action
                    cannot be undone.
                </p>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
