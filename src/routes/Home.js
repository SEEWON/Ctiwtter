import Ctweet from "components/Ctweet";
import CtweetFactory from "components/CtweetFactory";
import { dbService } from "fbase";
import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
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

  return (
    <div>
      <CtweetFactory userObj={userObj} />
      <div>
        {ctweets.map((ctweet) => (
          <Ctweet
            key={ctweet.id}
            ctweetObj={ctweet}
            isOwner={ctweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
