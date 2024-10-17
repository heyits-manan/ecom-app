import { useEffect } from "react";

const useCookies = (cookieName, setLoggedUser) => {
  useEffect(() => {
    const getCookie = (name) => {
      const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
      for (const cookie of cookies) {
        if (cookie.startsWith(`${name}=`)) {
          return cookie.substring(name.length + 1);
        }
      }
      return null;
    };

    const firstName = getCookie(cookieName);
    if (firstName) {
      setLoggedUser((prevState) => ({ ...prevState, firstName }));
    }
  }, [cookieName, setLoggedUser]);
};

export default useCookies;
