export default function QuantityControls({ stock, count, setCount }) {
  const handleIncrement = () => {
    if (count < stock) {
      setCount((prevCount) => prevCount + 1);
    }
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount((prevCount) => prevCount - 1);
    }
  };

  return (
    <div className="text-lg font-normal">
      <span className="text-lg ml-2">Quantity: </span>
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
      <span className="text-sm ml-5 text-gray-500">Total {stock} in stock</span>
    </div>
  );
}
