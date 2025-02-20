import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router";

function AuthLayout() {
  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center overflow-hidden py-3 px-2">
      <div className="bg-white p-5 rounded-xl shadow-md  md:w-auto w-full">
        <Outlet />
      </div>
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
}

export default AuthLayout;
