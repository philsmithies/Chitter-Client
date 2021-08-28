import React, { useState, createContext, useEffect } from "react";

import Axios from "axios";

// This will hold the context
export const UserContext = createContext(null);

const UserContextProvider = (props) => {
  const [data, setData] = useState();
  const [dataIsLoading, setDataIsLoading] = useState(true)
  // Fetch Method to get the data
  useEffect(() => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:3001/user",
    }).then((res) => {
      setData(res.data);
      setDataIsLoading(false)
    });
  }, []);
  const providerValue = {
    data,
    dataIsLoading
}

  return (
    <UserContext.Provider value={providerValue}>{props.children}</UserContext.Provider>
  );
};

export default UserContextProvider;

// import { createContext } from "react";

// export const UserContext = createContext(null);
