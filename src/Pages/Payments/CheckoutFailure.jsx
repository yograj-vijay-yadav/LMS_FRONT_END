import { Link } from "react-router-dom";
import { XCircle, AlertCircle, ArrowLeft } from "lucide-react";

import HomeLayout from "../../Layouts/HomeLayout";

function CheckoutFailure() {
    return (
        <HomeLayout>
            <div 
                className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 "
                style={{
                    background: "linear-gradient(to bottom, #000000, #2a0a1a, #1a0010)"
                }}
            >
                <div className="w-full max-w-2xl">
                    {/* Failure Card - Increased width from max-w-md to max-w-2xl */}
                    <div
                        className="rounded-2xl border border-red-500 shadow-2xl overflow-hidden"
                        style={{
                            background: "linear-gradient(to bottom, #1a0010, #3b0a2a, #000000)"
                        }}
                    >
                        {/* Header - Increased padding */}
                        <div className="relative bg-gradient-to-r from-red-600 to-red-500 py-8 text-center">
                            <div className="mt-6 absolute -top-5 left-1/2 transform -translate-x-1/2">
                                <div className="bg-gradient-to-r from-red-400 to-red-600 rounded-full p-3 shadow-lg">
                                    <XCircle className="text-white" size={28} />
                                </div>
                            </div>
                            <h1 className="text-3xl font-bold text-white mt-6">
                                Payment Failed!
                            </h1>
                            <p className="text-red-100 text-base mt-2">
                                Something went wrong
                            </p>
                        </div>

                        {/* Content - Increased padding */}
                        <div className="p-8 text-center">
                            {/* Error Icon - Larger */}
                            <div className="flex justify-center mb-6">
                                <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center border-2 border-red-500">
                                    <AlertCircle className="text-red-500" size={48} />
                                </div>
                            </div>

                            {/* Error Message - Larger text */}
                            <div className="space-y-4 mb-8">
                                <h2 className="text-2xl font-semibold text-white">
                                    Oops! Your payment failed
                                </h2>
                                <p className="text-gray-300 text-base">
                                    We couldn't process your payment at this moment.
                                </p>
                                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mt-4">
                                    <p className="text-red-400 text-sm">
                                        Possible reasons: Insufficient balance, incorrect details, or network issue
                                    </p>
                                </div>
                            </div>

                            {/* Help Text - Better spacing */}
                            <div className="border-t border-gray-800 pt-6 mt-4">
                                <p className="text-gray-400 text-base">
                                    Didn't receive any charge? Don't worry
                                </p>
                                <p className="text-gray-500 text-sm mt-1">
                                    Your account hasn't been debited
                                </p>
                            </div>
                        </div>

                        {/* Action Buttons - Larger buttons */}
                        <div className="p-6 pt-0 space-y-3">
                            <Link to="/checkout">
                                <button className="w-full bg-red-500 hover:bg-red-600 transition-all duration-300 py-3.5 rounded-xl text-white font-semibold text-base flex items-center justify-center gap-2">
                                    <ArrowLeft size={18} />
                                    Try Again
                                </button>
                            </Link>
                            
                            <Link to="/">
                                <button className="w-full bg-gray-800 hover:bg-gray-700 transition-all duration-300 py-3.5 rounded-xl text-gray-300 font-semibold text-base mt-4">
                                    Go to Home
                                </button>
                            </Link>
                        </div>

                        {/* Footer Note */}
                        <div className="pb-6 text-center">
                            <p className="text-gray-500 text-sm">
                                Need help? Contact our support team
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}

export default CheckoutFailure;