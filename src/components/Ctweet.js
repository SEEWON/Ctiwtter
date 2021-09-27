import { deleteDoc, doc, updateDoc } from "@firebase/firestore";
import { deleteObject, ref } from "@firebase/storage";
import { dbService, storageService } from "fbase";
import React, { useState } from "react";

const Ctweet = ({ ctweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newCtweet, setNewCtweet] = useState(ctweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("지우시겠습니까?");
    if (ok) {
      await deleteDoc(doc(dbService, `ctweets/${ctweetObj.id}`));
      await deleteObject(ref(storageService, ctweetObj.attachmentUrl));
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewCtweet(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    await updateDoc(doc(dbService, `ctweets/${ctweetObj.id}`), {
      text: newCtweet,
    });
    setEditing(false);
  };
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="어떻게 수정할까요?"
              value={newCtweet}
              required
              onChange={onChange}
            />
            <input type="submit" value="완료" />
          </form>
          <button onClick={toggleEditing}>닫기</button>
        </>
      ) : (
        <>
          <h4>{ctweetObj.text}</h4>
          {ctweetObj.attachmentUrl && (
            <img
              src={ctweetObj.attachmentUrl}
              alt=""
              width="50px"
              height="50px"
            />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>삭제</button>
              <button onClick={toggleEditing}>수정</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Ctweet;
