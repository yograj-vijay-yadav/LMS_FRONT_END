import { ArrowRight, BookOpen, CheckCircle2, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";

function CheckoutSuccess() {
  return (
    <HomeLayout>
      <div className="container-page flex min-h-[80vh] items-center justify-center py-14">
        <div className="anim-fade-up w-full max-w-lg text-center">
          <div className="card p-8 sm:p-10">
            <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-500/10">
              <CheckCircle2 className="size-9 text-emerald-400" aria-hidden="true" />
            </div>

            <h1 className="mt-6 text-2xl font-bold">Payment successful!</h1>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              Your subscription has been activated. You now have full access to
              every course on the platform.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-3 border-y border-slate-800 py-6">
              <div className="flex flex-col items-center gap-2">
                <div className="flex size-10 items-center justify-center rounded-lg bg-rose-500/10 text-rose-400">
                  <BookOpen className="size-4.5" aria-hidden="true" />
                </div>
                <p className="text-xs font-medium text-slate-300">All courses</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="flex size-10 items-center justify-center rounded-lg bg-rose-500/10 text-rose-400">
                  <GraduationCap className="size-4.5" aria-hidden="true" />
                </div>
                <p className="text-xs font-medium text-slate-300">Certificates</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="flex size-10 items-center justify-center rounded-lg bg-rose-500/10 text-rose-400">
                  <CheckCircle2 className="size-4.5" aria-hidden="true" />
                </div>
                <p className="text-xs font-medium text-slate-300">Full access</p>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <Link to="/courses" className="btn btn-primary w-full py-3">
                Start learning
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link to="/user/profile" className="btn btn-secondary w-full">
                View my profile
              </Link>
            </div>
          </div>

          <p className="mt-6 text-xs text-slate-500">
            A receipt has been sent to your registered email.
          </p>
        </div>
      </div>
    </HomeLayout>
  );
}

export default CheckoutSuccess;
