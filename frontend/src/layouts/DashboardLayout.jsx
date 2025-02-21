import { Outlet } from "react-router";
import NavBar from "../components/NavBar";
import { Toaster } from "react-hot-toast";

function DashboardLayout() {
  return (
    <div className="relative bg-littleWhite min-h-screen">
      {/* Fixed Navbar */}
      <nav className="fixed shadow-md w-full top-0 left-0 z-50">
        <NavBar />
      </nav>

      {/*  Main Content Wrapper */}
      <div className="mt-14 p-3">
        <Outlet />
      </div>
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
}

export default DashboardLayout;
