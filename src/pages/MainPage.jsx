/* eslint-disable no-unused-vars */
// react
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  useLoaderData,
  useLocation,
  useNavigation,
  Outlet,
} from "react-router-dom";
// components
import NavBar from "../components/nav-bar.jsx";
import NavBarItem from "../components/nav-item.jsx";
import ProductList from "../components/product-list.jsx";
import Footer from "../components/footer";
import Spinner from "../components/spinner/spinner.jsx";
import Paginator from "../components/paginator.jsx";
// pages

// custom hooks

// constants
// contexts
import { CustomModalContextProvider } from "../contexts/CustomModalContext.jsx";
import {
  ProductsContextProvider,
  useProductsContext,
} from "../contexts/ProductsContext.jsx";

function MainPage() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  const location = useLocation();

  const fetchedData = useLoaderData();
  console.log("fetchedData MainPage", fetchedData);

  const actionBtns = useMemo(
    () => [
      { actionBtn: "delete", buttonIcon: "fa-solid fa-trash", type: "button" },
      { actionBtn: "edit", buttonIcon: "fa-solid fa-edit", type: "button" },
    ],
    [],
  );

  return (
    <CustomModalContextProvider>
      <ProductsContextProvider initialData={fetchedData}>
        <div className="flex flex-col w-full h-screen">
          <NavBar className="w-full">
            <NavBarItem
              styles="w-100 px-4 py-2 border bg-white rounded-lg focus:ring-2 focus:ring-black focus:border-black"
              placeholder="Search..."
              type="input"
              icon="fa-solid fa-magnifying-glass"
            />
          </NavBar>

          {!isLoading &&
            (location.pathname.split("/").length === 3 ? (
              <ProductList
                className="w-full"
                actionBtns={actionBtns}
                colsCount="3"
              >
                <Paginator count={fetchedData.length} perPage={5} />
              </ProductList>
            ) : (
              <Outlet />
            ))}

          {isLoading && <Spinner />}

          <Footer className="w-full" />
        </div>
      </ProductsContextProvider>
    </CustomModalContextProvider>
  );
}

export default MainPage;
