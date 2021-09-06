import Ctweet from "components/Ctweet";
import { dbService } from "fbase";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
  const [ctweet, setCtweet] = useState("");
  const [ctweets, setCtweets] = useState([]);
  useEffect(() => {
    onSnapshot(collection(dbService, "ctweets"), (snapshot) => {
      const ctweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCtweets(ctweetArray);
    });
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    await addDoc(collection(dbService, "ctweets"), {
      text: ctweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setCtweet("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setCtweet(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={ctweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
        <input type="submit" value="Ctweet" />
      </form>
      <div>
        {ctweets.map((ctweet) => (
          <Ctweet key={ctweet.id} ctweetObj={ctweet} isOwner={ctweet.creatorId === userObj.uid} />
        ))}
      </div>
    </div>
  );
};
export default Home;
