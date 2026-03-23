/* eslint-disable no-unused-vars */
import { useLoaderData, useLocation, useNavigation } from "react-router-dom";
import Paginator from "../components/paginator";
import ProductListBin from "../components/product-list-bin";
import Spinner from "../components/spinner/spinner";
import { useEffect, useMemo, useState } from "react";
import { useProductsContext } from "../contexts/ProductsContext";
import { perPage } from "../constants/paginator.js";

function Bin() {
  const disabledProductsLoaded = useLoaderData();
  console.log("binData", disabledProductsLoaded);

  const actionBtns = useMemo(
    () => [
      {
        actionBtn: "restore",
        buttonIcon: "fa-solid fa-arrow-rotate-left",
        type: "button",
      },
      {
        actionBtn: "remove",
        buttonIcon: "fa-solid fa-trash",
        type: "button",
      },
    ],
    [],
  );

  const {
    filteredProducts,
    searchText,
    availableProductsCount,
    disabledProductsCount,
    dispatchProducts,
    handleChangedSearchText,
    getDisabledProducts,
    getAvailableProducts,
    handleFilteredProducts,
    setDisabledProducts,
  } = useProductsContext();

  useEffect(
    function () {
      dispatchProducts({
        type: "filteredProducts",
        payload: disabledProductsLoaded,
      });
      // dispatchProducts({
      //   type: "disabledProducts",
      //   payload: disabledProductsLoaded,
      // });
      dispatchProducts({
        type: "disabledProductsCount",
        payload: disabledProductsLoaded.length,
      });
    },
    [disabledProductsLoaded, dispatchProducts],
  );

  return (
    <ProductListBin className="w-full" actionBtns={actionBtns} colsCount="1">
      <Paginator
        perPage={perPage}
        areDisabled={true}
        productsCount={disabledProductsCount}
      />
    </ProductListBin>
  );
}

export default Bin;
