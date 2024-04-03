"use client";
import { useContext } from "react";
import UserContext from "@/context/UserContext";
import Link from "next/link";

export default function Page() {
  const { cartItems, setCartItems } = useContext(UserContext);
  console.log(cartItems);
  return (
    <div className={`mt-10 ml-10 mr-10`}>
      <h1 className="text-3xl font-bold mb-4">Cart</h1>
      <p className="mb-4">Items in cart: {Object.keys(cartItems).length}</p>

      {Object.keys(cartItems).map((productId) => {
        const product = cartItems[productId];
        return (
          <div key={productId}>
            <div key={productId} className="border p-4 mb-4 rounded-lg">
              <Link href={`/product/${productId}`} key={productId}>
                <img
                  src={product.img}
                  alt={product.title}
                  width={200}
                  height={200}
                />
                <h2 className="text-xl font-bold mb-2">{product.title}</h2>
                <p className="text-gray-700">Price: ${product.price}</p>
                <p className="text-gray-700">Quantity: {product.quantity}</p>
              </Link>
              <button
                className="bg-red-500 text-white p-2 rounded-lg mt-2"
                onClick={() => {
                  const newCartItems = { ...cartItems };
                  delete newCartItems[productId];
                  setCartItems(newCartItems);
                }}
              >
                Remove from Cart
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
