import React from "react";
import { Link } from "react-router-dom";
import { ImProfile } from "react-icons/im";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineFavorite } from "react-icons/md";
import { MdOutlineHistory } from "react-icons/md";

const NavbarAccount = ({ bg }) => {
  let backGround1, backGround2, backGround3, backGround4, backGround;
  if (bg === "bgAccount") {
    backGround1 =
      "bg-[#E0D5D5] text-[#F20000] rounded font-body text-sm transitions flex gap-3 items-center p-4";
  }
  if (bg === "bgPassword") {
    backGround2 =
      "bg-[#E0D5D5] text-[#F20000] rounded font-body text-sm transitions flex gap-3 items-center p-4";
  }
  if (bg === "bgFavorite") {
    backGround3 =
      "bg-[#E0D5D5] text-[#F20000] rounded font-body text-sm transitions flex gap-3 items-center p-4";
  }
  if (bg === "bgHistory") {
    backGround4 =
      "bg-[#E0D5D5] text-[#F20000] rounded font-body text-sm transitions flex gap-3 items-center p-4";
  }

  return (
    <div className="col-span-2 sticky bg-[#553E58] border border-gray-500 p-6 rounded-2xl xl:mb-0 mb-5 w-[300px]">
      <div className=" space-x-10 flex-col">
        <Link to="/account">
          <div
            className={
              backGround1 ??
              "rounded font-body text-sm flex gap-3 items-center p-4 text-white hover:bg-[#212140]"
            }
          >
            <ImProfile />
            My Account
          </div>
        </Link>
        <Link to="/account/changepassword">
          <div
            className={
              backGround2 ??
              "rounded font-body text-sm flex gap-3 items-center p-4 text-white hover:bg-[#212140]"
            }
          >
            <RiLockPasswordLine />
            Change Password
          </div>
        </Link>
        <Link to="/account/saveshow">
          <div
            className={
              backGround3 ??
              "rounded font-body text-sm flex gap-3 items-center p-4 text-white hover:bg-[#212140]"
            }
          >
            <MdOutlineFavorite />
            Favories Movies
          </div>
        </Link>
        <Link to="/account/history">
          <div
            className={
              backGround4 ??
              "rounded font-body text-sm flex gap-3 items-center p-4 text-white hover:bg-[#212140]"
            }
          >
            <MdOutlineHistory />
            History
          </div>
        </Link>
      </div>
    </div>
  );
};

export default NavbarAccount;
