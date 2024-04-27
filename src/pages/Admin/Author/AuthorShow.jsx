import React, { useEffect, useState } from "react";
import NavbarAdmin from "../../../components/NavbarAdmin";
import { Link } from "react-router-dom";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";
import { FaEye } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const AuthorShow = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [roleAuthor, setRoleAuthor] = useState([]);
  const [value, setValue] = useState(null);

  useEffect(() => {
    onSnapshot(collection(db, "role"), (snapShot) => {
      let list = [];
      snapShot.docs.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setRoleAuthor(list);
    });
  }, [data?.id]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "authors"), (snapShot) => {
      let list = [];
      snapShot.docs.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setData(list);
    });

    return () => {
      unsub();
    };
  }, []);

  const handleDelete = async (id, title) => {
    MySwal.fire({
      title: `Do You Want Delete ${title}?`,
      icon: "error",
      confirmButtonColor: "#F20000",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(doc(db, "authors", id));
      }
    });
  };

  const handleSelect = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  return (
    <div className="w-full h-full bg-[#212140]">
      <div className="w-full px-10 py-40 flex flex-row ">
        <NavbarAdmin bg={"bgAuthor"} />
        <div className="max-w-[1200px] h-full mx-auto bg-[#553E58] rounded-3xl text-white ">
          <div className="w-full h-full p-7 ">
            <div className="flex w-full  items-center justify-between py-5">
              <div className="flex items-center">
                <div>
                  <select
                    onChange={(e) => handleSelect(e)}
                    class=" py-1 mt-2 bg-gray-700 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 lg:w-[200px]"
                  >
                    <option>All</option>
                    {roleAuthor.map((option) => (
                      <option value={option.key}>{option.key}</option>
                    ))}
                  </select>
                </div>
                <div className="">
                  <input
                    className="py-1 px-5 rounded-xl w-[152px] text-black flex float-right mt-2"
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search Name"
                  />
                </div>
              </div>
              <div className="w-full ">
                <h1 className="font-bold text-4xl text-white  float-right  ">
                  Author
                </h1>
              </div>
              <div className="w-full ">
                <Link to={`/admin/addauthor`}>
                  <button className="font-bold text-[#F20000] float-right bg-[#E0D5D5] rounded-2xl px-6 py-2">
                    Add
                  </button>
                </Link>
              </div>
            </div>
            <div className=" w-full h-[500px] overflow-y-scroll whitespace-nowrap scrollbar-hide scroll-smooth">
              <table class="table-fixed border w-full">
                <thead className=" bg-[#E0D5D5] text-[#F20000] ">
                  <tr>
                    <th className=" w-[20%] ">Image</th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Birthday</th>
                    <th>Acion</th>
                  </tr>
                </thead>
                {data
                  ?.filter((item) => {
                    return search?.toLowerCase() === ""
                      ? item
                      : item.name_cast?.toLowerCase().includes(search);
                  })
                  ?.filter((e) => {
                    if (value === "All" || value === null) {
                      return e;
                    } else {
                      return e.role.includes(value);
                    }
                  })
                  ?.map((item) => {
                    const timestamp = item?.birthday.seconds; // This would be the timestamp you want to format

                    const time = new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    }).format(timestamp * 1000);

                    return (
                      <tbody key={item.id}>
                        <tr className="h-[100px] border">
                          <td className=" h-[100px] text-center flex items-center justify-center ">
                            <img
                              src={item?.img_cast}
                              width="60px"
                              className="border-2"
                            />
                          </td>
                          <td className=" text-center overflow-auto scrollbar-hide">
                            {item?.name_cast}
                          </td>
                          <td className=" text-center overflow-auto scrollbar-hide">
                            {item?.gender}
                          </td>
                          <td className=" text-center overflow-auto scrollbar-hide">
                            {time}
                          </td>
                          <td className=" text-center space-x-3">
                            <Link
                              to={`/admin/update/author/${item.id}`}
                              state={{ from: item }}
                            >
                              <button className="text-2xl">
                                <FaEye />
                              </button>
                            </Link>
                            <button
                              onClick={() =>
                                handleDelete(item.id, item?.name_cast)
                              }
                              className="text-2xl"
                            >
                              <MdDeleteForever />
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorShow;
