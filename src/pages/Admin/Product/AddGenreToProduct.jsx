import {
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { useLocation } from "react-router-dom";
import NavbarGenre from "../../../components/NavbarGenre";
import Swal from "sweetalert2";

const AddGenreToProduct = () => {
  const use = useLocation();
  const movie = use.state.from;

  const [genre, setGenre] = useState([]);
  const [search, setSearch] = useState("");
  console.log(genre);

  useEffect(() => {
    onSnapshot(collection(db, "genres"), (snapShot) => {
      let list = [];
      snapShot.docs.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setGenre(list);
    });
  }, []);

  const handleClick = async (genreId) => {
    const movieID = doc(db, "movies", `${movie.id}`);

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: `Add ${genreId.key} success`,
      showConfirmButton: false,
      timer: 500,
    }).then(async (result) => {
      if (!result.isConfirmed) {
        await updateDoc(movieID, {
          genre: arrayUnion(genreId.key),
        });
      }
    });
  };

  return (
    <div>
      <div className="w-full h-[900px] bg-[#212140]">
        <div className="w-full h-full px-20 py-20 flex flex-row">
          <NavbarGenre movies={movie} />
          <div className="max-w-[950px] h-full w-full mx-auto bg-[#553E58] rounded-3xl text-white ">
            <div className="w-full h-full p-7 ">
              <div className="flex w-full  items-center justify-between  ">
                <div className=" w-[60%]  h-full ">
                  <h1 className="font-bold text-4xl text-white  flex float-right py-2">
                    Add Genre
                  </h1>
                </div>

                <div className=" w-[40%] h-full ">
                  <input
                    className="py-1 px-5 rounded-xl w-[43%] text-black flex float-right mt-2"
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search Genre"
                  />
                </div>
              </div>
              <div className="w-full grid grid-cols-4 overflow-y-scroll whitespace-nowrap scrollbar-hide scroll-smooth ">
                {genre
                  ?.filter((item) => {
                    return search?.toLowerCase() === ""
                      ? item
                      : item.key?.toLowerCase().includes(search);
                  })
                  ?.map((item) => (
                    <button onClick={() => handleClick(item)}>
                      <div className="w-full border font-main p-3 text-center hover:text-[#f20000] hover:bg-[#E0D5D5]">
                        <p>{item.key}</p>
                      </div>
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddGenreToProduct;
