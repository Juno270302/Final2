import { doc, getDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../firebase";
import { UserAuth } from "../context/AuthContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { IoExit } from "react-icons/io5";

const RoleUser = ({ children }) => {
  const { user, logOut } = UserAuth();
  const [users, setUsers] = useState({});
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        setUsers(docSnap.data());

        if (docSnap.exists()) {
          // console.log("");
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
      } catch (error) {
        //console.log(error);
      }
    };
    fetchData();
  }, [user?.uid]);

  if (users.block === true) {
    return (
      <div className="bg-[#080A1A] absolute z-[300] w-full h-screen ">
        <div className="w-full h-screen flex items-center justify-center text-white ">
          Tai khoan cua bạn đã bị khóa hãy liên hệ với chúng tôi để biết thêm
          thông tin Logout tại đây -
          <button
            onClick={handleLogout}
            className="px-6 py-3 font-body rounded-2xl text-4xl cursor-pointer hover:text-[#f20000]"
          >
            LOGOUT
          </button>
        </div>
      </div>
    );
  }
  if (users.role === "user") {
    return children;
  } else if (users.role === "admin") {
    return children;
  } else {
    return (
      <div className="w-full h-screen ">
        <div className="w-full px-4 py-40">
          <Link to="/login">
            <div className="max-w-[950px] h-[50px] mx-auto bg-[#352036]/40 rounded-3xl text-white my-2 flex items-center justify-center space-x-2 border">
              <p className="text-center">Vui lòng bấm vào đây để đăng nhập</p>
              <span className="text-red-700 font-bold text-xl">Login</span>
            </div>
          </Link>
        </div>
      </div>
    );
  }
};

export default RoleUser;
