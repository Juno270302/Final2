import { doc, getDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../firebase";
import { UserAuth } from "../context/AuthContext";
import { Link, Navigate } from "react-router-dom";
import { useEffect } from "react";

const RoleUser = ({ children }) => {
  const { user } = UserAuth();
  const [users, setUsers] = useState({});

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

  if (users.role === "user") {
    return children;
  } else if (users.role === "admin") {
    return children;
  } else {
    return (
      <div className="w-full h-screen border">
        <div className="w-full px-4 py-40">
          <div className="max-w-[950px] h-[50px] mx-auto bg-[#352036]/40 rounded-3xl text-white my-2 flex items-center justify-center space-x-2">
            <p className="text-center">Vui lòng bấm vào đây để đăng nhập</p>
            <Link to="/login" className="text-red-700 font-bold text-xl">
              Login
            </Link>
          </div>
        </div>
      </div>
    );
  }
};

export default RoleUser;
