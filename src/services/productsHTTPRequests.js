import { PRODUCTS_URL } from "../constants/urls";

export async function fetchProducts() {
  try {
    const res = await fetch(PRODUCTS_URL);
    if (!res.ok) {
      throw new Error("Something went wrong while fetching data");
    }
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function createNewProduct(url, product) {
  try {
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
  } catch (err) {
    throw new Error(err.message);
  }
}
