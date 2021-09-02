import { dbService } from "fbase";
import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const Home = () => {
    const [ctweet, setCtweet] = useState("");
    const [ctweets, setCtweets] = useState([]);
    useEffect(() => {

    }, [])
    const onSubmit = async (event) => {
        event.preventDefault();
        await addDoc(collection(dbService,"ctweets"),{
            ctweet,
            createdAt:Date.now(),
        });
        setCtweet("");
    };
    const onChange = (event) => {
        const {
            target: {value}
        } = event;
        setCtweet(value);
    };
    return (
        <div>
            <form onSubmit = {onSubmit}>
                <input
                value={ctweet}
                onChange={onChange} 
                type="text" 
                placeholder="What's on your mind?" 
                maxLength={120} />
                <input type="submit" value="Ctweet" />
            </form>

        </div>
    );
    };
export default Home;