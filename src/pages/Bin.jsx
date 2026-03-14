/* eslint-disable no-unused-vars */
import { useLoaderData, useLocation, useNavigation } from "react-router-dom";
import Paginator from "../components/paginator";
import ProductListBin from "../components/product-list-bin";
import Spinner from "../components/spinner/spinner";
import { useEffect, useMemo } from "react";
import { useProductsContext } from "../contexts/ProductsContext";

function Bin() {
  const disabledProductsLoaded = useLoaderData();
  console.log("binData", disabledProductsLoaded);

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

  const {
    filteredProducts,
    availableProducts,
    disabledProducts,
    searchText,
    handleChangedSearchText,
    getDisabledProducts,
    getAvailableProducts,
    handleFilteredProducts,
  } = useProductsContext();

  useEffect(
    function () {
      handleFilteredProducts(disabledProductsLoaded);
    },
    [disabledProductsLoaded, handleFilteredProducts],
  );

  return (
    <div className="flex flex-col gap-4 w-full h-screen">
      {" "}
      {!isLoading && location.pathname.includes("bin") && (
        <ProductListBin
          disabledProductsLoaded={disabledProductsLoaded}
          className="w-full"
          actionBtns={actionBtns}
          colsCount="3"
        >
          <Paginator count={disabledProductsLoaded.length} perPage={5} />
        </ProductListBin>
      )}
      {isLoading && <Spinner />}
    </div>
  );
}

export default Bin;
