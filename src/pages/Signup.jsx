import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { signUp } = UserAuth();
  const navigate = useNavigate();

  const handleSuccess = () => {
    MySwal.fire({
      icon: "success",
      title: "Register Successful",
      timer: 2000,
    });
  };

  const handleSubmit = async (e) => {
    await e.preventDefault();
    try {
      const check = await signUp(email, password, name);
      handleSuccess();
      const interval = setInterval(() => {
        navigate('/')
      }, 2000);

      return () => clearInterval(interval);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-full bg-[#212140]">
      <div className="w-full px-4 py-40">
        <div className="max-w-[450px] h-[600px] mx-auto bg-[#553E58] rounded-3xl text-white">
          <div className="max-w-[320px] mx-auto py-16">
            <h1 className="font-bold text-4xl text-white">Sign Up</h1>
            <form
              onSubmit={handleSubmit}
              className="flex w-full flex-col py-4 "
            >
              <input
                onChange={(e) => setName(e.target.value)}
                className="p-3 my-2 bg-[#2E2439] rounded placeholder-gray-400"
                type="text"
                placeholder="Username"
              />
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="p-3 my-2 bg-[#2E2439] rounded placeholder-gray-400"
                type="email"
                placeholder="Email"
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="p-3 my-2 bg-[#2E2439] rounded placeholder-gray-400"
                type="password"
                placeholder="Password"
                autoComplete="current-passowrd"
              />
              <button
                type="submit"
                className="bg-[#E0D5D5] text-[#f20000] py-3 my-6 rounded font-bold "
              >
                Sign Up
              </button>
              <p className="py-4">
                <span className="text-gray-300">
                  Already subscribed to Movies?
                </span>
                <Link to="/login" className="font-bold text-xl text-[#f20000]">
                  {" "}
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
