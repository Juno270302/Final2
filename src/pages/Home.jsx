import React, { useEffect, useState } from "react";
import { Role } from "../components/Role";
import AdminPage from "./Admin/Product/AdminPage";
import UsersPage from "./UsersPage";
import Dashboard from "./Admin/Dashboard/Dashboard";

const Home = () => {
  const userInfo = Role(); //check role
  const [users, setUsers] = useState({});
  console.log(users);

  useEffect(() => {
    setUsers(userInfo);
  }, [userInfo?.role]);

  return (
    <div className="w-full h-full font-main bg-[#212140]">
      {users?.role === "admin" ? <Dashboard /> : <UsersPage />}
    </div>
  );
};

export default Home;
