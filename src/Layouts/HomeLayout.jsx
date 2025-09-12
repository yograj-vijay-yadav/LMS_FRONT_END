import { AiFillCloseCircle } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/Slices/AuthSlice";
//import  logout  from "../redux/slices/authSlice"; // ✅ import your logout


function HomeLayout({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  const role = useSelector((state) => state?.auth?.role);

  async function handleLogout(e) {
    e.preventDefault();
    const result = await dispatch(logout());
    if (result?.payload?.success) navigate("/");
  }

  return (
    <div data-theme="cupcake" className="min-h-screen flex flex-col">
      {/* Drawer Navigation */}
      <div className="drawer absolute left-0 z-50 w-full">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content">
          <label htmlFor="my-drawer" className="cursor-pointer">
            <FiMenu size={32} className="text-white m-4" />
          </label>
        </div>

        <div className="drawer-side">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-64 sm:w-80 h-full bg-base-200 text-base-content relative">
            {/* Close button */}
            <li className="absolute right-2 z-50">
              <label htmlFor="my-drawer" className="cursor-pointer">
                <AiFillCloseCircle size={24} />
              </label>
            </li>

            {/* Navigation links */}
            <li><Link to="/">Home</Link></li>
            {isLoggedIn && role === "ADMIN" && (
              <li><Link to="/admin/dashboard">Admin Dashboard</Link></li>
            )}
            <li><Link to="/courses">Courses</Link></li>
            <li><Link to="/articles">Articles</Link></li>
            <li><Link to="/about">About Us</Link></li>

            {/* Auth buttons pinned bottom */}
            <li className="absolute bottom-4 w-full">
              <div className="flex items-center justify-center gap-4 mr-6">
                {!isLoggedIn ? (
                  <>
                    <Link to="/login" className="btn btn-primary flex-1">
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="btn btn-secondary flex-1 hover:bg-pink-400"
                    >
                      Signup
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/user/profile" className="btn btn-primary flex-1">
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="btn btn-secondary flex-1"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default HomeLayout;
