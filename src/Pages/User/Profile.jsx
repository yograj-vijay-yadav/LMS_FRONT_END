import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { User, Mail, BadgeCheck, CreditCard, Edit, Key, XCircle } from "lucide-react";

import HomeLayout from "../../Layouts/HomeLayout";
import { getUserData } from "../../Redux/Slices/AuthSlice";
// Remove cancelCourseBundle import if not available

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state?.auth?.data);

  async function handleCancellation() {
    toast.loading("Initiating cancellation...");
    
    // Option 1: If you have the action, uncomment this
    // await dispatch(cancelCourseBundle());
    
    // Option 2: If you don't have it yet, show message
    toast.dismiss();
    toast.error("Cancellation feature coming soon!");
    
    // Option 3: Make API call directly
    // try {
    //   const response = await axiosInstance.post("/api/cancel-subscription");
    //   if (response.data.success) {
    //     await dispatch(getUserData());
    //     toast.success("Cancellation completed!");
    //     navigate("/");
    //   }
    // } catch (error) {
    //   toast.error("Failed to cancel subscription");
    // }
  }

  return (
    <HomeLayout>
      <div 
        className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12"
        style={{
          background: "linear-gradient(to bottom, #000000, #2a0a1a, #1a0010)"
        }}
      >
        <div className="w-full max-w-md">
          {/* Profile Card */}
          <div
            className="rounded-2xl border border-pink-500 px-8 py-10 shadow-2xl"
            style={{
              background: "linear-gradient(to bottom, #1a0010, #3b0a2a, #000000)"
            }}
          >
            
            {/* Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 border border-pink-500 rounded-full mb-4">
                <User className="text-pink-400" size={28} />
              </div>
              <h2 className="bg-gradient-to-r from-pink-400 via-pink-500 to-pink-700 bg-clip-text text-transparent text-3xl font-bold">
                My Profile
              </h2>
              <p className="text-gray-400 mt-2">Your personal information</p>
            </div>

            {/* Avatar */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                {userData?.avatar?.secure_url ? (
                  <img
                    src={userData?.avatar?.secure_url}
                    alt="User Avatar"
                    className="w-32 h-32 rounded-full border-4 border-pink-500 shadow-lg object-cover"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full border-4 border-pink-500 shadow-lg flex items-center justify-center bg-gray-900">
                    <User className="text-pink-400" size={48} />
                  </div>
                )}
                <div className="absolute bottom-0 right-0 bg-pink-500 rounded-full p-1.5 border-2 border-black">
                  <BadgeCheck size={14} className="text-white" />
                </div>
              </div>
            </div>

            {/* Name */}
            <h3 className="text-2xl font-bold text-center capitalize text-pink-400 mb-6">
              {userData?.fullName || "User Name"}
            </h3>

            {/* User Info */}
            <div className="space-y-3 mb-6">
              {/* Email */}
              <div className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-lg border border-gray-800">
                <Mail className="text-pink-400" size={18} />
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Email Address</p>
                  <p className="text-white text-sm">{userData?.email || "user@example.com"}</p>
                </div>
              </div>

              {/* Role */}
              <div className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-lg border border-gray-800">
                <BadgeCheck className="text-pink-400" size={18} />
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Role</p>
                  <p className="text-white text-sm capitalize">{userData?.role || "User"}</p>
                </div>
              </div>

              {/* Subscription Status */}
              <div className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-lg border border-gray-800">
                <CreditCard className="text-pink-400" size={18} />
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Subscription Status</p>
                  <p className={userData?.subscription?.status === "active" ? "text-green-400 font-semibold text-sm" : "text-red-400 font-semibold text-sm"}>
                    {userData?.subscription?.status === "active" ? "Active ✓" : "Inactive ✗"}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-4">
              <Link
                to="/changepassword"
                className="flex-1 bg-pink-500 hover:bg-pink-600 transition-all duration-300 rounded-lg font-semibold py-2.5 text-white flex items-center justify-center gap-2 shadow-md"
              >
                <Key size={16} />
                Change Password
              </Link>
              <Link
                to="/user/editprofile"
                className="flex-1 bg-pink-500 hover:bg-pink-600 transition-all duration-300 rounded-lg font-semibold py-2.5 text-white flex items-center justify-center gap-2 shadow-md"
              >
                <Edit size={16} />
                Edit Profile
              </Link>
            </div>

            {/* Cancel Subscription Button */}
            {userData?.subscription?.status === "active" && (
              <button
                onClick={handleCancellation}
                className="w-full bg-red-600 hover:bg-red-500 transition-all duration-300 rounded-lg font-semibold py-2.5 text-white flex items-center justify-center gap-2 shadow-md"
              >
                <XCircle size={16} />
                Cancel Subscription
              </button>
            )}

            {/* Back to Home Link */}
            <div className="text-center mt-6 pt-4 border-t border-gray-800">
              <Link to="/" className="text-gray-400 hover:text-pink-400 text-sm transition">
                Back to Home
              </Link>
            </div>
          </div>

          {/* Footer Text */}
          <div className="text-center mt-6">
            <p className="text-gray-500 text-sm">Manage your profile and subscription settings</p>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default Profile;