import { PRODUCTS_URL } from "../constants/urls";

export async function fetchProducts() {}

export async function createNewProduct(url, product) {
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(product),
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error("Failed to post new product");
  }

  return data;
}
