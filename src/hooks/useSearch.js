import { useEffect } from "react";

const useSearch = (query, setSearchResults, router) => {
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
  }, [query, setSearchResults, router]);
};

export default useSearch;
