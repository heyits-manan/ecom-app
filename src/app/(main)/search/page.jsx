"use client";

import ProductSearch from "@/components/ProductSearch";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(
          `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`
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
    }
  }, [query]);

  if (searchResults.length === 0) {
    return (
      <h1 className="mt-10 text-center">No results found for "{query}"</h1>
    );
  }
  return (
    <div>
      <h1 className="mt-10 text-center">Search Results for "{query}"</h1>
      <ProductSearch searchResults={searchResults} />
    </div>
  );
};

export default SearchPage;
