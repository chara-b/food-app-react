import { useNavigate } from "react-router-dom";
import Paginator from "./paginator.jsx";
import Product from "./product.jsx";
import { useEffect, useState } from "react";

function ProductList({ data, actionBtns, searchText, colsCount, children }) {
  const [availableProducts, setAvailableProducts] = useState(data || []);
  const [filteredProducts, setFilteredProducts] = useState(data || []);

  const navigate = useNavigate();

  const handleEditedProduct = (editedProduct) => {
    console.log("editedProduct: ", editedProduct);
    navigate(`product/${editedProduct.id}`);
  };

  const handleProduct = (actionBtn, product, updateProductFn) => {
    if (actionBtn === "delete") {
      updateProductFn({
        id: product.id,
        propToUpdate: "disabled",
        newValue: true,
      });
    }
    if (actionBtn === "restore") {
      updateProductFn({
        id: product.id,
        propToUpdate: "disabled",
        newValue: false,
      });
    }
    if (actionBtn === "edit") {
      handleEditedProduct(product);
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
  }, [searchText, availableProducts]);

  const productsNum = filteredProducts.length;

  return productsNum ? (
    <>
      <ul
        className={`grid grid-cols-${colsCount} gap-4 ml-5 mr-5 h-screen overflow-auto`}
      >
        {filteredProducts.map((product) => {
          return (
            <Product
              product={product}
              key={product.id}
              onClick={handleProduct}
              actionBtns={actionBtns}
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
