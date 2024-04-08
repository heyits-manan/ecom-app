"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

async function getProducts() {
  const res = await fetch(
    "https://dummyjson.com/products?start=${startIndex}&count=${count}",
    { cache: "no-cache" }
  );
  return await res.json();
}

export default function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data.products);
    };

    fetchProducts();
  }, []);
  return (
    <div className="products mt-10 flex flex-row flex-wrap gap-x-9 gap-y-3 justify-center ">
      {products.map((product) => (
        <Link
          href={`/product/${product.id}`}
          key={product.id}
          className=" h-44 w-[30vw] text-black items-center bg-white flex flex-row  rounded-sm  shadow-md hover:border-2  cursor-default"
        >
          <img
            src={product.images[0]}
            alt={product.title + " image"}
            className=" h-36 w-40 object-cover rounded-sm hover:cursor-pointer ml-5 "
          />
          <div className="text ml-5 mb-24 mr-3">
            <h2 className="hover:underline mt-4">{product.title}</h2>
            <p className="hover:cursor-text">
              <strong>${product.price}</strong>
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
