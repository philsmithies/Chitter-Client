import { useState, useEffect } from "react";
import axios from "axios";
import Tweet from "../Tweet/";
import "./index.css";

export default function Feed() {
  // const [tweetId, setTweetId] = useState();
  const [allData, setAllData] = useState([]);

  const getTweets = () => {
    axios("http://localhost:3001/tweets")
      .then((response) => {
        setAllData(response.data);
      })
      .catch((error) => {
        console.log("Error getting data: " + error);
      });
  };

  // use for individual links

  // const getTweet = async () => {
  //   try {
  //     await axios
  //       .get("http://localhost:3001/tweets/" + tweetId)
  //       .then((response) => {
  //         console.log(response);
  //       });
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  useEffect(() => {
    getTweets();
  }, []);

  return (
    <div className="tweets_feed">
      {allData.map((value, index) => (
          <Tweet
            key={index}
            fullName={value.author.fullName}
            publicId={value.author ? value.author.publicId : ""}
            imageUrl={value.imageUrl}
            text={value.text}
            username={value.author ? value.author.username : ""}
            createdAt={value.createdAt}
          />
      ))}
    </div>
  );
}
