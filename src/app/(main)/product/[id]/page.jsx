"use client";
import { useState, useEffect, useContext } from "react";
import UserContext from "@/context/UserContext";
import { getIndividualProduct } from "@/app/api/products/route";
import ProductDetails from "@/components/ProductDetails";

export default function IndividualProduct({ params }) {
  const [product, setProduct] = useState(null);
  const [count, setCount] = useState(1);
  const { cartItems, setCartItems } = useContext(UserContext);

  const handleAddToCart = () => {
    if (count === 0) {
      return;
    }

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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await getIndividualProduct(params.id);
        setProduct(fetchedProduct);

        if (cartItems[fetchedProduct.id]) {
          setCount(cartItems[fetchedProduct.id].quantity);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [params.id, cartItems]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const cartQuantity = cartItems[product.id]
    ? cartItems[product.id].quantity
    : 0;

  return (
    <div className="flex justify-center gap-16 mt-36">
      <img
        src={product.images[0]}
        alt={`${product.title} image`}
        className="w-[700px] rounded-lg shadow-md shadow-black"
      />
      <ProductDetails
        product={product}
        count={count}
        setCount={setCount}
        handleAddToCart={handleAddToCart}
        cartQuantity={cartQuantity}
      />
    </div>
  );
}
