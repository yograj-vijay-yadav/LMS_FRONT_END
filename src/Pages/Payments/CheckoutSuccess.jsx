import { Link } from "react-router-dom";
import { CheckCircle, Sparkles, Award, ArrowRight } from "lucide-react";

import HomeLayout from "../../Layouts/HomeLayout";

function CheckoutSuccess() {
    return (
        <HomeLayout>
            <div 
                className="min-h-[calc(100vh-2rem)] flex items-center justify-center px-4 py-2"
                style={{
                    background: "linear-gradient(to bottom, #000000, #2a0a1a, #1a0010)"
                }}
            >
                <div className="w-full max-w-2xl">
                    {/* Success Card - Increased width to max-w-2xl */}
                    <div
                        className="rounded-2xl border border-green-500 shadow-2xl overflow-hidden"
                        style={{
                            background: "linear-gradient(to bottom, #1a0010, #3b0a2a, #000000)"
                        }}
                    >
                        {/* Header */}
                        <div className="relative bg-gradient-to-r from-green-600 to-green-500 py-8 text-center">
                            <div className="mt-3 absolute -top-5 left-1/2 transform -translate-x-1/2">
                                <div className="bg-gradient-to-r from-green-400 to-green-600 rounded-full p-3 mt-2 shadow-lg">
                                    <CheckCircle className="text-white" size={28} />
                                </div>
                            </div>
                            <h1 className="text-3xl font-bold text-white mt-6">
                                Payment Successful!
                            </h1>
                            <p className="text-green-100 text-base mt-2">
                                Thank you for your purchase
                            </p>
                        </div>

                        {/* Content */}
                        <div className="p-8 text-center">
                            {/* Success Icon */}
                            <div className="flex justify-center mb-6">
                                <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center border-2 border-green-500">
                                    <CheckCircle className="text-green-500" size={48} />
                                </div>
                            </div>

                            {/* Success Message */}
                            <div className="space-y-4 mb-8">
                                <h2 className="text-2xl font-semibold text-white">
                                    Welcome to Premium Bundle! 🎉
                                </h2>
                                <p className="text-gray-300 text-base">
                                    Your subscription has been activated successfully.
                                </p>
                                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                                    <p className="text-green-400 text-base">
                                        ✨ You now have access to all courses and premium features ✨
                                    </p>
                                </div>
                            </div>

                            {/* Benefits Preview - Row layout instead of column */}
                            <div className="border-t border-gray-800 pt-6 mt-2">
                                <div className="flex items-center justify-center gap-8">
                                    <div className="text-center">
                                        <div className="w-12 h-12 bg-pink-500/10 rounded-full flex items-center justify-center mx-auto mb-2">
                                            <Sparkles className="text-pink-400" size={20} />
                                        </div>
                                        <p className="text-gray-300 text-sm font-medium">All Courses</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="w-12 h-12 bg-pink-500/10 rounded-full flex items-center justify-center mx-auto mb-2">
                                            <Award className="text-pink-400" size={20} />
                                        </div>
                                        <p className="text-gray-300 text-sm font-medium">Certificates</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="w-12 h-12 bg-pink-500/10 rounded-full flex items-center justify-center mx-auto mb-2">
                                            <CheckCircle className="text-pink-400" size={20} />
                                        </div>
                                        <p className="text-gray-300 text-sm font-medium">Lifetime Access</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="p-6 pt-0 space-y-3">
                            <Link to="/">
                                <button className="w-full bg-green-500 hover:bg-green-600 transition-all duration-300 py-3.5 rounded-xl text-white font-semibold text-base flex items-center justify-center gap-2">
                                    Go to Dashboard
                                    <ArrowRight size={18} />
                                </button>
                            </Link>
                            
                            <Link to="/courses">
                                <button className="w-full bg-pink-500 hover:bg-pink-600 transition-all duration-300 py-3.5 mt-4 rounded-xl text-white font-semibold text-base">
                                    Start Learning Now
                                </button>
                            </Link>
                        </div>

                        {/* Footer Note */}
                        <div className="pb-6 text-center">
                            <p className="text-gray-500 text-sm">
                                📧 Receipt sent to your registered email
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}

export default CheckoutSuccess;