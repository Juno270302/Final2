import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavbarAccount from "../components/NavbarAccount";
import { auth, db } from "../firebase";
import { UserAuth } from "../context/AuthContext";
import { updatePassword } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const ChangePassword = () => {
  const { user } = UserAuth();
  const [users, setUsers] = useState();
  console.log(users);

  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmPasword, setConfirmPassword] = useState();

  console.log(
    oldPassword === users?.password &&
      newPassword === confirmPasword &&
      newPassword?.length > 1
  );

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      oldPassword === users.password &&
      newPassword === confirmPasword &&
      newPassword?.length > 1
    ) {
      updatePassword(user, newPassword)
        .then(() => {
          const a = async () => {
            try {
              const update = doc(db, "users", user.uid);
              await updateDoc(update, {
                password: newPassword,
              });
            } catch (error) {
              console.log(error);
            }
          };
          a();
          alert("Hello");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="w-full  bg-[#212140]">
      <div className="w-full px-10 py-40 flex flex-row 2xl:px-16 xl:px-10 lg:px-5 sm:px-0">
        <NavbarAccount bg={"bgPassword"} />
        <div className="max-w-[1200px] w-full h-[600px] mx-auto bg-[#553E58] rounded-2xl text-white border border-gray-500 ">
          <div className="w-full p-7 ">
            <h1 className="font-bold text-4xl text-white text-center py-6 ">
              Change Your Password
            </h1>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center py-7"
            >
              <input
                onChange={(e) => setOldPassword(e.target.value)}
                className="p-3 my-2 w-[300px] bg-[#2E2439] rounded placeholder-gray-300"
                type="password"
                placeholder="Old Password"
              />
              <input
                onChange={(e) => setNewPassword(e.target.value)}
                className="p-3 my-2 w-[300px] bg-[#2E2439] rounded placeholder-gray-300"
                type="password"
                placeholder="New Password"
                minLength="1"
              />
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="p-3 my-2 w-[300px] bg-[#2E2439] rounded placeholder-gray-300"
                type="password"
                placeholder="Confirm Password"
                minLength="1"
              />

              <button className="bg-[#E0D5D5] text-[#F20000] py-3 my-6 px-7 rounded font-bold">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
