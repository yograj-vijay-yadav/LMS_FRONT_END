import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";


function HomeLayout({ children }) {
  return (
    <div className="min-h-screen w-full bg-black">  
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}

export default HomeLayout;









      //  <li><Link to="/">Home</Link></li>
      //       <li><Link to="/admin/dashboard">Admin Dashboard</Link></li>
      //       <li> {isLoggedIn && role === "ADMIN" && (
      //         <Link to="/course/create"> Create new course</Link>
      //       )}</li>
      //       <li><Link to="/courses">All Courses</Link></li>
      //       <li><Link to="/contact">Contact Us</Link></li>
      //       <li><Link to="/about">About Us</Link></li>