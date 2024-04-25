import React, { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { db, storage } from "../../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import withReactContent from "sweetalert2-react-content";
import "react-datepicker/dist/react-datepicker.css";

const AddAuthor = () => {
  const [file, setFile] = useState("");
  const [fileSave, setFileSave] = useState("");

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState();
  const [pob, setPob] = useState("");
  const [role, setRole] = useState("");
  const [discription, setDiscription] = useState("");

  const [roleAuthor, setRoleAuthor] = useState([]);

  const navigate = useNavigate();

  const MySwal = withReactContent(Swal);
  const handleError = () => {
    MySwal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });
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

  useEffect(() => {
    onSnapshot(collection(db, "role"), (snapShot) => {
      let list = [];
      snapShot.docs.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setRoleAuthor(list);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        name != "" &&
        gender != "" &&
        birthday != "" &&
        pob != "" &&
        fileSave != "" &&
        discription != "" &&
        role != ""
      ) {
        Swal.fire({
          title: `Add ${name}`,
          icon: "success",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Accept",
        }).then(async (result) => {
          if (result.isConfirmed) {
            const docRef = await addDoc(collection(db, "authors"), {
              name_cast: name,
              gender: gender,
              birthday: birthday,
              pob: pob,
              img_cast: fileSave,
              biography: discription,
              role: role,
            });
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `Add ${name} success`,
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/admin/authorshow");
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
              <h1 className="font-bold text-4xl text-white ">Add Author</h1>
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
                        placeholder="David Denman"
                      />
                    </div>
                    <div className="flex flex-col w-[40%] ">
                      <label className="text-gray-400">Gender</label>
                      <select
                        onChange={(e) => setGender(e?.target.value)}
                        className="py-3 bg-[#2E2439] px-5 border border-gray-300 rounded text-white"
                        type="text"
                        placeholder="Male or Female"
                      >
                        <option></option>
                        <option>Male</option>
                        <option>Famale</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-between py-3">
                    <div className="flex flex-col w-[40%] ">
                      <label className="text-gray-400">Birthday</label>

                      <DatePicker
                        className="py-3 px-5 border bg-[#2E2439] border-gray-300 rounded text-white w-full"
                        selected={birthday}
                        onChange={(date) => setBirthday(date)}
                      />
                    </div>
                    <div className="flex flex-col w-[40%] ">
                      <label className="text-gray-400">Place of Birth</label>
                      <input
                        onChange={(e) => setPob(e.target.value)}
                        className="py-3 bg-[#2E2439] px-5 border border-gray-300 rounded text-white"
                        type="text"
                        placeholder="Newport Beach, California, USA"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between py-3 text-black">
                    <div className="flex flex-col w-full ">
                      <label className="text-gray-400 ">Role</label>
                      <select
                        onChange={(e) => setRole(e.target.value)}
                        className="py-3 rounded border text-white border-gray-300 bg-[#2E2439]"
                      >
                        <option></option>
                        {roleAuthor?.map((e) => (
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
                          src={file ? URL.createObjectURL(file) : ""}
                        />
                      </div>
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
                    className="w-full border py-3 mt-[30px] font-body bg-[#E0D5D5] text-[#f20000] border-white/70  rounded"
                  >
                    Pusblish Author
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

export default AddAuthor;
