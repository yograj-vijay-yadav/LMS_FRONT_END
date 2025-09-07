import { Link, useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();
  return (
    <div className="h-screen  w-full flex flex-col justify-center items-center bg-[#1A2238] text-center">
      <h1 className="text-9xl font-extrabold text-white drop-shadow-lg tracking-widest ">404</h1>
      <p className="absolute text-2xl font-medium text-red-800 mt-4 bg-black rotate-12 ">Page Not Found....</p>
      <Link
        to="/"
        className="mt-6 px-6 py-2 bg-yellow-400 text-[#1A2238] font-semibold rounded-lg 
                   shadow-lg shadow-yellow-500/30 hover:shadow-yellow-500/50 transition"
        >
        <span onClick={()=>navigate(-1)}>Go Back</span>
      </Link>
    </div>
  );
}

export default NotFound;
