import { collection, onSnapshot } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { db } from "../firebase";
import { useEffect } from "react";
import ShowMovie from "../components/ShowMovie";
import { GrPowerReset } from "react-icons/gr";

const MoviesSeries = () => {
  const [movies, setMovies] = useState([]); //save All Movies in database
  const [count, setCount] = useState(0); //Dung de tinh tong cac movies co trong database
  const [search, setSearch] = useState(""); //Lay thong tin de search
  const [genre, setGenre] = useState([]); //Save All genre in database
  const [value, setValue] = useState(null); //Check genre to search

  //get movies -> database
  useEffect(() => {
    onSnapshot(collection(db, "movies"), (snapShot) => {
      let list = [];
      snapShot.docs.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setMovies(list);
    });
  }, []);

  //get genres -> database
  useEffect(() => {
    onSnapshot(collection(db, "genres"), (snapShot) => {
      let list = [];
      snapShot.docs.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setGenre(list);
    });
  }, [movies?.id]);

  //Tinh tổng có bao nhiêu bộ phim
  useEffect(() => {
    setCount(movies.filter((e) => e.license?.includes("None")).length);
  }, [movies]);

  //setValue
  const handleSelect = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  return (
    <div className="bg-[#212140] h-screen w-full ">
      <div className="absolute w-full top-36 px-32 2xl:px-10 lg:px-0">
        <div className="flex justify-between  ">
          <div className="text-white font-bold text-xl my-5 flex space-x-2 lg:hidden ">
            <span>Total</span>
            <span className="text-red-600"> {count} </span>
            <span>items Found</span>
          </div>
          <div className="w-[30%] flex p-5 mx-5 xl:w-[40%] sm:w-[50%]">
            <select
              onChange={(e) => handleSelect(e)}
              class=" mx-10 bg-gray-700 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 lg:w-[200px]"
            >
              <option>All</option>
              {genre.map((option) => (
                <option value={option.key}>{option.key}</option>
              ))}
            </select>
          </div>

          <div className="flex justify-center space-x-5  mr-10">
            <form className="py-5 space-x-5 w-full text-right">
              <input
                className="py-2 px-5 rounded-xl w-[90%] "
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>
          </div>
        </div>

        <div className="w-full grid grid-cols-4 gap-4 2xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 justify-center">
          {movies
            .filter((e) => e.license?.includes("None"))
            .filter((e) =>
              e.title.toLowerCase().includes(search.toLowerCase(search))
            )
            .filter((e) => {
              if (value === "All" || value === null) {
                return e;
              } else {
                return e.genre.includes(value);
              }
            })
            .map((item, index) => {
              return <ShowMovie item={item} index={index} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default MoviesSeries;
