"use client";

import Link from "next/link";
import ProductSearch from "@/app/(main)/search/page";
import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";
import axios from "axios";
import UserContext from "@/context/UserContext";

export default function NavBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [query] = useDebounce(searchQuery, 400);
  const router = useRouter();
  const { loggedUser, setLoggedUser } = useContext(UserContext);

  useEffect(() => {
    // Retrieve firstName from cookie
    const firstName = getCookie("firstName");
    console.log(firstName);
    // Update loggedUser context if firstName exists
    if (firstName) {
      setLoggedUser((prevState) => ({ ...prevState, firstName }));
    }
  }, [setLoggedUser]);

  // Function to get cookie by name
  const getCookie = (name) => {
    console.log(document.cookie);
    const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
    for (const cookie of cookies) {
      if (cookie.startsWith(`${name}=`)) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  };
  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(
          `https://dummyjson.com/products/search?q=${query}`
        );
        if (response.ok) {
          const data = await response.json();
          setSearchResults(data.products);
        } else {
          console.error("Failed to fetch search results");
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    if (query) {
      fetchSearchResults();
    } else {
      setSearchResults([]);
      router.push("/");
    }
  }, [query, router]);

  const handleInputChange = (event) => {
    // Added type annotation
    setSearchQuery(event.target.value);
  };

  const handleLogout = async (response) => {
    try {
      await axios.get("/api/users/logout", { withCredentials: true });
      setLoggedUser({});
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  const handleSearch = (event) => {
    // Added type annotation
    event.preventDefault();
    if (!searchQuery) return;
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <>
      <div className="flex mt-5 gap-x-6 items-center">
        <Link href={"/"}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/EBay_logo.svg/300px-EBay_logo.svg.png"
            alt=""
            className="ml-5 w-32"
            onClick={() => {
              setSearchQuery("");
              setSearchResults([]);
            }}
          />
        </Link>
        <Link
          href={loggedUser.firstName ? "/profile" : "/login"}
          className={`hover:bg-blue-600 bg-blue-500 text-center text-white p-2 w-20 rounded-full ${
            loggedUser.firstName ? "hidden" : "block"
          }`}
        >
          Login
        </Link>{" "}
        <Link
          href={loggedUser.firstName ? "/profile" : "/signup"}
          className={`hover:bg-blue-600 bg-blue-500 text-center text-white p-2 ${
            loggedUser.firstName ? "w-36" : "w-20"
          } rounded-full`}
        >
          {loggedUser.firstName ? `Hey, ${loggedUser.firstName}` : "Signup"}
        </Link>
        <form onSubmit={handleSearch} className="flex justify-center">
          <input
            type="text"
            placeholder=" Search for anything"
            className="border-2 border-grey-300 rounded-l-lg p-1 w-[50vw] ml-5 active:outline-none focus:outline-none focus:border-blue-500"
            value={searchQuery}
            onChange={handleInputChange}
          />
          <button
            className="bg-blue-500 text-white rounded-r-lg p-2 w-20 hover:bg-blue-600"
            type="submit"
          >
            Search
          </button>
          <button
            onClick={handleLogout}
            className={`hover:bg-blue-600 bg-blue-500 text-center text-white p-2 w-20 rounded-full ml-5 ${
              loggedUser.firstName ? "block" : "hidden"
            } `}
          >
            Logout
          </button>
        </form>
      </div>
      <ProductSearch searchResults={searchResults} searchQuery={searchQuery} />
    </>
  );
}
