import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { MdDeleteForever } from "react-icons/md";

const NavbarGenre = ({ movies }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    onSnapshot(doc(db, "movies", `${movies.id}`), (doc) => {
      setData(doc.data());
    });
  }, []);

  const deleteShow = async (passedID) => {
    try {
      const authorRef = doc(db, "movies", `${movies.id}`);
      const result = data?.genre?.filter((item) => item !== passedID);
      await updateDoc(authorRef, {
        genre: result,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-[#553E58] border border-gray-500 p-6 rounded-2xl mb-5 w-[350px] h-[650px] mt-[50px]">
      <div className="text-center font-body bg-[#E0D5D5] text-[#F20000] py-3 rounded">
        Genre
      </div>
      <div className="h-[500px] w-full overflow-y-scroll whitespace-nowrap scrollbar-hide scroll-smooth mt-5">
        {data?.genre?.map((item, index) => (
          <div
            key={index}
            className="rounded font-body text-sm flex gap-3 p-4 text-white hover:bg-[#212140] flex-col"
          >
            <div className="flex flex-row items-center space-x-5">
              <div>{item}</div>
              <button
                onClick={() => deleteShow(item)}
                className="text-2xl hover:text-red-700"
              >
                <MdDeleteForever />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavbarGenre;
