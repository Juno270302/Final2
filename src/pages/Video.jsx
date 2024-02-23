import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoReturnDownBack } from "react-icons/io5";
import ReactPlayer from "react-player";

const Video = () => {
  const use = useLocation();
  const movie = use.state; // data send from ...
  const [age, setAge] = useState(true);
  const navigate = useNavigate();
  console.log(age);

  useEffect(() => {
    if (movie?.limit === "Limit") {
      setAge(false);
    }
  }, [movie]);

  const handleOver = () => {
    setAge(true);
  };

  const handleUnder = () => {
    navigate("/");
  };

  return (
    <div className="w-full h-screen bg-[#212140] ">
      {age ? (
        <div className="px-52 py-16 w-full h-full">
          <div className=" w-full h-full mt-5">
            <Link to={`/detail/${movie?.id}`} state={{ from: movie }}>
              <div className="py-5 pl-10 text-3xl text-white flex items-center space-x-2">
                <IoReturnDownBack />
                <p>{movie?.title}</p>
              </div>
            </Link>

            <div>
              <div className="w-[1250px] h-[500px] mx-auto mt-10">
                <ReactPlayer
                  width={1250}
                  height={600}
                  controls
                  url={movie?.video?.video}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-black/60 px-96 py-56 w-full h-full text-white">
          <div className=" w-full h-full px-52 mt-5 ">
            <div className=" w-full p-5 h-full bg-[#212140]">
              <div className="border-2 w-full h-full ">
                <div className=" px-32 py-12 space-y-11 flex flex-col items-center justify-center">
                  <h1 className=" font-main text-2xl">
                    You must be 18 to Watch{" "}
                  </h1>
                  <button
                    onClick={handleOver}
                    className="border w-[80%] font-main text-xl py-2 hover:text-[#F20000] hover:bg-[#E0D5D5]"
                  >
                    I'm Over 18
                  </button>
                  <button
                    onClick={handleUnder}
                    className="border w-[80%] font-main text-xl py-2 hover:text-[#F20000] hover:bg-[#E0D5D5]"
                  >
                    I'm under 18
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Video;
