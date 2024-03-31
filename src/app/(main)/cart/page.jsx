"use client";
import { useContext } from "react";
import UserContext from "@/context/UserContext";
import Image from "next/image";
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
          <Link href={`/product/${productId}`} key={(key = { productId })}>
            <div key={productId} className="border p-4 mb-4 rounded-lg">
              <img
                src={product.img}
                alt={product.title}
                width={200}
                height={200}
              />
              <h2 className="text-xl font-bold mb-2">{product.title}</h2>
              <p className="text-gray-700">Price: ${product.price}</p>
              <p className="text-gray-700">Quantity: {product.quantity}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
