import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../../firebase";
import { FaEye } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import { doc, deleteDoc } from "firebase/firestore";
import NavbarAccount from "../../../components/NavbarAccount";
import { TbCategory } from "react-icons/tb";
import NavbarAdmin from "../../../components/NavbarAdmin";
import { FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";

const AdminPage = () => {
  const [data, setData] = useState([]);
  console.log(data);
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "movies"), (snapShot) => {
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
    Swal.fire({
      title: `Do You Want Delete ${title} Movie?`,
      icon: "error",
      confirmButtonColor: "#F20000",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(doc(db, "movies", id));
      }
    });
  };
  return (
    <div className="w-full h-full bg-[#212140]">
      <div className="w-full px-10 py-40 flex flex-row ">
        <NavbarAdmin bg={"bgProduct"} />
        <div className="max-w-[1200px] h-full mx-auto bg-[#553E58] rounded-3xl text-white ">
          <div className="w-full h-full p-7 ">
            <div className="flex w-full  items-center justify-center py-5">
              <div className="w-[55%]  ">
                <h1 className="font-bold text-4xl text-white  float-right  ">
                  Movies
                </h1>
              </div>
              <div className="w-[40%] ">
                <Link to={`/admin/add`}>
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
                    <th>Category</th>
                    <th>Year</th>
                    <th>Acion</th>
                  </tr>
                </thead>
                {data?.map((item) => {
                  const timestamp = item?.release_date.seconds; // This would be the timestamp you want to format

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
                            src={item?.poster_path}
                            width="60px"
                            className="border-2"
                          />
                        </td>
                        <td className=" text-center overflow-auto scrollbar-hide">
                          {item?.title}
                        </td>
                        <td className=" text-center w-full ">
                          {item?.genre?.slice(0, 3).map((e) => (
                            <div>
                              <div>{e},</div>
                            </div>
                          ))}
                        </td>
                        <td className=" text-center">{time}</td>
                        <td className=" text-center space-x-3 ">
                          <Link
                            to={`/admin/add/author/${item.id}`}
                            state={{ from: item }}
                          >
                            <button
                              href="#"
                              class="text-2xl hover:text-[#F20000] transititext-primary text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                              data-te-toggle="tooltip"
                              title="Add Author for this movie"
                            >
                              <FaPlus />
                            </button>
                          </Link>
                          <Link
                            to={`/admin/add/genre/${item.id}`}
                            state={{ from: item }}
                          >
                            <button
                              href="#"
                              class="text-2xl hover:text-[#F20000] transititext-primary text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                              data-te-toggle="tooltip"
                              title="Add Genre for this movie"
                            >
                              <TbCategory />
                            </button>
                          </Link>

                          <Link
                            to={`/admin/update/product/${item.id}`}
                            state={{ from: item }}
                          >
                            <button
                              href="#"
                              class="text-2xl hover:text-[#F20000] transititext-primary text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                              data-te-toggle="tooltip"
                              title="Update"
                            >
                              <FaEye />
                            </button>
                          </Link>

                          <button
                            onClick={() => handleDelete(item.id, item.title)}
                            className="text-2xl hover:text-[#F20000]"
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

export default AdminPage;
