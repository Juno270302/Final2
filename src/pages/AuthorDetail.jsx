import { collection, doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { db } from "../firebase";
import MovieAuthor from "../components/MovieAuthor";

const AuthorDetail = () => {
  const use = useLocation();
  const movies = use.state.from;
  console.log(movies);

  const [movie, setMovie] = useState();

  useEffect(() => {
    onSnapshot(doc(db, "authors", `${movies.id_cast}`), (doc) => {
      setMovie({ id: doc.id, ...doc.data() });
    });
  }, []);

  return (
    <div className="bg-[#212140] h-[1000px] w-full ">
      <div className="w-[90%] px-40 pt-24 mx-20 ">
        <div className="flex justify-between  ">
          <div className="text-white font-bold text-xl my-5 flex space-x-2 ml-20 w-full justify-center ">
            <p className=" text-center font-body text-[#E0D5D5] text-3xl"></p>
          </div>
        </div>
        <div className=" w-full pt-5 flex flex-row">
          <div className="w-[30%] h-full">
            <div className="h-full w-full flex justify-center">
              <img
                className="w-[300px] h-[440px] rounded-lg"
                src={movie?.img_cast}
              />
            </div>
            <div className="text-white ml-10 space-y-6 mt-5 ">
              <h1 className="font-body">Personal Info</h1>
              <div>
                <p className="font-main">Known For</p>
                <p className="text-gray-400">{movie?.role}</p>
              </div>
              <div>
                <p className="font-main">Gender</p>
                <p className="text-gray-400">{movie?.gender}</p>
              </div>
              <div>
                <p className="font-main">Birthday</p>
                <p className="text-gray-400">{movie?.birthday}</p>
              </div>
              <div>
                <p className="font-main">Place of Birth</p>
                <p className="text-gray-400">{movie?.pob}</p>
              </div>
            </div>
          </div>
          <div className="w-[70%] text-white">
            <div className="pt-5 pl-10 space-y-6">
              <h1 className="font-main text-3xl">{movie?.name_cast}</h1>
              <div>
                <p className="text-xl">Biography</p>
                <p className="text-gray-400">{movie?.biography}</p>
              </div>
              <div>
                <p className="font-main">Known For</p>
                <p className="text-gray-400 flex flex-row space-x-8 py-3 overflow-x-scroll whitespace-nowrap scroll-smooth ">
                  {movie?.movies?.map((item, index) => (
                    <MovieAuthor item={item} index={index} />
                  ))}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorDetail;
