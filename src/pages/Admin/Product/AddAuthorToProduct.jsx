import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../firebase";
import ChooseAuthor from "../../../components/ChooseAuthor";
import { useLocation } from "react-router-dom";

const AddAuthorToProduct = () => {
  const use = useLocation();
  const movie = use.state.from;
  const [data, setData] = useState();


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
  return (
    <div>
      <ChooseAuthor item={data} movie={movie} />
    </div>
  );
};

export default AddAuthorToProduct;
