import { RotateCcw, XCircle } from "lucide-react";
import { Link } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";

function CheckoutFailure() {
  return (
    <HomeLayout>
      <div className="container-page flex min-h-[80vh] items-center justify-center py-14">
        <div className="anim-fade-up w-full max-w-lg text-center">
          <div className="card p-8 sm:p-10">
            <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-red-500/10">
              <XCircle className="size-9 text-red-400" aria-hidden="true" />
            </div>

            <h1 className="mt-6 text-2xl font-bold">Payment failed</h1>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              We couldn&rsquo;t process your payment. No charge has been made — you
              can safely try again.
            </p>

            <div className="mt-6 rounded-lg border border-slate-800 bg-slate-900/70 p-4 text-left">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Common reasons
              </p>
              <ul className="mt-2 space-y-1.5 text-sm text-slate-400">
                <li>• Insufficient balance in the selected payment method</li>
                <li>• Incorrect payment details entered</li>
                <li>• Temporary network issue with the bank</li>
              </ul>
            </div>

            <div className="mt-8 space-y-3">
              <Link to="/checkout" className="btn btn-primary w-full py-3">
                <RotateCcw className="size-4" aria-hidden="true" />
                Try again
              </Link>
              <Link to="/contact" className="btn btn-secondary w-full">
                Contact support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default CheckoutFailure;
