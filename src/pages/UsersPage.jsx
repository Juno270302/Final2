import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import Movie from "../components/Movie";
import Footer from "../components/Footer";
import ImageMain from "../components/ImageMain";

const UsersPage = () => {
  return (
    <div className="w-full h-[911px] text-white  ">
      <ImageMain />
      <Movie />
      <Footer />
    </div>
  );
};

export default UsersPage;
