import { collection, getDocs, query, where } from "@firebase/firestore";
import { authService, dbService } from "fbase";
import { signOut } from "firebase/auth";
import { updateProfile } from "@firebase/auth";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Profile = ({ refreshUser, userObj }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const onLogOutClick = () => {
    signOut(authService);
    history.push("/");
    refreshUser();
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(userObj, { displayName: newDisplayName });
      refreshUser();
    }
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
      <form onSubmit={onSubmit}>
        <input
          value={newDisplayName}
          onChange={onChange}
          type="text"
          placeholder="Display name"
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
