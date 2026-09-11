import {
  BadgeCheck,
  CreditCard,
  Edit3,
  KeyRound,
  ShieldX,
  User,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import ConfirmDialog from "../../Components/Ui/ConfirmDialog";
import HomeLayout from "../../Layouts/HomeLayout";
import { getUserData } from "../../Redux/Slices/AuthSlice";
import { cancelCourseBundle } from "../../Redux/Slices/RazorpaySlice";

function Profile() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state?.auth?.data);

  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  const isSubscribed = userData?.subscription?.status === "active";

  async function handleCancellation() {
    setIsCancelling(true);
    const response = await dispatch(cancelCourseBundle());
    setIsCancelling(false);
    setShowCancelDialog(false);

    if (response?.payload?.success) {
      await dispatch(getUserData());
      toast.success("Subscription cancelled");
    }
  }

  return (
    <HomeLayout>
      <div className="container-page flex min-h-[80vh] items-center justify-center py-14">
        <div className="anim-fade-up w-full max-w-lg">
          <div className="card p-8 shadow-xl shadow-black/20">
            {/* Header */}
            <div className="text-center">
              <div className="relative mx-auto w-fit">
                {userData?.avatar?.secure_url ? (
                  <img
                    src={userData?.avatar?.secure_url}
                    alt={`${userData?.fullName || "User"}'s avatar`}
                    className="size-24 rounded-full border-2 border-rose-500/60 object-cover"
                  />
                ) : (
                  <div className="flex size-24 items-center justify-center rounded-full border-2 border-slate-700 bg-slate-900">
                    <User className="size-10 text-slate-500" aria-hidden="true" />
                  </div>
                )}
                <span className="absolute -bottom-1 -right-1 flex size-7 items-center justify-center rounded-full border-2 border-slate-950 bg-emerald-500 text-white">
                  <BadgeCheck className="size-3.5" aria-hidden="true" />
                </span>
              </div>

              <h1 className="mt-5 text-2xl font-bold capitalize">
                {userData?.fullName || "User"}
              </h1>
              <p className="mt-1 text-sm text-slate-400">
                {userData?.email || "user@example.com"}
              </p>
            </div>

            {/* Details */}
            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-900/60 p-3.5">
                <BadgeCheck className="size-4.5 shrink-0 text-rose-400" aria-hidden="true" />
                <div className="flex-1">
                  <p className="text-xs text-slate-500">Role</p>
                  <p className="text-sm capitalize text-slate-200">
                    {userData?.role || "User"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-900/60 p-3.5">
                <CreditCard className="size-4.5 shrink-0 text-rose-400" aria-hidden="true" />
                <div className="flex-1">
                  <p className="text-xs text-slate-500">Subscription</p>
                  <p
                    className={`text-sm font-medium ${
                      isSubscribed ? "text-emerald-400" : "text-slate-400"
                    }`}
                  >
                    {isSubscribed ? "Active" : "Not subscribed"}
                  </p>
                </div>
                {isSubscribed && (
                  <span className="badge badge-emerald">Premium</span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Link to="/user/editprofile" className="btn btn-primary">
                <Edit3 className="size-4" aria-hidden="true" />
                Edit profile
              </Link>
              <Link to="/courses" className="btn btn-secondary">
                <KeyRound className="size-4" aria-hidden="true" />
                Browse courses
              </Link>
            </div>

            {!isSubscribed && (
              <Link
                to="/checkout"
                className="btn btn-primary mt-3 w-full"
              >
                Upgrade to premium
              </Link>
            )}

            {isSubscribed && (
              <button
                type="button"
                onClick={() => setShowCancelDialog(true)}
                className="btn btn-danger mt-3 w-full"
              >
                <ShieldX className="size-4" aria-hidden="true" />
                Cancel subscription
              </button>
            )}
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={showCancelDialog}
        destructive
        title="Cancel subscription?"
        message="You'll lose access to premium courses when your current billing period ends. Your progress will be saved."
        confirmLabel="Yes, cancel"
        busy={isCancelling}
        onConfirm={handleCancellation}
        onCancel={() => setShowCancelDialog(false)}
      />
    </HomeLayout>
  );
}

export default Profile;
