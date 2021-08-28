import LogInForm from "../../components/LogInForm";
import "./index.css";
import Footer from "../../components/Footer";

export default function LogIn() {
  return (
    <div className="logInWrapper">
      <div className="logInForm">
        <h2 className="login_header">Log In</h2>
        <LogInForm />
      </div>
      <p className="accountText">
        Need an account? <a href="/signup">Sign Up</a>
      </p>
      <Footer />
    </div>
  );
}
