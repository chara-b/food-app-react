import { useEffect, useMemo, useState } from "react";
import { useProductsContext } from "../../../app/providers/ProductsContext.js";
import { useLoaderData, useLocation, useNavigation } from "react-router-dom";
import type { ActionBtn, BinProps, DisplayedProduct } from "../types.ts";

export const useBin = (): BinProps => {
  const disabledProductsLoaded = useLoaderData<DisplayedProduct[]>();
  console.log("binData", disabledProductsLoaded);

  const actionBtns = useMemo<ActionBtn[]>(
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
    []
  );

  const {
    displayedProducts,
    searchText,
    disabledProductsCount,
    dispatchProducts,
  } = useProductsContext();

  useEffect(
    function () {
      dispatchProducts({
        type: "displayedProducts",
        payload: disabledProductsLoaded,
      });
      dispatchProducts({
        type: "disabledProductsCount",
        payload: disabledProductsLoaded.length,
      });
    },
    [disabledProductsLoaded, dispatchProducts]
  );

  return { actionBtns, displayedProducts, searchText, disabledProductsCount };
};
