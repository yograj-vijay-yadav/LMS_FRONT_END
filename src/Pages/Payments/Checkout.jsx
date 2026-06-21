import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CreditCard, Calendar, Shield, CheckCircle, Sparkles, BookOpen, Award, Infinity } from "lucide-react";

import HomeLayout from '../../Layouts/HomeLayout';
import { getRazorPayId, purchaseCourseBundle, verifyUserPayment } from "../../Redux/Slices/RazorpaySlice";

function Checkout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const razorpayKey = useSelector((state) => state?.razorpay?.key);
    const subscription_id = useSelector((state) => state?.razorpay?.subscription_id);
    
    const paymentDetails = {
        razorpay_payment_id: "",
        razorpay_subscription_id: "",
        razorpay_signature: ""
    }

    async function handleSubscription(e) {
        e.preventDefault();
        
        if (!razorpayKey || !subscription_id) {
            toast.error("Something went wrong. Please try again.");
            return;
        }
        
        const options = {
            key: razorpayKey,
            subscription_id: subscription_id,
            name: "LMS Platform",
            description: "Premium Course Bundle Subscription",
            theme: {
                color: '#EC4899'
            },
            handler: async function (response) {
                paymentDetails.razorpay_payment_id = response.razorpay_payment_id;
                paymentDetails.razorpay_signature = response.razorpay_signature;
                paymentDetails.razorpay_subscription_id = response.razorpay_subscription_id;

                toast.success("Payment successful!");
                const res = await dispatch(verifyUserPayment(paymentDetails));
                res?.payload?.success ? navigate("/checkout/success") : navigate("/checkout/fail");
            }
        }
        
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    async function load() {
        await dispatch(getRazorPayId());
        await dispatch(purchaseCourseBundle());
    }

    useEffect(() => {
        load();
    }, []);

    return (
        <HomeLayout>
            <div 
                className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12"
                style={{
                    background: "linear-gradient(to bottom, #000000, #2a0a1a, #1a0010)"
                }}
            >
                <div className="w-full max-w-md">
                    {/* Subscription Card */}
                    <div
                        className="rounded-2xl border border-pink-500 shadow-2xl overflow-hidden"
                        style={{
                            background: "linear-gradient(to bottom, #1a0010, #3b0a2a, #000000)"
                        }}
                    >
                        {/* Header */}
                        <div className="relative bg-gradient-to-r from-pink-600 to-pink-500 py-8 text-center">
                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                <div className="bg-gradient-to-r from-pink-400 to-pink-600 rounded-full p-2 shadow-lg">
                                    <Sparkles className="text-white" size={24} />
                                </div>
                            </div>
                            <h1 className="text-2xl font-bold text-white mt-2">
                                Premium Subscription
                            </h1>
                            <p className="text-pink-100 text-sm mt-1">
                                Unlock unlimited learning potential
                            </p>
                        </div>

                        {/* Features List */}
                        <div className="p-6 space-y-4">
                            <div className="flex items-start gap-3">
                                <CheckCircle className="text-pink-400 flex-shrink-0 mt-0.5" size={18} />
                                <p className="text-gray-300 text-sm">
                                    Access to <span className="text-white font-semibold">all available courses</span> on our platform
                                </p>
                            </div>
                            <div className="flex items-start gap-3">
                                <Calendar className="text-pink-400 flex-shrink-0 mt-0.5" size={18} />
                                <p className="text-gray-300 text-sm">
                                    <span className="text-white font-semibold">Full year access</span> - Learn at your own pace
                                </p>
                            </div>
                            <div className="flex items-start gap-3">
                                <BookOpen className="text-pink-400 flex-shrink-0 mt-0.5" size={18} />
                                <p className="text-gray-300 text-sm">
                                    All existing and <span className="text-white font-semibold">newly launched courses</span> included
                                </p>
                            </div>
                            <div className="flex items-start gap-3">
                                <Award className="text-pink-400 flex-shrink-0 mt-0.5" size={18} />
                                <p className="text-gray-300 text-sm">
                                    Earn <span className="text-white font-semibold">verified certificates</span> upon completion
                                </p>
                            </div>
                            <div className="flex items-start gap-3">
                                <Infinity className="text-pink-400 flex-shrink-0 mt-0.5" size={18} />
                                <p className="text-gray-300 text-sm">
                                    <span className="text-white font-semibold">Unlimited downloads</span> - Learn offline
                                </p>
                            </div>
                            <div className="flex items-start gap-3">
                                <Shield className="text-pink-400 flex-shrink-0 mt-0.5" size={18} />
                                <p className="text-gray-300 text-sm">
                                    <span className="text-white font-semibold">Risk-free</span> with money-back guarantee
                                </p>
                            </div>
                        </div>

                        {/* Terms */}
                        <div className="px-6 pb-4 text-center">
                            <p className="text-gray-500 text-xs">
                                Cancel anytime • Terms and conditions applied
                            </p>
                        </div>

                        {/* Subscribe Button */}
                        <button
                            onClick={handleSubscription}
                            className="w-full bg-pink-500 hover:bg-pink-600 transition-all duration-300 py-3.5 text-white font-bold text-lg flex items-center justify-center gap-2"
                        >
                            <CreditCard size={20} />
                            Subscribe Now
                        </button>
                    </div>

                    {/* Footer Note */}
                    <div className="text-center mt-6">
                        <p className="text-gray-500 text-xs">
                            Secure payment powered by Razorpay
                        </p>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}

export default Checkout;