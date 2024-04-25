import React, { useEffect, useState } from "react";
import NavbarAdmin from "../../../components/NavbarAdmin";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { IoCheckmarkSharp } from "react-icons/io5";
import { FaXmark } from "react-icons/fa6";

const UserShow = () => {
  const [data, setData] = useState();
  const [test, setTest] = useState([]);
  const [search, setSearch] = useState("");

  const today = new Date();
  const priorDate = new Date(new Date().setDate(today.getDate() + 30));
  const cancelDate = new Date(new Date().setDate(today.getDate() - 1));

  console.log(data);
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
              <div className="w-[35%] ">
                <input
                  className="py-1 px-5 rounded-xl w-[152px] text-black flex float-right mt-2"
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search Contacts"
                />
              </div>
            </div>

            <div className=" w-full h-[500px] overflow-y-scroll whitespace-nowrap scrollbar-hide scroll-smooth">
              <table class="table-fixed border w-full">
                <thead className=" bg-[#E0D5D5] text-[#F20000] ">
                  <tr>
                    <th className=" w-[10%] ">Image</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Address</th>
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
                      : item.username?.toLowerCase().includes(search);
                  })
                  ?.map((item) => {
                    const expirationDate = new Date(
                      item?.member_date?.seconds * 1000
                    );
                    const month = expirationDate.getMonth() + 1;
                    const year = expirationDate.getFullYear();
                    const date = expirationDate.getDate();
                    const currentDate = date + "/" + month + "/" + year;
                    console.log(currentDate);

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
                          <td className=" text-center">{item?.address}</td>
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
                              className="bg-gray-700 px-2 py-1 rounded-2xl"
                              onClick={() => handleSubmit(item.id)}
                            >
                              Up Vip
                            </button>
                          </td>
                          <td className="text-center ">
                            <button
                              className="bg-gray-700 px-2 py-1 rounded-2xl"
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
