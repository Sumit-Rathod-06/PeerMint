import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfileCard from "../components/BorrowerProfile/ProfileCard";
import BasicInfoCard from "../components/BorrowerProfile/BasicInfoCard";
import ContactInfoCard from "../components/BorrowerProfile/ContactInfoCard";
import ResidentialInfoCard from "../components/BorrowerProfile/ResidentialInfoCard";
import EditProfileModal from "../components/BorrowerProfile/EditProfileModal";
import BASE_URL from "../assets/assests";

const BorrowerProfilePage = () => {
  const [borrower, setBorrower] = useState(null);
  const [kyc, setKyc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const [borrowerRes, kycRes] = await Promise.all([
          axios.get(`${BASE_URL}/api/borrower/profile-basic`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${BASE_URL}/api/borrower/profile-private`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setBorrower(borrowerRes.data);
        setKyc(kycRes.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-500 mt-8">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-100 py-8">
      <div className="max-w-5xl ml-80 px-4 space-y-6">
        <ProfileCard borrower={borrower.data} onEdit={() => setShowEditModal(true)} />
        <BasicInfoCard borrower={borrower.data} kyc={kyc.data} />
        <ContactInfoCard borrower={borrower.data} />
        <ResidentialInfoCard kyc={kyc.data} />

        {showEditModal && (
          <EditProfileModal
            borrower={borrower}
            onClose={() => setShowEditModal(false)}
            onSave={(updated) => {
              setBorrower(updated);
              setShowEditModal(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default BorrowerProfilePage;
