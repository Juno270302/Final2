import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import ShowMovie from "./ShowMovie";

const RecommentMovie = ({ genre, a }) => {
  const [movies, setMovies] = useState([]);

  const b = movies.filter((item) => item.title !== a.title);
  const movie = b.filter((item) => item.genre.includes(genre[0]));

  useEffect(() => {
    onSnapshot(collection(db, "movies"), (snapShot) => {
      let list = [];
      snapShot.docs.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setMovies(list);
    });
  }, []);

  return (
    <div className="bg-[#080A1A]">
      <div>Phim cung the loai</div>
      <div
        id={"slider"}
        className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide "
      >
        {movie
          .filter((e) => e.license?.includes("None"))
          .slice(0, 10)
          .map((item) => (
            <ShowMovie item={item} key={item.id} />
          ))}
      </div>
    </div>
  );
};

export default RecommentMovie;
