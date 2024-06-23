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
    const firstName = getCookie("firstName");
    console.log(firstName);

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
        <Link
          href={"/"}
          className="text-4xl ml-8 mr-7 font-bold text-black hover:text-gray-500 "
          onClick={() => {
            setSearchQuery("");
            setSearchResults([]);
          }}
        >
          MyStore
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
            className="border-2 border-grey-300 rounded-l-lg p-2 w-[50vw] ml-5 active:outline-none focus:outline-none focus:border-blue-500"
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
        <Link href={"/cart"}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/833/833314.png"
            alt=""
            className="w-10"
          />
        </Link>
      </div>
      <ProductSearch searchResults={searchResults} searchQuery={searchQuery} />
    </>
  );
}
