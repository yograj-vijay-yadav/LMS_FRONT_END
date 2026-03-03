import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";

function CourseDescription() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { role, data } = useSelector((state) => state.auth);
  
  return (

    <HomeLayout>
  <div className="min-h-screen pt-34 px-4 flex justify-center text-white">
    <div className="w-full max-w-6xl">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

        {/* LEFT CARD */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
          
          {/* Image */}
          <img
            src={state?.thumbnail?.secure_url}
            alt="Course thumbnail"
            className="w-full object-cover h-80 rounded-xl shadow-lg border border-pink-500"
          />

          {/* Stats */}
          <div className="flex justify-between text-sm text-slate-300">
            <p>
              <span className="text-pink-500 font-bold">
                Lectures:
              </span>{" "}
              {state?.numberOfLectures}
            </p>
            <p className="text-right text-sm text-slate-300">
              <span className="text-pink-500 font-bold ">
                Instructor:
              </span>{" "}
              {state?.createdBy}
            </p>
          </div>

          {/* CTA */}
          {role === "ADMIN" || data?.subscription?.status === "active" ? (
            <button
              onClick={() =>
                navigate("/course/displaylectures", { state: { ...state } })
              }
              className="w-full bg-pink-600 hover:bg-pink-700 transition rounded-lg py-3 text-lg font-semibold"
            >
              Watch Lectures
            </button>
          ) : (                         
            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-pink-600 hover:bg-pink-700 transition rounded-lg py-3 text-lg font-semibold"
            >
              Subscribe
            </button>
          )}
        </div>
 
        {/* RIGHT CONTENT */}
        <div className="space-y-4 max-w-xl">
          <h1 className="text-3xl font-bold text-pink-600 leading-tight">
            {state?.title}
          </h1>

          <p className="text-3xl uppercase tracking-wide  text-pink-400">
            Course Description
          </p>

          <p className="text-slate-300 text-2xl leading-relaxed">
            {state?.description}
          </p>
        </div>

      </div>
    </div>
  </div>
</HomeLayout>

  );
}

export default CourseDescription;
