import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

/**
 * Shared app shell: fixed top navigation, page content, and footer.
 * Every page renders inside this layout for consistent spacing/navigation.
 */
function HomeLayout({ children }) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-slate-950">
      <Navbar />
      {/* pt-16 offsets the fixed navbar height */}
      <main className="flex-grow pt-16">{children}</main>
      <Footer />
    </div>
  );
}

export default HomeLayout;
