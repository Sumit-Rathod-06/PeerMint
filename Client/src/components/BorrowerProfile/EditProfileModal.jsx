import React, { useState } from "react";
import axios from "axios";

const EditProfileModal = ({ borrower, onClose, onSave }) => {
  const [form, setForm] = useState({
    first_name: borrower.first_name,
    last_name: borrower.last_name,
    phone_number: borrower.phone_number,
    profile_photo_url: borrower.profile_photo_url || "",
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put("http://localhost:5000/api/borrower/profile", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onSave(res.data);
    } catch (err) {
      console.error("Error saving profile:", err);
      alert("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

        <label className="block text-sm text-gray-600 mb-1">First Name</label>
        <input
          type="text"
          name="first_name"
          value={form.first_name}
          onChange={handleChange}
          className="w-full border rounded-md p-2 mb-3 focus:ring focus:ring-indigo-300"
        />

        <label className="block text-sm text-gray-600 mb-1">Last Name</label>
        <input
          type="text"
          name="last_name"
          value={form.last_name}
          onChange={handleChange}
          className="w-full border rounded-md p-2 mb-3 focus:ring focus:ring-indigo-300"
        />

        <label className="block text-sm text-gray-600 mb-1">Phone Number</label>
        <input
          type="text"
          name="phone_number"
          value={form.phone_number}
          onChange={handleChange}
          className="w-full border rounded-md p-2 mb-3 focus:ring focus:ring-indigo-300"
        />

        <label className="block text-sm text-gray-600 mb-1">Profile Photo URL</label>
        <input
          type="text"
          name="profile_photo_url"
          value={form.profile_photo_url}
          onChange={handleChange}
          className="w-full border rounded-md p-2 mb-4 focus:ring focus:ring-indigo-300"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-md hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
