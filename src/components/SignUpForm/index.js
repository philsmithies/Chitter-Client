import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import "./index.css";

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

export default function SignUpForm() {
  const classes = useStyles();

  const url = "https://api.cloudinary.com/v1_1/dryaxqxie/image/upload";
  const preset = "chitter";
  const [passwordMsg, setPasswordMsg] = useState("");
  const [image, setImage] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [usernameReg, setUsernameReg] = useState("");
  const [fullNameReg, setFullNameReg] = useState("");

  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordConfirmError, setPasswordConfirmError] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  const [userMsg, setUserMsg] = useState("");

  const emailRegex = new RegExp(
    "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
  );

  const userRegex = new RegExp("\\s+");

  let newMsgTimeoutHandle = 0;

  const onChange = (e) => {
    setImage(e.target.files[0]);
  };

  const register = async () => {
    
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", preset);
    const res = await Axios.post(url, formData);
    const imageUrl = res.data.secure_url;
    try {
      await Axios.post(
        "https://chitter-twitterclone.herokuapp.com/signup",
        {
          username: usernameReg,
          fullName: fullNameReg,
          password: passwordReg,
          email: emailReg,
          publicId: imageUrl,
        },
        {
          withCredentials: true,
        }
      ).then((response) => {
        console.log(response);
        if (response.data === "User Created") {
          window.location.href = "/login";
        } else if (response.data !== "User Created") {
          setErrorMsg(
            "User already exists, please sign in or create new account"
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

  const registerNoPhoto = async () => {
    try {
      await Axios.post(
        "https://chitter-twitterclone.herokuapp.com/signup",
        {
          username: usernameReg,
          fullName: fullNameReg,
          password: passwordReg,
          email: emailReg,
          publicId: '',
        },
        {
          withCredentials: true,
        }
      ).then((response) => {
        console.log(response);
        if (response.data === "User Created") {
          window.location.href = "/login";
        } else if (response.data !== "User Created") {
          setErrorMsg(
            "User already exists, please sign in or create new account"
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

  const checkValidation = (e) => {
    if (!emailRegex.test(emailReg)) {
      setEmailError(true);
      setEmailMsg("Not a valid email address");
      clearTimeout(newMsgTimeoutHandle);
      newMsgTimeoutHandle = setTimeout(() => {
        setEmailMsg("");
        newMsgTimeoutHandle = 0;
      }, 6500);
    } else if (passwordReg !== confirmPassword) {
      setPasswordMsg("Passwords do not match");
      setPasswordConfirmError(true);
      clearTimeout(newMsgTimeoutHandle);
      newMsgTimeoutHandle = setTimeout(() => {
        setPasswordMsg("");
        newMsgTimeoutHandle = 0;
      }, 6500);
    } else if (usernameReg === "" || userRegex.test(usernameReg)) {
      setUserMsg("Please enter a valid username without spaces");
      setUsernameError(true);
      clearTimeout(newMsgTimeoutHandle);
      newMsgTimeoutHandle = setTimeout(() => {
        setUserMsg("");
        newMsgTimeoutHandle = 0;
      }, 6500);
    } else if (image) {
      register();
    } else {
      registerNoPhoto()
    }
  };

  return (
    <div>
      {errorMsg}
      <form autoComplete="off">
        <TextField
          error={usernameError}
          helperText={userMsg}
          id="standard-full-width"
          label="username"
          placeholder="@jim"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => {
            setUsernameReg(e.target.value);
          }}
        />
        <TextField
          id="standard-full-width"
          label="full name"
          placeholder="JimBob"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => {
            setFullNameReg(e.target.value);
          }}
        />
        <TextField
          error={emailError}
          helperText={emailMsg}
          type="email"
          id="standard-full-width"
          label="email"
          placeholder="jack@chitter.com"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => {
            setEmailReg(e.target.value);
          }}
        />
        <TextField
          type="password"
          id="standard-full-width"
          label="password"
          placeholder="***********"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => {
            setPasswordReg(e.target.value);
          }}
        />
        <TextField
          error={passwordConfirmError}
          helperText={passwordMsg}
          type="password"
          id="standard-full-width"
          label="confirm password"
          placeholder="***********"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
        <div
          className={classes.root}
          style={{ margin: 30 }}
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
            style={{width: 290, backgroundColor: "lightblue" }}
            onClick={checkValidation}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
