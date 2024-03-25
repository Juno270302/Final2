import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import img from "../images/default-avata.png";
import { Link, useNavigate } from "react-router-dom";
import { db, storage } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { GoFileSubmodule } from "react-icons/go";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import NavbarAccount from "../components/NavbarAccount";
import { FaCrown } from "react-icons/fa6";

const Account = () => {
  const [usernameInput, setUsernameInput] = useState("");
  const [phonenumberInput, setPhonenumberInput] = useState("");
  const [addressInput, setAddressInput] = useState("");

  const [users, setUsers] = useState({});
  const { user } = UserAuth();
  const [file, setFile] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        setUsers(docSnap.data());
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [user?.uid]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const update = doc(db, "users", user.uid);
      await updateDoc(update, {
        ...users,
        username: usernameInput ? usernameInput : users.username,
        phonenumber: phonenumberInput ? phonenumberInput : users.phonenumber,
        address: addressInput ? addressInput : users.address,
      });
      window.location.reload(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      console.log(name);
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
            setUsers((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  return (
    <div className="w-full bg-[#212140]">
      <div className="w-full px-10 py-40 flex flex-row 2xl:px-16 xl:px-10 lg:px-5 sm:px-0 ">
        <NavbarAccount bg={"bgAccount"} />
        <div className="max-w-[1200px] w-full h-[600px] mx-auto bg-[#553E58] rounded-2xl text-white border border-gray-500">
          <div className="w-full p-7 ">
            <h1 className="font-bold text-4xl text-white text-center pt-3 pb-6">
              Your Account :
              <span className="font-main ">
                {users.member === "VIP" ? (
                  <span className="text-yellow-300"> VIP</span>
                ) : (
                  <span> Member</span>
                )}{" "}
              </span>
            </h1>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center"
            >
              <div className="flex w-full justify-between px-24 py-6 2xl:px-16 xl:px-10 lg:px-5 sm:px-0">
                <div className="flex flex-col float-left items-center">
                  <img
                    src={file ? URL.createObjectURL(file) : users.img}
                    className="w-[200px] h-[200px] rounded-full 2xl:h-[180px] 2xl:w-[180px] xl:h-[160px] xl:w-[160px]  lg:w-[140px]  lg:h-[140px]"
                  />
                  <div className="mt-5">
                    <label htmlFor="files" className="flex text-2xl">
                      Image :{" "}
                      <p className="mt-1.5">
                        <GoFileSubmodule />
                      </p>
                    </label>
                    <input
                      type="file"
                      id="files"
                      onChange={(e) => setFile(e.target.files[0])}
                      style={{ display: "none" }}
                    />
                  </div>
                </div>
                <div className="flex flex-col float-right mr-10">
                  <div className="w-full">
                    <p className="text-xs text-gray-300">Email</p>
                    <input
                      className="p-3 my-2 w-[300px] bg-[#2E2439] rounded "
                      type="text"
                      value={users.email}
                      readOnly={false}
                    />
                  </div>
                  <div className="">
                    <p className="text-xs text-gray-300">Name</p>
                    <input
                      onChange={(e) => setUsernameInput(e.target.value)}
                      className="p-3 my-2 w-[300px] bg-[#2E2439] rounded placeholder-gray-400"
                      type="text"
                      placeholder={users.username}
                    />
                  </div>
                  <div className="">
                    <p className="text-xs text-gray-300">Phone Number</p>
                    <input
                      onChange={(e) => setPhonenumberInput(e.target.value)}
                      className="p-3 my-2 w-[300px] bg-[#2E2439] rounded placeholder-gray-400"
                      type="text"
                      placeholder={users.phonenumber}
                    />
                  </div>
                  <div className="">
                    <p className="text-xs text-gray-300">Address</p>
                    <input
                      onChange={(e) => setAddressInput(e.target.value)}
                      className="p-3 my-2 w-[300px] bg-[#2E2439] rounded placeholder-gray-400"
                      type="text"
                      placeholder={users.address}
                    />
                  </div>
                </div>
              </div>
              <button
                className="bg-[#E0D5D5] py-3 my-6 px-7 rounded font-bold text-[#F20000] "
                type="submit"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
