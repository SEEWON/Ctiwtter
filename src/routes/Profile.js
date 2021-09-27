import { collection, getDocs, query, where } from "@firebase/firestore";
import { authService, dbService } from "fbase";
import { signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Profile = ({ userObj }) => {
  const history = useHistory();
  const onLogOutClick = () => {
    signOut(authService);
    history.push("/");
  };
  const getMyNweets = async () => {
    const q = query(
      collection(dbService, "ctweets"),
      where("creatorId", "==", userObj.uid),
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
    });
  };
  useEffect(() => {
    getMyNweets();
  }, []);
  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
