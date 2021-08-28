import TweetModal from "../TweetModal";
import { useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";
import "./index.css";

export default function ExploreBar() {
  const data = useContext(UserContext);
  return (
    <div className="explore_wrapper">
      <div>
        <a href="/">
          <img src={process.env.PUBLIC_URL + "/img/bird.png"} className="birdLogo" alt="chitter logo" />
        </a>
      </div>
      <div>
        <a href="/">
          <h1 className="menuItem">
            <img src={process.env.PUBLIC_URL + "/img/hashtag.png"} alt="hashtag" className="hashtag" /> Explore
          </h1>
        </a>
        {data ? <TweetModal /> : <TweetModal link={"/signup"} />}
      </div>
    </div>
  );
}
