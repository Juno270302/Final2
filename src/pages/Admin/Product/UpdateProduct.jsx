import {
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { db, storage } from "../../../firebase";
import { useLocation, useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import ShowCast from "../../../components/ShowCast";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const UpdateProduct = () => {
  const use = useLocation();
  const movie = use.state.from;
  console.log(movie);

  const [title, setTitle] = useState();
  const [hours, setHours] = useState();
  const [language, setLanguage] = useState();
  const [date, setDate] = useState(
    new Date(movie?.release_date.seconds * 1000)
  );
  const [discription, setDiscription] = useState();
  const [limitAge, setLimitAge] = useState();
  const [vipMember, setVipMember] = useState();
  const navigate = useNavigate();

  const [file1, setFile1] = useState();
  const [file2, setFile2] = useState();
  const [video, setVideo] = useState();

  const [file1Save, setFile1Save] = useState();
  const [file2Save, setFile2Save] = useState();
  const [videoSave, setVideoSave] = useState();

  const [genre, setGenre] = useState();
  const [genre2, setGenre2] = useState([]);

  const handleSelect = (e) => {
    setGenre2(genre.filter((e) => e.key !== movie.genre));
  };

  useEffect(() => {
    onSnapshot(collection(db, "genres"), (snapShot) => {
      let list = [];
      snapShot.docs.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setGenre(list);
    });
  }, []);

  useEffect(() => {
    const uploadFile1 = () => {
      const storageRef = ref(storage, file1.name);
      const uploadTask = uploadBytesResumable(storageRef, file1);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setFile1Save(downloadURL);
          });
        }
      );
    };
    file1 && uploadFile1();
  }, [file1]);

  useEffect(() => {
    const uploadFile2 = () => {
      const storageRef = ref(storage, file2.name);
      const uploadTask = uploadBytesResumable(storageRef, file2);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setFile2Save(downloadURL);
          });
        }
      );
    };
    file2 && uploadFile2();
  }, [file2]);

  useEffect(() => {
    const uploadVideo = () => {
      const storageRef = ref(storage, video.name);
      const uploadTask = uploadBytesResumable(storageRef, video);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setVideoSave(downloadURL);
          });
        }
      );
    };
    video && uploadVideo();
  }, [video]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      Swal.fire({
        title: `Update ${title ? title : movie.title} movie`,
        icon: "success",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Accept",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const update = doc(db, "movies", movie.id);
          await updateDoc(update, {
            title: title ? title : movie?.title,
            hours: hours ? hours : movie?.hours,
            language: language ? language : movie?.language,
            release_date: date ? date : movie?.release_date,
            overview: discription ? discription : movie?.overview,
            poster_path: file1 ? file1Save : movie?.poster_path,
            backdrop_path: file2 ? file2Save : movie?.backdrop_path,
            limit: limitAge ?? movie?.limit,
            license: vipMember ?? movie?.license,
            video: video
              ? {
                  titlevideo: video.name,
                  video: videoSave,
                }
              : movie?.video,
          });
          Swal.fire({
            heightAuto: 123,
            position: "top-end",
            icon: "success",
            title: `Add ${title ? title : movie.title} movie success`,
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  let a;
  if (movie?.limit === "None") {
    a = "Limit";
  } else a = "None";

  let b;
  if (movie?.license === "None") {
    b = "VIP";
  } else b = "None";

  return (
    <div className="w-full h-screen bg-[#212140]">
      <div className="w-full px-4 py-16">
        <div className="max-w-[950px] h-full mx-auto bg-[#553E58] rounded-3xl text-white ">
          <div className="w-full h-full p-7 ">
            <div className="flex w-full  items-center justify-center py-5">
              <h1 className="font-bold text-4xl text-white ">Update Movie</h1>
            </div>
            <div className="w-full h-[650px] px-20 overflow-y-scroll whitespace-nowrap scrollbar-hide scroll-smooth ">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col ">
                  <div className="flex justify-between py-3">
                    <div className="flex flex-col w-[40%] ">
                      <label className="text-gray-400">Movies Title</label>
                      <input
                        onChange={(e) => setTitle(e.target.value)}
                        className="py-3 px-5 border bg-[#2E2439] border-gray-300 rounded text-white"
                        type="text"
                        placeholder={movie.title}
                      />
                    </div>
                    <div className="flex flex-col w-[40%] ">
                      <label className="text-gray-400">Hours</label>
                      <input
                        onChange={(e) => setHours(e.target.value)}
                        className="py-3 px-5 border bg-[#2E2439] border-gray-300 rounded text-white"
                        type="text"
                        placeholder={movie.hours}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between py-3">
                    <div className="flex flex-col w-[40%] ">
                      <label className="text-gray-400">Language Used</label>
                      <input
                        onChange={(e) => setLanguage(e.target.value)}
                        className="py-3 px-5 border bg-[#2E2439] border-gray-300 rounded text-white"
                        type="text"
                        placeholder={movie.language}
                      />
                    </div>
                    <div className="flex flex-col w-[40%] ">
                      <label className="text-gray-400">Year of Release</label>
                      <DatePicker
                        className="py-3 px-5 border bg-[#2E2439] border-gray-300 rounded text-white w-full"
                        selected={date}
                        onChange={(date) => setDate(date)}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between py-3">
                    <div className="flex flex-col w-[40%] ">
                      <label className="text-gray-400 ">Limit Age</label>
                      <select
                        onChange={(e) => setLimitAge(e.target.value)}
                        className="py-3 rounded border text-white border-gray-300 bg-[#2E2439]"
                      >
                        <option>{movie?.limit}</option>
                        <option>{a}</option>
                      </select>
                    </div>
                    <div className="flex flex-col w-[40%] ">
                      <label className="text-gray-400 ">Limit Age</label>
                      <select
                        onChange={(e) => setVipMember(e.target.value)}
                        className="py-3 rounded border text-white border-gray-300 bg-[#2E2439]"
                      >
                        <option>{movie?.license}</option>
                        <option>{b}</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-between py-3">
                    <div className="flex flex-col w-[40%] ">
                      <label className="text-gray-400">Poster Image</label>
                      <label
                        htmlFor="file1"
                        className="border border-dashed bg-[#2E2439] border-gray-300 h-[60px] flex items-center justify-center flex-col "
                      >
                        <FaCloudUploadAlt className="text-[#F20000]/70 text-2xl" />
                        <div>Drag Your Image Here</div>
                      </label>
                      <input
                        id="file1"
                        className="py-3 px-5 border border-gray-700 rounded"
                        type="file"
                        placeholder="2022"
                        onChange={(e) => setFile1(e.target.files[0])}
                        style={{ display: "none" }}
                      />
                      <div>
                        <img
                          className="py-2"
                          width="110px"
                          src={
                            file1
                              ? URL.createObjectURL(file1)
                              : movie.poster_path
                          }
                        />
                      </div>
                    </div>
                    <div className="flex flex-col w-[40%] ">
                      <label className="text-gray-400">Backdrop Image</label>
                      <label
                        htmlFor="file2"
                        className="border border-dashed bg-[#2E2439] border-gray-300 h-[60px] flex items-center justify-center flex-col "
                      >
                        <FaCloudUploadAlt className="text-[#F20000]/70 text-2xl" />
                        <div>Drag Your Image Here</div>
                      </label>
                      <input
                        id="file2"
                        className="py-3 px-5 border border-gray-700 rounded"
                        type="file"
                        placeholder="2022"
                        onChange={(e) => setFile2(e.target.files[0])}
                        style={{ display: "none" }}
                      />
                      <div>
                        <img
                          className="py-2"
                          width="250px"
                          src={
                            file2
                              ? URL.createObjectURL(file2)
                              : movie.backdrop_path
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between py-3 text-black">
                    <div className="flex flex-col w-full ">
                      <label className="text-gray-400">Movie Category</label>
                      <div className="text-white flex flex-row space-x-2">
                        {movie.genre.map((item) => (
                          <div> {item},</div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between py-3">
                    <div className="flex flex-col w-full  ">
                      <label className="text-gray-400">Video</label>
                      <label
                        htmlFor="video"
                        className="border border-dashed  bg-[#2E2439] border-gray-300 h-[100%] flex items-center justify-center flex-col py-10"
                      >
                        {video ? (
                          <div className="flex flex-col items-center">
                            {video.name}
                          </div>
                        ) : (
                          <div className="">{movie.video.titlevideo}</div>
                        )}
                      </label>
                      <input
                        id="video"
                        className="py-3 px-5 border border-gray-700 rounded"
                        type="file"
                        placeholder="2022"
                        onChange={(e) => setVideo(e.target.files[0])}
                        style={{ display: "none" }}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between py-3">
                    <div className="flex flex-col w-full text-black">
                      <label className="text-gray-400">Discription</label>
                      <textarea
                        onChange={(e) => setDiscription(e.target.value)}
                        className="h-32 py-3 px-5 border rounded  bg-[#2E2439] border-gray-300 text-white"
                        placeholder={movie.overview}
                      />
                    </div>
                  </div>

                  <div className=" py-3">
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
                          {movie.cast?.map((item) => (
                            <ShowCast item={item} key={item.id} />
                          ))}
                        </div>

                        <MdChevronRight
                          onClick={slideRight}
                          className="bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
                          size={40}
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full border py-3 mt-5 bg-[#E0D5D5] font-body text-[#F20000] border-gray-700 rounded "
                  >
                    Pusblish Movie
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
