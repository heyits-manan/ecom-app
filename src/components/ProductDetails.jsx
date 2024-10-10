import QuantityControls from "./QuantityControls";
import Link from "next/link";

export default function ProductDetails({
  product,
  count,
  setCount,
  handleAddToCart,
  cartQuantity,
}) {
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;

    return (
      <>
        {Array(fullStars)
          .fill(0)
          .map((_, index) => (
            <span key={index}>&#9733;</span>
          ))}

        {Array(emptyStars)
          .fill(0)
          .map((_, index) => (
            <span key={index}>&#9734;</span>
          ))}
      </>
    );
  };
  return (
    <div className="productDetails flex flex-col gap-y-2">
      <h2 className="text-2xl font-bold">{product.title}</h2>
      <p className="text-lg w-[400px] mb-1">{product.description}</p>
      <hr className="mb-2" />
      <div className="text-2xl font-medium mb-10">
        <span className="text-xl font-light mr-2 text-red-500">
          -{product.discountPercentage}%
        </span>
        ${Math.floor(product.price * (1 - product.discountPercentage / 100))}
        <br />
        <span className="font-normal text-sm text-slate-500 ml-2">
          M.R.P.: <s>${product.price}</s>
        </span>
        <hr className="mb-3 mt-4" />
        <QuantityControls
          stock={product.stock}
          count={count}
          setCount={setCount}
        />
        <span className="ml-2 text-black text-xl">
          Total {cartQuantity} in Cart
        </span>
      </div>

      <div className="buttons">
        <Link href="/" className="Buy">
          <button className="bg-blue-500 w-96 p-3 rounded-full text-white font-bold hover:bg-blue-700">
            Buy It Now
          </button>
        </Link>
        <br />
        <button
          className="bg-white w-96 p-3 rounded-full text-blue-500 border-2 border-blue-500 mt-2 hover:bg-slate-200"
          onClick={handleAddToCart}
        >
          {cartQuantity ? "Update Cart" : "Add to Cart"}
        </button>
      </div>
      <div className="reviews mt-8">
        <h3 className="text-xl font-bold mb-2">Customer Reviews</h3>
        {product.reviews.length > 0 ? (
          product.reviews.map((review, index) => (
            <div key={index} className="review border-b pb-4 mb-4">
              <p className="text-lg font-semibold">{review.reviewerName}</p>
              <div className="text-sm text-gray-500 flex items-center">
                <span className="mr-2">{renderStars(review.rating)}</span>
                <span>{review.rating} stars</span>
              </div>
              <p className="text-sm">{review.comment}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
}
