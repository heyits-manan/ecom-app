export async function getProducts(startIndex = 0, count = 10) {
  const res = await fetch(
    `https://dummyjson.com/products?start=${startIndex}&count=${count}`,
    { cache: "no-cache" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return await res.json();
}

export async function getIndividualProduct(productId) {
  const res = await fetch(`https://dummyjson.com/products/${productId}`);
  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }
  return await res.json();
}
