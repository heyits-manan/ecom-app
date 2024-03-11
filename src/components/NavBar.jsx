"use client";

import Link from "next/link";
import ProductSearch from "@/app/search/page";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Fixed import from "next/navigation"
import { useDebounce } from "use-debounce";

export default function NavBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [query] = useDebounce(searchQuery, 300);
  const router = useRouter();

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

  const handleSearch = (event) => {
    // Added type annotation
    event.preventDefault();
    if (!searchQuery) return;
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <>
      <div className="flex mt-5">
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
        <form onSubmit={handleSearch} className="flex justify-center">
          <input
            type="text"
            placeholder="Search for anything"
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
        </form>
      </div>
      <ProductSearch searchResults={searchResults} searchQuery={searchQuery} />
    </>
  );
}
