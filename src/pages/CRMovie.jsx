import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { db } from "../firebase";
import { useEffect } from "react";
import ShowMovie from "../components/ShowMovie";
import { UserAuth } from "../context/AuthContext";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Link } from "react-router-dom";

const MySwal = withReactContent(Swal);

const CRMovie = () => {
  const [movies, setMovies] = useState([]); //save All Movies in database
  const [count, setCount] = useState(0); //Dung de tinh tong cac movies co trong database
  const [search, setSearch] = useState(""); //Lay thong tin de search
  const [genre, setGenre] = useState([]); //Save All genre in database
  const [value, setValue] = useState(null); //Check genre to search
  const [data, setData] = useState(); //Data User have login

  const { user } = UserAuth();

  const expirationDate = new Date(data?.member_date?.seconds * 1000);
  const new_date = new Date();

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user.uid}`), (doc) => {
      setData({ id: doc.id, ...doc.data() });
    });
  }, [user]);

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
    setCount(movies.filter((e) => e.license?.includes("VIP")).length);
  }, [movies]);

  //setValue
  const handleSelect = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  useEffect(() => {
    if (expirationDate < new_date) {
      console.log("het han roi");
      updateDoc(doc(db, "users", data?.id), {
        member: "Member",
      });
    }
    if (expirationDate > new_date) {
      console.log("Còn Vip");
      updateDoc(doc(db, "users", data?.id), {
        member: "VIP",
      });
    }
  });

  return (
    <div className="h-full w-full">
      {data?.member === "VIP" ? (
        <div className="bg-[#212140] h-screen w-full ">
          <div className="absolute w-[90%] top-36 px-40 mx-16 ">
            <div className="flex justify-between  ">
              <div className="text-white font-bold text-xl my-5 flex space-x-2 ml-20 ">
                <span>Total</span>
                <span className="text-red-600"> {count} </span>
                <span>items Found</span>
              </div>
              <div className="w-[30%] flex p-5 mx-5 ">
                <select
                  onChange={(e) => handleSelect(e)}
                  class=" mx-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option>All</option>
                  {genre.map((option) => (
                    <option value={option.key}>{option.key}</option>
                  ))}
                </select>
              </div>

              <div className="flex justify-center space-x-5 ">
                <form className="py-5 space-x-5 w-full text-right">
                  <input
                    className="py-2 px-5 rounded-xl w-[90%] "
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </form>
              </div>
            </div>

            <div className="ml-20 w-full">
              {movies
                .filter((e) => e.license?.includes("VIP"))
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
                .map((item, index) => (
                  <ShowMovie item={item} index={index} />
                ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-black/60 px-96 py-32 2xl:px-44 xl:px-24 w-full h-screen text-white ">
          <div className=" w-full h-full px-52 ">
            <div className=" w-full p-5 h-full bg-[#212140]">
              <div className="border-2 w-full h-full ">
                <div className=" px-32 py-12 space-y-11 flex flex-col items-center justify-center">
                  <div className=" w-full h-[450px] max-w-96 px-10 mt-8">
                    <div className="w-full h-full border bg-[#E0D5D5] rounded-xl space-y-9">
                      <div className="text-[#f20000] text-center text-2xl font-main mt-10 ">
                        Phim độc quyền
                      </div>
                      <div className="text-black space-y-5 ml-6">
                        <p>+ Gần 200 phim độc quyền</p>
                        <p>+ Xem trước các phim bộ phát song song</p>
                        <p>+ Đăng nhập và sử dụng tối đa 5 thiết bị</p>
                        <p>+ Kho phim đặc sắc</p>
                        <p>+ Không quảng cáo</p>
                      </div>

                      <div className="text-center space-y-3">
                        <div className="text-black text-center font-main">
                          Gói 10$ / 30 ngày
                        </div>
                        <Link to={`/checkout/${user.uid}`} state={data}>
                          <button className="mt-3 bg-[#f20000] px-3 py-2 rounded-xl text-[#E0D5D5] font-main text-xl">
                            Pay Now
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CRMovie;
