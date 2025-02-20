import { BrowserRouter, Routes, Route } from "react-router";
import DashboardLayout from "../layouts/DashboardLayout";
import Home from "../pages/Dashboard/sections/Home";
import AuthLayout from "../layouts/AuthLayout";
import SignUp from "../pages/Authentication/SignUp";
import SignIn from "../pages/Authentication/SignIn";
import PrivetRoute from "../routes/PrivetRoute";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* authentication step first */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="signin" element={<SignIn />} />
          <Route path="signUp" element={<SignUp />} />
        </Route>
        <Route element={<PrivetRoute />}>
          <Route path="/" element={<DashboardLayout />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
