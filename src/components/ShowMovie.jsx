import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ShowMovie = ({ item, index }) => {
  return (
    <button
      key={index}
      className="w-[340px] inline-block cursor-pointer relative p-2 hover:translate-y-2 hover:translate-x-2 hover:z-0 sm:w-[250px] "
    >
      <Link to={`/detail/${item.id}`} state={{ from: item }}>
        <img
          className="w-full h-auto"
          src={item?.backdrop_path}
          alt={item?.title}
        />
        <div className="absolute top-0 left-0 w-full h-full text-white">
          <div className="text-xs font-body flex justify-start items-end pb-2  w-[97.6%] h-full ">
            <p className=" bg-black/60 w-full py-4 px-3 ml-2">{item?.title}</p>
          </div>
        </div>
      </Link>
    </button>
  );
};

export default ShowMovie;
