import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoTime } from "react-icons/io5";
import { MdDateRange } from "react-icons/md";
import { CiPlay1 } from "react-icons/ci";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { IoPeople } from "react-icons/io5";

import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import ShowCast from "../components/ShowCast";
import Review from "../components/Review";

const Detail = () => {
  const use = useLocation();
  const movies = use.state.from; // data send from ...
  const [movie, setData] = useState();

  const [like, setLike] = useState(false);
  const [users, setUsers] = useState([]);
  const [save, setSave] = useState();

  const { user } = UserAuth();

  useEffect(() => {
    onSnapshot(doc(db, "movies", `${movies.id}`), (doc) => {
      setData({ id: doc.id, ...doc.data() });
    });
  }, []);

  const movieID = doc(db, "users", `${user?.uid}`);

  //get userId -> database
  useEffect(() => {
    onSnapshot(movieID, (doc) => {
      setUsers(doc.data()?.savedShows);
      setSave(doc.data()?.savedShows);
    });
  }, [user?.uid]);

  //set favorite
  useEffect(() => {
    const a = users?.filter((e) => e.id === movie?.id);
    setLike(a[0]?.like);
  }, [users]);

  //update Favorite Firm
  const saveShow = async () => {
    if (user?.uid) {
      if (like === undefined || like === false) {
        setLike(true);
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
      } else {
        try {
          setLike(false);
          const result = save.filter((item) => item.id !== movie.id);

          await updateDoc(movieID, {
            savedShows: result,
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  //update History firm
  const historyShow = async () => {
    if (user?.uid) {
      await updateDoc(movieID, {
        historyShow: arrayUnion({
          id: movie?.id,
          title: movie?.title,
          backdrop_path: movie?.backdrop_path,
          language: movie?.language,
          hours: movie?.hours,
          overview: movie?.overview,
          poster_path: movie?.poster_path,
          genre: movie?.genre,
          release_date: movie?.release_date,
          history: true,
        }),
      });
    }
  };

  //cut text
  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  //srollbar
  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  const timestamp = movie?.release_date.seconds; // This would be the timestamp you want to format

  const time = new Date(timestamp * 1000);
  const month = time.getMonth() + 1;
  const year = time.getFullYear();
  const date = time.getDate();
  const currentDate = month + "/" + date + "/" + year;

  console.log(currentDate);

  return (
    <div className="w-full h-full text-white  ">
      <div className="w-full h-full">
        <div className="bg-[#212140]">
          <img
            className="w-full h-full object-cover opacity-10 "
            src={movie?.backdrop_path}
            alt={movie?.title}
          />
        </div>
        <div className="absolute top-[30%] w-full h-[560px] px-52 font-main">
          <div className="flex space-x-14 h-full ">
            <div className=" w-[40%] rounded-xl flex justify-end">
              <img
                src={movie?.poster_path}
                className="rounded-xl w-[400px] h-[100%]"
              />
            </div>
            <div className="flex flex-col justify-center space-y-11 mb-32  h-full w-[65%] ">
              <div className="font-body text-4xl">{movie?.title}</div>
              <div className="flex space-x-9">
                <p className="bg-[#E0D5D5] text-[#F20000] px-2">HD 4K</p>

                <div className="flex space-x-2">
                  <MdDateRange className="mt-0.5 text-[#F20000]/90" />
                  <p>{currentDate}</p>
                </div>
                <div className="flex space-x-2">
                  <IoTime className="mt-0.5 text-[#F20000]/90" />
                  <p>{movie?.hours}</p>
                </div>
              </div>
              <div className="flex flex-row space-x-3">
                <p className="">Genre : </p>
                <p className=" flex flex-row space-x-3 max-w-[430px]">
                  {movie?.genre?.map((e) => (
                    <Link to={`../category/${e}`} state={e}>
                      <div className="hover:text-[#f20000]">{e},</div>
                    </Link>
                  ))}
                </p>
              </div>
              <div className="w-[50%]">
                {truncateString(movie?.overview, 150)}
              </div>
              <div className="flex  space-x-14 items-center">
                <div>Language : {movie?.language}</div>
                <Link to={`/video/${movie?.id}`} state={movie}>
                  <button
                    onClick={() => historyShow(movie?.id)}
                    className="rounded-full bg-[#E0D5D5] text-[#F20000] font-main py-2 px-12 flex space-x-2"
                  >
                    <CiPlay1 className="text-2xl" />
                    <p>Watch</p>
                  </button>
                </Link>

                <button onClick={() => saveShow()}>
                  {like ? (
                    <FaHeart className="text-3xl text-[#F20000]" />
                  ) : (
                    <FaRegHeart className="text-3xl text-gray-300" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#080A1A] h-[500px] w-full px-28 ">
          <div className=" ">
            <div className="flex flex-row space-x-3 py-14 text-2xl ">
              <p className="text-red-600 mt-1">
                <IoPeople />{" "}
              </p>
              <h1 className="font-body ">Top Billed Casts</h1>
            </div>

            <div className="text-black">
              <div className="relative flex items-center group">
                <MdChevronLeft
                  onClick={slideLeft}
                  className="bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
                  size={40}
                />

                <div
                  id={"slider"}
                  className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative space-x-10"
                >
                  {movie?.cast?.map((item) => (
                    <ShowCast item={item} key={item.id} />
                  ))}
                  <Link to={`/Viewmoreauthor/${movie?.id}`} state={movie}>
                    <div className="w-[260px] h-[300px] inline-block cursor-pointer p-3 bg-[#0B0F29]  ">
                      <p className="w-full h-[250px] flex "></p>
                      <p className="text-center text-lg text-white">
                        View More
                      </p>
                    </div>
                  </Link>
                </div>

                <MdChevronRight
                  onClick={slideRight}
                  className="bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
                  size={40}
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <Review movie={movie} />
        </div>
      </div>
    </div>
  );
};

export default Detail;
