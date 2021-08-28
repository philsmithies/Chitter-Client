import SignUpBarBtn from "../Buttons/SignUpBarBtn";
import ProfileBtn from "../Buttons/ProfileBtn";
import { useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";
import "./index.css";

export default function SignUpBar() {
  const { user } = useContext(UserContext);

  return (
    <div className="SignUpBarWrapper">
      {user ? (
        <div>
          <h2 className="welcome_title">Hello {user}</h2>
          <ProfileBtn username={user} />
          <SignUpBarBtn text={"Log Out"} />
        </div>
      ) : (
        <div>
          <h1>New To Chitter?</h1>
          <p>Sign up now to get your own personalized timeline!</p>
          <SignUpBarBtn text={"Sign Up"} link={'/signup'}/>
          <SignUpBarBtn text={"Log In"} link={'/login'}/>
        </div>
      )}
    </div>
  );
}
