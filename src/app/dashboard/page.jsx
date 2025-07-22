"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PostedItemCard from "@/components/PostedItemCard";
import DeleteItemModal from "@/components/DeleteItemModal";
import RentedItemCard from "@/components/RentedItemCard";
import EditItemModal from "@/components/EditItemModal";
// import useHasMounted from "@/lib/useHasMounted"; // or "@/lib/useHasMounted"
import api from "@/lib/axios";
import useUser from "@/lib/useUser";

export default function UserDashboard() {
    //  const hasMounted = useHasMounted();

    // if (!hasMounted) {
    //   return null;
    // }
    const user = useUser();
    const [bookings, setBookings] = useState([]);
    const [postedItems, setPostedItems] = useState([]);

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [itemToEdit, setItemToEdit] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);


    const fetchPostedItems = async () => {
        try {
            const response = await api.get("/rentitem/myposteditem");
            setPostedItems(response.data.data);
        } catch (error) {
            console.error("Error fetching posted items:", error);
        }
    };

    useEffect(() => {
        async function fetchBookings() {
            try {
                const response = await api.get("/tookonRent/my");
                setBookings(response.data.bookings);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        }

        fetchBookings();
        fetchPostedItems();
    }, []);

    const handleEdit = (item) => {
        setItemToEdit(item);
        setEditModalOpen(true);
    };

    const handleEditSubmit = async (updatedItem) => {
        try {
            await api.put(`/rentitem/updateItem/${updatedItem._id}`, updatedItem);
            setEditModalOpen(false);
            await fetchPostedItems();
        } catch (error) {
            console.error("Error updating item:", error);
        }
    };
    const handleDelete = (item) => {
        setItemToDelete(item);
        setDeleteModalOpen(true);
    };
    const confirmDelete = async () => {
        try {
            await api.delete(`/rentitem/deleteitem/${itemToDelete._id}`);
            setDeleteModalOpen(false);
            setItemToDelete(null);
            await fetchPostedItems();
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };


    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 py-10 px-6">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-center text-[#f85606] mb-10">
                        Welcome to your Dashboard, {user?.name || "User"}
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Column - My Posted Items */}
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h2 className="text-xl font-semibold text-[#f85606] mb-4">📤 My Posted Items</h2>
                            {postedItems.length === 0 ? (
                                <p className="text-gray-500">You haven't posted any items yet.</p>
                            ) : (
                                <div className="space-y-4">
                                    {postedItems.map((item) => (
                                        <PostedItemCard
                                            key={item._id}
                                            item={item}
                                            onEdit={() => handleEdit(item)}
                                            onDelete={() => handleDelete(item)}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Right Column - My Rented Items */}
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h2 className="text-xl font-semibold text-[#f85606] mb-4">📄 My Rented Items</h2>
                            {bookings.length === 0 ? (
                                <p className="text-gray-500">No rented items yet.</p>
                            ) : (
                                <div className="space-y-4">
                                    {bookings.map((booking) => (
                                        <RentedItemCard key={booking._id} booking={booking} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            {editModalOpen && itemToEdit && (
                <EditItemModal
                    item={itemToEdit}
                    onClose={() => setEditModalOpen(false)}
                    onSubmit={handleEditSubmit}
                />
            )}
            {deleteModalOpen && itemToDelete && (
                <DeleteItemModal
                    item={itemToDelete}
                    onClose={() => {
                        setDeleteModalOpen(false);
                        setItemToDelete(null);
                    }}
                    onConfirm={confirmDelete}
                />
            )}


            <Footer />
        </>
    );
}
