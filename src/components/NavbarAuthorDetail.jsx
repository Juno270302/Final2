import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { db } from "../firebase";
import Swal from "sweetalert2";

const NavbarAuthorDetail = ({ movie, data, role, authorID }) => {
  const [author, setAuthor] = useState();
  const [author2, setAuthor2] = useState();
  console.log(authorID);

  useEffect(() => {
    onSnapshot(doc(db, "movies", `${movie.id}`), (doc) => {
      setAuthor(doc.data());
    });
  }, [data]);

  useEffect(() => {
    onSnapshot(doc(db, "authors", `${authorID}`), (doc) => {
      setAuthor2(doc.data());
    });
  }, [data]);

  const deleteShowCast = async (passedID) => {
    try {
      const authorRef = doc(db, "movies", `${movie.id}`);
      const result = author?.cast?.filter((item) => item.id_cast !== passedID);

      onSnapshot(doc(db, "authors", `${passedID}`), (doc) => {
        setAuthor2(doc.data());
      });

      const authorRef2 = doc(db, "authors", `${passedID}`);
      const result2 = author2?.movies?.filter((item) => item.id !== movie.id);

      await updateDoc(authorRef, {
        cast: result,
      });

      await updateDoc(authorRef2, {
        movies: result2,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteShowProduction = async (passedID) => {
    try {
      const authorRef = doc(db, "movies", `${movie.id}`);
      const result = author?.production?.filter(
        (item) => item.id_cast !== passedID
      );

      onSnapshot(doc(db, "authors", `${passedID}`), (doc) => {
        setAuthor2(doc.data());
      });

      const authorRef2 = doc(db, "authors", `${passedID}`);
      const result2 = author2?.movies?.filter((item) => item.id !== movie.id);

      await updateDoc(authorRef, {
        production: result,
      });

      await updateDoc(authorRef2, {
        movies: result2,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const deleteShowDirecting = async (passedID) => {
    try {
      const authorRef = doc(db, "movies", `${movie.id}`);
      const result = author?.directing?.filter(
        (item) => item.id_cast !== passedID
      );

      onSnapshot(doc(db, "authors", `${passedID}`), (doc) => {
        setAuthor2(doc.data());
      });

      const authorRef2 = doc(db, "authors", `${passedID}`);
      const result2 = author2?.movies?.filter((item) => item.id !== movie.id);

      await updateDoc(authorRef, {
        directing: result,
      });

      await updateDoc(authorRef2, {
        movies: result2,
      });
    } catch (error) {
      console.log(error);
    }
  };

  let a;
  if (role === "Cast") {
    return (a = (
      <div className="bg-[#553E58] border border-gray-500 p-6 rounded-2xl mb-5 w-[350px] h-[650px] mt-[50px]">
        <div className="text-center font-body bg-[#E0D5D5] text-[#F20000] py-3 rounded">
          {role} for {movie.title}
        </div>
        <div className="h-[500px] w-full overflow-y-scroll whitespace-nowrap scrollbar-hide scroll-smooth mt-5">
          {author?.cast?.map((item, index) => (
            <div
              key={index}
              className="rounded font-body text-sm flex gap-3 p-4 text-white hover:bg-[#212140] flex-col"
            >
              <div className="flex flex-row items-center space-x-5">
                <img className="h-[50px]" src={item.img_cast} />
                <div>{item.name_cast}</div>
                <button
                  onClick={() => deleteShowCast(item?.id_cast)}
                  className="text-2xl hover:text-red-700"
                >
                  <MdDeleteForever />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    ));
  }

  if (role === "Production") {
    return (a = (
      <div className="bg-[#553E58] border border-gray-500 p-6 rounded-2xl mb-5 w-[350px] h-[650px] mt-[50px]">
        <div className="text-center font-body bg-[#E0D5D5] text-[#F20000] py-3 rounded">
          {role} for {movie.title}
        </div>
        <div className="h-[500px] w-full overflow-y-scroll whitespace-nowrap scrollbar-hide scroll-smooth mt-5">
          {author?.production?.map((item, index) => (
            <div
              key={index}
              className="rounded font-body text-sm flex gap-3 p-4 text-white hover:bg-[#212140] flex-col"
            >
              <div className="flex flex-row items-center space-x-5">
                <img className="h-[50px]" src={item.img_cast} />
                <div>{item.name_cast}</div>
                <button
                  onClick={() => deleteShowProduction(item?.id_cast)}
                  className="text-2xl hover:text-red-700"
                >
                  <MdDeleteForever />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    ));
  }

  if (role === "Directing") {
    return (a = (
      <div className="bg-[#553E58] border border-gray-500 p-6 rounded-2xl mb-5 w-[350px] h-[650px] mt-[50px]">
        <div className="text-center font-body bg-[#E0D5D5] text-[#F20000] py-3 rounded">
          {role} for {movie.title}
        </div>
        <div className="h-[500px] w-full overflow-y-scroll whitespace-nowrap scrollbar-hide scroll-smooth mt-5">
          {author?.directing?.map((item, index) => (
            <div
              key={index}
              className="rounded font-body text-sm flex gap-3 p-4 text-white hover:bg-[#212140] flex-col"
            >
              <div className="flex flex-row items-center space-x-5">
                <img className="h-[50px]" src={item.img_cast} />
                <div>{item.name_cast}</div>
                <button
                  onClick={() => deleteShowDirecting(item?.id_cast)}
                  className="text-2xl hover:text-red-700"
                >
                  <MdDeleteForever />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    ));
  }
  return <div></div>;
};

export default NavbarAuthorDetail;
