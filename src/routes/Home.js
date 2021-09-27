import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import Ctweet from "components/Ctweet";
import { dbService, storageService } from "fbase";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { v4 } from "uuid";

const Home = ({ userObj }) => {
  const [ctweet, setCtweet] = useState("");
  const [ctweets, setCtweets] = useState([]);
  const [attachment, setAttachment] = useState();
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
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = ref(storageService, `${userObj.uid}/${v4()}`);
      const response = await uploadString(
        attachmentRef,
        attachment,
        "data_url",
      );
      attachmentUrl = await getDownloadURL(response.ref);
    }
    const ctweetObj = {
      text: ctweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    await addDoc(collection(dbService, "ctweets"), ctweetObj);
    setCtweet("");
    setAttachment("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setCtweet(value);
  };
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  const onClearAttachment = () => setAttachment(null);
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={ctweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Ctweet" />
        {attachment && (
          <div>
            <img src={attachment} alt="" width="50px" height="50px" />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
      </form>
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
