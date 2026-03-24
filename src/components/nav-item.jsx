/* eslint-disable no-unused-vars */
import { useLocation } from "react-router-dom";
import { useProductsContext } from "../contexts/ProductsContext";

function NavBarItem({ type, placeholder, styles, text, icon }) {
  const location = useLocation();
  const {
    displayedProducts,
    searchText,
    dispatchProducts,
    handleChangedSearchText,
    getDisabledProducts,
    getAvailableProducts,
    handleDisplayedProducts,
    setDisabledProducts,
  } = useProductsContext();

  if (type === "input") {
    return (
      <input
        type="text"
        value={searchText || ""}
        placeholder={placeholder || ""}
        onChange={(e) => handleChangedSearchText(e, location.pathname)}
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
