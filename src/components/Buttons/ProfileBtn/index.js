import "./index.css";
import { Link } from 'react-router-dom';

export default function ProfileBtn(props) {
  return (
    <div>
      <Link to={`/profile/` + props.username || '/'} className="SignUpLink">
        <div className="logInBtn">
          <p>Profile</p>
        </div>
      </Link>
    </div>
  );
}
