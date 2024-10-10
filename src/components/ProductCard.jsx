// components/ProductCard.jsx
import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <Link
      href={`/product/${product.id}`}
      key={product.id}
      className="h-44 w-[30vw] text-black items-center bg-white flex flex-row rounded-sm shadow-md hover:border-2 cursor-default"
    >
      <img
        src={product.images[0]}
        alt={`${product.title} image`}
        className="h-36 w-40 object-cover rounded-sm hover:cursor-pointer ml-5"
      />
      <div className="text ml-5 mb-24 mr-3">
        <h2 className="hover:underline mt-4">{product.title}</h2>
        <p className="hover:cursor-text">
          <strong>${product.price}</strong>
        </p>
      </div>
    </Link>
  );
}
