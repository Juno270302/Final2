import { arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { MdReviews } from "react-icons/md";
import { db } from "../firebase";
import { UserAuth } from "../context/AuthContext";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

const Review = ({ movie }) => {
  console.log(movie);
  const [evaluate, setEvaluate] = useState();
  const [message, setMessage] = useState();
  const [users, setUsers] = useState();
  const { user } = UserAuth();

  const userId = doc(db, "users", `${user?.uid}`);

  //get userId -> database
  useEffect(() => {
    onSnapshot(userId, (doc) => {
      setUsers(doc?.data());
    });
  }, [user?.uid]);

  //update Message firm
  const submitHandle = async (e) => {
    e.preventDefault();
    const date = new Date().toLocaleString();

    await updateDoc(doc(db, "movies", `${movie?.id}`), {
      chat: arrayUnion({
        evaluate: Number(evaluate),
        message: message,
        name_user: users?.username,
        img_user: users?.img,
        date: date,
      }),
    });
  };

  return (
    <div className="w-full h-full bg-[#080A1A] px-28 py-5 2xl:px-24 xl:px-16 lg:px-10 sm:px-0">
      <div className="">
        <div className="flex flex-row space-x-3 py-14 text-2xl ">
          <p className="text-red-600 mt-1">
            <MdReviews />
          </p>
          <h1 className="font-body ">Reviews</h1>
        </div>
      </div>
      <div>
        <div className="bg-[#212140] w-full h-full rounded-2xl flex flex-row px-20 py-20  2xl:px-16 xl:px-10 lg:px-5 sm:px-0">
          <div className="basis-2/5 ">
            <form className="space-y-10 px-5" onSubmit={submitHandle}>
              <p className="font-body text-xl">Reviews "{movie?.title}"</p>
              <p className="text-gray-400">
                Write a review for this movie. It will be posted on this page.
                lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              </p>
              <div className="space-y-3">
                <p className="text-gray-400 font-main">Select Rating</p>
                <select
                  onChange={(e) => setEvaluate(e.target.value)}
                  className="text-white px-5 w-full h-[50px] bg-[#080A1A] rounded-md border border-gray-300"
                >
                  <option value=""></option>
                  <option value={0}>0 - Poor</option>
                  <option value={1}>1 - Fair</option>
                  <option value={2}>2 - Good</option>
                  <option value={3}>3 - Very Good</option>
                  <option value={4}>4 - Excellent</option>
                  <option value={5}>5 - Masterpiece</option>
                </select>
              </div>
              <div className="space-y-3">
                <p className="text-gray-400 font-main">Message</p>
                <textarea
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full h-32 py-3 px-5 border text-white border-gray-300 rounded bg-[#080A1A]"
                  placeholder="Make it Short and Sweets"
                />
              </div>
              <button
                type="submit"
                className="text-[#F20000] bg-[#E0D5D5] w-full py-3 font-body rounded-lg"
              >
                Submit
              </button>
            </form>
          </div>
          <div className="basis-3/5">
            <div className="px-10 ml-5 space-y-6">
              <h1 className="font-body text-xl ml-5">Reviews</h1>
              <div className="bg-[#080A1A]/90 w-full h-[500px] overflow-y-scroll scrollbar-hide scroll-smooth rounded">
                {movie?.chat
                  ?.slice()
                  ?.reverse()
                  .map((item, index) => {
                    let a;
                    if (item.evaluate === 5) {
                      a = (
                        <div className="flex flex-row">
                          <FaStar />
                          <FaStar />
                          <FaStar />
                          <FaStar />
                          <FaStar />
                        </div>
                      );
                    }
                    if (item.evaluate === 4) {
                      a = (
                        <div className="flex flex-row">
                          <FaStar />
                          <FaStar />
                          <FaStar />
                          <FaStar />
                          <FaRegStar />
                        </div>
                      );
                    }
                    if (item.evaluate === 3) {
                      a = (
                        <div className="flex flex-row">
                          <FaStar />
                          <FaStar />
                          <FaStar />
                          <FaRegStar />
                          <FaRegStar />
                        </div>
                      );
                    }
                    if (item.evaluate === 2) {
                      a = (
                        <div className="flex flex-row">
                          <FaStar />
                          <FaStar />
                          <FaRegStar />
                          <FaRegStar />
                          <FaRegStar />
                        </div>
                      );
                    }
                    if (item.evaluate === 1) {
                      a = (
                        <div className="flex flex-row">
                          <FaStar />
                          <FaRegStar />
                          <FaRegStar />
                          <FaRegStar />
                          <FaRegStar />
                        </div>
                      );
                    }
                    if (item.evaluate === "0") {
                      a = (
                        <div className="flex flex-row ">
                          <FaRegStar />
                          <FaRegStar />
                          <FaRegStar />
                          <FaRegStar />
                          <FaRegStar />
                        </div>
                      );
                    }
                    return (
                      <div key={index} className="px-10 py-5">
                        <div className="w-full bg-[#212140] border border-gray-400 rounded p-3 flex flex-row ">
                          <div className="basis-1/6  flex justify-center">
                            <img
                              src={item.img_user}
                              className="w-[100px] h-[100px]"
                            />
                          </div>
                          <div className="basis-4/6 max-w-[450px] h-[100px] px-3">
                            <h1 className="font-main text-lg">
                              {item.name_user}
                            </h1>
                            <p className="break-words h-[100px]">
                              {item.message}
                            </p>
                          </div>
                          <div className="basis-1/6 flex flex-col justify-center items-center text-center">
                            <p>{item.date}</p>
                            <p>{a}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
