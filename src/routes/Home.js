import { useEffect, useState } from "react";
import { dbService, storageService} from "fbase";
import Nweet from "components/Nweet";
import {v4 as uuidv4} from "uuid";
import { getDownloadURL, ref, uploadString} from "firebase/storage";

const Home = ({userObj}) => {

    console.log(userObj);

    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const [attachment, setAttachment] = useState("");
    const [imageUrl, setImageUrl] = useState("");

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

        let url = "";

        if(attachment !== "") { 
            const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
        // const attachmentRef = storageService.ref().child(`${userObj.uid}/"ddd"`);
            const response = await uploadString(attachmentRef, attachment, "data_url");
            console.log(response);

            url = await getDownloadURL(response.ref);

        }

        await dbService.collection("nweets").add({
            text:nweet,
            createdAt : Date.now(),
            createdId : userObj.uid,
            url,
        });
        setNweet("");
        setAttachment("");

    };

    const onChange = (event) => {
        event.preventDefault();

        const {
            target:{value},
        }=event;
        setNweet(value);
    }

    const onFileChange = (event) => {
        const {
            target : {files},
        } = event;
        const theFile = files[0];
        const reader = new FileReader();

        reader.onloadend = (finishedEvent) => {
            const {
                currentTarget : {result},
            } = finishedEvent;
            setAttachment(result);
        }
        reader.readAsDataURL(theFile);
    };

    const onClearAttachment = () => {
        setAttachment("");
    };


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
                <input type="file" accept="image/*" onChange={onFileChange}/>
                <input type="submit" value="Nweet"/>
                {attachment && (
                    <div>
                            <img src={attachment} width="50px" height="50px" />
                            <button onClick={onClearAttachment}>Clear</button>
                    </div> )
                }
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