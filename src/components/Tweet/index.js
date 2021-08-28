import "./index.css";
import RepeatIcon from "@material-ui/icons/Repeat";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import LinkIcon from "@material-ui/icons/Link";
import { Link } from "react-router-dom";
// import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { format } from "date-fns";
import { Image } from "cloudinary-react";
// import axios from "axios";
// import { useContext } from "react";
// import { UserContext } from "../../Contexts/UserContext";

export default function Tweet(props) {
  // const data = useContext(UserContext);
  const formatDate = (date) => {
    return format(new Date(date), "E MMM dd yyyy");
  };

  // const likeTweet = async () => {
  //   try {
  //     await axios
  //       .post(
  //         "http://localhost:3001/likes/" + props.tweetId,
  //         {
  //           type: "like",
  //           author: data,
  //         },
  //         {
  //           withCredentials: true,
  //         }
  //       )
  //       .then((response) => {
  //         // console.log(response);
  //       });
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  return (
    <div>
      <div className="tweet_wrapper">
        <div className="profile_photo">
          {props.publicId ? (
            <Image
              className="profile_photo"
              cloudName="chitter"
              publicId={props.publicId}
            />
          ) : (
            <img
              src={process.env.PUBLIC_URL + "/img/bluetit.jpg"}
              alt="new user"
            ></img>
          )}
        </div>
        <div className="tweet_content">
          <div className="username">
            <Link to={`/profile/${props.username}` || '/'} className="profileLinks">
              <strong>{props.fullName}</strong>
            </Link>
            <small className="usernameText">
              @{props.username ? props.username : ""}
            </small>
            <small className="dateText">{formatDate(props.createdAt)}</small>

            {/* <div className="threeDots">
              <MoreHorizIcon/>
            </div> */}
          </div>

          <div className="bodyText">{props.text}</div>
          <div>
            {props.imageUrl !== "" ? (
              <Link to={props.imageUrl || '/'}>
                <Image
                  className="tweet_photo"
                  cloudName="chitter"
                  publicId={props.imageUrl}
                />
              </Link>
            ) : (
              ""
            )}
          </div>
          <div className="tweet_functions">
            <ChatBubbleOutlineIcon className="chatBubble" />
            <RepeatIcon className="retweet" />
            <FavoriteBorderIcon
              className="heart"
              // onClick={() => {
              //   likeTweet();
              // }}
            />
            <LinkIcon className="link" />
          </div>
        </div>
      </div>
    </div>
  );
}
