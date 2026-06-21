import { useNavigate, Link } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();
    return (
        <main className="h-screen w-full flex flex-col justify-center items-center bg-black text-center relative">
            <div className="relative inline-block">
                <h1
                    className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-fuchsia-400 to-white tracking-widest"
                    style={{ textShadow: "0 0 40px rgba(236,72,153,0.4), 0 0 80px rgba(236,72,153,0.2)" }}
                >
                    404
                </h1>
                <div className="bg-gradient-to-r from-pink-600 to-fuchsia-500 text-white px-3 py-1 text-sm font-semibold rounded-full rotate-12 absolute -top-5 -right-5 shadow-lg shadow-pink-500/50">
                    Page not found
                </div>
            </div>

            <p className="text-gray-300 text-lg mt-4 mb-8 tracking-wide">
                The page you're looking for doesn’t exist.
                
            </p>

            <div className="flex gap-5">
                <button
                    onClick={() => navigate(-1)}
                    className="group relative px-8 py-3 border border-pink-500 text-pink-400 rounded-lg hover:bg-pink-500/10 transition-all duration-300 hover:scale-105 active:scale-95"
                >
                    ← Go back
                </button>
                <Link
                    to="/"
                    className="group relative px-8 py-3 bg-gradient-to-r from-pink-600 to-fuchsia-500 text-white rounded-lg font-medium shadow-lg shadow-pink-500/30 hover:shadow-xl hover:shadow-pink-500/40 hover:scale-105 active:scale-95 transition-all duration-300"
                >
                    Go home →
                </Link>
            </div>

            {/* Decorative background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl pointer-events-none"></div>
        </main>
    );
}

export default NotFound;