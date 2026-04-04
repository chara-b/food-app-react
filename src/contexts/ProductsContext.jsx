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
    case "displayedProducts":
      return { ...state, displayedProducts: action.payload };
    case "availableProductsCount":
      return { ...state, availableProductsCount: action.payload };
    case "disabledProductsCount":
      return { ...state, disabledProductsCount: action.payload };
    default:
      throw new Error("Unknown action!");
  }
}
function ProductsContextProvider({ initialData, children }) {
  const initialState = useMemo(
    () => ({
      displayedProducts: initialData || [],
      availableProductsCount: 0,
      disabledProductsCount: 0,
    }),
    [initialData],
  );

  const [state, dispatch] = useReducer(reducer, initialState);
  const [searchText, setSearchText] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const { displayedProducts, availableProductsCount, disabledProductsCount } =
    state;

  const getDisabledProducts = useCallback(async () => {
    try {
      const result = await fetchDisabledProducts();
      console.log("disabled products fetched: ", result);
      dispatch({ type: "displayedProducts", payload: result });
      dispatch({ type: "disabledProductsCount", payload: result.length });
    } catch (error) {
      console.error("Failed to fetch disabled products:", error);
    }
  }, []);

  const getAvailableProducts = useCallback(async () => {
    try {
      const result = await fetchAvailableProducts();
      console.log("available products fetched: ", result);
      dispatch({ type: "displayedProducts", payload: result });
      dispatch({ type: "availableProductsCount", payload: result.length });
    } catch (error) {
      console.error("Failed to fetch available products:", error);
    }
  }, []);

  const getProductsRangeForPagination = useCallback(
    async (start, end, disabled) => {
      try {
        const result = await fetchProductsRange(start, end, disabled);
        console.log("products range fetched: ", result);
        dispatch({ type: "displayedProducts", payload: result });
      } catch (error) {
        console.error("Failed to fetch products range for pagination:", error);
      }
    },
    [],
  );

  const handleChangedSearchText = useCallback(async (e, pathname) => {
    const searchText = e.target.value;
    setSearchText(searchText);

    if (!searchText?.trim() && !pathname.includes("bin")) {
      const result = await fetchAvailableProducts();
      dispatch({ type: "displayedProducts", payload: result });
    }

    if (searchText && searchText?.trim() && !pathname.includes("bin")) {
      const lowCaseSearchText = searchText.toLowerCase();
      const result = await fetchAvailableProducts();
      const filteredResults = result.filter((product) =>
        product.title_visible.toLowerCase().includes(lowCaseSearchText),
      );

      dispatch({ type: "displayedProducts", payload: filteredResults });
    }

    if (!searchText?.trim() && pathname.includes("bin")) {
      const result = await fetchDisabledProducts();
      dispatch({ type: "displayedProducts", payload: result });
    }

    if (searchText && searchText?.trim() && pathname.includes("bin")) {
      const lowCaseSearchText = searchText.toLowerCase();
      const result = await fetchDisabledProducts();
      const filteredResults = result.filter((product) =>
        product.title_visible.toLowerCase().includes(lowCaseSearchText),
      );
      dispatch({ type: "displayedProducts", payload: filteredResults });
    }
  }, []);

  const handleChangedPhoto = useCallback((e) => {
    const file = e.target.files[0];

    setImageFile(URL.createObjectURL(file));

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      const base64String = reader.result;
      console.log(base64String);
    };
  }, []);

  const value = useMemo(
    () => ({
      displayedProducts,
      searchText,
      availableProductsCount,
      disabledProductsCount,
      imageFile,
      dispatchProducts: dispatch,
      handleChangedSearchText,
      onImageFileChange: handleChangedPhoto,
      getDisabledProducts: getDisabledProducts,
      getAvailableProducts: getAvailableProducts,
      getProductsRangeForPagination,
    }),
    [
      displayedProducts,
      searchText,
      availableProductsCount,
      disabledProductsCount,
      imageFile,
      handleChangedSearchText,
      handleChangedPhoto,
      getDisabledProducts,
      getAvailableProducts,
      getProductsRangeForPagination,
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
