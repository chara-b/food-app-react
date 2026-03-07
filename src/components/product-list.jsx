import { useNavigate } from "react-router-dom";
import Paginator from "./paginator.jsx";
import Product from "./product.jsx";
import { useEffect, useState } from "react";

function ProductList({
  data,
  buttonsActions,
  searchText,
  receiveDeletedProductsList,
  colsCount,
  children,
}) {
  const [availableProducts, setAvailableProducts] = useState(data || []);
  const [filteredProducts, setFilteredProducts] = useState(data || []);
  const [deletedProducts, setDeletedProducts] = useState([]);

  const navigate = useNavigate();

  const handleDeletedProduct = (deletedProduct) => {
    console.log("deletedProduct: ", deletedProduct);
    const results = filteredProducts.filter(
      (product) => product.id !== deletedProduct.id,
    );
    setFilteredProducts(results);
    setAvailableProducts(results);
    setDeletedProducts((prevDeletedProducts) => [
      ...prevDeletedProducts,
      deletedProduct,
    ]);
  };

  const handleRestoredProduct = (restoredProduct) => {
    console.log("restoredProduct: ", restoredProduct);
    setFilteredProducts((prevFilteredProducts) => [
      ...prevFilteredProducts,
      restoredProduct,
    ]);
  };

  const handleEditedProduct = (editedProduct) => {
    console.log("editedProduct: ", editedProduct);
    navigate(`product/${editedProduct.id}`);
  };

  const handleProduct = (buttonAction, productData) => {
    if (buttonAction === "delete") {
      handleDeletedProduct(productData);
    }
    if (buttonAction === "restore") {
      handleRestoredProduct(productData);
    }
    if (buttonAction === "edit") {
      handleEditedProduct(productData);
    }
  };

  useEffect(() => {
    // for search keyword
    if (!searchText?.trim()) {
      setFilteredProducts(availableProducts);
    }
    if (searchText?.trim()) {
      const lowCaseSearchText = searchText.toLowerCase();
      const results = availableProducts.filter((product) =>
        product.title.toLowerCase().includes(lowCaseSearchText),
      );
      setFilteredProducts(results);
    }

    // for sending back to the App the real deletedFoods list
    if (typeof receiveDeletedProductsList === "function") {
      receiveDeletedProductsList(deletedProducts);
      console.log(deletedProducts);
    }
  }, [
    searchText,
    deletedProducts,
    receiveDeletedProductsList,
    availableProducts,
  ]);

  const productsNum = filteredProducts.length;

  return productsNum ? (
    <>
      <ul
        className={`grid grid-cols-${colsCount} gap-4 ml-5 mr-5 h-screen overflow-auto`}
      >
        {filteredProducts.map((product) => {
          return (
            <Product
              productData={product}
              key={product.id}
              onClick={handleProduct}
              buttonsActions={buttonsActions}
            />
          );
        })}
      </ul>
      {children}
    </>
  ) : (
    <ul
      className={`grid grid-cols-${colsCount} gap-4 ml-5 mr-5 h-screen overflow-auto`}
    >
      <li> "No Products found !"</li>
    </ul>
  );
}

export default ProductList;
