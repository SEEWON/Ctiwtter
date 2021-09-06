import { dbService } from "fbase";
import { addDoc, collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const Home = () => {
    const [ctweet, setCtweet] = useState("");
    const [ctweets, setCtweets] = useState([]);
    const getCtweets = async () => {
        const dbCtweets = await getDocs(collection(dbService,"ctweets"));
        dbCtweets.forEach( (document) => {
            const ctweetObject = {
                ...document.data(),
                id: document.id,
            };
            setCtweets((prev) => [ctweetObject, ...prev]);
        });
    };
    console.log(ctweets);
    useEffect(() => {
        getCtweets();
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
            <div>
                {ctweets.map((ctweet) => 
                    <div key={ctweet.id}>
                        <h4>{ctweet.ctweet}</h4>
                    </div>)}
            </div>
        </div>
    );
    };
export default Home;