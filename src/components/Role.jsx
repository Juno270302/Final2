import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";

export const Role = () => {
  const { user } = UserAuth();

  const [users, setUsers] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        setUsers(docSnap.data());

        if (docSnap.exists()) {
          // console.log("");
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
      } catch (error) {
        //console.log(error);
      }
    };
    fetchData();
  }, [user?.uid]);
  return users;
};
