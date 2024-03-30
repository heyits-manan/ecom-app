"use client";

import React, { useState } from "react";

import UserContext from "./UserContext";

export default function UserContextProvider({ children }) {
  const [loggedUser, setLoggedUser] = useState({});
  const [cartItems, setCartItems] = useState({});

  return (
    <UserContext.Provider
      value={{ loggedUser, setLoggedUser, cartItems, setCartItems }}
    >
      {children}
    </UserContext.Provider>
  );
}
