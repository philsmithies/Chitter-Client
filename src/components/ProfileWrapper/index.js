import "./index.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Image } from "cloudinary-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

export default function ProfileWrapper(props) {
  const formatDate = (date) => {
    return format(new Date(date), "MMM yyyy");
  };

  return (
    <div className="profile_wrapper">
      <div className="profile_functions">
        <div className="arrow">
          <Link to="/">
            <ArrowBackIcon />
          </Link>
        </div>
        <div className="functions_text">
          <h3>
            {" "}
            {props.username}
            <br />
            <span className="tweetsSpan">{props.length} tweets</span>
          </h3>
        </div>
      </div>
      <div className="bannerimg">
        {props.bioPhotoId ? (
          <Image cloudName="chitter" publicId={props.bioPhotoId} />
        ) : (
          <img
            src={process.env.PUBLIC_URL + "/img/banner.jpeg"}
            alt="banner"
          ></img>
        )}
      </div>
      <div className="bio_wrapper">
        <div className="follow_wrapper">
          {props.publicId ? (
            <Image
              className="profile_hero"
              cloudName="chitter"
              publicId={props.publicId}
            />
          ) : (
            <img
              src={process.env.PUBLIC_URL + "/img/bluetit.jpg"}
              alt="new user"
              className="profile_hero"
            />
          )}
          <div className="followBtn">Follow</div>
        </div>
        <div className="bio_text">
          <h3>
            {props.fullName || ""}
            <br />
            <span>@{props.username}</span>
          </h3>
          <p>
            {props.bio}
            <br />
            Joined{" "}
            {props.createdAt ? formatDate(props.createdAt) : "August 2021"}{" "}
          </p>
          {props.bioPhotoId !== "" ? (
            <div>
              <Image cloudName="chitter" bioPhotoId={props.bioPhotoId} />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
