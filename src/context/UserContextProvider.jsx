"use client";

import React, { useState } from "react";

import UserContext from "./UserContext";

export default function UserContextProvider({ children }) {
  const [loggedUser, setLoggedUser] = useState({});

  return (
    <UserContext.Provider value={{ loggedUser, setLoggedUser }}>
      {children}
    </UserContext.Provider>
  );
}
