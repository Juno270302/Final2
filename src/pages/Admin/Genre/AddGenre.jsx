import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddGenre = () => {
  const [name, setName] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      Swal.fire({
        title: `Add ${name}`,
        icon: "success",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Accept",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const docRef = await addDoc(collection(db, "genres"), {
            key: name,
          });
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Add  ${name} success`,
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/admin/genreshow");
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
              <h1 className="font-bold text-4xl text-white ">Add Genre</h1>
            </div>
            <div className="w-full h-[650px] px-20 overflow-y-scroll whitespace-nowrap scrollbar-hide scroll-smooth ">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col ">
                  <div className="flex justify-between py-3">
                    <div className="flex flex-col w-full ">
                      <label className="text-gray-400">Genre Name</label>
                      <input
                        onChange={(e) => setName(e.target.value)}
                        className="py-3 bg-[#2E2439] px-5 border border-gray-300 rounded text-white"
                        type="text"
                        placeholder="Action"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full border py-3 mt-[30px] font-body bg-[#E0D5D5] text-[#f20000] border-white/70  rounded"
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

export default AddGenre;
