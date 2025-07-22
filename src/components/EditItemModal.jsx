"use client";

import { useState, useEffect } from "react";

export default function EditItemModal({ item, onClose, onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    pricePerHour: "",
    location: "",
    features: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (item) {
      setForm({
        title: item.title || "",
        description: item.description || "",
        category: item.category || "",
        pricePerHour: item.pricePerHour || "",
        location: item.location || "",
        features: item.features || "",
      });
      // Image is handled separately, maybe show preview from item.image[0]?.url
    }
  }, [item]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Build formData if you allow image upload like in PostItemPage
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (image) {
        formData.append("image", image);
      }

      // Call onSubmit with formData and item._id (or form object + id)
      await onSubmit({ ...form, _id: item._id, image: image ? image : null });

      setLoading(false);
      onClose();
    } catch (err) {
      setError(err.message || "Failed to update item");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-xl shadow-xl w-full max-w-sm sm:max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-[#f85606] mb-4 text-center">
          Update  Item
        </h2>

        {error && <p className="text-red-500 mb-3 text-center text-sm">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            placeholder="Title"
            className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#f85606]"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            placeholder="Description"
            rows={2}
            className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#f85606]"
          />

          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            placeholder="Category"
            className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#f85606]"
            list="categories"
          />
          <datalist id="categories">
            <option value="Vehicles" />
            <option value="House" />
            <option value="Electronics" />
            <option value="Tools" />
            <option value="Furniture" />
            <option value="Clothing" />
            <option value="Sports" />
            <option value="Other" />
          </datalist>

          <input
            name="pricePerHour"
            type="number"
            value={form.pricePerHour}
            onChange={handleChange}
            required
            placeholder="Price Per Hour"
            min={0}
            step={0.01}
            className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#f85606]"
          />

          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            required
            placeholder="Location"
            className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#f85606]"
          />

          <textarea
            name="features"
            value={form.features}
            onChange={handleChange}
            placeholder="Features (Optional)"
            rows={2}
            maxLength={3000}
            className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#f85606]"
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded-md text-sm"
          />

          <div className="flex justify-between items-center pt-2">
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-1.5 rounded-md text-white text-sm font-medium transition duration-200 ${loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#f85606] hover:bg-[#e64a19]"
                }`}
            >
              {loading ? "Updating..." : "Update"}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-md border border-gray-300 text-sm text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>

  );
}
