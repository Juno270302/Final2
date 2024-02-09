import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import icon from "../images/video-player.png";
import { UserAuth } from "../context/AuthContext";
import { Role } from "./Role";
import { Timestamp, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { IoExit } from "react-icons/io5";

const Navbar = () => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();
  const userInfo = Role();
  const [users, setUsers] = useState({});
  const [data, setData] = useState();

  // const expirationDate = new Date(data?.member_date.seconds * 1000);
  // const new_date = new Date();

  useEffect(() => {
    setUsers(userInfo);
  }, [userInfo]);

  const movieID = doc(db, "users", `${user?.uid}`);

  //get userId -> database
  useEffect(() => {
    onSnapshot(movieID, (doc) => {
      setData(doc.data());
    });
  }, [user?.uid]);

  // useEffect(() => {
  //   if (expirationDate < new_date) {
  //     console.log("het han roi");
  //     const a = updateDoc(doc(db, "users", data?.id), {
  //       member: "VIP",
  //     });
  //   }
  //   if (expirationDate > new_date) {
  //     console.log("Còn Vip");
  //   }
  // });

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center z-[100] absolute text-white w-full py-4 justify-between font-main">
      <Link to="/">
        <div className="flex items-center">
          <img className=" w-14 ml-3" src={icon} />
          <h1 className="text-[#ff99be] hover:text-[#ffffff] ml-3 font-bold text-4xl">
            Movies
          </h1>
        </div>
      </Link>
      {users?.role === "admin" ? (
        <div className="flex items-center ml-12 px-10 space-x-10 lg:hidden "></div>
      ) : (
        <div className="flex items-center ml-12 px-10 space-x-10 lg:hidden ">
          <Link to="/">
            <button className="text-[#ffffff] hover:text-[#fb9bbc] font-bold text-xl">
              Home
            </button>
          </Link>
          <Link to="movies">
            <button className="text-[#ffffff] hover:text-[#fb9bbc] font-bold text-xl">
              Movies
            </button>
          </Link>
          <Link to="crmovie">
            <button className="text-[#ffffff] hover:text-[#fb9bbc] font-bold text-xl">
              Exclusive movies
            </button>
          </Link>
          <Link to="authors">
            <button className="text-[#ffffff] hover:text-[#fb9bbc] font-bold text-xl">
              Authors
            </button>
          </Link>
          <button className="text-[#ffffff] hover:text-[#fb9bbc] font-bold text-xl">
            About Us
          </button>
        </div>
      )}
      {user?.email ? (
        <div className="flex items-center px-10">
          <Link to="/account">
            <button className="text-[#ff99be] text-lg font-bold ">
              <img src={data?.img} className="h-[50px] w-[50px] rounded-full" />
            </button>
          </Link>
          <button
            onClick={handleLogout}
            className="px-6 py-3 font-body rounded-2xl text-4xl cursor-pointer hover:text-[#f20000]"
          >
            <IoExit />
          </button>
        </div>
      ) : (
        <div className="flex items-center px-10">
          <Link to="/login">
            <button className="text-[#ff99be] pr-4 text-lg font-bold mr-4">
              Sign In
            </button>
          </Link>
          <Link to="/signup">
            <button className="bg-[#ff99be] px-6 py-3 font-bold rounded-2xl text-lg cursor-pointer">
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
