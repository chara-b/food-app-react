import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";
import {
  fetchAvailableProducts,
  fetchDisabledProducts,
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
      filteredProducts: [],
      availableProducts: initialData || [],
      disabledProducts: [],
    }),
    [initialData],
  );

  const [state, dispatch] = useReducer(reducer, initialState);

  const { filteredProducts, availableProducts, disabledProducts } = state;

  const getDisabledProducts = useCallback(async () => {
    try {
      const result = await fetchDisabledProducts();
      console.log("disabled products fetched: ", result);
      dispatch({ type: "disabledProducts", payload: result });
    } catch (error) {
      console.error("Failed to fetch disabled products:", error);
    }
  }, []);

  const getAvailableProducts = useCallback(async () => {
    try {
      const result = await fetchAvailableProducts();
      console.log("available products fetched: ", result);
      dispatch({ type: "availableProducts", payload: result });
    } catch (error) {
      console.error("Failed to fetch available products:", error);
    }
  }, []);

  const handleFilteredProducts = useCallback((filteredProducts) => {
    dispatch({ type: "filteredProducts", payload: filteredProducts });
  }, []);

  const value = useMemo(
    () => ({
      filteredProducts: filteredProducts,
      availableProducts: availableProducts,
      disabledProducts: disabledProducts,
      getDisabledProducts: getDisabledProducts,
      getAvailableProducts: getAvailableProducts,
      handleFilteredProducts: handleFilteredProducts,
    }),
    [
      filteredProducts,
      availableProducts,
      disabledProducts,
      getDisabledProducts,
      getAvailableProducts,
      handleFilteredProducts,
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
