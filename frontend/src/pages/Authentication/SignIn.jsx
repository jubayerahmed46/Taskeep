import { HiOutlineLogin } from "react-icons/hi";
import Input from "../../components/Input";
import Divider from "../../components/Divider";
import GoogleLogin from "./GoogleLogin";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import ToastMessage from "../../components/ToastMessage";
import { FaArrowsSpin } from "react-icons/fa6";
import { Link, useNavigate } from "react-router";
import axios from "axios";

function SignIn() {
  const [loading, setLoading] = useState(false);
  const { signInWithEmailAndPass } = useAuth();
  const [firebaseErr, setFirebaseErr] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (userCredential) => {
    userCredential.preventDefault();

    const form = userCredential.target;
    const email = form.email.value;
    const password = form.password.value;

    setLoading(true);
    setFirebaseErr("");
    try {
      await signInWithEmailAndPass(email, password).then(async ({ user }) => {
        const userInfo = {
          userId: user.uid,
          email: email,
          displayName: email.split("@")[0],
        };

        await axios.post(`${import.meta.env.VITE_apiUrl}/api/users`, userInfo);
      });

      navigate("/");
      ToastMessage("✅ Sign In Successfully!");
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          setFirebaseErr("The email address is already in use!");
          break;
        case "auth/invalid-credential":
          setFirebaseErr("The credetial is invalid.");
          break;
        case "auth/weak-password":
          setFirebaseErr("The password is too weak.");
          break;
        default:
          setFirebaseErr("An error occurred: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="">
        <button className="mb-3 cursor-auto bg-gray-100  p-2 rounded-full text-4xl">
          <HiOutlineLogin className="opacity-50" />
        </button>
      </div>
      <div>
        <h2 className="text-3xl font-medium">Welcome To Taskeep</h2>
        <p className="text-littleBlack text-lg my-1 mb-6">
          Please sing In your account
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="john@email.com"
          >
            {firebaseErr}{" "}
          </Input>{" "}
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="password"
          ></Input>
        </div>
        <button className="block  w-full bg-littleBlack text-white rounded-md mt-3 py-2 hover:bg-littleBlack/80">
          {loading ? (
            <span className="animate-spin flex justify-center ">
              <FaArrowsSpin className="*:text-white text-center" size={22} />
            </span>
          ) : (
            "Sign In"
          )}
        </button>
      </form>
      <div className="mt-2 text-center">
        <p>
          New Here?
          <Link to={"/auth/signup"}>
            <span className="underline text-blue-600"> Create New Account</span>
          </Link>{" "}
        </p>
      </div>
      <Divider />
      {/* google signin */}
      <div>
        <GoogleLogin label="Sign in With Email" />
      </div>
    </div>
  );
}

export default SignIn;
