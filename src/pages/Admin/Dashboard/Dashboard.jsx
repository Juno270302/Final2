import React, { useEffect, useState } from "react";
import NavbarAdmin from "../../../components/NavbarAdmin";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { MdLocalMovies } from "react-icons/md";
import { SlPeople } from "react-icons/sl";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";

const Dashboard = () => {
  const [payment, setPayment] = useState([]);
  const [movie, setMovie] = useState([]);
  const [author, setAuthor] = useState([]);
  const [search, setSearch] = useState("");
  console.log(movie);

  useEffect(() => {
    onSnapshot(collection(db, "payments"), (snapShot) => {
      let list = [];
      snapShot.docs.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setPayment(list);
    });
  }, []);

  useEffect(() => {
    onSnapshot(collection(db, "movies"), (snapShot) => {
      let list = [];
      snapShot.docs.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setMovie(list);
    });
  }, []);

  useEffect(() => {
    onSnapshot(collection(db, "authors"), (snapShot) => {
      let list = [];
      snapShot.docs.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setAuthor(list);
    });
  }, []);

  const movies = payment.filter((item) => item.money === 10);
  const moviesCount = movies.length;

  console.log(payment);
  return (
    <div className="w-full h-full bg-[#212140]">
      <div className="w-full px-10 py-40 flex flex-row ">
        <NavbarAdmin bg={"bgDashboard"} />
        <div className="max-w-[1200px] h-full mx-auto bg-[#553E58] rounded-3xl text-white ">
          <div className="w-full h-full p-7 space-y-5">
            <div className="flex w-full ">
              <div>
                <h1 className="font-bold text-3xl text-white">Dash Board</h1>
              </div>
            </div>
            <div className="flex justify-between w-full space-x-10">
              <div className=" w-full h-[80px] flex space-x-5 items-center bg-[#212140] rounded-xl">
                <div className="text-[60px] text-[#F20000] px-5">
                  <RiMoneyDollarCircleLine />
                </div>
                <div className="text-xl font-main">
                  <div>Total Amount</div>
                  <div>{moviesCount * 10} USD</div>
                </div>
              </div>
              <div className=" w-full h-[80px] flex space-x-5 items-center bg-[#212140] rounded-xl">
                <div className="text-[50px] text-[#F20000] px-5">
                  <MdLocalMovies />
                </div>
                <div className="text-xl font-main ">
                  <div>Total Movie</div>
                  <div>{movie.length}</div>
                </div>
              </div>
              <div className=" w-full h-[80px] flex space-x-5 items-center bg-[#212140] rounded-xl">
                <div className="text-[40px] text-[#F20000] px-5">
                  <SlPeople />
                </div>
                <div className="text-xl font-main">
                  <div>Total Author</div>
                  <div>{author.length}</div>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="text-xl text-gray-400">Recent Movies</div>
              <input
                className="py-1 px-5 rounded-xl w-[152px] text-black flex float-right mt-2"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Email"
              />
            </div>
            <div className=" w-full h-[500px] overflow-y-scroll whitespace-nowrap scrollbar-hide scroll-smooth">
              <table class="table-fixed border w-full">
                <thead className=" bg-[#E0D5D5] text-[#F20000] ">
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Date</th>
                    <th>Monney</th>
                  </tr>
                </thead>
                {payment
                  ?.slice()
                  ?.reverse()
                  ?.filter((item) => {
                    return search?.toLowerCase() === ""
                      ? item
                      : item.email?.toLowerCase().includes(search);
                  })
                  ?.map((item) => {
                    const timestamp = item?.date.seconds; // This would be the timestamp you want to format

                    const time = new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    }).format(timestamp * 1000);
                    return (
                      <tbody key={item.id}>
                        <tr className="h-[100px] border">
                          <td className=" h-[100px] text-center flex items-center justify-center ">
                            {item?.username}
                          </td>
                          <td className=" text-center overflow-auto scrollbar-hide">
                            {item?.email}
                          </td>
                          <td className=" text-center">{time}</td>
                          <td className=" text-center">{item?.money} USD</td>
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

export default Dashboard;
