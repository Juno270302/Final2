import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { auth } from "../firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { logIn, user } = UserAuth();

  const handleSubmit = async (e) => {
    await e.preventDefault();
    try {
      const a = await logIn(email, password);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-full bg-[#212140]">
      <div className="w-full px-4 py-40">
        <div className="max-w-[450px] h-[600px] mx-auto bg-[#553E58] rounded-3xl text-white">
          <div className="max-w-[320px] mx-auto py-16">
            <div className="flex justify-between items-center">
              <h1 className="font-bold text-4xl text-white">Login</h1>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex w-full flex-col py-4 "
            >
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="p-3 my-2 bg-[#2E2439] border border-gray-300 rounded placeholder-gray-400"
                type="email"
                placeholder="Email"
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="p-3 my-2 bg-[#2E2439] border border-gray-300 rounded placeholder-gray-400"
                type="password"
                placeholder="Password"
                autoComplete="current-passowrd"
              />
              <button
                type="submit"
                className="bg-[#E0D5D5] text-[#f20000] py-3 my-6 rounded font-body "
              >
                Login
              </button>
              <p className="py-4 space-x-3">
                <span className="text-gray-300">New to Movies?</span>
                <Link
                  to="/signup"
                  className="font-bold text-xl text-[#f20000]"
                  onclick
                >
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
