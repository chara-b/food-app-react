import { PRODUCTS_URL } from "../constants/urls";

export async function fetchProducts() {
  try {
    const res = await fetch(PRODUCTS_URL);
    if (!res.ok) {
      throw new Error("Something went wrong while fetching products data");
    }
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function fetchProduct({ params }) {
  try {
    const res = await fetch(`${PRODUCTS_URL}/${params.productId}`);

    if (!res.ok) {
      throw new Error("Something went wrong while fetching product data");
    }
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function createNewProduct(product) {
  try {
    const res = await fetch(PRODUCTS_URL, {
      method: "POST",
      body: JSON.stringify(product),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error("Failed to post new product");
    }

    return data;
  } catch (err) {
    throw new Error(err.message);
  }
}
