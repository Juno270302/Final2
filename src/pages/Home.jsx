import React, { useEffect, useState } from "react";
import { Role } from "../components/Role";
import AdminPage from "./Admin/Product/AdminPage";
import UsersPage from "./UsersPage";
import { UserAuth } from "../context/AuthContext";

const Home = () => {
  const userInfo = Role();
  const [users, setUsers] = useState({});

  useEffect(() => {
    setUsers(userInfo);
  }, [userInfo?.role]);

  return (
    <div className="w-full h-full font-main bg-[#212140]">
      {users?.role === "admin" ? <AdminPage /> : <UsersPage />}
    </div>
  );
};

export default Home;
