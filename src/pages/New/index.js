import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import "./index.css";
import { useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";

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

export default function NewTweet() {
  const classes = useStyles();
  const data = useContext(UserContext);

  const url = "https://api.cloudinary.com/v1_1/dryaxqxie/image/upload";
  const preset = "chitter";
  const [image, setImage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [tweet, setTweet] = useState("");

  let newMsgTimeoutHandle = 0;

  const onChange = (e) => {
    setImage(e.target.files[0]);
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

  return (
    <div>
      {errorMsg}
      <form autoComplete="off">
        <TextField
          id="standard-full-width"
          label="username"
          placeholder="tweet"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => {
            setTweet(e.target.value);
          }}
        />
        <div
          style={{ margin: 30 }}
          className="uploadBtn"
        >
          
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
            <Button variant="contained" component="span">
              Upload Profile Picture
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
  );
}
