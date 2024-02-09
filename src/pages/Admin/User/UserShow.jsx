import React, { useEffect, useState } from "react";
import NavbarAdmin from "../../../components/NavbarAdmin";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";

const UserShow = () => {
  const [data, setData] = useState();
  const [test, setTest] = useState([]);

    

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
    setTest(
        data?.filter((e) => e.role === "user")
    )
  },[data])

  return (
    <div className="w-full h-full bg-[#212140]">
      <div className="w-full px-10 py-40 flex flex-row ">
        <NavbarAdmin bg={"bgUserShow"} />
        <div className="max-w-[1200px] h-full mx-auto bg-[#553E58] rounded-3xl text-white ">
          <div className="w-full h-full p-7 ">
            <div className="flex w-full  items-center justify-center py-5">
              <div>
                <h1 className="font-bold text-4xl text-white  float-right  ">
                  User Management
                </h1>
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
                {test?.map((item) => (
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
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserShow;
