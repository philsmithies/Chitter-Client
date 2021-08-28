import React, { useContext } from "react";
import { UserContext } from "../Contexts/UserContext";


export default function Test() {
  const { user } = useContext(UserContext);

  return (
    <div>
      <h2>Test</h2>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
