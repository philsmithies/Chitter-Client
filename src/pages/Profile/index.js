import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";
import axios from "axios";
import "./index.css";
import { useParams } from "react-router-dom";
import Tweet from "../../components/Tweet/";
import ExploreBar from "../../components/ExploreBar";
import EditModal from "../../components/EditModal";
import SignUpBar from "../../components/SignUpBar";
import ProfileWrapper from "../../components/ProfileWrapper";

export default function Profile() {
  const { user } = useContext(UserContext);
  const [data, setData] = useState();
  const [tweets, setTweets] = useState();
  const { userId } = useParams();

  const getProfileData = function (userId) {
    if (!userId) {
      axios({
        method: "GET",
        withCredentials: true,
        url: "https://chitter-twitterclone.herokuapp.com/profile",
      }).then((res) => {
        console.log(res.data);
        setData(res.data);
      });
    } else {
      axios({
        method: "GET",
        withCredentials: true,
        url: "https://chitter-twitterclone.herokuapp.com/profile/" + userId,
      }).then((res) => {
        setData(res.data);
        // console.log(data.bioPhotoId);
      });
    }
  };

  const getTweets = async () => {
    try {
      await axios
        .get("https://chitter-twitterclone.herokuapp.com/users/" + userId + "/tweets/")
        .then((response) => {
          setTweets(response.data);
        });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getProfileData(userId);
    getTweets();
  }, []);

  const EditButton = () => {
      if (userId) {
        if (user === userId) {
          return <EditModal />;
        } else {
          return '';
        }
      }
  }

  return (
    <div className="profile_grid">
      {data ? (
        <div className="profile_wrapper">
          <ProfileWrapper
            username={data.username}
            bio={data.bio ? data.bio : "New Chipper"}
            fullName={data.fullName}
            length={tweets ? tweets.length : ""}
            cloudName="chitter"
            publicId={data.publicId}
            bioPhotoId={data.bioPhotoId}
            createdAt={data.createdAt}
          />
          <div className="profile_content">
            {tweets
              ? tweets.map((value, index) => (
                  <Tweet
                    key={index}
                    fullName={value.author.fullName}
                    publicId={value.author ? value.author.publicId : ""}
                    imageUrl={value.author.imageUrl ? value.author.imageUrl : ""}
                    text={value.text}
                    username={value.author ? value.author.username : ""}
                    createdAt={value.createdAt}
                  />
                ))
              : ''}
          </div>
        </div>
      ) : null}
      <div className="sidebar">
        <ExploreBar />
      </div>
      <div className="signupbar">
        <SignUpBar />
        <EditButton/>
        <p className="project_text">
          This is a project by{" "}
          <a className="name_text" href="www.github.com/philsmithies">
            <span>Phil Smithies.</span>
          </a>
        </p>
      </div>
    </div>
  );
}
