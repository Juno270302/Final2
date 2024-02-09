import React from "react";
import { ImProfile } from "react-icons/im";
import { Link } from "react-router-dom";

const NavbarAdmin = ({ bg }) => {
  let backGround1, backGround2, backGround3, backGround4, backGround;
  if (bg === "bgProduct") {
    backGround1 =
      "bg-[#E0D5D5] text-[#F20000] rounded font-body text-sm transitions flex gap-3 items-center p-4";
  }
  if (bg === "bgAuthor") {
    backGround2 =
      "bg-[#E0D5D5] text-[#F20000] rounded font-body text-sm transitions flex gap-3 items-center p-4";
  }
  if (bg === "bgUserShow") {
    backGround3 =
      "bg-[#E0D5D5] text-[#F20000] rounded font-body text-sm transitions flex gap-3 items-center p-4";
  }
  if (bg === "bgGenreShow") {
    backGround4 =
      "bg-[#E0D5D5] text-[#F20000] rounded font-body text-sm transitions flex gap-3 items-center p-4";
  }

  return (
    <div className="col-span-2 sticky bg-[#553E58] border border-gray-500 p-6 rounded-2xl xl:mb-0 mb-5 w-[300px]">
      <div className=" space-x-10 flex-col">
        <Link to="/admin">
          <div
            className={
              backGround1 ??
              "rounded font-body text-sm flex gap-3 items-center p-4 text-white hover:bg-[#212140]"
            }
          >
            <ImProfile />
            Product Management
          </div>
        </Link>
        <Link to="/admin/authorshow">
          <div
            className={
              backGround2 ??
              "rounded font-body text-sm flex gap-3 items-center p-4 text-white hover:bg-[#212140]"
            }
          >
            <ImProfile />
            Author Management
          </div>
        </Link>
        <Link to="/admin/usershow">
          <div
            className={
              backGround3 ??
              "rounded font-body text-sm flex gap-3 items-center p-4 text-white hover:bg-[#212140]"
            }
          >
            <ImProfile />
            User Management
          </div>
        </Link>
        <Link to="/admin/genreshow">
          <div
            className={
              backGround4 ??
              "rounded font-body text-sm flex gap-3 items-center p-4 text-white hover:bg-[#212140]"
            }
          >
            <ImProfile />
            Genre Management
          </div>
        </Link>
      </div>
    </div>
  );
};

export default NavbarAdmin;
