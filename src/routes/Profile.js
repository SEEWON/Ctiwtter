import { authService } from "fbase";
import { signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Profile = () => {
  const history = useHistory();
  const onLogOutClick = () => {
    signOut(authService);
    history.push("/");
  };
  const getMyNweets = async () => {};
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
