import { useLoaderData } from "react-router-dom";
import Product from "../components/product.jsx";

function ProductPage() {
  const fetchedProduct = useLoaderData();

  return (
    <div className="flex flex-col gap-4 w-full h-screen">
      <Product productData={fetchedProduct} />
    </div>
  );
}

export default ProductPage;
