import { useLoaderData, useNavigate } from "react-router-dom";
import Product from "../components/product.jsx";
import { useCallback, useMemo } from "react";

function ProductPage() {
  const fetchedProduct = useLoaderData();
  const navigate = useNavigate();

  const actionBtns = useMemo(
    () => [
      {
        actionBtn: "save",
        buttonIcon: "fa-solid fa-floppy-disk",
        type: "submit",
      },
      { actionBtn: "cancel", buttonIcon: "fa-solid fa-x", type: "button" },
    ],
    [],
  );

  const handleSaveProduct = useCallback(
    (product) => {
      console.log("savedProduct: ", product);
      navigate("/");
    },
    [navigate],
  );

  const handleCancelProduct = useCallback(
    (product) => {
      console.log("cancelProduct: ", product);
      navigate("/");
    },
    [navigate],
  );

  const handleProduct = useCallback(
    (actionBtn, product) => {
      if (actionBtn === "save") handleSaveProduct(product);
      if (actionBtn === "cancel") handleCancelProduct(product);
    },
    [handleSaveProduct, handleCancelProduct],
  );

  return (
    <div className="flex flex-col gap-4 w-full h-screen overflow-auto">
      <Product
        product={fetchedProduct}
        onClick={handleProduct}
        editable={true}
        actionBtns={actionBtns}
      />
    </div>
  );
}

export default ProductPage;
