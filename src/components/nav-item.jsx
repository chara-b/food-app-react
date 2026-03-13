/* eslint-disable no-unused-vars */
import { useProductsContext } from "../contexts/ProductsContext";

function NavBarItem({ type, placeholder, styles, text, icon }) {
  const {
    filteredProducts,
    availableProducts,
    searchText,
    handleChangedSearchText,
    getDisabledProducts,
    getAvailableProducts,
    handleFilteredProducts,
  } = useProductsContext();

  if (type === "input") {
    return (
      <input
        type="text"
        value={searchText || ""}
        placeholder={placeholder || ""}
        onChange={handleChangedSearchText}
        className={styles}
      />
    );
  }
  return (
    <div className={styles}>
      {text}
      <i className={icon}></i>
    </div>
  );
}
export default NavBarItem;
