import { useNavigate, Link } from "react-router-dom";

function Denied() {
    const navigate = useNavigate();
    return (
        <main className="h-screen w-full flex flex-col justify-center items-center bg-black">
            <div className="relative inline-block">
                <h1 
                    className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-400 to-purple-400 tracking-widest"
                    style={{ textShadow: "0 0 40px rgba(236,72,153,0.3), 0 0 80px rgba(236,72,153,0.1)" }}
                >
                    403
                </h1>
                <div className="bg-gradient-to-r from-red-600 to-pink-500 text-white px-3 py-1 text-sm font-semibold rounded-full rotate-12 absolute -top-5 -right-5 shadow-lg shadow-pink-500/50">
                    Access denied
                </div>
            </div>

            <p className="text-gray-400 text-lg mt-4 mb-8 tracking-wide">
                You don't have permission to view this page.
            </p>

            <div className="flex gap-5">
                <button 
                    onClick={() => navigate(-1)}
                    className="group relative px-8 py-3 border border-gray-500 text-gray-300 rounded-lg hover:bg-white/10 transition-all duration-300 hover:scale-105 active:scale-95"
                >
                    ← Go back
                </button>
                <Link 
                    to="/"
                    className="group relative px-8 py-3 bg-gradient-to-r from-red-600 to-pink-500 text-white rounded-lg font-medium shadow-lg shadow-pink-500/30 hover:shadow-xl hover:shadow-pink-500/40 hover:scale-105 active:scale-95 transition-all duration-300"
                >
                    Go home →
                </Link>
            </div>

            {/* Decorative background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none"></div>
        </main>
    );
}

export default Denied;