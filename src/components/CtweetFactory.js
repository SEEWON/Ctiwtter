import React, { useState } from "react";
import { v4 } from "uuid";
import { dbService, storageService } from "fbase";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import { addDoc, collection } from "firebase/firestore";

const CtweetFactory = ({ userObj }) => {
  const [ctweet, setCtweet] = useState("");
  const [attachment, setAttachment] = useState("");

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
  );
};

export default CtweetFactory;
