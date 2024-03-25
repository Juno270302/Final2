import React, { useEffect, useState } from "react";
import NavbarAccount from "../components/NavbarAccount";
import { UserAuth } from "../context/AuthContext";
import { doc, limit, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import HistoryUser from "../components/HistoryUser";

const History = () => {
  return (
    <div className="w-full bg-[#212140]">
      <div className="w-full px-10 py-40 flex flex-row 2xl:px-16 xl:px-10 lg:px-5 sm:px-0">
        <NavbarAccount bg={"bgHistory"} />
        <div className="max-w-[1200px] w-full h-[600px] mx-auto bg-[#553E58] rounded-2xl text-white border border-gray-500">
          <div className="w-full p-7 ">
            <h1 className="font-bold text-4xl text-white text-center pt-3 pb-6">
              History
            </h1>
            <HistoryUser />
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
