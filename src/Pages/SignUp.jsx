import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, UserPlus, Eye, EyeOff } from 'lucide-react';

import HomeLayout from '../Layouts/HomeLayout';
import { createAccount } from '../Redux/Slices/AuthSlice';
import { isEmail, isValidPassword } from '../Helpers/regexMatcher';

function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [previewImage, setPreviewImage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [signupData, setSignupData] = useState({
        fullName: "",
        email: "",
        password: "",
        avatar: ""
    });

    function handleUserInput(e) {
        const { name, value } = e.target;
        setSignupData({
            ...signupData,
            [name]: value
        });
    }

    function getImage(event) {
        const uploadedImage = event.target.files[0];

        if (uploadedImage) {
            setSignupData({
                ...signupData,
                avatar: uploadedImage
            });
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load", function () {
                setPreviewImage(this.result);
            });
        }
    }

    async function createNewAccount(event) {
        event.preventDefault();

        if (!signupData.email || !signupData.password || !signupData.fullName || !signupData.avatar) {
            toast.error("Please fill all the details");
            return;
        }

        if (signupData.fullName.length < 5) {
            toast.error("Name should be at least 5 characters");
            return;
        }

        if (!isEmail(signupData.email)) {
            toast.error("Invalid email id");
            return;
        }

        if (!isValidPassword(signupData.password)) {
            toast.error("Password should be 6-16 characters with at least one number and special character");
            return;
        }

        setIsLoading(true);

        const formData = new FormData();
        formData.append("fullName", signupData.fullName);
        formData.append("email", signupData.email);
        formData.append("password", signupData.password);
        formData.append("avatar", signupData.avatar);

        const response = await dispatch(createAccount(formData));
        setIsLoading(false);

        if (response?.payload?.success) {
            toast.success("Account created successfully!");
            navigate("/");
        }

        setSignupData({
            fullName: "",
            email: "",
            password: "",
            avatar: ""
        });
        setPreviewImage("");
    }

    return (
        <HomeLayout>
            <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12"
                style={{
                    background: "linear-gradient(to bottom, #000000, #2a0a1a, #1a0010)"
                }}
            >
                <div className="w-full max-w-md">
                    {/* Signup Card */}
                    <div
                        className="rounded-2xl border border-pink-500 px-8 py-10 shadow-2xl"
                        style={{
                            background: "linear-gradient(to bottom, #1a0010, #3b0a2a, #000000)"
                        }}
                    >
                        {/* Header */}
                        <div className="text-center mb-8">
                            {/* Avatar Upload */}
                            <label htmlFor="image_uploads" className="cursor-pointer inline-block">
                                <div className="inline-flex items-center justify-center w-24 h-24 border-2 border-pink-500 rounded-full mb-4 hover:border-pink-400 transition-all duration-300 overflow-hidden">
                                    {previewImage ? (
                                        <img className="w-full h-full object-cover" src={previewImage} alt="Avatar" />
                                    ) : (
                                        <User className="text-pink-400" size={48} />
                                    )}
                                </div>
                                <p className="text-xs text-pink-400 mt-1">Click to upload avatar</p>
                            </label>
                            <input
                                onChange={getImage}
                                className="hidden"
                                type="file"
                                name="image_uploads"
                                id="image_uploads"
                                accept=".jpg, .jpeg, .png, .svg"
                            />

                            <h2 className="bg-gradient-to-r from-pink-400 via-pink-500 to-pink-700 bg-clip-text text-transparent text-3xl font-bold mt-4">
                                Create Account
                            </h2>
                            <p className="text-gray-400 mt-2">Join our learning platform</p>
                        </div>

                        {/* Form */}
                        <form onSubmit={createNewAccount} className="space-y-4">
                            {/* Full Name Field */}
                            <div>
                                <label className="text-sm font-medium text-gray-300">
                                    Full Name
                                </label>
                                <div className="relative mt-2">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={signupData.fullName}
                                        onChange={handleUserInput}
                                        placeholder="Enter your full name"
                                        className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-pink-500 transition text-white placeholder-gray-500"
                                    />
                                </div>
                            </div>

                            {/* Email Field */}
                            <div>
                                <label className="text-sm font-medium text-gray-300">
                                    Email
                                </label>
                                <div className="relative mt-2">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                    <input
                                        type="email"
                                        name="email"
                                        value={signupData.email}
                                        onChange={handleUserInput}
                                        placeholder="Enter your email"
                                        className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-pink-500 transition text-white placeholder-gray-500"
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div>
                                <label className="text-sm font-medium text-gray-300">
                                    Password
                                </label>
                                <div className="relative mt-2">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={signupData.password}
                                        onChange={handleUserInput}
                                        placeholder="Create a password"
                                        className="w-full pl-10 pr-12 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-pink-500 transition text-white placeholder-gray-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-pink-400 transition"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                    Password must be 6-16 characters with at least one number and special character
                                </p>
                            </div>

                            {/* Signup Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-pink-500 hover:bg-pink-600 transition py-3 rounded-lg font-semibold text-white flex items-center justify-center gap-2 text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                            >
                                {isLoading ? (
                                    "Creating account..."
                                ) : (
                                    <>
                                        Create Account <UserPlus size={18} />
                                    </>
                                )}
                            </button>

                            {/* Login Link */}
                            <div className="text-center pt-4">
                                <p className="text-gray-400">
                                    Already have an account?{' '}
                                    <Link to="/login" className="text-pink-400 hover:text-pink-300 font-semibold transition">
                                        Login
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>

                    {/* Footer Text */}
                    <div className="text-center mt-6">
                        <p className="text-gray-500 text-sm">By signing up, you agree to our Terms of Service</p>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}

export default Signup;