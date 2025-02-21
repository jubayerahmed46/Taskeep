import { FaGoogle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import ToastMessage from "../../components/ToastMessage";
import axios from "axios";
import { useNavigate } from "react-router";

function GoogleLogin({ label }) {
  const { googleLogin } = useAuth();
  const navigate = useNavigate();
  const handleGoogleLogin = () => {
    googleLogin()
      .then(async ({ user }) => {
        const userInfo = {
          userId: user.uid,
          email: user.email,
          displayName: user.displayName,
        };

        await axios.post(`${import.meta.env.VITE_apiUrl}/api/users`, userInfo);

        navigate("/");
        ToastMessage("✅ Sign In Successfully!");
      })
      .catch((err) => console.log(err));
  };
  return (
    <button
      onClick={handleGoogleLogin}
      className="flex  gap-2 text-center justify-center  items-center bg-littleBlack/10 font-semibold w-full  py-2 rounded-md"
    >
      <FaGoogle /> {label}
    </button>
  );
}

export default GoogleLogin;
