/* eslint-disable no-unused-vars */
import { useLoaderData, useLocation, useNavigation } from "react-router-dom";
import Paginator from "../components/paginator";
import ProductListBin from "../components/product-list-bin";
import Spinner from "../components/spinner/spinner";
import { useEffect, useMemo } from "react";
import { useProductsContext } from "../contexts/ProductsContext";

function Bin() {
  const disabledProducts = useLoaderData();
  console.log("binData", disabledProducts);

  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  const location = useLocation();

  const actionBtns = useMemo(
    () => [
      {
        actionBtn: "restore",
        buttonIcon: "fa-solid fa-arrow-rotate-left",
        type: "button",
      },
    ],
    [],
  );

  return (
    <div className="flex flex-col gap-4 w-full h-screen">
      {" "}
      {!isLoading && location.pathname.includes("bin") && (
        // <ProductList
        //   className="w-full"
        //   searchText={searchText}
        //   actionBtns={actionBtns}
        //   location={location}
        //   colsCount="3"
        // >
        //   <Paginator count={disabledProducts.length} perPage={5} />
        // </ProductList>
        <ProductListBin
          disabledProducts={disabledProducts}
          className="w-full"
          actionBtns={actionBtns}
          colsCount="3"
        >
          <Paginator count={disabledProducts.length} perPage={5} />
        </ProductListBin>
      )}
      {isLoading && <Spinner />}
    </div>
  );
}

export default Bin;
