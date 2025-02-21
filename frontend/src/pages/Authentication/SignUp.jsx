import { HiOutlineLogin } from "react-icons/hi";
import Input from "../../components/Input";
import Divider from "../../components/Divider";
import GoogleLogin from "./GoogleLogin";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { updateProfile } from "firebase/auth";
import ToastMessage from "../../components/ToastMessage";
import { FaArrowsSpin } from "react-icons/fa6";
import { Link, useNavigate } from "react-router";
import axios from "axios";

function SignUp() {
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const { signUpWithEmailAndPassword } = useAuth();
  const [firebaseErr, setFirebaseErr] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (userCredential) => {
    userCredential.preventDefault();

    const form = userCredential.target;
    const fullName = form.fullName.value;
    const email = form.email.value;
    const password = form.password.value;

    setErr("");
    if (password.length < 6) {
      return setErr("Password At Least 6 Character!");
    }
    setLoading(true);
    setFirebaseErr("");
    try {
      await signUpWithEmailAndPassword(email, password)
        .then(async ({ user }) => {
          await updateProfile(user, { displayName: user.fullName });

          const userInfo = {
            userId: user.uid,
            email: email,
            displayName: fullName,
          };

          await axios.post(
            `${import.meta.env.VITE_apiUrl}/api/users`,
            userInfo
          );
        })
        .catch((err) => console.log(err));

      navigate("/");

      ToastMessage("✅ Sign Up Successfully!");
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
          Please sing up or sign in below
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Input
            label="Name"
            type="text"
            name="fullName"
            placeholder="John Doe"
          />
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
          >
            {err}{" "}
          </Input>
        </div>
        <button className="block  w-full bg-littleBlack text-white rounded-md mt-3 py-2 hover:bg-littleBlack/80">
          {loading ? (
            <span className="animate-spin flex justify-center ">
              <FaArrowsSpin className="*:text-white text-center" size={22} />
            </span>
          ) : (
            "Sign Up"
          )}
        </button>
      </form>
      <div className="mt-2 text-center">
        <p>
          Already have an account?{" "}
          <Link to={"/auth/signin"}>
            <span className="underline text-blue-600">SignIn</span>
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

export default SignUp;
