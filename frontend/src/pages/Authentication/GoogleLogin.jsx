import { FaGoogle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import ToastMessage from "../../components/ToastMessage";

function GoogleLogin({ label }) {
  const { googleLogin } = useAuth();
  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
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
