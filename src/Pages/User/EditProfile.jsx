import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

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
    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("avatar", data.avatar);

    await dispatch(updateProfile([data.userId, formData]));
    await dispatch(getUserData());
    navigate("/user/profile");
  }

  return (
    <HomeLayout>
      <div className="flex items-center justify-center min-h-screen ">
        <form
          onSubmit={onFormSubmit}
          className="flex flex-col gap-6 rounded-xl p-6 text-white w-full max-w-md shadow-lg border border-pink-500 backdrop-blur-sm relative"
        >
          <h1 className="text-center text-3xl font-bold text-pink-400">
            Edit Profile
          </h1>

          {/* Avatar Upload */} 
          <label
            className="cursor-pointer flex justify-center"
            htmlFor="image_uploads"
          >
            {data.previewImage ? (
              <img
                className="w-28 h-28 rounded-full border-2 border-pink-400 shadow-md"
                src={data.previewImage}
                alt="Preview"
              />
            ) : (
              <BsPersonCircle className="w-28 h-28 text-gray-400" />
            )}
          </label>
          <input
            onChange={handleImageUpload}
            className="hidden"
            type="file"
            id="image_uploads"
            name="image_uploads"
            accept=".jpg, .png, .svg, .jpeg"
          />

          {/* Full Name Input */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="fullName"
              className="text-lg font-semibold text-gray-300"
            >
              Full Name
            </label>
            <input
              required
              type="text"
              name="fullName"
              id="fullName"
              placeholder="Enter your name"
              className="bg-gray-700 px-3 py-2 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-400"
              value={data.fullName}
              onChange={handleInputChange}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 transition-all ease-in-out duration-300 rounded-md py-2 text-lg font-semibold shadow-md"
          >
            Update Profile
          </button>

          {/* Back Link */}
          <Link to="/user/profile" className="text-center">
            <p className="text-pink-400 hover:text-pink-300 flex items-center justify-center gap-2 transition-colors">
              <AiOutlineArrowLeft /> Go back to profile
            </p>
          </Link>
        </form>
      </div>
    </HomeLayout>
  );
}

export default EditProfile;
