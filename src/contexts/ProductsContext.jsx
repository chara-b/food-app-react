import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useState,
} from "react";
import {
  fetchAvailableProducts,
  fetchDisabledProducts,
  fetchProductsRange,
} from "../services/productsHTTPRequests";

const ProductContext = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case "filteredProducts":
      return { ...state, filteredProducts: action.payload };
    case "availableProducts":
      return { ...state, availableProducts: action.payload };
    case "disabledProducts":
      return { ...state, disabledProducts: action.payload };
    default:
      throw new Error("Unknown action!");
  }
}
function ProductsContextProvider({ initialData, children }) {
  const initialState = useMemo(
    () => ({
      filteredProducts: initialData || [],
      availableProducts: initialData || [],
      disabledProducts: [],
      availableProductsCount: 0,
      disabledProductsCount: 0,
    }),
    [initialData],
  );

  const [state, dispatch] = useReducer(reducer, initialState);
  const [searchText, setSearchText] = useState("");

  const { filteredProducts, availableProducts, disabledProducts } = state;

  const getDisabledProducts = useCallback(async () => {
    try {
      const result = await fetchDisabledProducts();
      console.log("disabled products fetched: ", result);
      dispatch({ type: "filteredProducts", payload: result });
    } catch (error) {
      console.error("Failed to fetch disabled products:", error);
    }
  }, []);

  const getAvailableProducts = useCallback(async () => {
    try {
      const result = await fetchAvailableProducts();
      console.log("available products fetched: ", result);
      dispatch({ type: "filteredProducts", payload: result });
    } catch (error) {
      console.error("Failed to fetch available products:", error);
    }
  }, []);

  const getProductsRangeForPagination = useCallback(
    async (start, end, disabled) => {
      try {
        const result = await fetchProductsRange(start, end, disabled);
        console.log("products range fetched: ", result);
        dispatch({ type: "filteredProducts", payload: result });
      } catch (error) {
        console.error("Failed to fetch products range for pagination:", error);
      }
    },
    [],
  );

  const handleFilteredProducts = useCallback((filteredProducts) => {
    dispatch({ type: "filteredProducts", payload: filteredProducts });
  }, []);

  const setDisabledProducts = useCallback((disabledProducts) => {
    dispatch({ type: "disabledProducts", payload: disabledProducts });
  }, []);

  const handleChangedSearchText = useCallback(
    (e, pathname) => {
      const searchText = e.target.value;
      setSearchText(searchText);

      if (!searchText?.trim() && !pathname.includes("bin")) {
        handleFilteredProducts(availableProducts);
      }

      if (searchText && searchText?.trim() && !pathname.includes("bin")) {
        const lowCaseSearchText = searchText.toLowerCase();
        const filteredResults = availableProducts.filter((product) =>
          product.title.toLowerCase().includes(lowCaseSearchText),
        );
        handleFilteredProducts(filteredResults);
      }

      if (!searchText?.trim() && pathname.includes("bin")) {
        handleFilteredProducts(disabledProducts);
      }

      if (searchText && searchText?.trim() && pathname.includes("bin")) {
        const lowCaseSearchText = searchText.toLowerCase();
        const filteredResults = disabledProducts.filter((product) =>
          product.title.toLowerCase().includes(lowCaseSearchText),
        );
        handleFilteredProducts(filteredResults);
      }
    },
    [availableProducts, disabledProducts, handleFilteredProducts],
  );

  const value = useMemo(
    () => ({
      filteredProducts: filteredProducts,
      availableProducts: availableProducts,
      disabledProducts,
      searchText,
      dispatchProducts: dispatch,
      handleChangedSearchText,
      getDisabledProducts: getDisabledProducts,
      getAvailableProducts: getAvailableProducts,
      getProductsRangeForPagination,
      handleFilteredProducts: handleFilteredProducts,
      setDisabledProducts,
    }),
    [
      filteredProducts,
      availableProducts,
      disabledProducts,
      searchText,
      handleChangedSearchText,
      getDisabledProducts,
      getAvailableProducts,
      getProductsRangeForPagination,
      handleFilteredProducts,
      setDisabledProducts,
    ],
  );

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}

/* eslint-disable react-refresh/only-export-components */
function useProductsContext() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("ProductContext was used outside of its Provider");
  }
  return context;
}

export { ProductsContextProvider, useProductsContext };
