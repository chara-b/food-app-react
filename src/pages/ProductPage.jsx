import { useLoaderData, useNavigate } from "react-router-dom";
import Product from "../components/product.jsx";

function ProductPage() {
  const fetchedProduct = useLoaderData();
  const navigate = useNavigate();

  const handleSaveProduct = (product) => {
    console.log("savedProduct: ", product);
    navigate(`/`);
  };

  const handleCancelProduct = (product) => {
    console.log("cancelProduct: ", product);
    navigate(`/`);
  };

  const handleProduct = (actionBtn, product) => {
    if (actionBtn === "save") {
      handleSaveProduct(product);
    }
    if (actionBtn === "cancel") {
      handleCancelProduct(product);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full h-screen overflow-auto">
      <Product
        product={fetchedProduct}
        onClick={handleProduct}
        editable={true}
        actionBtns={[
          { actionBtn: "save", buttonIcon: "fa-solid fa-floppy-disk" },
          { actionBtn: "cancel", buttonIcon: "fa-solid fa-x" },
        ]}
      />
    </div>
  );
}

export default ProductPage;
