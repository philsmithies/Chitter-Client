import React, { useState } from "react";
// import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import "./index.css";
import { useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { Image } from "cloudinary-react";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

export default function TweetModal(props) {
  const classes = useStyles();
  const data = useContext(UserContext);

  const url = "https://api.cloudinary.com/v1_1/dryaxqxie/image/upload";
  const preset = "chitter";
  const [image, setImage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [tweet, setTweet] = useState("");
  const [previewSource, setPreviewSource] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  let newMsgTimeoutHandle = 0;

  const openModal = () => {
    if (props.link) {
      window.location.href = "/signup";
    } else {
      setIsOpen(true);
    }
  };

  const closeModal = () => {
    console.log("closed");
    setIsOpen(false);
  };

  const onChange = (e) => {
    setImage(e.target.files[0]);
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    // reads the file as url to create preview
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  // const componentWillUnmount = () => {
  //   clearTimeout(newMsgTimeoutHandle);
  // };

  const postTweet = async (publicId) => {
    try {
      await Axios.post(
        "http://localhost:3001/new",
        {
          text: tweet,
          author: data,
          imageUrl: publicId,
        },
        {
          withCredentials: true,
        }
      ).then((response) => {
        console.log(response);
        if (response.data === "Tweet Created") {
          window.location.href = "/";
        } else if (response.data !== "Tweet Created") {
          setErrorMsg("Tweet could not be created");
          clearTimeout(newMsgTimeoutHandle);
          newMsgTimeoutHandle = setTimeout(() => {
            setErrorMsg("");
            newMsgTimeoutHandle = 0;
          }, 10000);
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  const checkValidation = async (e) => {
    if (!image) {
      let publicId = "";
      postTweet(publicId);
    } else {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", preset);
      const res = await Axios.post(url, formData);
      let publicId = res.data.secure_url;
      postTweet(publicId);
    }
  };

  // useEffect(() => {
  //   const handleClick = (e) => {
  //     if (e.target.className !== "modal" && e.target.className !== "button") {
  //       closeModal()
  //     }
  //   };
  //   if (isOpen) {
  //     console.log('open')
  //     window.addEventListener("click", handleClick);
  //   }
  // }, [isOpen]);

  return (
    <div className="App">
      {isOpen && (
        <>
          <div className="overlay"></div>
          <div className="modal">
            <header className="modal__header">
              <div onClick={closeModal} className="close-button">
                &times;
              </div>
            </header>
            <main className="modal__main">
              <div>
                {errorMsg}
                <form autoComplete="off">
                  <div className="tweetDiv">
                    <div className="inputPhoto">
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
                    <input
                      type="text"
                      id="tweetInput"
                      name="tweet"
                      placeholder="Whats happening?"
                      required
                      onChange={(e) => {
                        setTweet(e.target.value);
                      }}
                    />
</div>
                    <input
                      required
                      accept="image/*"
                      className={classes.input}
                      id="contained-button-file"
                      multiple
                      type="file"
                      onChange={onChange}
                    />
                    <label htmlFor="contained-button-file">
                      <AddAPhotoIcon className="addPhoto" />
                    </label>
                  </div>
                  <div className="uploadBtn">
                    <Button
                       id="submitBtn"
                      className="tweetBtnSubmit"
                      onClick={checkValidation}
                    >
                      Tweet
                    </Button>
                  </div>
                </form>
              </div>
            </main>
            {previewSource && (
              <div className="previewDiv">
                <img
                  src={previewSource}
                  alt="chosen"
                  className="preview-image"
                />
              </div>
            )}
          </div>
        </>
      )}

      <button className="tweetSideButton" onClick={openModal}>
        Tweet
      </button>
    </div>
  );
}
