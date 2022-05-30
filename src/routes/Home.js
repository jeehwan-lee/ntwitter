import { useEffect, useState } from "react";
import { dbService} from "fbase";
import Nweet from "components/Nweet";

const Home = ({userObj}) => {

    console.log(userObj);

    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);


    /*
    const getNweets = async () => {
        const dbNweets = await dbService.collection("nweets").get();
        dbNweets.forEach((document) => {
            const nweetObject = { ...document.data(), id:document.id};
            setNweets((prev) => [nweetObject, ...prev])
        });
    };*/

    const onSubmit = async (event) =>{
        event.preventDefault();

        await dbService.collection("nweets").add({
            text:nweet,
            createdAt : Date.now(),
            createdId : userObj.uid,
        });
        setNweet("");
    };

    const onChange = (event) => {
        event.preventDefault();

        const {
            target:{value},
        }=event;
        setNweet(value);
    }


    useEffect(() => {
        // getNweets();
        dbService.collection("nweets").onSnapshot((snapshot) => {
            const newArray = snapshot.docs.map((document) => ({
                id:document.id,
                ...document.data(),
            }));
            setNweets(newArray);
        })
    }, []);

    console.log(nweets);
    console.log(userObj.uid);

    return(
        <>
            <form onSubmit={onSubmit}>
                <input value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120}/>
                <input type="submit" value="Nweet"/>
            </form>
            <div>
                {nweets.map((nweet) => (
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.createdId === userObj.uid}/>
                ))}
            </div>
        </>
        
    )
}

export default Home;