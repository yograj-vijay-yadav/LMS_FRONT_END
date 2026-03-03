import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";

function Profile() {
  const navigate = useNavigate();
  const userData = useSelector((state) => state?.auth?.data);

  async function handleCancellation() {
    toast("Initiating cancellation");
    await dispatch(cancelCourseBundle());
    await dispatch(getUserData());
    toast.success("Cancellation completed!");
    navigate("/");
  }

  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex items-center justify-center ">
        <div className="my-10 flex flex-col gap-6 rounded-xl p-6 text-white w-full max-w-md shadow-lg border border-pink-500 backdrop-blur-sm relative">
          
          {/* Avatar */}
          <img
            src={userData?.avatar?.secure_url}
            alt="User Avatar"
            className="w-32 h-32 m-auto rounded-full border-4 border-pink-500 shadow-md"
          />

          {/* Name */}
          <h3 className="text-2xl font-bold text-center capitalize text-pink-400">
            {userData?.fullName}
          </h3>

          {/* User Info */}
          <div className="grid grid-cols-2 gap-y-2 text-gray-300">
            <p className="font-semibold">Email:</p>
            <p>{userData?.email}</p>
            <p className="font-semibold">Role:</p>
            <p className="capitalize">{userData?.role}</p>
            <p className="font-semibold">Subscription:</p>
            <p className={userData?.subscription?.status === "active" ? "text-green-400 font-semibold" : "text-red-400 font-semibold"}>
              {userData?.subscription?.status === "active" ? "Active" : "Inactive"}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between gap-4">
            <Link
              to="/changepassword"
              className="w-1/2 bg-pink-500 hover:bg-pink-600 transition-all ease-in-out duration-300 rounded-md font-semibold py-2 text-center shadow-md"
            >
              Change Password
            </Link>
            <Link
              to="/user/editprofile"
              className="w-1/2 bg-pink-500 hover:bg-pink-600 transition-all ease-in-out duration-300 rounded-md font-semibold py-2 text-center shadow-md"
            >
              Edit Profile
            </Link>
          </div>

          {/* Cancel Subscription */}
          {userData?.subscription?.status === "active" && (
            <button
              onClick={handleCancellation}
              className="w-full bg-red-600 hover:bg-red-500 transition-all ease-in-out duration-300 rounded-md font-semibold py-2 text-center shadow-md"
            >
              Cancel Subscription
            </button>
          )}
        </div>
      </div>
    </HomeLayout>
  );
}

export default Profile;
