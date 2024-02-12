import {
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import NavbarAuthor from "./NavbarAuthor";
import Swal from "sweetalert2";

const ChooseAuthor = ({ item, movie }) => {
  const [data, setData] = useState("");
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  console.log(role);

  console.log(data);

  const [roleAuthor, setRoleAuthor] = useState([]);

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
    const movieID = doc(db, "movies", `${movie.id}`);
    if (role === "Cast") {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `Add ${data?.name_cast} success`,
        showConfirmButton: false,
        timer: 500,
      }).then(async (result) => {
        if (!result.isConfirmed) {
          await updateDoc(movieID, {
            cast: arrayUnion({
              id_cast: data?.id,
              name_cast: data?.name_cast,
              img_cast: data?.img_cast,
              gender: data?.gender,
              birthday: data?.birthday,
              pob: data?.pob,
              biography: data?.biography,
              role: data?.role,
            }),
          });
        }
      });
    }

    if (role === "Production") {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `Add ${data?.name_cast} success`,
        showConfirmButton: false,
        timer: 500,
      }).then(async (result) => {
        if (!result.isConfirmed) {
          await updateDoc(movieID, {
            production: arrayUnion({
              id_cast: data?.id,
              name_cast: data?.name_cast,
              img_cast: data?.img_cast,
              gender: data?.gender,
              birthday: data?.birthday,
              pob: data?.pob,
              biography: data?.biography,
              role: data?.role,
            }),
          });
        }
      });
    }

    if (role === "Directing") {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `Add ${data?.name_cast} success`,
        showConfirmButton: false,
        timer: 500,
      }).then(async (result) => {
        if (!result.isConfirmed) {
          await updateDoc(movieID, {
            directing: arrayUnion({
              id_cast: data?.id,
              name_cast: data?.name_cast,
              img_cast: data?.img_cast,
              gender: data?.gender,
              birthday: data?.birthday,
              pob: data?.pob,
              biography: data?.biography,
              role: data?.role,
            }),
          });
        }
      });
    }

    const authorID = doc(db, "authors", `${data?.id}`);
    await updateDoc(authorID, {
      movies: arrayUnion({
        title: movie?.title,
        poster_path: movie?.poster_path,
        id: movie?.id,
      }),
    });
  };

  return (
    <div className="w-full h-full bg-[#212140]">
      <div className="w-full px-20 py-20 flex flex-row">
        <NavbarAuthor
          movie={movie}
          data={data}
          role={role}
          authorID={data.id}
        />
        <div className="max-w-[950px] h-full w-full mx-auto bg-[#553E58] rounded-3xl text-white ">
          <div className="w-full h-full p-7 ">
            <div className="flex w-full  items-center justify-between  ">
              <div className="text-black">
                <select onChange={(e) => setRole(e.target.value)}>
                  <option></option>
                  {roleAuthor?.map((item) => (
                    <option>{item.key}</option>
                  ))}
                </select>
              </div>
              <div className=" w-[60%]  h-full ">
                <h1 className="font-bold text-4xl text-white  flex float-right py-2">
                  Add Author
                </h1>
              </div>

              <div className=" w-[40%] h-full ">
                <input
                  className="py-1 px-5 rounded-xl w-[55%] text-black flex float-right mt-2"
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search Contacts"
                />
              </div>
            </div>
            <div className="w-full h-[650px] grid grid-cols-4 gap-6 overflow-y-scroll whitespace-nowrap scrollbar-hide scroll-smooth ">
              {item
                ?.filter((item) => {
                  if (role === "All" || role === null) {
                    return item;
                  } else {
                    return item.role.includes(role);
                  }
                })
                ?.filter((item) => {
                  return search.toLowerCase() === ""
                    ? item
                    : item.name_cast.toLowerCase().includes(search);
                })
                ?.map((item) => {
                  return (
                    <form key={item.id_cast} onSubmit={handleSubmit}>
                      <button type="submit" onClick={() => setData(item)}>
                        <div className="border-2 border-gray-800 p-4 bg-[#E0D5D5]">
                          <img
                            className="h-[200px] w-[200px]"
                            src={item.img_cast}
                          />
                          <p className="text-[#F20000] font-main text-center">
                            {item.name_cast}
                          </p>
                        </div>
                      </button>
                    </form>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseAuthor;
