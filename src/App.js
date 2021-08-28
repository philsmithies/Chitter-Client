import React, { useState, useMemo } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Index from "./pages/Home";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Profile from "./pages/Profile";
import New from "./pages/New";
import Test from "./pages/Test.js";
import Footer from "./components/Footer";
import { UserContext } from "./Contexts/UserContext";

function App() {
  const [user, setUser] = useState(null);
  // memo prevents the change unless anything else changes.
  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <Router>
      <div className="App">
        <UserContext.Provider value={providerValue}>
          <Switch>
            <Route path="/" exact component={Index} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/login" exact component={LogIn} />
            <Route path="/profile/:userId" exact component={Profile} />
            <Route path="/new" exact component={New} />
            <Route path="/test" exact component={Test} />
          </Switch>
        </UserContext.Provider>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
