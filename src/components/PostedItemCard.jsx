import { FaEdit, FaTrash } from "react-icons/fa";
import React from "react";
export default function PostedItemCard({ item, onEdit, onDelete }) {
  return (
    <div className="border rounded-lg p-4 bg-gray-50 flex gap-4 relative">
      <img src={item.image[0]?.url} className="w-28 h-28 object-cover rounded" />
      <div className="flex-1">
        <h3 className="font-bold">{item.title}</h3>
        <p className="text-sm text-gray-600">{item.description}</p>
        <p className="text-xs text-gray-500">Category: {item.category}</p>
        <p className="text-xs text-gray-500">Location: {item.location}</p>
        <span className={`text-xs mt-1 inline-block px-2 py-1 rounded ${item.isRented ? "bg-red-500" : "bg-green-500"} text-white`}>
          {item.isRented ? "Rented" : "Available"}
        </span>
      </div>
      <div className="absolute top-2 right-2 flex gap-2">
        <button onClick={() => onEdit(item)} className="text-blue-600 hover:text-blue-800"><FaEdit /></button>
        <button onClick={() => onDelete(item)} className="text-red-600 hover:text-red-800"><FaTrash /></button>
      </div>
    </div>
  );
}
