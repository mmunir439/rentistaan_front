"use client";
import React from "react";
async function toggleStatus(id, currentStatus) {
    try {
        const newStatus = currentStatus === "approved" ? "pending" : "approved";

        const response = await api.put(`/approveItem/${id}`, {
            status: newStatus, // 🟡 Send new status to backend
        });

        // Re-fetch or update state
        getItems(); // your existing fetch function
    } catch (error) {
        console.error("Error toggling item status:", error);
    }
}
