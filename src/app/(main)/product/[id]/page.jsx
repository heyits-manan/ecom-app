"use client";
import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import UserContext from "@/context/UserContext";

async function getIndividualProduct(productId) {
  const res = await fetch(`https://dummyjson.com/products/${productId}`);
  return await res.json();
}

export default function IndividualProduct({ params }) {
  const [product, setProduct] = useState(null);
  const [count, setCount] = useState(1);
  const { cartItems, setCartItems } = useContext(UserContext);

  const handleAddToCart = () => {
    setCartItems((prevCartItems) => {
      const newCartItems = { ...prevCartItems };
      if (newCartItems[product.id]) {
        newCartItems[product.id].quantity = count;
      } else {
        newCartItems[product.id] = {
          img: product.images[0],
          title: product.title,
          price: product.price,
          quantity: count,
        };
      }
      return newCartItems;
    });
  };
  const handleIncrement = () => {
    if (count < product.stock) {
      setCount((prevCount) => prevCount + 1);
    }
  };
  const handleDecrement = () => {
    if (count > 1) {
      setCount((prevCount) => prevCount - 1);
    }
  };

  useEffect(() => {
    // Fetch the product when the component mounts
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await getIndividualProduct(params.id);
        setProduct(fetchedProduct);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [params.id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center gap-16 mt-36 ">
      <img
        src={product.images[0]}
        alt={product.title + " image"}
        className="w-[700px] rounded-lg shadow-md shadow-black  "
      />
      <div className="productDetails flex flex-col gap-y-2">
        <h2 className="text-2xl font-bold">{product.title}</h2>
        <p className="text-lg w-[400px] mb-1">{product.description}</p>
        <hr className="mb-2" />
        <div className="text-2xl font-medium mb-10">
          <span className="text-xl font-light mr-2 text-red-500 ">
            -{product.discountPercentage}%
          </span>
          ${Math.floor(product.price * (1 - product.discountPercentage / 100))}
          <br />
          <span className="font-normal text-sm text-slate-500 ml-2">
            M.R.P.: <s>${product.price} </s>
          </span>
          <hr className="mb-3 mt-4" />
          <div className="text-lg font-normal">
            <span className="text-lg ml-2 ">Quantity: </span>
            <button
              className="bg-blue-500 rounded-full w-10 text-white hover:bg-blue-700"
              onClick={handleDecrement}
            >
              -
            </button>{" "}
            <span>{count}</span>{" "}
            <button
              className="bg-blue-500 rounded-full w-10 text-white hover:bg-blue-700"
              onClick={handleIncrement}
            >
              +
            </button>
            <span className="text-sm ml-5 text-gray-500">
              Total {product.stock} in stock
            </span>
          </div>
          <span className="ml-2 text-black text-xl">
            Total {cartItems[product.id] ? cartItems[product.id].quantity : 0}{" "}
            in Cart
          </span>
        </div>

        <div className="buttons">
          <Link href={"/"} className="Buy ">
            <button className="bg-blue-500 w-96 p-3 rounded-full text-white font-bold hover:bg-blue-700">
              Buy It Now
            </button>
          </Link>
          <br />
          <button
            className="bg-white w-96 p-3 rounded-full text-blue-500 border-2 border-blue-500 mt-2 hover:bg-slate-200"
            onClick={handleAddToCart}
          >
            {cartItems[product.id] ? "Update Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
