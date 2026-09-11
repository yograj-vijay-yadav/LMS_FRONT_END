import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  CreditCard,
  Infinity as InfinityIcon,
  RefreshCw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import {
  getRazorPayId,
  purchaseCourseBundle,
  verifyUserPayment,
} from "../../Redux/Slices/RazorpaySlice";

const features = [
  {
    icon: BookOpen,
    text: "Access to all available courses on the platform",
  },
  {
    icon: Calendar,
    text: "Full year access — learn at your own pace",
  },
  {
    icon: Sparkles,
    text: "All existing and newly launched courses included",
  },
  {
    icon: Award,
    text: "Verified certificates upon completion",
  },
  {
    icon: InfinityIcon,
    text: "Unlimited learning across every subject",
  },
  {
    icon: ShieldCheck,
    text: "Secure payments with instant verification",
  },
];

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const razorpayKey = useSelector((state) => state?.razorpay?.key);
  const subscription_id = useSelector(
    (state) => state?.razorpay?.subscription_id
  );

  const [isInitializing, setIsInitializing] = useState(true);
  const [isPaying, setIsPaying] = useState(false);

  async function load() {
    setIsInitializing(true);
    await dispatch(getRazorPayId());
    await dispatch(purchaseCourseBundle());
    setIsInitializing(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubscription(event) {
    event.preventDefault();

    if (isPaying) return;

    if (!razorpayKey || !subscription_id) {
      toast.error("Payment couldn't start. Please retry in a moment.");
      return;
    }

    setIsPaying(true);

    const options = {
      key: razorpayKey,
      subscription_id: subscription_id,
      name: "SimpliLearn",
      description: "Premium Course Bundle Subscription",
      theme: { color: "#f43f5e" },
      modal: {
        ondismiss: () => {
          setIsPaying(false);
        },
      },
      handler: async function (response) {
        const paymentDetails = {
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          razorpay_subscription_id: response.razorpay_subscription_id,
        };

        const res = await dispatch(verifyUserPayment(paymentDetails));
        res?.payload?.success
          ? navigate("/checkout/success")
          : navigate("/checkout/fail");
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <HomeLayout>
      <div className="container-page flex min-h-[80vh] items-center justify-center py-14">
        <div className="anim-fade-up w-full max-w-md">
          <div className="card overflow-hidden p-0 shadow-xl shadow-black/20">
            {/* Header */}
            <div className="border-b border-slate-800 bg-slate-900/80 p-6 text-center">
              <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-rose-500/10 text-rose-400">
                <Sparkles className="size-5" aria-hidden="true" />
              </div>
              <h1 className="mt-4 text-2xl font-bold">Premium subscription</h1>
              <p className="mt-1.5 text-sm text-slate-400">
                Unlock the full learning catalog
              </p>
              <p className="mt-4">
                <span className="font-display text-4xl font-bold text-white">
                  ₹499
                </span>
                <span className="text-sm text-slate-500">/year</span>
              </p>
            </div>

            {/* Features */}
            <ul className="space-y-3.5 p-6">
              {features.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3 text-sm text-slate-300">
                  <Icon
                    className="mt-0.5 size-4.5 shrink-0 text-rose-400"
                    aria-hidden="true"
                  />
                  {text}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="border-t border-slate-800 p-6 pt-5">
              {isInitializing ? (
                <div className="flex flex-col items-center gap-3 py-2">
                  <span
                    className="inline-block size-6 animate-spin rounded-full border-2 border-slate-700 border-t-rose-500"
                    aria-hidden="true"
                  />
                  <p className="text-xs text-slate-500">
                    Preparing secure checkout...
                  </p>
                </div>
              ) : !razorpayKey || !subscription_id ? (
                <div className="text-center">
                  <p className="text-sm text-slate-400">
                    Checkout couldn&rsquo;t be initialized.
                  </p>
                  <button
                    type="button"
                    onClick={load}
                    className="btn btn-secondary mt-3 w-full"
                  >
                    <RefreshCw className="size-4" aria-hidden="true" />
                    Retry
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleSubscription}
                  disabled={isPaying}
                  className="btn btn-primary w-full py-3 text-base"
                  aria-busy={isPaying}
                >
                  {isPaying ? (
                    <>
                      <span
                        className="inline-block size-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                        aria-hidden="true"
                      />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="size-5" aria-hidden="true" />
                      Subscribe now
                    </>
                  )}
                </button>
              )}

              <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-slate-500">
                <CheckCircle2 className="size-3.5" aria-hidden="true" />
                Cancel anytime · Secured by Razorpay
              </p>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default Checkout;
