import { getProducts } from "../../lib/api";
import ProductCard from "../../components/ProductCard";

export default async function Home() {
  const data = await getProducts();
  const products = data.products;

  return (
    <div className="products mt-10 flex flex-row flex-wrap gap-x-9 gap-y-3 justify-center ">
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
}
