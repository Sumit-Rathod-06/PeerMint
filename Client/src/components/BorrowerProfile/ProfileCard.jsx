import React from "react";

const ProfileCard = ({ borrower, onEdit }) => {
  return (
    console.log(borrower),
    console.log(borrower.first_name),
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center">
      <img
        src={borrower.profile_photo_url || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
        alt="Profile"
        className="w-24 h-24 rounded-full object-cover mb-4"
      />
      <h2 className="text-xl font-semibold text-gray-800">
        {borrower.first_name} {borrower.last_name}
      </h2>
      <p className="text-gray-500">{borrower.email}</p>
      <p className="text-sm text-gray-400 mt-1">
        Joined on {new Date(borrower.created_at).toLocaleDateString()}
      </p>
      <button
        onClick={onEdit}
        className="mt-4 px-5 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-700 transition-colors"
      >
        Edit Profile
      </button>
    </div>
  );
};

export default ProfileCard;
