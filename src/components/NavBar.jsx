"use client";

import UserContext from "@/context/UserContext";
import useSearch from "@/hooks/useSearch";
import useCookies from "@/lib/useCookies";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { useDebounce } from "use-debounce";

export default function NavBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [query] = useDebounce(searchQuery, 400); // Fetches the data after 400ms of inactivity in the search bar to avoid unnecessary API calls and improve performance
  const router = useRouter();
  const { loggedUser, setLoggedUser } = useContext(UserContext);

  // Use custom hook to handle cookies
  useCookies("firstName", setLoggedUser);

  // Use custom hook for search functionality
  useSearch(query, setSearchResults, router);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleLogout = async () => {
    try {
      await axios.get("/api/users/logout", { withCredentials: true });
      setLoggedUser({});
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (!searchQuery) return;
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <>
      <div className="flex mt-5 gap-x-6 items-center">
        <Link
          href="/"
          className="text-4xl ml-8 mr-7 font-bold text-black hover:text-gray-500"
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
        </Link>
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
            placeholder="Search for anything"
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
            }`}
          >
            Logout
          </button>
        </form>
        <Link href="/cart">
          <img
            src="https://cdn-icons-png.flaticon.com/512/833/833314.png"
            alt="Cart"
            className="w-10"
          />
        </Link>
      </div>
    </>
  );
}
