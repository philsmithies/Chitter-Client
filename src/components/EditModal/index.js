import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import "./index.css";
import { useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { useHistory } from "react-router-dom";

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

// remove props
export default function EditModal(props) {
  const { user } = useContext(UserContext);
  const classes = useStyles();
  const history = useHistory();

  const url = "https://api.cloudinary.com/v1_1/dryaxqxie/image/upload";
  const preset = "chitter";
  const [image, setImage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [bio, setBio] = useState("");
  const [fullName, setFullName] = useState("");
  let newMsgTimeoutHandle = 0;

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
        console.log(user)
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
    console.log(image);
  };


  const updateProfile = async (photoId) => {
    try {
      await Axios.post(
        "http://localhost:3001/users/" + user + "/update/",
        {
          bio: bio,
          fullName: fullName,
          bioPhotoId: photoId,
        },
        {
          withCredentials: true,
        }
      ).then((response) => {
        // console.log(response);
        if (response.data === "Bio Updated") {
          history.push(`/`);
        } else if (response.data !== "Bio Updated") {
          setErrorMsg("Bio could not be updated");
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
      let photoId = "";
      updateProfile(photoId);
    } else {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", preset);
      const res = await Axios.post(url, formData);
      let photoId = res.data.secure_url;
      updateProfile(photoId);
    }
  };

  return (
    <div className="updateBioWrapper">
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
                <div>
                  {errorMsg}
                  <form autoComplete="off">
                    <TextField
                      id="standard-full-width"
                      label="Name"
                      placeholder={props.fullName}
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => {
                        setFullName(e.target.value);
                      }}
                    />
                    <TextField
                      id="standard-full-width"
                      label="Your Bio"
                      placeholder={props.bio}
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(e) => {
                        setBio(e.target.value);
                      }}
                    />
                    <div
                      // className={classes.root}
                      style={{ margin: 30 }}
                      className="uploadBtn"
                    >
                      <input
                        accept="image/*"
                        className={classes.input}
                        id="contained-button-file"
                        multiple
                        type="file"
                        onChange={onChange}
                      />
                      <label htmlFor="contained-button-file">
                        <Button variant="contained" component="span">
                          Update Bio Photo
                        </Button>
                      </label>
                    </div>
                    <div className="uploadBtn">
                      <Button
                        variant="contained"
                        style={{ width: 290, backgroundColor: "lightblue" }}
                        onClick={checkValidation}
                      >
                        Submit
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </main>
            {/* {previewSource && (
              <div className="previewDiv">
                <img
                  src={previewSource}
                  alt="chosen"
                  className="preview-image"
                />
              </div>
            )} */}
          </div>
        </>
      )}

      <button className="button" onClick={openModal}>
        Edit Bio
      </button>
    </div>
  );
}