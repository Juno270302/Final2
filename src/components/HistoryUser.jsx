import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa6";

const HistoryUser = () => {
  const { user } = UserAuth();
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user.uid}`), (doc) => {
      setMovie(doc.data()?.historyShow);
    });
  }, [user?.uid]);
  return (
    <div className=" w-full h-[400px] overflow-y-scroll whitespace-nowrap scrollbar-hide scroll-smooth">
      <table class="table-fixed border w-full">
        <thead className=" bg-[#E0D5D5]">
          <tr>
            <th className=" w-[20%] text-[#F20000]">Image</th>
            <th className="text-[#F20000]">Name</th>
            <th className="text-[#F20000]">Category</th>
            <th className="text-[#F20000]">Year</th>
            <th className="text-[#F20000]">Acion</th>
          </tr>
        </thead>
        {movie?.map((item) => (
          <tbody key={item.id}>
            <tr className="h-[100px] border">
              <td className=" h-[100px] text-center flex items-center justify-center ">
                <img
                  src={item?.poster_path}
                  width="60px"
                  className="border-2"
                />
              </td>
              <td className=" text-center">{item?.title}</td>
              <td className=" text-center">{item?.genre}</td>
              <td className=" text-center">{item?.release_date}</td>
              <td className=" text-center space-x-3">
                <Link to={`/detail/${item.id}`} state={{ from: item }}>
                  <button className="text-2xl">
                    <FaEye />
                  </button>
                </Link>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default HistoryUser;
