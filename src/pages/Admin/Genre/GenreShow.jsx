import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavbarAdmin from "../../../components/NavbarAdmin";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
const GenreShow = () => {
  const [genre, setGenre] = useState();
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

  const handleDelete = async (id, title) => {
    MySwal.fire({
      title: `Do You Want Delete ${title}`,
      icon: "error",
      confirmButtonColor: "#F20000",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(doc(db, "genres", id));
      }
    });
  };

  return (
    <div className="w-full h-full bg-[#212140]">
      <div className="w-full px-10 py-40 flex flex-row ">
        <NavbarAdmin bg={"bgGenreShow"} />
        <div className="max-w-[1200px] w-full h-full mx-auto bg-[#553E58] rounded-3xl text-white ">
          <div className="w-full h-full p-7 ">
            <div className="flex w-full  items-center justify-center py-5">
              <div className="w-[55%]  ">
                <h1 className="font-bold text-4xl text-white  float-right  ">
                  Genre Management
                </h1>
              </div>
              <div className="w-[40%] ">
                <Link to={`/admin/addgenre`}>
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
                    <th>Name</th>
                    <th>Acion</th>
                  </tr>
                </thead>
                {genre?.map((item) => (
                  <tbody key={item.id}>
                    <tr className="h-[100px] border">
                      <td className=" text-center overflow-auto scrollbar-hide">
                        {item?.key}
                      </td>

                      <td className=" text-center space-x-3 ">
                        <button
                          onClick={() => handleDelete(item.id, item?.key)}
                          className="text-2xl hover:text-[#F20000]"
                        >
                          <MdDeleteForever />
                        </button>
                      </td>
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

export default GenreShow;
