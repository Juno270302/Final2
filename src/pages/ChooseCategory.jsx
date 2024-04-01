import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { Link } from "react-router-dom";

const ChooseCategory = () => {
  const [genre, setGenre] = useState([]);
  console.log(genre);

  useEffect(() => {
    onSnapshot(collection(db, "genres"), (snapShot) => {
      let list = [];
      snapShot.docs.forEach((doc) => {
        list.push({ id_cast: doc.id, ...doc.data() });
      });
      setGenre(list);
    });
  }, []);

  return (
    <div className="bg-black/60 px-52 py-40 w-full h-screen text-white 2xl:px-16 xl:px-10 lg:px-5 sm:px-0">
      <div className=" w-full h-full px-52 mt-5 2xl:px-16 xl:px-10 lg:px-5 sm:px-0">
        <div className=" w-full p-5 h-full bg-[#212140]">
          <div className="border-2 w-full h-full ">
            <div className=" px-32 py-12 space-y-11 flex flex-col items-center justify-center font-main text-3xl">
              Thể Loại
            </div>
            <div className="px-10 text-lg grid grid-cols-5 gap-4 text-center ">
              {genre.map((item) => (
                <Link to={`/category/${item.key}`} state={item.key}>
                  <div className="bg-slate-500 py-2 rounded-xl hover:text-[#F20000] cursor-pointer">
                    {item.key}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseCategory;
