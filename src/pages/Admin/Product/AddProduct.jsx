import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db, storage } from "../../../firebase";
import { FaCloudUploadAlt } from "react-icons/fa";

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import withReactContent from "sweetalert2-react-content";

const AddProduct = () => {
  const [file1, setFile1] = useState("");
  const [file2, setFile2] = useState("");
  const [video, setVideo] = useState(false);
  // const [file, setFile] = useState("");

  const [file1Save, setFile1Save] = useState("");
  const [file2Save, setFile2Save] = useState("");
  const [videoSave, setVideoSave] = useState("");

  const [title, setTitle] = useState("");
  const [hours, setHours] = useState("");
  const [language, setLanguage] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState();
  const [discription, setDiscription] = useState("");
  const [limitAge, setLimitAge] = useState();
  const [vipMember, setVipMember] = useState();

  const [genre, setGenre] = useState([]);

  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    onSnapshot(collection(db, "genres"), (snapShot) => {
      let list = [];
      snapShot.docs.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setGenre(list);
    });
  }, []);

  const handleError = () => {
    MySwal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (
        title != "" &&
        category != "" &&
        hours != "" &&
        limitAge != "" &&
        date != "" &&
        language != "" &&
        discription != "" &&
        file2Save != "" &&
        file1Save != "" &&
        vipMember != "" &&
        video != ""
      ) {
        Swal.fire({
          title: `Add ${title} movie`,
          icon: "success",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Accept",
        }).then(async (result) => {
          if (result.isConfirmed) {
            const docRef = await addDoc(collection(db, "movies"), {
              title: title,
              genre: arrayUnion(category),
              hours: hours,
              limit: limitAge ?? "None",
              release_date: date,
              language: language,
              overview: discription,
              backdrop_path: file2Save,
              poster_path: file1Save,
              license: vipMember ?? "None",
              video: {
                titlevideo: video.name,
                video: videoSave,
              },
            });
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `Add ${title} movie success`,
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/admin");
          }
        });
      } else {
        handleError();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen bg-[#212140]">
      <div className="w-full px-4 py-16">
        <div className="max-w-[950px] h-full mx-auto bg-[#553E58] rounded-3xl text-white ">
          <div className="w-full h-full p-7 ">
            <div className="flex w-full  items-center justify-center py-5">
              <h1 className="font-bold text-4xl text-white ">Add Movie</h1>
            </div>
            <div className="w-full h-[650px] px-20 overflow-y-scroll whitespace-nowrap scrollbar-hide scroll-smooth ">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col ">
                  <div className="flex justify-between py-3">
                    <div className="flex flex-col w-[40%] ">
                      <label className="text-gray-400">Movies Title</label>
                      <input
                        onChange={(e) => setTitle(e.target.value)}
                        className="py-3 px-5 bg-[#2E2439] border border-gray-300 rounded text-white"
                        type="text"
                        placeholder="Game of Thorne"
                      />
                    </div>
                    <div className="flex flex-col w-[40%] ">
                      <label className="text-gray-400">Hours</label>
                      <input
                        onChange={(e) => setHours(e.target.value)}
                        className="py-3 px-5 bg-[#2E2439] border border-gray-300 rounded text-white"
                        type="text"
                        placeholder="2hr"
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
                        placeholder="English"
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
                        <option>None</option>
                        <option>Limit</option>
                      </select>
                    </div>
                    <div className="flex flex-col w-[40%] ">
                      <label className="text-gray-400 ">Account</label>
                      <select
                        onChange={(e) => setVipMember(e.target.value)}
                        className="py-3 rounded border text-white border-gray-300 bg-[#2E2439]"
                      >
                        <option>None</option>
                        <option>VIP</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-between py-3">
                    <div className="flex flex-col w-[40%] ">
                      <label className="text-gray-400">Poster Image</label>
                      <label
                        htmlFor="file1"
                        className="border border-dashed border-gray-300 bg-[#2E2439] h-[60px] flex items-center justify-center flex-col "
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
                          src={file1 ? URL.createObjectURL(file1) : ""}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col w-[40%] ">
                      <label className="text-gray-400">Backdrop Image</label>
                      <label
                        htmlFor="file2"
                        className="border border-dashed border-gray-300 bg-[#2E2439] h-[60px] flex items-center justify-center flex-col "
                      >
                        <FaCloudUploadAlt className="text-[#F20000]/70  text-2xl" />
                        <div>Drag Your Image Here</div>
                      </label>
                      <input
                        id="file2"
                        className="py-3 px-5 border border-gray-300 rounded"
                        type="file"
                        placeholder="2022"
                        onChange={(e) => setFile2(e.target.files[0])}
                        style={{ display: "none" }}
                      />
                      <div>
                        <img
                          className="py-2"
                          width="250px"
                          src={file2 ? URL.createObjectURL(file2) : ""}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between py-3 text-black">
                    <div className="flex flex-col w-full ">
                      <label className="text-gray-400 ">Movie Category</label>
                      <select
                        onChange={(e) => setCategory(e.target.value)}
                        className="py-3 rounded border text-white border-gray-300 bg-[#2E2439]"
                      >
                        <option>Category</option>
                        {genre?.map((e) => (
                          <option key={e.id}>{e.key}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-between py-3">
                    <div className="flex flex-col w-full  ">
                      <label className="text-gray-400">Video</label>
                      <label
                        htmlFor="video"
                        className="border border-dashed h-[100%] bg-[#2E2439] flex items-center justify-center flex-col py-10"
                      >
                        {!video ? (
                          <div className="flex flex-col items-center">
                            <FaCloudUploadAlt className="text-[#F20000]/70 text-2xl" />
                            <div>Drag Your Video Here</div>
                          </div>
                        ) : (
                          <div>{video.name}</div>
                        )}
                      </label>
                      <input
                        id="video"
                        className="py-3 px-5 border border-gray-700 rounded "
                        type="file"
                        placeholder="2022"
                        onChange={(e) => setVideo(e.target.files[0])}
                        style={{ display: "none" }}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between py-3">
                    <div className="flex flex-col w-full text-black">
                      <label className="text-gray-400 ">Discription</label>
                      <textarea
                        onChange={(e) => setDiscription(e.target.value)}
                        className="h-32 py-3 px-5 border text-white border-gray-300 rounded bg-[#2E2439]"
                        placeholder="Make it Short and Sweets"
                      />
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

export default AddProduct;
