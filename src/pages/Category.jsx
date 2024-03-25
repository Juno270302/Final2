import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { db } from "../firebase";
import ShowMovie from "../components/ShowMovie";
import { IoArrowBack } from "react-icons/io5";

const Category = () => {
  const use = useLocation();
  const movie = use.state;

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    onSnapshot(collection(db, "movies"), (snapShot) => {
      let list = [];
      snapShot.docs.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setData(list);
    });
  }, []);

  return (
    <div>
      <div className="py-28 ">
        <div className="w-full border bg-[#E0D5D5] px-32 py-2">
          <div className="px-32 w-full flex flex-row space-x-6 sm:px-0">
            <div className="w-full">
              <div className="text-3xl font-main text-[#f20000]">{movie}</div>
              <div className="w-full ">
                <Link to={`/`} className="flex w-full text-xl space-x-2">
                  <span className="mt-1">
                    <IoArrowBack />
                  </span>
                  <span className="w-full">Back To main</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="-mt-24 px-36 2xl:px-32 xl:px-20 lg:px-10 sm:px-0 ">
        <div className="w-full h-full text-end px-36 ">
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            className="w-[250px] py-2 rounded-xl px-5"
          />
        </div>
        <div className="px-36 w-full h-full space-y-7 mt-10 2xl:px-32 xl:px-20 lg:px-10 sm:px-0">
          {data
            .filter((e) =>
              e.title.toLowerCase().includes(search.toLowerCase(search))
            )
            .filter((e) => e.genre?.includes(movie))
            .map((item, index) => {
              const timestamp = item?.release_date.seconds; // This would be the timestamp you want to format

              const time = new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              }).format(timestamp * 1000);
              return (
                <Link to={`/detail/${item.id}`} state={{ from: item }}>
                  <div className="w-full h-full border flex flex-row rounded-xl mb-5 bg-[#E0D5D5]/30">
                    <img
                      src={item.poster_path}
                      className="w-[100px]  rounded-l-xl"
                    />
                    <div className="text-white px-10 py-3">
                      <h1 className="text-xl hover:text-[#F20000]">
                        {item.title}
                      </h1>
                      <p className="text-gray-400">{time}</p>
                      <p>{item.overview}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Category;
