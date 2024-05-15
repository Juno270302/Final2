import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import ShowMovie from "./ShowMovie";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const Movie = () => {
  const [movies, setMovies] = useState([]);

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

  //srollbar
  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  return (
    <div className="text-black">
      <h2 className="font-bold p-4 text-2xl text-white">Movies</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
          onClick={slideLeft}
          className="bg-white rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-50 hidden group-hover:block"
          size={40}
        />
        <div
          id={"slider"}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide "
        >
          {movies
            .filter((e) => e.license?.includes("None"))
            .slice(0, 10)
            .sort(() => Math.random() - 0.5) // Sắp xếp ngẫu nhiên
            .map((item) => (
              <ShowMovie item={item} key={item.id} />
            ))}
        </div>
        <MdChevronRight
          onClick={slideRight}
          className="bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-50 hidden group-hover:block"
          size={40}
        />
      </div>
    </div>
  );
};

export default Movie;
