import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { db, storage } from "../../../firebase";
import { useLocation, useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Swal from "sweetalert2";

const UpdateAuthor = () => {
  const use = useLocation();
  const author = use.state.from;

  const [file, setFile] = useState("");
  const [fileSave, setFileSave] = useState("");

  const [pob, setPob] = useState();
  const [name, setName] = useState();
  const [birthday, setBirthday] = useState();
  const [gender, setGender] = useState();
  const [role, setRole] = useState();
  const [role2, setRole2] = useState([]);
  const [discription, setDiscription] = useState();

  const [roleAuthor, setRoleAuthor] = useState([]);

  const navigate = useNavigate();

  let a;
  if (author?.gender === "Male") {
    a = "Female";
  } else {
    a = "Male";
  }

  useEffect(() => {
    onSnapshot(collection(db, "role"), (snapShot) => {
      let list = [];
      snapShot.docs.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setRoleAuthor(list);
    });
  }, []);

  const handleSelect = (e) => {
    setRole2(roleAuthor.filter((e) => e.key !== author?.role));
  };

  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

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
            setFileSave(downloadURL);
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      Swal.fire({
        title: `Add ${name ?? author?.name_cast}`,
        icon: "success",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Accept",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const update = doc(db, "authors", author.id);
          await updateDoc(update, {
            name_cast: name ?? author?.name_cast,
            gender: gender ?? author?.gender,
            birthday: birthday ?? author?.birthday,
            pob: pob ?? author?.pob,
            img_cast: file ? fileSave : author?.img_cast,
            biography: discription ?? author?.biography,
            role: role ?? author?.role,
          });
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Add ${name ?? author?.name_cast} movie success`,
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/admin/authorshow");
        }
      });
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
              <h1 className="font-bold text-4xl text-white ">Update Author</h1>
            </div>
            <div className="w-full h-[650px] px-20 overflow-y-scroll whitespace-nowrap scrollbar-hide scroll-smooth ">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col ">
                  <div className="flex justify-between py-3">
                    <div className="flex flex-col w-[40%] ">
                      <label className="text-gray-400">Author Name</label>
                      <input
                        onChange={(e) => setName(e.target.value)}
                        className="py-3 bg-[#2E2439] px-5 border border-gray-300 rounded text-white"
                        type="text"
                        placeholder={author?.name_cast}
                      />
                    </div>
                    <div className="flex flex-col w-[40%] ">
                      <label className="text-gray-400">Gender</label>
                      <select
                        onChange={(e) => setGender(e.target.value)}
                        className="py-3 bg-[#2E2439] px-5 border border-gray-300 rounded text-white"
                        type="text"
                        placeholder="Male or Female"
                      >
                        <option>{author?.gender}</option>
                        <option>{a}</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-between py-3">
                    <div className="flex flex-col w-[40%] ">
                      <label className="text-gray-400">Birthday</label>
                      <input
                        onChange={(e) => setBirthday(e.target.value)}
                        className="py-3 bg-[#2E2439] px-5 border border-gray-300 rounded text-white"
                        type="text"
                        placeholder={author?.birthday}
                      />
                    </div>
                    <div className="flex flex-col w-[40%] ">
                      <label className="text-gray-400">Place of Birth</label>
                      <input
                        onChange={(e) => setPob(e.target.value)}
                        className="py-3 bg-[#2E2439] px-5 border border-gray-300 rounded text-white"
                        type="text"
                        placeholder={author?.pob}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between py-3 text-black">
                    <div className="flex flex-col w-full ">
                      <label className="text-gray-400 ">Movie Category</label>
                      <select
                        onChange={(e) => setRole(e.target.value)}
                        onClick={handleSelect}
                        className="py-3 rounded border text-white border-gray-300 bg-[#2E2439]"
                      >
                        <option>{author?.role}</option>
                        {role2?.map((e) => (
                          <option key={e.id}>{e.key}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-between py-3">
                    <div className="flex flex-col w-full ">
                      <label className="text-gray-400">Image</label>
                      <label
                        htmlFor="file"
                        className="border border-dashed h-[60px] bg-[#2E2439] flex items-center justify-center flex-col "
                      >
                        <FaCloudUploadAlt className="text-[#F20000]/80 text-2xl" />
                        <div>Drag Your Image Here</div>
                      </label>
                      <input
                        id="file"
                        className="py-3 px-5 border border-gray-700 rounded"
                        type="file"
                        placeholder="2022"
                        onChange={(e) => setFile(e.target.files[0])}
                        style={{ display: "none" }}
                      />
                      <div>
                        <img
                          className="py-2"
                          width="110px"
                          src={
                            file ? URL.createObjectURL(file) : author?.img_cast
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between py-3">
                    <div className="flex flex-col w-full text-black">
                      <label className="text-gray-400 ">Biography</label>
                      <textarea
                        onChange={(e) => setDiscription(e.target.value)}
                        className="h-32 py-3 px-5 border text-white border-gray-300 rounded bg-[#2E2439]"
                        placeholder={author?.biography}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full border border-white/70 py-3 mt-[30px] font-body bg-[#E0D5D5] text-[#F20000]  rounded"
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

export default UpdateAuthor;
