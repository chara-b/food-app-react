import {
  createContext,
  memo,
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
    case "filteredList":
      return { ...state, filteredList: action.payload };
    case "availableList":
      return { ...state, availableList: action.payload };
    case "deletedProduct":
      return { ...state, deletedProduct: action.payload };
    default:
      throw new Error("Unknown action!");
  }
}
function ProductContextProvider({ children }) {
  const initialState = {
    filteredList: false,
    availableList: "",
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const { filteredList, availableList } = state;

  async function getDisabledProducts() {
    const result = fetchDisabledProducts();
    console.log("disabled products fetched: ", result);
  }

  async function getAvailableProducts() {
    const result = fetchAvailableProducts();
    console.log("available products fetched: ", result);
  }

  function handleFilteredProducts() {}

  const value = useMemo(
    () => ({
      filteredList: filteredList,
      availableList: availableList,
      getDisabledProducts: getDisabledProducts,
      getAvailableProducts: getAvailableProducts,
      handleFilteredProducts: handleFilteredProducts,
    }),
    [filteredList, availableList],
  );

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}

/* eslint-disable react-refresh/only-export-components */
function useProductContext() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("ProductContext was used outside of its Provider");
  }
  return context;
}

export { ProductContextProvider, useProductContext };
