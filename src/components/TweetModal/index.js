import React, { useState } from "react";
import "./index.css";
import Axios from "axios";
import { useContext } from "react";
import Button from "@material-ui/core/Button";
import { UserContext } from "../../Contexts/UserContext";

export default function TweetModal(props) {
  const url = "https://api.cloudinary.com/v1_1/dryaxqxie/image/upload";
  const preset = "chitter";
  const data = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [tweet, setTweet] = useState("");
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

  const newTweet = async () => {
    // const formData = new FormData();
    // formData.append("file", image);
    // formData.append("upload_preset", preset);
    // const res = await Axios.post(url, formData);
    let imageUrl = "hello"
    try {
      await Axios.post(
        "http://localhost:3001/tweets/new/",
        {
          text: tweet,
          author: data,
          imageUrl: imageUrl,
        },
        {
          withCredentials: true,
        }
      ).then((response) => {
        console.log(response);
        if (response.data === "Tweet Created") {
          window.location.href = "/login";
        } else if (response.data !== "Tweet Created") {
          setErrorMsg(
            "There was a problem"
          );
          clearTimeout(newMsgTimeoutHandle);
          newMsgTimeoutHandle = setTimeout(() => {
            setErrorMsg("");
            newMsgTimeoutHandle = 0;
          }, 6500);
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

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
                <form>
                  <input
                    type="text"
                    id="tweet"
                    name="tweet"
                    placeholder="Whats on your mind?"
                    required
                    onChange={(e) => {
                      setTweet(e.target.value);
                    }}
                  />
                  <button className="submitBtn" onClick={newTweet}>
                    <p>Tweet</p>
                  </button>
                  {!previewSource && (
                    <div className="addPhotoBtn">
                      <Button variant="contained" component="label">
                        Add a Photo
                        <input
                          accept="image/*"
                          id="contained-button-file"
                          multiple
                          type="file"
                          style={{ display: "none" }}
                          onChange={onChange}
                        />
                      </Button>
                    </div>
                  )}
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

      <button className="button" onClick={openModal}>
        Tweet
      </button>
    </div>
  );
}
