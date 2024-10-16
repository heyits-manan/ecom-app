"use client";

import Link from "next/link";
import React from "react";

const ProductSearch = ({ searchResults }) => {
  if (!searchResults || searchResults.length === 0) {
    return 0;
  }

  return (
    <>
      <div className="mt-10 mb-28 flex flex-row flex-wrap gap-x-9 gap-y-10 justify-center">
        {searchResults.map((product) => (
          <Link
            href={`/product/${product.id}`}
            key={product.id}
            className="h-44 w-96 text-black items-center bg-white flex flex-row rounded-sm shadow-md hover:border-2 cursor-default"
          >
            <img
              src={product.images[0]}
              alt={`${product.title} image`}
              className="h-36 w-40 object-cover rounded-sm hover:cursor-pointer"
            />
            <div className="text ml-5 mb-24 mr-3">
              <h2 className="hover:underline">{product.title}</h2>
              <p className="hover:cursor-text">
                <strong>${product.price}</strong>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default ProductSearch;
