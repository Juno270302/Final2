import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { BsDot } from "react-icons/bs";
import { CiPlay1 } from "react-icons/ci";
import { FaRegDotCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { UserAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const ImageMain = () => {
  const [movies, setMovies] = useState([]);
  const movie = movies[Math.floor(Math.random() * movies.length)];
  const { user } = UserAuth();

  const movieID = doc(db, "users", `${user?.uid}`);

  const handleError = () => {
    MySwal.fire({
      position: "top-end",
      icon: "success",
      title: `Added ${movie.title} to favorite list`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

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

  //cut text
  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  const saveShow = async () => {
    if (user?.uid) {
      await updateDoc(movieID, {
        savedShows: arrayUnion({
          id: movie?.id,
          title: movie?.title,
          backdrop_path: movie?.backdrop_path,
          language: movie?.language,
          hours: movie?.hours,
          overview: movie?.overview,
          poster_path: movie?.poster_path,
          genre: movie?.genre,
          release_date: movie?.release_date,
          like: true,
        }),
      });
      handleError();
    }
  };

  let c = movie?.chat?.reduce((a, v) => (a = a + v.evaluate), 0);
  let d = c / movie?.chat?.length;

  const timestamp = movie?.release_date.seconds; // This would be the timestamp you want to format

  const time = new Date(timestamp * 1000);
  const month = time.getMonth() + 1;
  const year = time.getFullYear();
  const date = time.getDate();
  const currentDate = month + "/" + date + "/" + year;

  return (
    <div className="w-full h-[550px] ">
      <img
        className="w-full h-full object-cover"
        src={movie?.backdrop_path}
        alt={movie?.title}
      />
      <div className="absolute top-[15%] left-[5%] p-4 space-y-5 ">
        <div className="flex font-main space-x-3 text-xl">
          <p className="flex space-x-2">
            <FaStar className="mt-0.5 text-red-400" />
            <div>{d}</div>
          </p>
          <BsDot className="mt-1" />
          <p>{currentDate}</p>
          <BsDot className="mt-1" />
          <p>{movie?.language}</p>
        </div>
        <h1 className="text-3xl font-main ">{movie?.title}</h1>
        <p className="w-[50%]">{truncateString(movie?.overview, 150)}</p>
        <div className="space-x-7 font-main ml-4 flex">
          {movie?.license === "VIP" ? (
            <Link to={`/crmovie`}>
              <button className="rounded-3xl bg-[#ff99be]/90 py-2 px-5 flex space-x-1 text-white ">
                <p>
                  <CiPlay1 className="mt-1" />
                </p>
                <p>Watch</p>
              </button>
            </Link>
          ) : (
            <Link to={`/detail/${movie?.id}`} state={{ from: movie }}>
              <button className="rounded-3xl bg-[#ff99be]/90 py-2 px-5 flex space-x-1 text-white ">
                <p>
                  <CiPlay1 className="mt-1" />
                </p>
                <p>Watch</p>
              </button>
            </Link>
          )}

          <button
            onClick={() => saveShow()}
            className=" text-white bg-slate-500/90 rounded-3xl py-2 px-5 ml-5 flex space-x-2"
          >
            <p>
              <FaRegDotCircle className="mt-1" />
            </p>
            <p>Add to List</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageMain;
