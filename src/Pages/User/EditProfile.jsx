import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { User, ArrowLeft, Camera, Save } from "lucide-react";

import HomeLayout from "../../Layouts/HomeLayout";
import { getUserData, updateProfile } from "../../Redux/Slices/AuthSlice";

function EditProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [data, setData] = useState({
    previewImage: "",
    fullName: "",
    avatar: undefined,
    userId: useSelector((state) => state?.auth?.data?._id),
  });
  
  const [isLoading, setIsLoading] = useState(false);

  function handleImageUpload(e) {
    e.preventDefault();
    const uploadedImage = e.target.files[0];
    if (uploadedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setData({
          ...data,
          previewImage: this.result,
          avatar: uploadedImage,
        });
      });
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    
    if (!data.fullName || !data.avatar) {
      toast.error("All fields are mandatory");
      return;
    }
    
    if (data.fullName.length < 5) {
      toast.error("Name cannot be less than 5 characters");
      return;
    }
    
    setIsLoading(true);
    
    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("avatar", data.avatar);

    await dispatch(updateProfile([data.userId, formData]));
    await dispatch(getUserData());
    
    setIsLoading(false);
    toast.success("Profile updated successfully!");
    navigate("/user/profile");
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
          {/* Edit Profile Card */}
          <div
            className="rounded-2xl border border-pink-500 px-8 py-10 shadow-2xl"
            style={{
              background: "linear-gradient(to bottom, #1a0010, #3b0a2a, #000000)"
            }}
          >
            
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 border border-pink-500 rounded-full mb-4">
                <User className="text-pink-400" size={28} />
              </div>
              <h2 className="bg-gradient-to-r from-pink-400 via-pink-500 to-pink-700 bg-clip-text text-transparent text-3xl font-bold">
                Edit Profile
              </h2>
              <p className="text-gray-400 mt-2">Update your personal information</p>
            </div>

            {/* Form */}
            <form onSubmit={onFormSubmit} className="space-y-5">
              
              {/* Avatar Upload */}
              <div className="text-center">
                <label 
                  htmlFor="image_uploads" 
                  className="cursor-pointer inline-block group"
                >
                  <div className="relative">
                    {data.previewImage ? (
                      <img
                        className="w-28 h-28 rounded-full border-2 border-pink-500 shadow-lg mx-auto object-cover"
                        src={data.previewImage}
                        alt="Profile Preview"
                      />
                    ) : (
                      <div className="w-28 h-28 rounded-full border-2 border-pink-500 mx-auto flex items-center justify-center bg-gray-900">
                        <User className="text-pink-400" size={48} />
                      </div>
                    )}
                    <div className="absolute bottom-0 right-0 transform translate-x-2 translate-y-2 bg-pink-500 rounded-full p-2 border-2 border-black">
                      <Camera size={14} className="text-white" />
                    </div>
                  </div>
                  <p className="text-xs text-pink-400 mt-3">Click to change profile picture</p>
                </label>
                <input
                  onChange={handleImageUpload}
                  className="hidden"
                  type="file"
                  id="image_uploads"
                  name="image_uploads"
                  accept=".jpg, .png, .svg, .jpeg"
                />
              </div>

              {/* Full Name Input */}
              <div>
                <label htmlFor="fullName" className="text-sm font-medium text-gray-300">
                  Full Name
                </label>
                <div className="relative mt-2">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input
                    required
                    type="text"
                    name="fullName"
                    id="fullName"
                    placeholder="Enter your full name"
                    className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-pink-500 transition text-white placeholder-gray-500"
                    value={data.fullName}
                    onChange={handleInputChange}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Minimum 5 characters required</p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-pink-500 hover:bg-pink-600 transition py-3 rounded-lg font-semibold text-white flex items-center justify-center gap-2 text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                {isLoading ? (
                  "Updating..."
                ) : (
                  <>
                    Update Profile <Save size={18} />
                  </>
                )}
              </button>

              {/* Back Link */}
              <div className="text-center pt-4">
                <Link 
                  to="/user/profile" 
                  className="text-pink-400 hover:text-pink-300 font-semibold transition inline-flex items-center gap-2"
                >
                  <ArrowLeft size={16} /> Go back to profile
                </Link>
              </div>
            </form>
          </div>

          {/* Footer Text */}
          <div className="text-center mt-6">
            <p className="text-gray-500 text-sm">Your profile information is secure with us</p>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default EditProfile;