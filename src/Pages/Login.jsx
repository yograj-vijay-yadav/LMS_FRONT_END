import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, Eye, EyeOff } from 'lucide-react';

import HomeLayout from '../Layouts/HomeLayout';
import { login } from '../Redux/Slices/AuthSlice';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    function handleUserInput(e) {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        });
    }

    async function onLogin(event) {
        event.preventDefault();
        if (!loginData.email || !loginData.password) {
            toast.error("Please fill all the details");
            return;
        }

        setIsLoading(true);
        const response = await dispatch(login(loginData));
        setIsLoading(false);

        if (response?.payload?.success) {
            toast.success("Login successful!");
            navigate("/");
        }

        setLoginData({
            email: "",
            password: "",
        });
    }

    return (
        <HomeLayout>
            <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12"
                style={{
                    background: "linear-gradient(to bottom, #000000, #2a0a1a, #1a0010)"
                }}
            >
                <div className="w-full max-w-md">
                    {/* Login Card - Same style as Contact page */}
                    <div 
                        className="rounded-2xl border border-pink-500 px-8 py-10 shadow-2xl"
                        style={{
                            background: "linear-gradient(to bottom, #1a0010, #3b0a2a, #000000)"
                        }}
                    >
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 border border-pink-500 rounded-full mb-4">
                                <LogIn className="text-pink-400" size={28} />
                            </div>
                            <h2 className="bg-gradient-to-r from-pink-400 via-pink-500 to-pink-700 bg-clip-text text-transparent text-4xl font-bold">
                                Welcome Back!
                            </h2>
                            <p className="text-gray-400 mt-2">Login to your account</p>
                        </div>

                        {/* Form */}
                        <form onSubmit={onLogin} className="space-y-5">
                            {/* Email Field */}
                            <div>
                                <label className="text-lg font-medium text-gray-300">
                                    Email
                                </label>
                                <div className="relative mt-2">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                    <input
                                        type="email"
                                        name="email"
                                        value={loginData.email}
                                        onChange={handleUserInput}
                                        placeholder="Enter your email"
                                        className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-pink-500 transition text-white placeholder-gray-500"
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div>
                                <label className="text-lg font-medium text-gray-300">
                                    Password
                                </label>
                                <div className="relative mt-2">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={loginData.password}
                                        onChange={handleUserInput}
                                        placeholder="Enter your password"
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
                            </div>

                            {/* Forgot Password */}
                            <div className="text-right">
                                <Link to="/forgot-password" className="text-sm text-pink-400 hover:text-pink-300 transition">
                                    Forgot Password?
                                </Link>
                            </div>

                            {/* Login Button - Same as Contact page submit button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-pink-500 hover:bg-pink-600 transition py-3 rounded-lg font-semibold text-white flex items-center justify-center gap-2 text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    "Logging in..."
                                ) : (
                                    <>
                                        Login <LogIn size={18} />
                                    </>
                                )}
                            </button>

                            {/* Signup Link */}
                            <div className="text-center pt-4">
                                <p className="text-gray-400">
                                    Don't have an account?{' '}
                                    <Link to="/signup" className="text-pink-400 hover:text-pink-300 font-semibold transition">
                                        Sign up
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>

                    {/* Footer Text */}
                    <div className="text-center mt-6">
                        <p className="text-gray-500 text-sm">Secure login powered by industry-standard encryption</p>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}

export default Login;