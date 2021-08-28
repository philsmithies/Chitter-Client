import React, { useState, useContext } from "react";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { UserContext } from "../../Contexts/UserContext";
import { useHistory } from "react-router-dom";
import Axios from "axios";

export default function LogInForm() {
  const history = useHistory();

  const { setUser } = useContext(UserContext);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [noUserMsg, setNoUserMsg] = useState('');
  const [noUserError, setNoUserError] = useState(false);

  const login = () => {
    Axios({
      method: "POST",
      data: {
        username: loginUsername.toLowerCase(),
        password: loginPassword,
      },
      withCredentials: true,
      url: "http://localhost:3001/login",
    }).then((res) => {
      if (res.data.auth) {
        setUser(res.data.user.username)
        history.push("/");
      } else if (res.data === "No User Exists") {
        setNoUserMsg("User Not Found");
        setNoUserError(true); 
      }
    });
  };

  return (
    <form autoComplete="off">
      <TextField
        error={noUserError}
        helperText={noUserMsg}
        id="standard-full-width"
        label="username"
        placeholder="@jim"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => {
          setLoginUsername(e.target.value);
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
          setLoginPassword(e.target.value);
        }}
      />
      <Button
        variant="contained"
        style={{ margin: 30, backgroundColor: "lightblue" }}
        onClick={login}
      >
        Submit
      </Button>
    </form>
  );
}
