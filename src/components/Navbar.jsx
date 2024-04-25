import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import icon from "../images/video-player.png";
import { UserAuth } from "../context/AuthContext";
import { Role } from "./Role";
import { Timestamp, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { IoExit } from "react-icons/io5";
import { MdMenu } from "react-icons/md";

const Navbar = () => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();
  const userInfo = Role();
  const [users, setUsers] = useState({});
  const [data, setData] = useState();
  const [menu, setMenu] = useState(true);

  console.log(data);

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
      setMenu(true);
      await logOut();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      {menu === true ? (
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
            <div>
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
                    Exclusive movie
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
              {user?.email ? (
                <div className="hidden  items-center px-10 text-[45px] text-[#E68AAB] lg:block">
                  <button onClick={() => setMenu(!menu)}>
                    <MdMenu />
                  </button>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          )}
          {user?.email ? (
            <div className="flex items-center px-10 lg:hidden">
              <Link to="/account">
                <button className="text-[#ff99be] text-lg font-bold ">
                  <img
                    src={data?.img}
                    className="h-[50px] w-[50px] rounded-full"
                  />
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
      ) : (
        <div className="z-[100] absolute bg-[#212140] text-white w-full py-4  font-main h-full">
          <div className="flex justify-between w-full">
            <Link to="/">
              <div className="flex items-center">
                <img className=" w-14 ml-3" src={icon} />
                <h1 className="text-[#ff99be] hover:text-[#ffffff] ml-3 font-bold text-4xl">
                  Movies
                </h1>
              </div>
            </Link>
            <div className="  items-center px-10 text-[45px] text-[#E68AAB] lg:block">
              <button onClick={() => setMenu(!menu)}>
                <MdMenu />
              </button>
            </div>
          </div>
          <div className="w-full py-7">
            <div className="w-full flex justify-center ">
              <Link to="/account" onClick={() => setMenu(!menu)}>
                <div className="flex  border w-[250px] rounded-2xl py-1 bg-[#553E58]">
                  <button className="text-[#ff99be] w-[25%] flex justify-end text-lg font-bold ">
                    <img
                      src={data?.img}
                      className="h-[50px] w-[50px] rounded-full"
                    />
                  </button>
                  <div className="w-[75%]  text-center">
                    <div className="text-xl">{data?.username}</div>
                    <div>{data?.role}</div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="flex flex-col items-center space-y-5  py-10">
              <Link onClick={() => setMenu(!menu)} to="/">
                <button className="text-[#ffffff] hover:text-[#fb9bbc] font-bold text-xl">
                  Home
                </button>
              </Link>

              <Link onClick={() => setMenu(!menu)} to="movies">
                <button className="text-[#ffffff] hover:text-[#fb9bbc] font-bold text-xl">
                  Movies
                </button>
              </Link>

              <Link onClick={() => setMenu(!menu)} to="crmovie">
                <button className="text-[#ffffff] hover:text-[#fb9bbc] font-bold text-xl">
                  Exclusive movie
                </button>
              </Link>
              <Link onClick={() => setMenu(!menu)} to="chooseCategory">
                <button className="text-[#ffffff] hover:text-[#fb9bbc] font-bold text-xl">
                  Genres
                </button>
              </Link>
              <Link onClick={() => setMenu(!menu)} to="authors">
                <button className="text-[#ffffff] hover:text-[#fb9bbc] font-bold text-xl">
                  Authors
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className="text-[#ffffff] hover:text-[#fb9bbc] font-bold text-xl flex space-x-3"
              >
                <div className=" text-3xl">
                  <IoExit />
                </div>{" "}
                <div> Logout</div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
