import React, { useEffect, useState } from "react";
import NavbarAdmin from "../../../components/NavbarAdmin";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { IoCheckmarkSharp } from "react-icons/io5";
import { FaXmark } from "react-icons/fa6";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const UserShow = () => {
  const [data, setData] = useState();
  const [test, setTest] = useState([]);
  const [search, setSearch] = useState("");
  const [value, setValue] = useState(null);

  const MySwal = withReactContent(Swal);
  const handleAccept = () => {
    MySwal.fire({
      icon: "question",
      title: "Bạn có muốn block tài khoản này không",
      text: "Something went wrong!",
    });
  };

  const today = new Date();
  const priorDate = new Date(new Date().setDate(today.getDate() + 30));
  const cancelDate = new Date(new Date().setDate(today.getDate() - 1));

  useEffect(() => {
    onSnapshot(collection(db, "users"), (snapShot) => {
      let list = [];
      snapShot.docs.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setData(list);
    });
  }, []);

  useEffect(() => {
    setTest(data?.filter((e) => e.role === "user"));
  }, [data]);

  const handleSubmit = async (ID) => {
    const update = doc(db, "users", ID);
    await updateDoc(update, {
      member: "VIP",
      member_date: priorDate,
    });
  };
  const handleCancel = async (ID) => {
    const update = doc(db, "users", ID);
    await updateDoc(update, {
      member: "Member",
      member_date: cancelDate,
    });
  };

  const handleSelect = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const handleBlock = async (ID) => {
    Swal.fire({
      title: `Bạn có muốn block tài khoản này chứ?`,
      icon: "error",
      confirmButtonColor: "#F20000",
      confirmButtonText: "Block",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const update = doc(db, "users", ID);
        await updateDoc(update, {
          block: true,
        });
      }
    });
  };
  const handleUnBlock = async (ID) => {
    Swal.fire({
      title: `Bạn có muốn ân xá cho tài khoản này?`,
      icon: "success",
      confirmButtonColor: "#22C55E",
      confirmButtonText: "Unblock",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const update = doc(db, "users", ID);
        await updateDoc(update, {
          block: false,
        });
      }
    });
  };

  return (
    <div className="w-full h-full bg-[#212140]">
      <div className="w-full px-10 py-40 flex flex-row ">
        <NavbarAdmin bg={"bgUserShow"} />
        <div className="max-w-[1200px] h-full mx-auto bg-[#553E58] rounded-3xl text-white ">
          <div className="w-full h-full p-7 ">
            <div className="flex w-full  items-center justify-center my-5">
              <div className="w-[65%]">
                <h1 className="font-bold text-4xl text-white  float-right  ">
                  User Management
                </h1>
              </div>
              <div className="w-[35%] flex items-center justify-end">
                <div>
                  <select
                    onChange={(e) => handleSelect(e)}
                    class=" py-1 mt-2 bg-gray-700 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 lg:w-[200px]"
                  >
                    <option>All</option>
                    <option>Vip</option>
                    <option>None</option>
                  </select>
                </div>
                <div>
                  <input
                    className="py-1 px-5 rounded-xl w-[152px] text-black flex float-right mt-2"
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search Email"
                  />
                </div>
              </div>
            </div>

            <div className=" w-full h-[500px] overflow-y-scroll whitespace-nowrap scrollbar-hide scroll-smooth">
              <table class="table-fixed border w-full">
                <thead className=" bg-[#E0D5D5] text-[#F20000] ">
                  <tr>
                    <th className=" w-[10%] ">Image</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Block</th>
                    <th>Vip</th>
                    <th>date</th>
                    <th>Extend</th>
                    <th>Cancel</th>
                  </tr>
                </thead>
                {test
                  ?.filter((item) => {
                    return search?.toLowerCase() === ""
                      ? item
                      : item.email?.toLowerCase().includes(search);
                  })
                  ?.filter((e) => {
                    if (value === "All" || value === null) {
                      return e;
                    } else if (value === "Vip") {
                      return e.member.includes("VIP");
                    } else {
                      return e.member.includes("Member");
                    }
                  })
                  ?.map((item) => {
                    const expirationDate = new Date(
                      item?.member_date?.seconds * 1000
                    );
                    const month = expirationDate.getMonth() + 1;
                    const year = expirationDate.getFullYear();
                    const date = expirationDate.getDate();
                    const currentDate = date + "/" + month + "/" + year;

                    return (
                      <tbody key={item.id}>
                        <tr className="h-[100px] border">
                          <td className=" h-[100px] text-center flex items-center justify-center ">
                            <img
                              src={item?.img}
                              width="60px"
                              className="border-2 h-[70px]"
                            />
                          </td>
                          <td className=" text-center overflow-auto scrollbar-hide">
                            {item?.username}
                          </td>
                          <td className=" text-center">{item?.email}</td>
                          <td className=" text-center">
                            {item?.block === true ? (
                              <button
                                onClick={() => handleUnBlock(item.id)}
                                className="bg-green-500  text-white font-bold py-2 px-4 rounded"
                              >
                                Unblock
                              </button>
                            ) : (
                              <button
                                className="bg-red-500  text-white font-bold py-2 px-4 rounded"
                                onClick={() => handleBlock(item.id)}
                              >
                                Block
                              </button>
                            )}
                          </td>
                          <td className="w-full text-center">
                            {item?.member === "VIP" ? (
                              <div className=" flex justify-center text-2xl text-green-500">
                                {" "}
                                <IoCheckmarkSharp />
                              </div>
                            ) : (
                              <div className=" flex justify-center text-2xl text-red-500">
                                <FaXmark />
                              </div>
                            )}
                          </td>
                          <td className="text-center ">{currentDate}</td>
                          <td className="text-center ">
                            <button
                              className="bg-green-500  text-white font-bold py-2 px-4 rounded"
                              onClick={() => handleSubmit(item.id)}
                            >
                              Vip 1 Month
                            </button>
                          </td>
                          <td className="text-center ">
                            <button
                              className="bg-red-500  text-white font-bold py-2 px-4 rounded"
                              onClick={() => handleCancel(item.id)}
                            >
                              Cancel Vip
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

export default UserShow;
