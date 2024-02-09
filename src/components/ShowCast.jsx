import React from "react";
import { Link } from "react-router-dom";

const ShowCast = ({ item }) => {
  return (
    <Link to={`/authors/detail/${item.id_cast}`} state={{ from: item }}>
      <div className="w-[260px] h-[300px] inline-block cursor-pointer p-3 bg-[#0B0F29]  ">
        <img className="w-full h-[250px]" src={item.img_cast} />
        <p className="text-center text-lg text-white">{item.name_cast}</p>
      </div>
    </Link>
  );
};

export default ShowCast;
